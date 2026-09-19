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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ChipInput,
  FormActions,
  HtmlEditor,
  ImageSelector,
  LocationPicker,
} from 'src/components';
import { useParams } from 'react-router-dom';
import { EventService } from 'src/services/eventService';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { Event } from 'src/models/Event';
import { useQuery } from '@tanstack/react-query';
import { EventTagService } from 'src/services/eventtagService';
import { EventCategoryService } from 'src/services/eventcategoryService';
import { useAppStore } from 'src/stores';
import { EventTypeService } from 'src/services/eventtypeService';
import { UserServices } from 'src/services';
import { User } from 'src/models';

const EventSchema: z.ZodType<Event> = z.object({
  Title: z.string().min(3, 'Title must be at least three characters long'),
  Body: z.string().min(10, 'Body must be at least 10 characters long'),
  EventTicketTypeId: z.string().min(10, 'Invalid Event Type'),
  Category: z.string().nullable().optional(),
  Tags: z.string().nullable().optional(),
  UserId: z.string().optional(),
  OrganizerId: z.string().optional(),
  Venue: z.string().optional(),
  FeaturedImage: z.string().nullable().optional(),
  ScheduledDate: z.string().optional(),
  ScheduledTime: z.string().optional(),
  EndDate: z.string().optional(),
  EndTime: z.string().optional(),
  Published: z.number(),
  IsFeatured: z.number(),
  OrganizerNumber: z.number().optional(),
  OrganizerEmail: z.string().optional(),
  EventWebsite: z.string().optional(),
});

