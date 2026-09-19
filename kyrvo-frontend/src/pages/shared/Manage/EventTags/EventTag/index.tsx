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
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { EventTag } from 'src/models/EventTag';
import { EventTagService } from 'src/services/eventtagService';

const BlogTagSchema: z.ZodType<EventTag> = z.object({
  Name: z.string().min(3, 'Name must be at least three characters long'),
});

const EventTagPage: React.FC = () => {
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
  } = useForm<EventTag>({
    resolver: zodResolver(BlogTagSchema),
    defaultValues: async () =>
      id ? EventTagService.get(id) : ({} as EventTag),
  });

  const onSubmit: SubmitHandler<EventTag> = (formData: EventTag) => {
    if (id) {
      const confirm = window.confirm(
        `This will update blog entry in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        EventTagService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('eventtag');
          });
      }
    } else {
      setLoading(true);
      EventTagService.addNew(formData)
        .then((res) => {
          goto('eventtag');
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onCancel = () => {
    goto('eventtag');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove blog post in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      EventTagService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('eventtag');
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
            {action} Event Tag
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
              label="Tag"
              variant="outlined"
              fullWidth
              error={errors.Name ? true : undefined}
              helperText={errors.Name?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Name')}
              disabled={isReadOnly}
            />
          </Grid>
          {/* 
          <Grid item sm={12}>
            <ImageSelector
              initial={
                getValues('FeedBackImage')
                  ? getValues('FeedBackImage')?.split('|')
                  : defaultValues?.FeedBackImage?.split('|') || []
              }
              onSubmit={(ids: string[]) => {
                setValue('FeedBackImage', ids.join('|'), { shouldDirty: true });
              }}
              label={''}
            />
          </Grid> */}
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

export default EventTagPage;
