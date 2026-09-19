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
import { useParams } from 'react-router-dom';
import { Role, User } from 'src/models';
import { RoleServices, UserServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';

const UserSchema: z.ZodType<User> = z.object({
  Email: z.string().email({ message: 'Enter a valid email' }),
  PhoneNumber: z.string().min(10,{ message: 'Enter a valid Contact' }),
  RoleId: z.string().min(1, 'Role is required'),
  FirstName:z.string().min(1, 'FirstName is required'),
  LastName:z.string().min(1, 'Role is required')
});

const UserPage: React.FC = () => {
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
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: async () => (id ? UserServices.getUser(id) : ({} as User)),
  });

  const roles = useQuery({
    queryKey: ['roles'],
    queryFn: () => RoleServices.getAll().then((res) => res),
  });

  const onSubmit: SubmitHandler<User> = (formData: User) => {
    if (id) {
      const confirm = window.confirm(
        `This will update User "${defaultValues?.Email}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        UserServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('users');
          });
      }
    } else {
      setLoading(true);
      UserServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('users');
        });
    }
  };

  const onCancel = () => {
    goto('users');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove User "${defaultValues?.Email}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      UserServices.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('users');
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
            {action} User
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
              id="FirstName"
              label="FirstName"
              variant="outlined"
              fullWidth
              error={errors.FirstName ? true : undefined}
              helperText={errors.FirstName?.message}
              InputLabelProps={{ shrink: true }}
              {...register('FirstName')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="LastName"
              label="LastName"
              variant="outlined"
              fullWidth
              error={errors.LastName ? true : undefined}
              helperText={errors.LastName?.message}
              InputLabelProps={{ shrink: true }}
              {...register('LastName')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              fullWidth
              error={errors.Email ? true : undefined}
              helperText={errors.Email?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Email')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="PhoneNumber"
              label="PhoneNumber"
              variant="outlined"
              fullWidth
              error={errors.PhoneNumber ? true : undefined}
              helperText={errors.PhoneNumber?.message}
              InputLabelProps={{ shrink: true }}
              {...register('PhoneNumber')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="role">User Role</InputLabel>
              <Select
                labelId="role"
                label="User Role"
                error={errors.RoleId ? true : undefined}
                defaultValue={defaultValues?.RoleId}
                {...register('RoleId')}
              >
                {(roles.data as Role[])?.map((role) => (
                  <MenuItem key={role.Id} value={role.Id}>
                    {role.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Add other fields for editing */}

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

export default UserPage;