const EventPage: React.FC = () => {
  const { action, id } = useParams();
  const theme = useTheme();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isReadOnly = action === PAGE_ACTIONS.view;
  const { user } = useAppStore();
  const tags = useQuery({
    queryKey: ['eventtag'],
    queryFn: () =>
      EventTagService.getAll().then((res) => res.map((x) => x.Name)),
  });
  const categories = useQuery({
    queryKey: ['eventcategory'],
    queryFn: () =>
      EventCategoryService.getAll().then((res) => res.map((x) => x.Name)),
  });
  const eventTypes = useQuery({
    queryKey: ['event'],
    queryFn: () => EventTypeService.getAll().then((res) => res),
  });
  const { isLoading: usersLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      UserServices.getAll().then((res) => {
        return res;
      }),
  });

  //React hook form related intiialization
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Event>({
    resolver: zodResolver(EventSchema),
    defaultValues: async () => (id ? EventService.get(id) : ({} as Event)),
  });
  if (usersLoading) {
    return;
  }

  const onSubmit: SubmitHandler<Event> = (formData: Event) => {
    if (id) {
      const confirm = window.confirm(
        `This will update blog entry in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        formData.UserId = user?.Id;
        EventService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('event');
          });
      }
    } else {
      setLoading(true);
      formData.UserId = user?.Id;
      EventService.addNew(formData)
        .then((res) => {
          goto('event');
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
  const selectedEventTypes = watch('EventTicketTypeId')?.split('|') || [];
  const selectedTitles = selectedEventTypes.map((id) => {
    const eventType = eventTypes.data?.find((eventType) => eventType.Id === id);
    return eventType ? eventType.Title : '';
  });
  const onCancel = () => {
    goto('event');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove blog post in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      EventService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('event');
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
            {action} Event
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
              id="Title"
              label="Event Title"
              variant="outlined"
              fullWidth
              error={errors.Title ? true : undefined}
              helperText={errors.Title?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Title')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8} sx={{ padding: 5 }}>
            <LocationPicker
              label="Pickup Location"
              defaultValue={getValues('Venue') || ''}
              onSelect={(val: string) => setValue('Venue', val)}
              error={errors.Venue ? true : false}
              message={errors.Venue?.message}
              showLabel={true}
              sx={{
                height: '10px',
                padding: 0,
                width: '40%',
                m: isMobile ? '0' : 0,

                background: theme.palette.tertiary?.main,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Ensure the input outline is removed
                },
              }}
            />
          </Grid>
          <Grid item sm={8}>
            <ChipInput
              options={
                eventTypes.data
                  ? eventTypes.data.map((eventType) => eventType.Title)
                  : []
              }
              label="Ticket Type"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={errors.EventTicketTypeId ? true : undefined}
              helperText={errors.EventTicketTypeId?.message}
              value={selectedTitles}
              onUpdate={(vals: string[]) =>
                setValue(
                  'EventTicketTypeId',
                  vals
                    .map((title) => {
                      const eventType = eventTypes.data?.find(
                        (eventType) => eventType.Title === title,
                      );
                      return eventType ? eventType.Id : '';
                    })
                    .join('|') || '',
                  {
                    shouldDirty: true,
                  },
                )
              }
            />
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <TextField
                id="ScheduledDate"
                type="date"
                label="Scheduled Date"
                variant="outlined"
                fullWidth
                error={errors.ScheduledDate ? true : undefined}
                helperText={errors.ScheduledDate?.message}
                InputLabelProps={{ shrink: true }}
                {...register('ScheduledDate')}
                disabled={isReadOnly}
              />
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 165 }}>
              <TextField
                id="ScheduledTime"
                label="Scheduled Time"
                variant="outlined"
                fullWidth
                type="time"
                error={errors.ScheduledTime ? true : undefined}
                helperText={errors.ScheduledTime?.message}
                InputLabelProps={{ shrink: true }}
                {...register('ScheduledTime')}
                disabled={isReadOnly}
              />
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <TextField
                id="EndDate"
                type="date"
                label="End Date"
                variant="outlined"
                fullWidth
                error={errors.EndDate ? true : undefined}
                helperText={errors.EndDate?.message}
                InputLabelProps={{ shrink: true }}
                {...register('EndDate')}
                disabled={isReadOnly}
              />
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 165 }}>
              <TextField
                id="EndTime"
                label="End Time"
                variant="outlined"
                fullWidth
                type="time"
                error={errors.EndTime ? true : undefined}
                helperText={errors.EndTime?.message}
                InputLabelProps={{ shrink: true }}
                {...register('EndTime')}
                disabled={isReadOnly}
              />
            </FormControl>
          </Grid>

          <Grid item sm={8}>
            <HtmlEditor
              label="Event Description"
              initialValue={defaultValues?.Body}
              onEditorUpdate={(val: string) =>
                setValue('Body', val, { shouldDirty: true })
              }
              error={errors?.Body ? true : undefined}
              helperText={errors?.Body?.message}
              // {...register('Body')}
            />
          </Grid>
          <Grid item sm={8}>
            <ChipInput
              options={categories.data}
              label="Event Categories"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={errors.Category ? true : undefined}
              helperText={errors.Category?.message}
              value={watch('Category')?.split('|') || undefined}
              onUpdate={(vals: string[]) =>
                setValue('Category', vals?.join('|') || undefined, {
                  shouldDirty: true,
                })
              }
            />
          </Grid>
          <Grid item sm={8}>
            <ChipInput
              options={tags.data}
              label="Event Tags"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={errors.Tags ? true : undefined}
              helperText={errors.Tags?.message}
              value={watch('Tags')?.split('|') || undefined}
              onUpdate={(vals: string[]) =>
                setValue('Tags', vals?.join('|') || undefined, {
                  shouldDirty: true,
                })
              }
            />
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="published">Published</InputLabel>
              <Select
                labelId="published"
                label="published"
                defaultValue={defaultValues?.Published || 0}
                error={errors.Published ? true : undefined}
                {...register('Published', { valueAsNumber: true })}
              >
                <MenuItem value={0}>Draft</MenuItem>
                <MenuItem value={1}>Published</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="featured">Featured</InputLabel>
              <Select
                labelId="featured"
                label="featured"
                defaultValue={defaultValues?.IsFeatured || 0}
                error={errors.IsFeatured ? true : undefined}
                {...register('IsFeatured', { valueAsNumber: true })}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormControl fullWidth>
              <InputLabel id="OrganizerId">Organizer</InputLabel>
              <Select
                labelId="OrganizerId"
                label="OrganizerId"
                error={errors.OrganizerId ? true : undefined}
                defaultValue={defaultValues?.OrganizerId || ''}
                {...register('OrganizerId')}
              >
                {users?.map((user: User) => (
                  <MenuItem key={user.Id} value={user.Id}>
                    {`${user.FirstName} ${user.LastName}`}
                  </MenuItem>
                ))}
              </Select>
              {errors.OrganizerId && (
                <FormHelperText error>
                  {errors.OrganizerId.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="OrganizerNumber"
              label="Organizer Number"
              variant="outlined"
              fullWidth
              error={errors.OrganizerNumber ? true : undefined}
              helperText={errors.OrganizerNumber?.message}
              InputLabelProps={{ shrink: true }}
              {...register('OrganizerNumber', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="OrganizerEmail"
              label="Organizer Email"
              variant="outlined"
              fullWidth
              error={errors.OrganizerEmail ? true : undefined}
              helperText={errors.OrganizerEmail?.message}
              InputLabelProps={{ shrink: true }}
              {...register('OrganizerEmail')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="EventWebsite"
              label="Event Website"
              variant="outlined"
              fullWidth
              error={errors.EventWebsite ? true : undefined}
              helperText={errors.EventWebsite?.message}
              InputLabelProps={{ shrink: true }}
              {...register('EventWebsite')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={12}>
            <ImageSelector
              label="Featured Image"
              initial={
                (getValues('FeaturedImage')
                  ? getValues('FeaturedImage')?.split('|')
                  : defaultValues.FeaturedImage?.split('|')) || []
              }
              onSubmit={(ids: string[]) => {
                setValue('FeaturedImage', ids.join('|'), {
                  shouldDirty: true,
                });
              }}
            />
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

export default EventPage;
