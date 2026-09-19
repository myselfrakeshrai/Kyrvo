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
import { Agent } from 'src/models';
import { AgencyServices, AgentServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';

const AgentSchema: z.ZodType<Agent> = z.object({
  FirstName: z.string().min(3, 'Enter a valid agent name.'),
  LastName: z.string().min(3, 'Enter a valid agent name.'),
  Email: z.string().min(3, 'Enter a valid Email.'),
  AgencyId: z.string().min(1, 'Enter a valid agency Id'),
  Address1: z.string().min(1, 'Address 1 is required.'),
  Address2: z.string().optional(),
  City: z.string().min(1, 'City is required'),
  State: z.string().min(1, 'State is required'),
  PostalCode: z.string().min(1, 'Postal Code is required'),
  Phone: z.string().min(1, 'Phone number is required'),
  IsActive: z.number().optional(),
  Remarks: z.string().optional(),
  Meta: z.string().optional(),
});

const AgentPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  //React hook form related intiialization
  const agency = useQuery({
    queryKey: ['Agency'],
    queryFn: () => AgencyServices.getAll().then((res) => res),
  });

  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
  } = useForm<Agent>({
    resolver: zodResolver(AgentSchema),
    defaultValues: async () => (id ? AgentServices.get(id) : ({} as Agent)),
  });

  const onSubmit: SubmitHandler<Agent> = (formData: Agent) => {
    if (id) {
      const confirm = window.confirm(
        `This will update Agent "${defaultValues?.FirstName}" in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        AgentServices.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('agents');
          });
      }
    } else {
      setLoading(true);
      AgentServices.addNew(formData)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
          goto('agents');
        });
    }
  };

  const onCancel = () => {
    goto('agents');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove agent "${defaultValues?.FirstName}" in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      AgentServices.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('agents');
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
            {action} Agent
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
          <Grid item sm={5}>
            <TextField
              id="FirstName"
              label="First Name"
              variant="outlined"
              fullWidth
              error={errors.FirstName ? true : undefined}
              helperText={errors.FirstName?.message}
              InputLabelProps={{ shrink: true }}
              {...register('FirstName')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="LastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              error={errors.LastName ? true : undefined}
              helperText={errors.LastName?.message}
              InputLabelProps={{ shrink: true }}
              {...register('LastName')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={10}>
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
          <Grid item sm={6}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="agencyId">Agency Id</InputLabel>
              <Select
                labelId="agencyId"
                label="AgencyId"
                defaultValue={defaultValues?.AgencyId}
                error={errors.AgencyId ? true : undefined}
                {...register('AgencyId')}
              >
                {agency.data?.map((Agency) => (
                  <MenuItem key={Agency.Id} value={Agency.Id}>
                    {Agency.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="Address1"
              label="Address1"
              variant="outlined"
              fullWidth
              error={errors.Address1 ? true : undefined}
              helperText={errors.Address1?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Address1')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              id="Address2"
              label="Address2"
              variant="outlined"
              fullWidth
              error={errors.Address2 ? true : undefined}
              helperText={errors.Address2?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Address2')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              id="City"
              label="City"
              variant="outlined"
              fullWidth
              error={errors.City ? true : undefined}
              helperText={errors.City?.message}
              InputLabelProps={{ shrink: true }}
              {...register('City')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              id="State"
              label="State"
              variant="outlined"
              fullWidth
              error={errors.State ? true : undefined}
              helperText={errors.State?.message}
              InputLabelProps={{ shrink: true }}
              {...register('State')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              id="PostalCode"
              label="Postal Code"
              variant="outlined"
              fullWidth
              error={errors.PostalCode ? true : undefined}
              helperText={errors.PostalCode?.message}
              InputLabelProps={{ shrink: true }}
              {...register('PostalCode')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="Phone"
              label="Phone"
              variant="outlined"
              fullWidth
              error={errors.Phone ? true : undefined}
              helperText={errors.Phone?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Phone')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="Remarks"
              label="Remarks"
              variant="outlined"
              fullWidth
              error={errors.Remarks ? true : undefined}
              helperText={errors.Remarks?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Remarks')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="Meta"
              label="Meta"
              variant="outlined"
              fullWidth
              error={errors.Meta ? true : undefined}
              helperText={errors.Meta?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Meta')}
              disabled={isReadOnly}
            />
          </Grid>
          <Grid item sm={6}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="status">Active</InputLabel>
              <Select
                labelId="status"
                label="Status"
                defaultValue={defaultValues?.IsActive}
                error={errors.IsActive ? true : undefined}
                {...register('IsActive')}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={2}>Inactive</MenuItem>
              </Select>
            </FormControl>
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

export default AgentPage;
