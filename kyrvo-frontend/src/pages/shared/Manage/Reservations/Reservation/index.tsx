import React, { useState } from 'react';
import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FormActions } from 'src/components';
import { useParams } from 'react-router-dom';
import { Reservation } from 'src/models';
import { ReservationServices, VehicleServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useQuery } from '@tanstack/react-query';
import state from '../../../../../state.json';
import { useAppRoute } from 'src/hooks/useAppRoute';

const ReservationSchema: z.ZodType<Reservation> = z.object({
  Email: z.string().email('Email must be valid.'),
  PhoneNumber: z.string().min(10, 'Phone number shall be valid.'),
  PickupDate: z.string().min(2, 'Pick Date shall be valid.'),
  PickupTime: z.string().min(2, 'Pick Time Shall be valid.'),
  DropoffDate: z.string().optional(),
  DropoffTime: z.string().optional(),
  FirstName: z.string().min(3, 'Name shall be upon 3.'),
  LastName: z.string().min(3, 'LastName shall be upon 3.'),
  PickupLocation: z.string().min(2, 'Pick Locations Shall be valid.'),
  DropoffLocation: z.string().min(2, 'Drop Locations Shall be valid.'),
  Price: z.number().multipleOf(0.01),
  Distance: z.number().optional(),
  IsPaid: z.number().optional(),
  PaymentMethod: z.string().min(2, 'Cash or online.'),
  AgencyId: z.string().optional(),
  VehicleId: z.string().optional(),
  AgentId: z.string().optional(),
  Remarks: z.string().min(0, 'Accept or Decline'),
});

