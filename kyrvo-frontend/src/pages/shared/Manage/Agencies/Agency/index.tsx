import React, { useState } from 'react';
import {
  Alert,
  Grid,
  LinearProgress,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { FormActions, ImageSelector } from 'src/components';
import { useParams } from 'react-router-dom';
import { Agency } from 'src/models';
import { AgencyServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';

const AgencySchema: z.ZodType<Agency> = z.object({
  Name: z.string().min(3, 'Entera a valid agency name.'),
  Email: z.string().email(),
  Address1: z.string().min(1, 'Address 1 is required.'),
  Address2: z.string().optional(),
  City: z.string().min(1, 'City is required'),
  State: z.string().min(1, 'State is required'),
  PostalCode: z.string().min(1, 'Postal Code is required'),
  Phone: z.string().min(1, 'Phone number is required'),
  IsActive: z.number().optional(),
  Images: z.string().optional(),
});

const AgencyPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  //React hook form related intiialization
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Agency>({
    resolver: zodResolver(AgencySchema),
    defaultValues: async () => (id ? AgencyServices.get(id) : ({} as Agency)),
  });

  const onSubmit: SubmitHandler<Agency> = (formData: Agency) => {
    if (id) {
      const confirm = window.confirm(
        `This will update Agency "${defaultValues?.Name}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        AgencyServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('agencies');
          });
      }
    } else {
      setLoading(true);
      AgencyServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('agencies');
        });
    }
  };

  const onCancel = () => {
    goto('agencies');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove agency "${defaultValues?.Name}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      AgencyServices.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('agencies');
        });
    }
  };
  if (!defaultValues) {
    return <LinearProgress />;
  }

  return (
    <Grid>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ textTransform: 'uppercase' }}
          >
            {action} Agency
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
        <Grid container spacing={4} marginTop={1}>
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
          <Grid item sm={6}>
            <TextField
              id="Address1"
              label="Address1"
              variant="outlined"
              fullWidth
              error={errors.Address1 ? true : undefined}
              helperText={errors.Address1?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Address1')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="Address2"
              label="Address2"
              variant="outlined"
              fullWidth
              error={errors.Address2 ? true : undefined}
              helperText={errors.Address2?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Address2')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              id="City"
              label="City"
              variant="outlined"
              fullWidth
              error={errors.City ? true : undefined}
              helperText={errors.City?.message}
              InputLabelProps={{ shrink: true }}
              {...register('City')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={4}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="state">State</InputLabel>
              <Select
                labelId="state"
                label="State"
                defaultValue={defaultValues?.State || ''}
                error={errors.State ? true : undefined}
                {...register('State')}
              >
                <MenuItem value={'NSW'}>New South Wales</MenuItem>
                <MenuItem value={'NT'}>Northern Territory</MenuItem>
                <MenuItem value={'Qld'}>Queensland</MenuItem>
                <MenuItem value={'SA'}>South Australia</MenuItem>
                <MenuItem value={'Tas'}>Tasmania</MenuItem>
                <MenuItem value={'Vic'}>Victoria</MenuItem>
                <MenuItem value={'WA'}>Western Australia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4}>
            <TextField
              id="PostalCode"
              label="Postal Code"
              variant="outlined"
              fullWidth
              error={errors.PostalCode ? true : undefined}
              helperText={errors.PostalCode?.message}
              InputLabelProps={{ shrink: true }}
              {...register('PostalCode')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="Phone"
              label="Phone"
              variant="outlined"
              fullWidth
              error={errors.Phone ? true : undefined}
              helperText={errors.Phone?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Phone')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={6}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="status">Active</InputLabel>
              <Select
                labelId="status"
                label="Status"
                defaultValue={defaultValues?.IsActive}
                error={errors.IsActive ? true : undefined}
                {...register('IsActive')}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={2}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <ImageSelector
              initial={getValues('Images')
                ? getValues('Images')?.split('|')
                : defaultValues?.Images?.split('|') || []}
              onSubmit={(ids: string[]) => {
                setValue('Images', ids.join('|'), { shouldDirty: true });
              } } label={''}            />
          </Grid>
          <Grid item sm={8}>
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

export default AgencyPage;
