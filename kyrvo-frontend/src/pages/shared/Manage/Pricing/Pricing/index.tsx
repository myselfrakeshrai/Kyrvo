import React, { useState } from 'react';
import { TextField, Grid, Box, LinearProgress, Alert } from '@mui/material';
import { Pricing } from 'src/models';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import {
  CustomDatePicker,
  CustomTimePicker,
  FormActions,
} from 'src/components';
import { useParams } from 'react-router-dom';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { PricingServices } from 'src/services';

interface PricingFormData {
  Name: string;
  Description: string;
  Multiplier: number;
  Priority: number;
  Code?: string;
  StartDate?: string | null;
  StartTime?: string | null;
  EndDate?: string | null;
  EndTime?: string | null;
}

const PricingFormSchema: z.ZodType<PricingFormData> = z.object({
  Name: z.string(),
  Description: z.string(),
  Multiplier: z.number().nonnegative().max(4.0),
  Priority: z.number().nonnegative().max(20),
  Code: z
    .string()
    .min(4, 'Code should be at least 4 characters long')
    .optional()
    .or(z.literal('')),
  StartDate: z.string().nullable().optional(),
  EndDate: z.string().nullable().optional(),
  StartTime: z.string().nullable().optional(),
  EndTime: z.string().nullable().optional(),
});

const PricingPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  //React hook form related intiialization
  const {
    setValue,
    register,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Pricing>({
    defaultValues: async () => (id ? PricingServices.get(id) : ({} as Pricing)),
    resolver: zodResolver(PricingFormSchema),
  });
  const onSubmit: SubmitHandler<Pricing> = (formData: Pricing) => {
    if (id) {
      const confirm = window.confirm(
        `This will update vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        PricingServices.edit(formData, id)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('pricings');
          });
      }
    } else {
      setLoading(true);
      PricingServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('pricings');
        });
    }
  };

  const onCancel = () => {
    goto('pricings');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      PricingServices.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('pricings');
        });
    }
  };
  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ margin: 'auto', my: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {error && (
            <Alert
              variant="standard"
              severity="error"
              sx={{ width: '80%', m: 1 }}
            >
              {error}
            </Alert>
          )}
          <Grid item sm={5}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              type="text"
              InputProps={{ inputProps: { step: 0.1 } }}
              error={errors.Name ? true : undefined}
              helperText={errors.Name?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Name')}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              type="text"
              InputProps={{ inputProps: { step: 0.1 } }}
              error={errors.Description ? true : undefined}
              helperText={errors.Description?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Description')}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Priority"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { step: 1 } }}
              error={errors.Priority ? true : undefined}
              helperText={errors.Priority?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Priority', { valueAsNumber: true })}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Multiplier"
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{ inputProps: { step: 0.01 } }}
              error={errors.Multiplier ? true : undefined}
              helperText={errors.Multiplier?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Multiplier', { valueAsNumber: true })}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              label="Promo Code"
              variant="outlined"
              fullWidth
              type="text"
              InputProps={{ inputProps: { step: 0.1 } }}
              error={errors.Code ? true : undefined}
              helperText={errors.Code?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Code')}
              disabled={isReadOnly}
              // value=
            />
          </Grid>
          <Grid item sm={5}>
            <CustomDatePicker
              label="Start Date"
              defaultValue={defaultValues?.StartDate}
              error={errors.StartDate ? true : false}
              message={errors.StartDate?.message}
              onChange={(val: any) =>
                setValue('StartDate', val, { shouldDirty: true })
              }
              maxDateInDays={90}
              sx={{
                borderRadius: '0',
                height: '50px',
                mt: 2,
              }}
            />
          </Grid>
          <Grid item sm={5}>
            <CustomTimePicker
              label="Start Time"
              defaultValue={defaultValues?.StartTime}
              error={errors.StartTime ? true : false}
              message={errors.StartTime?.message}
              minuteSteps={1}
              format="HH:mm:ss"
              onChange={(val: any) =>
                setValue('StartTime', val, { shouldDirty: true })
              }
              sx={{
                height: '50px',
                mt: 2,
              }}
            />
          </Grid>
          <Grid item sm={5}>
            <CustomDatePicker
              label="End Date"
              defaultValue={defaultValues?.EndDate}
              error={errors.EndDate ? true : false}
              message={errors.EndDate?.message}
              onChange={(val: any) =>
                setValue('EndDate', val, { shouldDirty: true })
              }
              maxDateInDays={365}
              sx={{
                borderRadius: '0',
                height: '50px',
                mt: 2,
              }}
            />
          </Grid>
          <Grid item sm={5}>
            <CustomTimePicker
              label="End Time"
              defaultValue={defaultValues?.EndTime}
              error={errors.EndTime ? true : false}
              message={errors.EndTime?.message}
              minuteSteps={1}
              format="HH:mm:ss"
              onChange={(val: any) =>
                setValue('EndTime', val, { shouldDirty: true })
              }
              sx={{
                height: '50px',
                mt: 2,
              }}
            />
          </Grid>
          <Grid item sm={12} mt={4}>
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
    </Box>
  );
};

export default PricingPage;
