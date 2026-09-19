import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Reservation } from 'src/models';
import { ReservationServices } from 'src/services';
import { useAppStore } from 'src/stores';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { RESERVATION_TYPES } from 'src/constants/appConstants';
import { getImageUrl } from 'src/utils/helpers';

interface RideSummaryProps {
  formData: Reservation;
  onSubmit: (val: Reservation) => void;
  onPrevious: () => void;
}
const RideSummary: React.FC<RideSummaryProps> = ({
  formData,
  onPrevious,
  onSubmit,
}) => {
  const { delReservation: delReseravtion } = useAppStore();
  const { vehicleTypes } = useAppStore();
  const vehicleType = vehicleTypes?.find((x) => x.Id === formData.VehicleType);
  const [data, setData] = useState<Reservation>();
  useEffect(() => {
    if (formData && formData.ReservationType === RESERVATION_TYPES.hire_dis) {
      const google = window.google;
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [formData.PickupLocation || ''],
          destinations: [formData.DropoffLocation || ''],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidFerries: true,
        },
        function (response) {
          const vec = response?.rows[0].elements[0];
          if (vec) {
            const newData = { ...formData };
            newData.Distance = vec.distance?.value;
            newData.DurationSecs = vec.duration?.value;
            newData.DistanceText = vec.distance?.text;
            newData.Duration = vec.duration?.text;
            setData({ ...newData });
          }
        },
      );
    }
  }, [formData]);

  const mutation = useMutation({
    mutationFn: () => ReservationServices.addNew(data as Reservation),
    onSuccess: (res: any) => {
      delReseravtion();
      onSubmit(res);
    },
    onError: () => {
      alert("Couldn't process your request");
    },
  });

  const onNext = () => {
    mutation.mutate();
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card
          sx={{ minWidth: 275, my: 4, p: 2, textAlign: 'center' }}
          variant="outlined"
        >
          <Typography variant="h2" component="p" sx={{ mb: 4 }}>
            Reservation Details
          </Typography>
          <Box
            component="img"
            src={getImageUrl(vehicleType?.Image as string)}
            sx={{ height: 120 }}
          />
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
            {formData.ReservationType === RESERVATION_TYPES.hire_dis && (
              <Typography variant="body2" component="p" sx={{ my: 2 }}>
                <strong>To:</strong> {data?.DropoffLocation}
              </Typography>
            )}
            <Typography variant="body2" component="p" sx={{ my: 2 }}>
              <strong>Date/Time:</strong> {data?.PickupDate} /{' '}
              {data?.PickupTime}
            </Typography>
            {formData.ReservationType === RESERVATION_TYPES.hire_dis && (
              <Typography variant="body2" component="p" sx={{ my: 2 }}>
                <strong>Estimated Distance:</strong> {data?.DistanceText}
              </Typography>
            )}
            {formData.ReservationType === RESERVATION_TYPES.hire_dis && (
              <Typography variant="body2" component="p" sx={{ my: 2 }}>
                <strong>Estimated Duration:</strong> {data?.Duration}
              </Typography>
            )}
            {formData.ReservationType === RESERVATION_TYPES.hire_hour && (
              <Typography variant="body2" component="p" sx={{ my: 2 }}>
                <strong>Booking Duration:</strong> {data?.Hours} Hours
              </Typography>
            )}
            <Alert severity="info">
              Price breakdown will be shown in next step.
            </Alert>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          sx={{ float: 'left' }}
          onClick={onPrevious}
          startIcon={<ChevronLeft />}
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          variant="contained"
          sx={{ float: 'right' }}
          endIcon={<ChevronRight />}
          disabled={mutation.isPending}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
};

export default RideSummary;