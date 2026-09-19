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
import { FormActions, HtmlEditor, ImageSelector } from 'src/components';
import { useParams } from 'react-router-dom';
import { MenuItemService } from 'src/services/menuItemService';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { MenuItems } from 'src/models/MenuItems';
import { useQuery } from '@tanstack/react-query';
import { EventCategoryService } from 'src/services/eventcategoryService';
import { EventCategory } from 'src/models/EventCategory';

const MenuItemSchema: z.ZodType<MenuItems> = z.object({
  Id: z.string().optional(),
  Name: z.string().min(3, 'Title must be at least three characters long'),
  Description: z.string().nullable().optional(),
  Price: z.number(),
  Category: z.string(),
  MealType: z.string(),
  PrepTime: z.number().optional(),
  Active: z.number(),
  Images: z.string().nullable().optional(),
});

const MenuItemPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const categories = useQuery({
    queryKey: ['category'],
    queryFn: () => EventCategoryService.getAll().then((res) => res),
  });
  const isReadOnly = action === PAGE_ACTIONS.view;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { defaultValues, errors, isDirty },
  } = useForm<MenuItems>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: async () =>
      id ? MenuItemService.get(id) : ({} as MenuItems),
  });

  const onSubmit: SubmitHandler<MenuItems> = (formData: MenuItems) => {
    if (id) {
      const confirm = window.confirm(
        `This will update Menu in production. Do you want to continue?`,
      );
      if (confirm) {
        setLoading(true);
        MenuItemService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('menu');
          });
      }
    } else {
      setLoading(true);
      //formData.AuthorId = user?.Id;
      MenuItemService.addNew(formData)
        .then((res) => {
          goto('menu');
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
    goto('menu');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove Menu in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);

      MenuItemService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })

        .finally(() => {
          setLoading(false);
          goto('menu');
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
            {action} Menu Item
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
              label="Item Name"
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
            <HtmlEditor
              label="Description"
              initialValue={defaultValues?.Description || ''}
              onChange={(val: string) =>
                setValue('Description', val, { shouldDirty: true })
              }
              error={errors?.Description ? true : undefined}
              helperText={errors?.Description?.message}
              // {...register('Body')}
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

          {/* <Grid item sm={8}>
            <TextField
              id="Category"
              label="Category"
              variant="outlined"
              fullWidth
              error={errors.Category ? true : undefined}
              helperText={errors.Category?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Category')}
              disabled={isReadOnly}
            />
          </Grid> */}
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                label="Category"
                error={errors.Category ? true : undefined}
                defaultValue={defaultValues?.Category}
                {...register('Category')}
                fullWidth
              >
                {(categories.data as EventCategory[])?.map((category) => (
                  <MenuItem key={category.Id} value={category.Id}>
                    {category.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={8}>
            <TextField
              id="MealType"
              label="Meal Type"
              variant="outlined"
              fullWidth
              error={errors.MealType ? true : undefined}
              helperText={errors.MealType?.message}
              InputLabelProps={{ shrink: true }}
              {...register('MealType')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="PrepTime"
              label="Prep Time"
              variant="outlined"
              fullWidth
              error={errors.PrepTime ? true : undefined}
              helperText={errors.PrepTime?.message}
              InputLabelProps={{ shrink: true }}
              {...register('PrepTime', { valueAsNumber: true })}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="Active">Active</InputLabel>
              <Select
                labelId="Active"
                label="Active"
                defaultValue={defaultValues?.Active || 0}
                error={errors.Active ? true : undefined}
                {...register('Active', { valueAsNumber: true })}
              >
                <MenuItem value={0}>Inactive</MenuItem>
                <MenuItem value={1}>Active</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={12}>
            <ImageSelector
              label="Image"
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

export default MenuItemPage;
