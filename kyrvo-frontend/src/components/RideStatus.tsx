import {
  Alert,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { ReservationServices } from 'src/services';
import { useAppStore } from 'src/stores';
import { useNavigate } from 'react-router-dom';
interface RideStatusProps {
  id: string | undefined;
}
const RideStatus: React.FC<RideStatusProps> = ({ id }) => {
  const navigate = useNavigate();
  if (!id) {
    navigate('/404');
  }
  const { vehicleTypes } = useAppStore();
  const { data, status, error } = useQuery({
    queryKey: ['reservation_query'],
    queryFn: () => ReservationServices.get(id as string),
    enabled: id !== undefined,
  });
  const vehicleType =
    data && vehicleTypes.find((x) => x.Id === data.VehicleType);

  const computeTravel = useMemo(() => {
    if (window.google && data) {
      const google = window.google;
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [data.PickupLocation || ''],
          destinations: [data.DropoffLocation || ''],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        function (response) {
          const vec = response?.rows[0].elements[0];
          if (vec) {
            data.Distance = vec.distance?.value;
            data.Duration = vec.duration?.text;
          }
        },
      );
    }
  }, [data]);

  if (data) {
    computeTravel;
  }

  const rStatus = (status: number) => {
    if (status === 6) {
      return <Alert severity="success">Service Completed.</Alert>;
    }
    if (status === 5) {
      return <Alert severity="success">Agent Assigned.</Alert>;
    }
    if (status === 4) {
      return <Alert severity="success">Reservation Accepted.</Alert>;
    }
    if (status === 3) {
      return <Alert severity="success">Reservation Processing</Alert>;
    }
    if (status === 2) {
      return <Alert severity="success">Payment Received!</Alert>;
    }
    if (status === 1) {
      return <Alert severity="error">Payment Error!</Alert>;
    }
    if (status === 0) {
      return <Alert severity="info">Reservation requested!</Alert>;
    }
    return (
      <Alert severity="warning">
        Unable to retrieve status. Please contact support.
      </Alert>
    );
  };

  return (
    <Card
      sx={{ minWidth: 275, my: 4, p: 2, textAlign: 'center' }}
      variant="outlined"
    >
      <Typography variant="h2" component="p" sx={{ mb: 4 }}>
        Reservation Details
      </Typography>
      {status === 'pending' && <LinearProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
      {status === 'success' && (
        <>
          <Box component="img" src={vehicleType?.Image} sx={{ height: 120 }} />
          <CardContent sx={{ textAlign: 'left' }}>
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              <strong>Passenger:</strong> {data?.FirstName} {data?.LastName}
            </Typography>
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              <strong>Vehicle Type:</strong> {vehicleType?.Name}
            </Typography>
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              <strong>From:</strong> {data?.PickupLocation}
            </Typography>
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              <strong>To:</strong> {data?.DropoffLocation}
            </Typography>
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              <strong>Date/Time:</strong> {data?.PickupDate} /{' '}
              {data?.PickupTime}
            </Typography>
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              <strong>Estimated Distance:</strong>{' '}
              {data?.Distance ? Math.floor(data?.Distance / 1000) : 0} KM
            </Typography>
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              <strong>Estimated Duration:</strong> {data?.Duration}
            </Typography>
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              <strong>Total Cost:</strong> ${data?.Price}.00
            </Typography>
            <Typography variant="h5" component="p" sx={{ my: 2 }}>
              {rStatus(data?.Status || 0)}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default RideStatus;
