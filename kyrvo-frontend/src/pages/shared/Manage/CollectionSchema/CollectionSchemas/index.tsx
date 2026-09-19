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
import { FormActions } from 'src/components';
('');
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { Collection } from 'src/models';
import { CollectionService } from 'src/services';
import JsonSchemaCreator from 'src/components/form/JsonSchemaCreator';

const CollectionSchema: z.ZodType<Collection> = z.object({
  Id: z.string(),
  Name: z.string().min(3, 'Name must be at least 3 characters long.'),
  Description: z.string().nullable().optional(),
  AddToMenu: z.number(),
  JsonSchema: z.string(),
  Data: z.string().nullable().optional(),
  UiSchema: z.string().nullable().optional(),
});

const CollectionPage: React.FC = () => {
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
    formState: { defaultValues = {} as Collection, errors, isDirty },
  } = useForm<Collection>({
    defaultValues: async () =>
      id
        ? CollectionService.get(id)
        : ({
            Name: '',
            Description: '',
            UiSchema: '{}',
            JsonSchema: '{}',
            Data: '[]',
          } as Collection),
    resolver: zodResolver(CollectionSchema),
  });
  const onSubmit: SubmitHandler<Collection> = (formData: Collection) => {
    if (id) {
      const confirm = window.confirm(
        `This will update vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        CollectionService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('collections');
          });
      }
    } else {
      setLoading(true);
      CollectionService.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('collections');
        });
    }
  };

  const onCancel = () => {
    goto('collections');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove collection "${defaultValues?.Name}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      CollectionService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('collections');
        });
    }
  };
  if (loading) {
    return <LinearProgress color="primary" />;
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
            {action} Collection
          </Typography>
        </Grid>
      </Grid>
      {error && (
        <Alert variant="standard" severity="error" sx={{ width: '80%', m: 1 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} marginTop={1}>
          <Grid item sm={8}>
            <TextField
              id="id"
              label="Collection Id"
              variant="outlined"
              fullWidth
              error={errors.Name ? true : undefined}
              helperText={errors.Name?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Id')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="Name"
              label="Collection Name"
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
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="addtomenu">Add to Menu</InputLabel>
              <Select
                labelId="addtomenu"
                label="Add to Menu"
                defaultValue={defaultValues?.AddToMenu || 0}
                error={errors.AddToMenu ? true : undefined}
                {...register('AddToMenu', { valueAsNumber: true })}
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Yes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <Typography variant="h6" gutterBottom>
              Setup Collection
            </Typography>
            <JsonSchemaCreator
              uiSchemaString={getValues('Data') || defaultValues.Data || '[]'}
              onChange={(
                jsonSchemaString: string,
                fields: string,
                uiSchema: string,
              ) => {
                setValue('JsonSchema', jsonSchemaString, {
                  shouldDirty: true,
                });
                setValue('Data', fields, { shouldDirty: true });
                setValue('UiSchema', uiSchema, { shouldDirty: true });
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

export default CollectionPage;
