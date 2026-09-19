import { ArrowForward } from '@mui/icons-material';
import {
  Grid,
  Button,
  TextField,
  LinearProgress,
  Alert,
} from '@mui/material';
import React, { useState } from 'react';
import KyContentSection from '../KyContentSection';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { NewsLetterService } from 'src/services/newsletterService';
import { NewsLetters } from 'src/models/NewsLetter';
import { z } from 'zod';

const NewsLetterSchema: z.ZodType<NewsLetters> = z.object({
  Email: z.string().email('Email cannot be empty'),
});

const NewsLetter: React.FC = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsLetters>({
    resolver: zodResolver(NewsLetterSchema),
  });

  const onSubmit: SubmitHandler<NewsLetters> = async (
    formData: NewsLetters,
  ) => {
    try {
      setLoading(true);
      const dataWithSubscribed = { ...formData, Subscribed: 1 };
      await NewsLetterService.addNew(dataWithSubscribed);
      alert('Message sent successfully!');
      reset();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <KyContentSection maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={1}
          justifyContent={'space-between'}
          sx={{
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} sm={8}>
            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.Email}
              helperText={errors.Email?.message}
              InputLabelProps={{ shrink: true }}
              {...register('Email')}
              className="text-field"
              margin="normal"
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className="button"
            >
              Subscribe
              <ArrowForward />
            </Button>
          </Grid>
        </Grid>
      </form>
      {loading && <LinearProgress />}
      {error && (
        <Alert variant="standard" severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </KyContentSection>
  );
};

export default NewsLetter;
