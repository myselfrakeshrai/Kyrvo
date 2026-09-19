import { adminFeature } from 'shared/utils/permission';
import baseRoute from 'shared/baseRoute';
import {
  Notification,
  notificationModel,
  NotificationSchema,
} from './model';
import { generateResponse } from 'shared/helpers/responseHelper';
import { NO_RECORDS_FOUND } from 'shared/utils/messages';
import { generateRoutes } from 'shared/helpers/openaApiRoute';

const routes = baseRoute<Notification>(notificationModel);
const group = 'Notifications';

const app = generateRoutes([
  {
    method: 'get',
    path: '/',
    description: 'Get all Notifications',
    summary: 'Retrieve all Notifications',
    schema: NotificationSchema,
    group: group,
    handler: (c) =>
      adminFeature(c, async (c: any) => {
        const notifications = await notificationModel.getBy(
          c.env.ae_d1,
          'Type',
          'BOOKING',
        );
        return generateResponse(c, notifications, 404, NO_RECORDS_FOUND);
      }),
  },
  {
    method: 'delete',
    path: '/{Id}',
    description: 'Get a Notifications by Id',
    summary: 'Retrive Notifications by log Id',
    schema: NotificationSchema,
    group: group,
    params: NotificationSchema.pick({ Id: true }),
    handler: routes.delete,
  },
]);

export default {
  route: app,
  path: '/notifications'
};