const ReservationPage: React.FC = () => {
  // select const and handle change

  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  //React hook form related intiialization
  const vehicle = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => VehicleServices.getAll().then((res) => res),
  });

  const {
    register,
    handleSubmit,

    formState: { defaultValues, errors, isDirty },
  } = useForm<Reservation>({
    defaultValues: async () =>
      id ? ReservationServices.get(id) : ({} as Reservation),
    resolver: zodResolver(ReservationSchema),
  });

  const onSubmit: SubmitHandler<Reservation> = (formData: Reservation) => {
    if (id) {
      const confirm = window.confirm(
        `This will update vehicle type "${defaultValues?.Id}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        ReservationServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('reservations');
          });
      }
    } else {
      setLoading(true);
      ReservationServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('reservations');
        });
    }
  };

  const onCancel = () => {
    goto('reservations');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove vehicle type "${defaultValues?.Id}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      ReservationServices.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('reservations');
        });
    }
  };

  return (
    <Grid>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ textTransform: 'uppercase' }}
          >
            {action} Reservation
          </Typography>
        </Grid>
      </Grid>
      {loading && <LinearProgress />}
      {error && (
        <Alert variant="standard" severity="error" sx={{ width: '80%', m: 1 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} marginTop={1}>
          <Grid item sm={4}>
            <TextField
              id="FirstName"
              label="First Name"
              variant="outlined"
              fullWidth
              error={errors.FirstName ? true : undefined}
              helperText={errors.FirstName?.message}
              InputLabelProps={{ shrink: true }}
              {...register('FirstName')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              id="LastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              error={errors.LastName ? true : undefined}
              helperText={errors.LastName?.message}
              InputLabelProps={{ shrink: true }}
              {...register('LastName')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              fullWidth
              error={errors.Email ? true : undefined}
              helperText={errors.Email?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Email')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              id="PhoneNumber"
              label="PhoneNumber"
              variant="outlined"
              fullWidth
              error={errors.PhoneNumber ? true : undefined}
              helperText={errors.PhoneNumber?.message}
              InputLabelProps={{ shrink: true }}
              {...register('PhoneNumber')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="PickupDate"
              type="date"
              label="PickupDate"
              variant="outlined"
              fullWidth
              error={errors.PickupDate ? true : undefined}
              helperText={errors.PickupDate?.message}
              InputLabelProps={{ shrink: true }}
              {...register('PickupDate')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="PickupTime"
              label="PickupTime"
              variant="outlined"
              fullWidth
              type="time"
              error={errors.PickupTime ? true : undefined}
              helperText={errors.PickupTime?.message}
              InputLabelProps={{ shrink: true }}
              {...register('PickupTime')}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="DropoffDate"
              label="Drop Off Date"
              type="date"
              variant="outlined"
              fullWidth
              error={errors.DropoffDate ? true : undefined}
              helperText={errors.DropoffDate?.message}
              InputLabelProps={{ shrink: true }}
              {...register('DropoffDate')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="DropoffTime"
              label="Drop Off Time"
              variant="outlined"
              type="time"
              fullWidth
              error={errors.DropoffTime ? true : undefined}
              helperText={errors.DropoffTime?.message}
              InputLabelProps={{ shrink: true }}
              {...register('DropoffTime')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="PickupLocationId">Pick Up Location</InputLabel>
              <Select
                id="PickupLocation"
                labelId="PickupLocationId"
                label="Pickup Location"
                error={errors.PickupLocation ? true : undefined}
                defaultValue={defaultValues?.PickupLocation || 'None'}
                {...register('PickupLocation')}
              >
                {state.map((state: any) => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="DropoffLocationId">Drop Off Location</InputLabel>
              <Select
                id="DropoffLocation"
                labelId="DropoffLocationId"
                label="Drop Off Location"
                error={errors.DropoffLocation ? true : undefined}
                defaultValue={defaultValues?.DropoffLocation || 'None'}
                {...register('DropoffLocation')}
              >
                {state.map((state: any) => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="Distance"
              label="Distance"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { step: 0.1 } }}
              error={errors.Distance ? true : undefined}
              helperText={errors.Distance?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Distance', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="IsPaidId">Paid Or Unpaid</InputLabel>
              <Select
                id="IsPaid"
                labelId="IsPaidId"
                label="Paid Or Unpaid"
                error={errors.IsPaid ? true : undefined}
                defaultValue={defaultValues?.IsPaid || 'None'}
                {...register('IsPaid')}
              >
                <MenuItem value={1}>Paid</MenuItem>
                <MenuItem value={0}>Unpaid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="PaymentMethodId">Payment Method</InputLabel>
              <Select
                id="PaymentMethodId"
                labelId="PaymentMethod"
                label="Payment Method"
                error={errors.PaymentMethod ? true : undefined}
                defaultValue={defaultValues?.PaymentMethod || 'None'}
                {...register('PaymentMethod')}
              >
                <MenuItem value={'cash'}>Cash</MenuItem>
                <MenuItem value={'online'}>Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="VehicleId">Vehicles Id</InputLabel>
              <Select
                id="VehicleId"
                labelId="VehicleId"
                label="VehicleId"
                error={errors.VehicleId ? true : undefined}
                defaultValue={defaultValues?.VehicleId || 'None'}
                {...register('VehicleId')}
              >
                {vehicle.data?.map((Vehicle) => (
                  <MenuItem key={Vehicle.Id} value={Vehicle.Id}>
                    {Vehicle.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="AgencyId">Agency Id</InputLabel>
              <Select
                id="AgencyId"
                labelId="AgencyId"
                label="AgencyId"
                error={errors.AgencyId ? true : undefined}
                defaultValue={defaultValues?.AgencyId || 'None'}
                {...register('AgencyId')}
              >
                <MenuItem value={1}>Cash</MenuItem>
                <MenuItem value={2}>Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="AgentId">Agent Id</InputLabel>
              <Select
                id="AgentId"
                labelId="AgentId"
                label="AgentId"
                error={errors.AgentId ? true : undefined}
                defaultValue={defaultValues?.AgentId || 'None'}
                {...register('AgentId')}
              >
                <MenuItem value={1}>Cash</MenuItem>
                <MenuItem value={2}>Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="DecisionId">Remarks</InputLabel>
              <Select
                id="Remarks"
                labelId="RemarksId"
                label="Remarks"
                error={errors.Remarks ? true : undefined}
                defaultValue={defaultValues?.Remarks || 'None'}
                {...register('Remarks')}
              >
                <MenuItem value={1}>Accept</MenuItem>
                <MenuItem value={0}>Decline</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="Price"
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { step: 1 } }}
              error={errors.Price ? true : undefined}
              helperText={errors.Price?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Price', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={12}>
            <FormActions
              pageAction={action}
              isDirty={isDirty}
              submitText={id ? 'Update' : 'Create'}
              onCancel={onCancel}
              onDelete={onDelete}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default ReservationPage;
