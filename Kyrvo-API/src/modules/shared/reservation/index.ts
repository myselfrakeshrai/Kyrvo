import { ADDED_NEW_RESERVATION, COULDNT_ADD_DATA } from '../utils/messages';
import { generateResponse } from '../helpers/responseHelper';
import { adminFeature } from '../utils/permission';
import { Reservation, reservationModel, ReservationSchema } from './model';
import { vehicleTypeModel } from '../../vehicletypes/model';
import baseRoute from 'shared/baseRoute';
import { Notification, notificationModel } from 'shared/notification/model';
import { NOTIFICATION_TYPES, RESERVATION_TYPES } from 'shared/const';
import { logActivity } from '../helpers/customLogger';
import { pricingModel } from 'shared/pricing/model';
import { generateRoutes } from '../helpers/openaApiRoute';
import { z } from 'zod';

const routes = baseRoute<Reservation>(reservationModel);

const calculateFare = async (db: any, reservation: Reservation) => {
  const vehicleType = await vehicleTypeModel.getById(
    db,
    reservation.VehicleType,
  );
  const variablePrice = await pricingModel.getApplicable(
    db,
    `${reservation.PickupDate} ${reservation.PickupTime}:00`,
  );
  if (reservation.ReservationType === RESERVATION_TYPES.hire_hour) {
    const price = (vehicleType.HourlyPrice || 75) * (reservation?.Hours || 24);
    return {
      price,
      remarks: 'Hourly rate price caluclated using hourly price.',
    };
  } else {
    let price = vehicleType?.Price || 0;
    let remarks = '';
    if (reservation.Distance > (vehicleType?.DiscountedDistance || 100)) {
      price = vehicleType?.DiscountedPrice;
    }
    price =
      (vehicleType?.BasePrice || 0) +
      Math.round((reservation.Distance / 1000) * (price || 1));
    if (variablePrice) {
      price = price * variablePrice.Multiplier;
      remarks = `This price includes variable price of ${variablePrice.Multiplier} for ${variablePrice.Name}.`;
    }
    return { price, remarks };
  }
};

const group = 'Reservations';
const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all reservations',
    summary: 'Retrieve all reservations',
    schema: ReservationSchema,
    group: group,
    handler: routes.getAll,
  },
  {
    method: 'get',
    path: '/{Id}',
    description: 'Get a reservation by Id',
    summary: 'Retrive reservation by log Id',
    schema: ReservationSchema,
    group: group,
    params: ReservationSchema.pick({ Id: true }),
    handler: routes.get,
  },
  {
    method: 'put',
    path: '/{Id}',
    description: 'Get a reservation by Id',
    summary: 'Retrive reservation by log Id',
    schema: ReservationSchema,
    group: group,
    body: ReservationSchema,
    params: z.object({
      Id: z.string(),
    }),
    handler: (c) => adminFeature(c, routes.put),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a reservation by Id',
    summary: 'Retrive reservation by log Id',
    schema: ReservationSchema,
    group: group,
    params: ReservationSchema.pick({ Id: true }),
    handler: (c) => adminFeature(c, routes.delete),
  },
  {
    method: 'post',
    path: '/',
    description: 'Create a reservation',
    summary: 'Add a reservation',
    schema: ReservationSchema,
    group: group,
    body: ReservationSchema.omit({ Id: true }),
    handler: async (c: any) => {
      const param = (await c.req.json()) as Reservation;
      const variablePrice = await calculateFare(c.env.ae_d1, param);
      param.IsPaid = 0;
      param.Status = 0;
      param.Price = variablePrice.price;
      param.Remarks = variablePrice.remarks;
      param.RefId = crypto.randomUUID().substring(0, 6);
      const reservation = await reservationModel.create(
        c.env.ae_d1,
        param as Reservation,
      );
      await logActivity(
        c.env.ae_d1,
        reservation.Id,
        'CREATE',
        reservationModel.getTableName(),
        param,
        {},
        1,
        reservation.Email,
      );
      if (reservation) {
        //await sendReservationEmail(reservation as Reservation);
        await notificationModel.create(c.env.ae_d1, {
          Type: NOTIFICATION_TYPES.RESERVATION,
          TypeId: reservation.Id,
          Message: ADDED_NEW_RESERVATION,
          IsProcessed: 0,
        } as Notification);
      }
      return generateResponse(c, reservation, 422, COULDNT_ADD_DATA);
    },
  },
  {
    method: 'post',
    path: '/assignAgency/{Id}',
    description: 'Assign agency',
    summary: 'Assign an agency to the reservation request',
    schema: ReservationSchema,
    group: group,
    body: ReservationSchema.pick({ AgencyId: true }),
    params: ReservationSchema.pick({ Id: true }),
    handler: (c) =>
      adminFeature(c, async (c: any) => {
        const { Id } = await c.req.param();
        const { AgencyId } = await c.req.json();

        const existingReservation = await reservationModel.getById(
          c.env.ae_d1,
          Id,
        );
        const reservation = await reservationModel.updateById(
          c.env.ae_d1,
          {
            AgencyId: AgencyId,
            Status: 3,
          } as Reservation,
          Id,
        );

        await logActivity(
          c.env.ae_d1,
          Id,
          'AGENCY_ASSIGNED',
          reservationModel.getTableName(),
          reservation,
          existingReservation,
          1,
          c.get('userId'),
        );
        return generateResponse(c, reservation, 422, COULDNT_ADD_DATA);
      }),
  },
  {
    method: 'post',
    path: '/assignAgent/{Id}',
    description: 'Assign agent',
    summary: 'Assign an agent to the reservation',
    schema: ReservationSchema,
    group: group,
    body: ReservationSchema.pick({ AgentId: true }),
    params: ReservationSchema.pick({ Id: true }),
    handler: (c) =>
      adminFeature(c, async (c: any) => {
        const { Id } = await c.req.param();
        const { AgentId } = await c.req.json();

        const existingReservation = await reservationModel.getById(
          c.env.ae_d1,
          Id,
        );
        const reservation = await reservationModel.updateById(
          c.env.ae_d1,
          {
            AgencyId: AgentId,
            Status: 4,
          } as Reservation,
          Id,
        );
        await logActivity(
          c.env.ae_d1,
          Id,
          'AGENT_ASSIGNED',
          reservationModel.getTableName(),
          reservation,
          existingReservation,
          1,
          c.get('userId'),
        );
        return generateResponse(c, reservation, 422, COULDNT_ADD_DATA);
      }),
  },
]);

export default {
  route: app,
  path: '/reservation',
};
