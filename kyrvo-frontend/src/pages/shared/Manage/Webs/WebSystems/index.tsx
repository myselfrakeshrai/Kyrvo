import React, { useState } from 'react';
import {
  Alert,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { FormActionsUpdate, ImageSelector } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { Web } from 'src/models';
import { WebServices } from 'src/services';
import { useAppStore } from 'src/stores';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';

const WebSchema: z.ZodType<Web> = z.object({
  SystemName: z.string().optional().or(z.undefined()),
  SystemPrimary: z.string().optional(),
  SystemSecondary: z.string().optional(),
  SystemTertiary: z.string().optional(),
  SystemImage: z.string().optional(),
});

const WebSystemPage: React.FC = () => {
  const { config } = useAppStore();
  const id = config.Id;
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  //React hook form related intiialization
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Web>({
    resolver: zodResolver(WebSchema),
    defaultValues: async () => (id ? WebServices.getConfig() : ({} as Web)),
  });

  const onSubmit: SubmitHandler<Web> = (formData: Web) => {
    if (id) {
      const confirm = window.confirm(
        `This will update Web "${defaultValues?.SystemName}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        WebServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            navigate('/manage/websystem');
          });
      }
    } else {
      setLoading(true);
      WebServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          navigate('/manage/websystem');
        });
    }
  };

  const onCancel = () => {
    navigate('/manage/websystem');
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
            {PAGE_ACTIONS.edit} Web System
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
          <Grid item sm={3}>
            <TextField
              id="SystemName"
              label="SystemName"
              variant="outlined"
              fullWidth
              error={errors.SystemName ? true : undefined}
              helperText={errors.SystemName?.message}
              InputLabelProps={{ shrink: true }}
              {...register('SystemName')}
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              id="SystemPrimary"
              label="SystemPrimary"
              variant="outlined"
              fullWidth
              error={errors.SystemPrimary ? true : undefined}
              helperText={errors.SystemPrimary?.message}
              InputLabelProps={{ shrink: true }}
              {...register('SystemPrimary')}
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              id="SystemSecondary"
              label="SystemSecondary"
              variant="outlined"
              fullWidth
              error={errors.SystemSecondary ? true : undefined}
              helperText={errors.SystemSecondary?.message}
              InputLabelProps={{ shrink: true }}
              {...register('SystemSecondary')}
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              id="SystemTertiary"
              label="SystemTertiary"
              variant="outlined"
              fullWidth
              error={errors.SystemTertiary ? true : undefined}
              helperText={errors.SystemTertiary?.message}
              InputLabelProps={{ shrink: true }}
              {...register('SystemTertiary')}
            />
          </Grid>

          <Grid item sm={12}>
            <ImageSelector
              label="Logo"
              singleSelect={true}
              initial={
                getValues('SystemImage')
                  ? getValues('SystemImage')?.split('|')
                  : defaultValues?.SystemImage?.split('|') || []
              }
              onSubmit={(ids: string[]) => {
                setValue('SystemImage', ids.join('|'), { shouldDirty: true });
              }}
            />
          </Grid>
          <Grid item sm={12}>
            <FormActionsUpdate
              pageAction={PAGE_ACTIONS.edit}
              isDirty={isDirty}
              submitText={id ? 'Update' : 'Create'}
              onCancel={onCancel}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default WebSystemPage;
