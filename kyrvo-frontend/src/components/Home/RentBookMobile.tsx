import { Grid, Button } from '@mui/material';
import React, { useState } from 'react';
import LocationPicker from '../LocationPicker';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Reservation } from 'src/models';
import { useAppStore } from 'src/stores/appStore';
import { RESERVATION_TYPES } from 'src/constants/appConstants';

interface HireSearchFormData {
  PickupLocation: string;
}

const HireSearchFormSchema: z.ZodType<HireSearchFormData> = z.object({
  PickupLocation: z.string().min(1, 'Provide a valid pickup location.'),
});

const RentBookMobile: React.FC = () => {
  const { reservation, setReservation } = useAppStore();
  const navigate = useNavigate();
  const [formData] = useState<Reservation>(reservation as Reservation);
  const {
    //register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<HireSearchFormData>({
    resolver: zodResolver(HireSearchFormSchema),
    defaultValues: formData,
  });
  const { config } = useAppStore();
  const onSearch: SubmitHandler<HireSearchFormData> = (
    formData: HireSearchFormData,
  ) => {
    setReservation({
      PickupLocation: formData.PickupLocation,
      ReservationType:
        reservation.ReservationType || RESERVATION_TYPES.hire_dis,
    } as Reservation);
    navigate({
      pathname: '/booking',
    });
  };
  return (
    <Grid sx={{ mt: 4, p: 2, minHeight: '40vh' }}>
      <form onSubmit={handleSubmit(onSearch)}>
        <Grid item xs={12} textAlign="center">
        {config.IntroTop && (
            <div dangerouslySetInnerHTML={{ __html: config.IntroTop }} />
          )}
        </Grid>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <LocationPicker
              label="Pickup Location"
              defaultValue={getValues('PickupLocation') || ''}
              onSelect={(val: string) => setValue('PickupLocation', val)}
              error={errors.PickupLocation ? true : false}
              message={errors.PickupLocation?.message}
              showLabel={true}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <LocationPicker
              label="Dropoff Location"
              defaultValue={getValues('DropoffLocation') || ''}
              onSelect={(val: string) => setValue('DropoffLocation', val)}
              error={errors.DropoffLocation ? true : false}
              message={errors.DropoffLocation?.message}
              showLabel={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pickup Date"
              type="date"
              placeholder="Date"
              InputLabelProps={{ shrink: true }}
              error={errors.PickupDate ? true : false}
              helperText={errors.PickupDate?.message}
              {...register('PickupDate')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="time"
              label="Pickup Time"
              InputLabelProps={{ shrink: true }}
              error={errors.PickupTime ? true : false}
              helperText={errors.PickupTime?.message}
              {...register('PickupTime')}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ p: 2 }}
              type="submit"
            >
              Start your Reservation
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default RentBookMobile;
