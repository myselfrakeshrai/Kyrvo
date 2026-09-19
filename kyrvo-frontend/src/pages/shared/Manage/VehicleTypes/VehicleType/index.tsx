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
import { FormActions, ImageSelector } from 'src/components';
import { useParams } from 'react-router-dom';
import { VehicleTypes } from 'src/models';
import { VehicleTypesServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';

const VehicleTypeSchema: z.ZodType<VehicleTypes> = z.object({
  Name: z.string().min(3, 'Name must be at least 3 characters long.'),
  Desc: z.string().min(10, 'Description must be at least 10 characters long.'),
  Image: z.string().optional(),
  Seats: z
    .number()
    .min(1, 'Minimum number of Seats allowed is 1.')
    .max(50, 'Maximum number of Seats allowed is 50.'),
  Luggages: z
    .number()
    .min(1, 'Minimum number of Luggages allowed is 1.')
    .max(50, 'Maximum number of Luggages allowed is 50.'),

  Price: z.number().multipleOf(0.01),
  HourlyPrice: z.number().multipleOf(0.01),
  BasePrice: z.number().multipleOf(0.01),
  DiscountedPrice: z.number().multipleOf(0.01),
  DiscountedDistance: z.number().multipleOf(0.01),
  MinMileage: z.number().optional(),
  MaxMileage: z.number().optional(),
  MileageUnit: z.string().optional(),
});

const VehicleTypePage: React.FC = () => {
  // select const and handle change

  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  //React hook form related intiialization
  const {
    setValue,
    getValues,
    register,
    handleSubmit,

    formState: { defaultValues, errors, isDirty },
  } = useForm<VehicleTypes>({
    defaultValues: async () =>
      id ? VehicleTypesServices.get(id) : ({} as VehicleTypes),
    resolver: zodResolver(VehicleTypeSchema),
  });

  const onSubmit: SubmitHandler<VehicleTypes> = (formData: VehicleTypes) => {
    if (id) {
      const confirm = window.confirm(
        `This will update vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        VehicleTypesServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('vehicletypes');
          });
      }
    } else {
      setLoading(true);
      VehicleTypesServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('vehicletypes');
        });
    }
  };

  const onCancel = () => {
    goto('vehicletypes');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      VehicleTypesServices.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('vehicletypes');
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
            {action} Vehicle Type
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
          <Grid item sm={8}>
            <TextField
              id="Name"
              label="Name"
              variant="outlined"
              fullWidth
              error={errors.Name ? true : undefined}
              helperText={errors.Name?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Name')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="Desc"
              label="Desc"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              error={errors.Desc ? true : undefined}
              helperText={errors.Desc?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Desc')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Seats"
              variant="outlined"
              fullWidth
              type="number"
              error={errors.Seats ? true : undefined}
              helperText={errors.Seats?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Seats', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Luggages"
              variant="outlined"
              fullWidth
              type="number"
              error={errors.Luggages ? true : undefined}
              helperText={errors.Luggages?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Luggages', { valueAsNumber: true })}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="MinMileage"
              label="Min Mileage"
              variant="outlined"
              fullWidth
              type="number"
              error={errors.MinMileage ? true : undefined}
              helperText={errors.MinMileage?.message}
              InputLabelProps={{ shrink: true }}
              {...register('MinMileage', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="MaxMileage"
              label="Max Mileage"
              variant="outlined"
              fullWidth
              type="number"
              error={errors.MaxMileage ? true : undefined}
              helperText={errors.MaxMileage?.message}
              InputLabelProps={{ shrink: true }}
              {...register('MaxMileage', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <FormControl fullWidth>
              <InputLabel id="MileageUnitLabelId">Mile Unit</InputLabel>
              <Select
                labelId="MileageUnitLabelId"
                label="MileageUnit"
                error={errors.MileageUnit ? true : undefined}
                defaultValue={defaultValues?.MileageUnit || 'KM'}
                {...register('MileageUnit')}
              >
                <MenuItem value={'KM'}>KM</MenuItem>
                <MenuItem value={'Miles'}>Miles</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Base Price"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { step: 0.1 } }}
              error={errors.BasePrice ? true : undefined}
              helperText={errors.BasePrice?.message}
              InputLabelProps={{ shrink: true }}
              {...register('BasePrice', { valueAsNumber: true })}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Price per KM"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { step: 0.1 } }}
              error={errors.Price ? true : undefined}
              helperText={errors.Price?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Price', { valueAsNumber: true })}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Price per Hour"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { step: 0.1 } }}
              error={errors.HourlyPrice ? true : undefined}
              helperText={errors.HourlyPrice?.message}
              InputLabelProps={{ shrink: true }}
              {...register('HourlyPrice', { valueAsNumber: true })}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Discounted Price per KM"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { step: 0.1 } }}
              error={errors.DiscountedPrice ? true : undefined}
              helperText={errors.DiscountedPrice?.message}
              InputLabelProps={{ shrink: true }}
              {...register('DiscountedPrice', { valueAsNumber: true })}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Discount After KM"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { step: 0.1 } }}
              error={errors.DiscountedDistance ? true : undefined}
              helperText={errors.DiscountedDistance?.message}
              InputLabelProps={{ shrink: true }}
              {...register('DiscountedDistance', { valueAsNumber: true })}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={12}>
            <ImageSelector
              label="Vehicle Type"
              singleSelect={true}
              initial={
                getValues('Image')
                  ? getValues('Image')?.split('|')
                  : defaultValues?.Image?.split('|') || []
              }
              onSubmit={(ids: string[]) => {
                setValue('Image', ids.join('|'), { shouldDirty: true });
              }}
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

export default VehicleTypePage;
