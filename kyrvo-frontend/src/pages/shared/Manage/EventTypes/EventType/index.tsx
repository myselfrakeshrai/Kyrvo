import React, { useState } from 'react';
import {
  Alert,
  FormControl,
  FormHelperText,
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
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { EventTypeService } from 'src/services/eventtypeService';
import { EventTicketTypes } from 'src/models/EventType';

const EventTicketTypesSchema: z.ZodType<EventTicketTypes> = z.object({
  Id: z.string().optional(),
  Title: z.string(),
  Description: z.string().optional(),
  Price: z.number(),
  IsActive: z.number(),
  MaxQuantity: z.number().optional(),
  AllowMultiple: z.number(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

const EventTypePage: React.FC = () => {
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
  } = useForm<EventTicketTypes>({
    defaultValues: async () =>
      id ? EventTypeService.get(id) : ({} as EventTicketTypes),
    resolver: zodResolver(EventTicketTypesSchema),
  });

  const onSubmit: SubmitHandler<EventTicketTypes> = (
    formData: EventTicketTypes,
  ) => {
    if (id) {
      setLoading(true);
      EventTypeService.edit(id || '0', formData)
        .then((res: any) => {
          return res;
        })
        .catch((e: any) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('eventtype');
        });
    } else {
      setLoading(true);
      EventTypeService.addNew(formData)
        .then((res: any) => {
          return res;
        })
        .catch((e: any) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('eventtype');
        });
    }
  };

  const onCancel = () => {
    goto('eventtype');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove event type "${defaultValues?.Title}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      EventTypeService.delete(id || '0')
        .catch((e: any) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('eventtype');
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
            {action} Event Types
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
              id="Title"
              label="Title"
              variant="outlined"
              fullWidth
              error={errors.Title ? true : undefined}
              helperText={errors.Title?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Title')}
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
              id="Price"
              label="Price"
              variant="outlined"
              fullWidth
              error={errors.Price ? true : undefined}
              helperText={errors.Price?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Price', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="MaxQuantity"
              label="MaxQuantity"
              variant="outlined"
              fullWidth
              error={errors.MaxQuantity ? true : undefined}
              helperText={errors.MaxQuantity?.message}
              InputLabelProps={{ shrink: true }}
              {...register('MaxQuantity', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="IsActice">IsActice</InputLabel>
              <Select
                labelId="IsActice"
                label="IsActice"
                defaultValue={defaultValues?.IsActive || 1}
                error={errors.IsActive ? true : undefined}
                {...register('IsActive', { valueAsNumber: true })}
              >
                <MenuItem value={1}>Yes</MenuItem>

                <MenuItem value={0}>No</MenuItem>
              </Select>
              {errors.IsActive && (
                <FormHelperText error>{errors.IsActive.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="allowMultiple">Allow Multiple</InputLabel>
              <Select
                labelId="AllowMultiple"
                label="AllowMultiple"
                defaultValue={defaultValues?.AllowMultiple || 1}
                error={errors.AllowMultiple ? true : undefined}
                {...register('AllowMultiple', { valueAsNumber: true })}
              >
                <MenuItem value={1}>Yes</MenuItem>

                <MenuItem value={0}>No</MenuItem>
              </Select>
              {errors.AllowMultiple && (
                <FormHelperText error>
                  {errors.AllowMultiple.message}
                </FormHelperText>
              )}
            </FormControl>
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

export default EventTypePage;
