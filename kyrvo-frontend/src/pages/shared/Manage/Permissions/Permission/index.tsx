import React, { useState } from 'react';
import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { FormActions } from 'src/components';
import { useParams } from 'react-router-dom';
import { Feature, Permission, Role } from 'src/models';
import { FeatureServices, PermissionServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { RoleServices } from 'src/services/roleServices';
import { useAppRoute } from 'src/hooks/useAppRoute';

const PermissionSchema: z.ZodType<Permission> = z.object({
  RoleId: z.string().min(1),
  FeatureId: z.string().min(1),
  PermissionLevel: z.number(),
});

const PermissionPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const roles = useQuery({
    queryKey: ['roles'],
    queryFn: () => RoleServices.getAll().then((res) => res),
  });

  const features = useQuery({
    queryKey: ['features'],
    queryFn: () => FeatureServices.getAll().then((res) => res),
  });
  //React hook form related intiialization
  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Permission>({
    defaultValues: async () =>
      id ? PermissionServices.get(id) : ({} as Permission),
    resolver: zodResolver(PermissionSchema),
  });
  const onSubmit: SubmitHandler<Permission> = (formData: Permission) => {
    if (id) {
      const confirm = window.confirm(
        `This will update permission in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        PermissionServices.edit(id, formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('permissions');
          });
      }
    } else {
      setLoading(true);
      PermissionServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto(`permissions`);
        });
    }
  };

  const onCancel = () => {
    goto('permissions');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove permission from production. Do you want to continue?`,
    );
    if (confirm && defaultValues?.Id) {
      setLoading(true);
      PermissionServices.delete(defaultValues.Id)
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('permissions');
        });
    }
  };
  if (roles.isLoading || features.isLoading || !defaultValues) {
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
            {action} Permission Type
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
          <Grid item xs={8}>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="feature">Role</InputLabel>
              <Select
                labelId="role"
                label="Role"
                error={errors.FeatureId ? true : undefined}
                defaultValue={defaultValues?.RoleId}
                {...register('RoleId')}
                fullWidth
              >
                {(roles.data as Role[])?.map((role) => (
                  <MenuItem key={role.Id} value={role.Id}>
                    {role.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="feature">Feature</InputLabel>
              <Select
                labelId="feature"
                label="Feature"
                error={errors.FeatureId ? true : undefined}
                defaultValue={defaultValues?.FeatureId}
                {...register('FeatureId')}
              >
                {(features.data as Feature[])?.map((feature) => (
                  <MenuItem key={feature.Id} value={feature.Id}>
                    {feature.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={8}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="permission">Permission</InputLabel>
              <Select
                labelId="permission"
                label="Permission"
                defaultValue={defaultValues?.PermissionLevel}
                error={errors.PermissionLevel ? true : undefined}
                {...register('PermissionLevel', { valueAsNumber: true })}
              >
                <MenuItem value={1}>Read</MenuItem>
                <MenuItem value={2}>Write</MenuItem>
                <MenuItem value={3}>Update</MenuItem>
                <MenuItem value={4}>Delete</MenuItem>
              </Select>
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

export default PermissionPage;
