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
import { ContactUs } from 'src/models/ContactUs';
import { ContactUsService } from 'src/services/contactusService';

const ContactUsSchema: z.ZodType<ContactUs> = z.object({
  Name: z.string().min(3, 'Name must be at least three characters long'),
  Email: z.string(),
  Message: z.string(),
});

const ContactUsPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
  } = useForm<ContactUs>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: async () =>
      id ? ContactUsService.get(id) : ({} as ContactUs),
  });

  const onSubmit: SubmitHandler<ContactUs> = (formData: ContactUs) => {
    if (id) {
      const confirm = window.confirm(
        `This will update blog entry in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        ContactUsService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('contactus');
          });
      }
    } else {
      setLoading(true);
      ContactUsService.addNew(formData)
        .then((res) => {
          goto('contactus');
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
    goto('contactus');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove blog post in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      ContactUsService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('contactus');
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
            {action} Contact Us
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
              id="Message"
              label="Message"
              variant="outlined"
              fullWidth
              error={errors.Message ? true : undefined}
              helperText={errors.Message?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Message')}
              disabled={isReadOnly}
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

export default ContactUsPage;
