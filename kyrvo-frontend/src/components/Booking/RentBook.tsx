import { Grid, useMediaQuery, useTheme, Card, Button } from '@mui/material';

import React, { useState } from 'react';
import LocationPicker from '../LocationPicker';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Reservation } from 'src/models';
import { CustomDatePicker, CustomTimePicker } from '..';
import dayjs from 'dayjs';
import { useAppStore } from 'src/stores/appStore';
import { RESERVATION_TYPES } from 'src/constants/appConstants';

interface HireSearchFormData {
  PickupLocation: string;
  PickupDate: string;
  PickupTime: string;
}

const HireSearchFormSchema: z.ZodType<HireSearchFormData> = z
  .object({
    PickupLocation: z.string({
      required_error: 'Provide a valid pickup location.',
    }),
    PickupDate: z.string({
      required_error: 'Provide a valid pickup date.',
    }),
    PickupTime: z.string({
      required_error: 'Provide a valid pickup time.',
    }),
    //DropoffLocation: z.string().min(1, 'Provide a valid dropoff location.'),
  })
  .refine(
    (params: HireSearchFormData) => {
      const format = 'DD/MM/YYYY HH:mm';
      const isPast = dayjs(
        params.PickupDate + ' ' + params.PickupTime,
        format,
      ).isBefore(dayjs());
      if (isPast) {
        return false;
      }
      return true;
    },
    {
      message: 'Time must be in future',
      path: ['PickupTime'],
    },
  );

const RentBook: React.FC = () => {
  const themeInstance = useTheme();
  const theme = useTheme();
  const { reservation, setReservation } = useAppStore();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [formData] = useState<Reservation>({} as Reservation);
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<HireSearchFormData>({
    resolver: zodResolver(HireSearchFormSchema),
    defaultValues: formData,
  });

  const onSearch: SubmitHandler<HireSearchFormData> = (
    formData: HireSearchFormData,
  ) => {
    setReservation({
      PickupLocation: formData.PickupLocation,
      PickupTime: formData.PickupTime,
      PickupDate: formData.PickupDate,
      ReservationType:
        reservation.ReservationType || RESERVATION_TYPES.hire_dis,
    } as Reservation);
    navigate('/booking');
  };
  return (
    <>
      {/* Search Button start */}
      <Grid
        sx={{
          width: '100%',
        }}
      >
        <form onSubmit={handleSubmit(onSearch)}>
          <Card
            elevation={0}
            sx={{
              padding: '15px',
              boxShadow: 3,
              display: 'flex',
              borderRadius: '10px',
              justifyContent: isMobile ? '' : 'space-between',
              flexDirection: isMobile ? 'column' : '',
              mb: 10,
            }}
          >
            <LocationPicker
              label="Pickup Location"
              defaultValue={getValues('PickupLocation') || ''}
              onSelect={(val: string) => setValue('PickupLocation', val)}
              error={errors.PickupLocation ? true : false}
              message={errors.PickupLocation?.message}
              showLabel={true}
              sx={{
                height: '10px',
                padding: 0,
                width: '40%',
                m: isMobile ? '0' : 0,

                background: theme.palette.tertiary?.main,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Ensure the input outline is removed
                },
              }}
            />
            <CustomDatePicker
              label="Pickup Date"
              defaultValue={getValues('PickupDate') || ''}
              error={errors.PickupDate ? true : false}
              message={errors.PickupDate?.message}
              onChange={(val: any) => setValue('PickupDate', val)}
              maxDateInDays={90}
              sx={{
                borderRadius: '0',
                height: '10px',
                ml: 2,
                background: theme.palette.tertiary?.main,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Ensure the input outline is removed
                },
              }}
            />
            <CustomTimePicker
              label="Pickup Time"
              defaultValue={getValues('PickupTime') || ''}
              error={errors.PickupTime ? true : false}
              message={errors.PickupTime?.message}
              onChange={(val: any) => setValue('PickupTime', val)}
              sx={{
                height: '10px',
                m: 0,
                ml: 2,
                background: theme.palette.tertiary?.main,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Ensure the input outline is removed
                },
              }}
            />
            <Button
              color="primary"
              variant="text"
              sx={{
                ml: 4,
                p: '7px 58px 7px 20px',
                background: themeInstance.palette.secondary.main,
                borderRadius: '10px',
                color: themeInstance.palette.tertiary?.main,
                display: 'block',
                '&:hover': {
                  background: themeInstance.palette.primary.main,
                },
              }}
              type="submit"
            >
              Search
            </Button>
          </Card>
        </form>
      </Grid>
      {/* Search Button end */}
    </>
  );
};

export default RentBook;
