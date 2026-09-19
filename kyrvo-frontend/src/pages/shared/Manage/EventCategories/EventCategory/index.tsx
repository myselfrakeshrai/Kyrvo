import React, { useState } from 'react';
import {
  Alert,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { FormActions, ImageSelector } from 'src/components';
('');
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { EventCategoryService } from 'src/services/eventcategoryService';
import { EventCategory } from 'src/models/EventCategory';

const EventCategorySchema: z.ZodType<EventCategory> = z.object({
  Name: z.string().min(3, 'Name must be at least 3 characters long.'),
  Images: z.string().nullable().optional(),
  Description: z.string().nullable().optional(),
  DisplayOrder: z.number().optional(),
});

const EventCategoryPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  //React hook form related intiialization
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { defaultValues = {} as EventCategory, errors, isDirty },
  } = useForm<EventCategory>({
    defaultValues: async () =>
      id
        ? EventCategoryService.get(id)
        : ({ Name: '', Desc: '' } as EventCategory),
    resolver: zodResolver(EventCategorySchema),
  });

  const onSubmit: SubmitHandler<EventCategory> = (formData: EventCategory) => {
    if (id) {
      const confirm = window.confirm(
        `This will update vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        EventCategoryService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('eventcategory');
          });
      }
    } else {
      setLoading(true);
      EventCategoryService.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('eventcategory');
        });
    }
  };

  const onCancel = () => {
    goto('eventcategory');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      EventCategoryService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('eventcategory');
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
            {action} Event Category
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
              label="Category"
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
              id="Description"
              label="Description"
              variant="outlined"
              fullWidth
              error={errors.Description ? true : undefined}
              helperText={errors.Description?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Description')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="DisplayOrder"
              label="Display Order"
              variant="outlined"
              fullWidth
              type="number"
              error={errors.DisplayOrder ? true : undefined}
              helperText={errors.DisplayOrder?.message}
              InputLabelProps={{ shrink: true }}
              {...register('DisplayOrder', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={12}>
            <ImageSelector
              label="Featured Image"
              initial={
                (getValues('Images')
                  ? getValues('Images')?.split('|')
                  : defaultValues.Images?.split('|')) || []
              }
              onSubmit={(ids: string[]) => {
                setValue('Images', ids.join('|'), {
                  shouldDirty: true,
                });
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

export default EventCategoryPage;
