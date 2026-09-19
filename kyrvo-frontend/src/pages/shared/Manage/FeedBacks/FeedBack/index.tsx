import React, { useState } from 'react';
import {
  Alert,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { FormActions, ImageSelector } from 'src/components';
import { useParams } from 'react-router-dom';
import { FeedBack } from 'src/models';
import { FeedBackServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';

const FeedBackSchema: z.ZodType<FeedBack> = z.object({
  FeedBackName: z.string().min(3, 'Name must be at least 3 characters long.'),
  FeedBackUsername: z.string().min(3, 'Name must be at least 3 characters long.'),
  FeedBackDesc: z.string().min(10, 'Description must be at least 10 characters long.'),
  FeedBackImage: z.string().min(1, 'Image url is required.'),
});

const FeedBackPage: React.FC = () => {
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
  } = useForm<FeedBack>({
    resolver: zodResolver(FeedBackSchema),
    defaultValues: async () => (id ? FeedBackServices.get(id) : ({} as FeedBack)),
  });

  const onSubmit: SubmitHandler<FeedBack> = (formData: FeedBack) => {
    if (id) {
      const confirm = window.confirm(
        `This will update FeedBack "${defaultValues?.FeedBackName}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        FeedBackServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('feedbacks');
          });
      }
    } else {
      setLoading(true);
      FeedBackServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('feedbacks');
        });
    }
  };

  const onCancel = () => {
    goto('feedbacks');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove feedBackFeedBack "${defaultValues?.FeedBackName}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      FeedBackServices.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('feedbacks');
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
            {action} FeedBack
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
              id="FeedBackName"
              label="Feed Back Name"
              variant="outlined"
              fullWidth
              error={errors.FeedBackName ? true : undefined}
              helperText={errors.FeedBackName?.message}
              InputLabelProps={{ shrink: true }}
              {...register('FeedBackName')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="FeedBackUsername"
              label="Feed Back Username"
              variant="outlined"
              fullWidth
              error={errors.FeedBackUsername ? true : undefined}
              helperText={errors.FeedBackUsername?.message}
              InputLabelProps={{ shrink: true }}
              {...register('FeedBackUsername')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="FeedBackDesc"
              label="FeedBackDesc"
              variant="outlined"
              fullWidth
              error={errors.FeedBackDesc ? true : undefined}
              helperText={errors.FeedBackDesc?.message}
              InputLabelProps={{ shrink: true }}
              {...register('FeedBackDesc')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={12}>
            <ImageSelector
              initial={getValues('FeedBackImage')
                ? getValues('FeedBackImage')?.split('|')
                : defaultValues?.FeedBackImage?.split('|') || []}
              onSubmit={(ids: string[]) => {
                setValue('FeedBackImage', ids.join('|'), { shouldDirty: true });
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

export default FeedBackPage;
