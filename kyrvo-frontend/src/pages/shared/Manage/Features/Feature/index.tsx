import React, { useState } from 'react';
import {
  Alert,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { FormActions } from 'src/components';
import { useParams } from 'react-router-dom';
import { Feature } from 'src/models';
import { FeatureServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';

const FeatureSchema: z.ZodType<Feature> = z.object({
  Id: z.string().min(3, 'Feature Id must be at least 3 characters long.'),
  Name: z.string().min(3, 'Name must be at least 3 characters long.'),
  Desc: z.string().min(10, 'Description must be at least 10 characters long.'),
});

const FeaturePage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  //React hook form related intiialization
  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Feature>({
    defaultValues: async () =>
      id ? FeatureServices.get(id) : ({ Name: '', Desc: '' } as Feature),
    resolver: zodResolver(FeatureSchema),
  });

  const onSubmit: SubmitHandler<Feature> = (formData: Feature) => {
    if (id) {
      const confirm = window.confirm(
        `This will update vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        FeatureServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('features');
          });
      }
    } else {
      setLoading(true);
      FeatureServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('features');
        });
    }
  };

  const onCancel = () => {
    goto('features');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      FeatureServices.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('features');
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
              id="Id"
              label="Feature Id"
              variant="outlined"
              fullWidth
              error={errors.Id ? true : undefined}
              helperText={errors.Id?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Id')}
              disabled={isReadOnly}
            />
          </Grid>
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
          <Grid item sm={12}>
            <TextField
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

export default FeaturePage;
