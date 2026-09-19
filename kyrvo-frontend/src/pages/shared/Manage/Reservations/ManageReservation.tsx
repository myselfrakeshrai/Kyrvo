import { Grid, Typography, Alert } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { LogsService, ReservationServices } from 'src/services';
import { useAppStore } from 'src/stores';
import { getFormattedDate } from 'src/utils/helpers';
import { AssignAgencyForm, AssignAgentForm } from 'src/components';
import { Reservation } from 'src/models';

const ManageReservation: React.FC = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState<Reservation>();

  const { vehicleTypes } = useAppStore();
  const { data } = useQuery({
    queryKey: ['reservation_query'],
    queryFn: () =>
      ReservationServices.get(id as string).then((res) => {
        setReservation(res);
        return res;
      }),
    enabled: id !== undefined,
  });
  const logs = useQuery({
    queryKey: ['reservation_logs'],
    queryFn: () => LogsService.getByDatId(id as string),
    enabled: id !== undefined,
  });
  const vehicleType =
    data && vehicleTypes.find((x) => x.Id === reservation?.VehicleType);

  const currencyFormatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });
  if (!data) {
    return <></>;
  }
  const actionName = (a: string) => {
    switch (a) {
      case 'AGENT_ASSIGNED':
        return 'assigned agent';
      case 'AGENCY_ASSIGNED':
        return 'assigned agency';
      case 'PAYMENT':
        return 'paid';
      case 'CREATE':
        return 'created';
      default:
        return '';
    }
  };
  const renderHistory = () => {
    const historyList = [];
    if (!logs.data) {
      return <Typography>No history found.</Typography>;
    }
    for (const log of logs.data) {
      historyList.push(
        <Typography>
          On <strong>{getFormattedDate(log.CreatedOn)}</strong> reservation was{' '}
          <strong>{actionName(log.ActionType)}</strong>.
        </Typography>,
      );
    }
    return historyList;
  };

  const onUpdate = (res: Reservation) => {
    setReservation(res);
  };

  return (
    <Grid container spacing={4}>
      <Grid container={true} item xs={12}>
        <Grid item xs={12} mt={2}>
          <Typography variant="h5">Reservation Details</Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="body2" component="p" sx={{ my: 2 }}>
            <strong>Passenger:</strong> {data?.FirstName} {data?.LastName}
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="body2" component="p" sx={{ my: 2 }}>
            <strong>Vehicle Type:</strong> {vehicleType?.Name}
          </Typography>
        </Grid>

        <Grid item sm={4}>
          <Typography variant="body2" component="p" sx={{ my: 2 }}>
            <strong>From:</strong> {reservation?.PickupLocation}
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="body2" component="p" sx={{ my: 2 }}>
            <strong>To:</strong> {reservation?.DropoffLocation}
          </Typography>
        </Grid>

        <Grid item sm={4}>
          <Typography variant="body2" component="p" sx={{ my: 2 }}>
            <strong>Date/Time:</strong> {reservation?.PickupDate} /{' '}
            {reservation?.PickupTime}
          </Typography>
        </Grid>

        <Grid item sm={4}>
          <Typography variant="body2" component="p" sx={{ my: 2 }}>
            <strong>Estimated Distance:</strong>{' '}
            {reservation?.Distance
              ? Math.floor(reservation?.Distance / 1000)
              : 0}{' '}
            KM
          </Typography>
        </Grid>

        <Grid item sm={4}>
          <Typography variant="body2" component="p" sx={{ my: 2 }}>
            <strong>Estimated Duration:</strong> {reservation?.Duration}
          </Typography>
        </Grid>

        <Grid item sm={4}>
          <Typography variant="body2" component="p" sx={{ my: 2 }}>
            <strong>Total Cost:</strong>{' '}
            {currencyFormatter.format(reservation?.Price || 0)}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container={true} xs={12}>
        <Grid item xs={12}>
          <Typography variant="h5">Manage Reservation</Typography>
        </Grid>
        <Grid>{renderHistory()}</Grid>
      </Grid>
      <Grid item xs={6}>
        {reservation?.Status === 2 && (
          <AssignAgencyForm Reservation={reservation} onUpdate={onUpdate} />
        )}
        {reservation?.Status === 3 && (
          <AssignAgentForm Reservation={reservation} onUpdate={onUpdate} />
        )}
        {reservation?.Status === 4 && (
          <>
            <Alert severity="success" variant="filled" sx={{ mb: 2 }}>
              This reservation has been successfully process.
            </Alert>
            <Typography variant="body2">
              <strong>NOTE:</strong> If there are any issues, please contact
              assigned agency and/or agent.{' '}
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ManageReservation;
