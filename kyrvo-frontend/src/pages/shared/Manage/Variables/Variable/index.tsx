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
import { useParams, useSearchParams } from 'react-router-dom';
import { Variable } from 'src/models';
import { VariableService } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS, VARIBLETYPE } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import VariableValuePicker from './VariableValuePicker';

const VariableSchema: z.ZodType<Variable> = z.object({
  Id: z.string().min(3, 'Variable Id must be at least 3 characters long.'),
  Name: z.string().min(3, 'Name must be at least 3 characters long.'),
  Description: z
    .string()
    .min(3, 'Description must be at least 10 characters long.'),
  Type: z.string().min(1, 'Description must be at least 10 characters long.'),
  VarGroup: z.string().min(1, 'Variable must belong to a group'),
  Value: z.string().min(1, 'Description must be at least 10 characters long.'),
});

const VariablePage: React.FC = () => {
  const { action, id } = useParams();
  const [searchParams] = useSearchParams();
  const group = searchParams.get('group') || undefined;
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;
  const actionParam = group ? `group=${group}` : '';
  const {
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Variable>({
    defaultValues: async () =>
      id ? VariableService.get(id) : ({} as Variable),
    resolver: zodResolver(VariableSchema),
  });

  const onSubmit: SubmitHandler<Variable> = (formData: Variable) => {
    if (id) {
      const confirm = window.confirm(
        `This will update vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        VariableService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('Variables', actionParam);
          });
      }
    } else {
      setLoading(true);
      VariableService.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('Variables', actionParam);
        });
    }
  };

  const onCancel = () => {
    goto('Variables', actionParam);
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove vehicle type "${defaultValues?.Name}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      VariableService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('Variables', actionParam);
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
            {action} VARIABLES
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
              label="Variable Id"
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
          <Grid item sm={12}>
            <TextField
              label="Group"
              variant="outlined"
              fullWidth
              error={errors.VarGroup ? true : undefined}
              helperText={errors.VarGroup?.message}
              InputLabelProps={{ shrink: true }}
              {...register('VarGroup')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={12}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="datatype">Data Type</InputLabel>
              <Select
                labelId="datatype"
                label="Data Type"
                defaultValue={defaultValues?.Type || ''}
                value={getValues('Type') || ''}
                error={errors.Type ? true : undefined}
                onChange={(e) =>
                  setValue('Type', e.target.value, { shouldDirty: true })
                }
              >
                <MenuItem value={VARIBLETYPE.TEXT}>Text</MenuItem>
                <MenuItem value={VARIBLETYPE.JSON}>Json</MenuItem>
                <MenuItem value={VARIBLETYPE.NUMBER}>Number</MenuItem>
                <MenuItem value={VARIBLETYPE.IMAGE}>Image</MenuItem>
                <MenuItem value={VARIBLETYPE.COLOR}>Color</MenuItem>
                <MenuItem value={VARIBLETYPE.DATE}>Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={12}>
            <VariableValuePicker
              label="Value"
              defaultValue={getValues('Value')}
              error={errors.Value ? true : undefined}
              helperText={errors.Value?.message}
              value={watch('Value')}
              onChange={(val: any) =>
                setValue('Value', val, { shouldDirty: true })
              }
              type={watch('Type')}
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

export default VariablePage;
