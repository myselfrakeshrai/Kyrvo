import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Reservation, VehicleTypes } from 'src/models';
import { RESERVATION_TYPES } from 'src/constants/appConstants';
import { useAppStore } from 'src/stores';
import { useTheme } from '@mui/system';

interface PaymentInfoProps {
  formData: Reservation;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ formData }) => {
  const themeInstance = useTheme();
  const { vehicleTypes } = useAppStore();
  const vehicleType: VehicleTypes | undefined = vehicleTypes?.find(
    (x) => x.Id === formData.VehicleType,
  );

  return (
    <Grid container mb={1}>
      <Grid item xs={12}>
        <Card sx={{ textAlign: 'center' }} variant="outlined">
          <Typography
            component="p"
            sx={{
              margin: '5px',
              padding: '10px',
              borderRadius: '5px',
              color: themeInstance.palette.tertiary?.main,
              background: themeInstance.palette.primary.main,
            }}
          >
            Payment Details
          </Typography>
          <CardContent sx={{ textAlign: 'left' }}>
            <>
              <strong>Vehicle Type:</strong>
              <Typography variant="body2" component="p">
                {vehicleType?.Name} <strong>{vehicleType?.Price}$</strong>
              </Typography>
            </>
            {formData.ReservationType === RESERVATION_TYPES.hire_dis && (
              <>
                <strong>Estimated Distance:</strong>
                <Typography variant="body2" component="p">
                  {formData.DistanceText}
                </Typography>
              </>
            )}
            {formData.ReservationType === RESERVATION_TYPES.hire_dis && (
              <Typography variant="body2" component="p">
                <strong>Estimated Duration:</strong> {formData.Duration}
              </Typography>
            )}
            {formData.ReservationType === RESERVATION_TYPES.hire_hour && (
              <>
                <strong>Booking Duration:</strong>
                <Typography variant="body2" component="p">
                  {formData.Hours} Hours {''}
                  {formData.Hours !== undefined && (
                    <strong>
                      {formData.Hours * (vehicleType?.BasePrice || 0)}$
                    </strong>
                  )}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PaymentInfo;
