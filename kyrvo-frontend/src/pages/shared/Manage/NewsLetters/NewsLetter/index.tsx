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
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PAGE_ACTIONS } from 'src/constants/appConstants';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { NewsLetters } from 'src/models/NewsLetter';
import { NewsLetterService } from 'src/services/newsletterService';

const NewsLetterSchema: z.ZodType<NewsLetters> = z.object({
  Email: z.string(),
  Subscribed: z.number().optional(),
});

const NewsLetterPage: React.FC = () => {
  const { action, id } = useParams();
  const { goto } = useAppRoute();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const isReadOnly = action === PAGE_ACTIONS.view;

  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
  } = useForm<NewsLetters>({
    resolver: zodResolver(NewsLetterSchema),
    defaultValues: async () =>
      id ? NewsLetterService.get(id) : ({} as NewsLetters),
  });

  const onSubmit: SubmitHandler<NewsLetters> = (formData: NewsLetters) => {
    if (id) {
      const confirm = window.confirm(
        `This will update blog entry in production. Do you want to continue?`,
      );

      if (confirm) {
        setLoading(true);
        NewsLetterService.edit(id || '0', formData)
          .then((res) => {
            return res;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => {
            setLoading(false);
            goto('newsletter');
          });
      }
    } else {
      setLoading(true);
      NewsLetterService.addNew(formData)
        .then((res) => {
          goto('newsletter');
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
    goto('newsletter');
  };

  const onDelete = () => {
    const confirm = window.confirm(
      `This will remove blog post in production. Do you want to continue?`,
    );
    if (confirm) {
      setLoading(true);
      NewsLetterService.delete(id || '0')
        .catch((e) => {
          setError(e.error);
        })
        .finally(() => {
          setLoading(false);
          goto('newsletter');
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
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="Subscribed">Subscribed</InputLabel>
              <Select
                labelId="Subscribed"
                label="Subscribed"
                defaultValue={defaultValues?.Subscribed || 0}
                error={errors.Subscribed ? true : undefined}
                {...register('Subscribed', { valueAsNumber: true })}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
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

export default NewsLetterPage;
