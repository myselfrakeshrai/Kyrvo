import React, { useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { NewsLetters } from 'src/models/NewsLetter';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewsLetterService } from 'src/services/newsletterService';

const NewsLetterSchema: z.ZodType<NewsLetters> = z.object({
  Email: z.string().email('Email cannot be empty'),
});

const NewsletterForm: React.FC = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const {
    reset,
    handleSubmit,
    register,
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
  if (loading) {
    return <LinearProgress />;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        backgroundColor: '#fff',
        color: '#fff',
        padding: '20px',
        borderRadius: '10px',
        margin: '10px 20px',
        height: 'fit-content',
        boxShadow: '3px 3px 3px 3px rgba(0,0,0,0.3)',
        marginTop: { xs: '0px', md: '-115px' },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={2}
        sx={{
          color: 'primary.main',
          p: 2,
          borderRadius: '4px 0 0 4px',
          width: '100%',
        }}
      >
        <Typography variant="h6">Keep in touch</Typography>
        <Typography variant="body2">Sign up now for our newsletter.</Typography>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            error={!!errors.Email}
            helperText={errors.Email?.message}
            {...register('Email')}
            autoComplete="email"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            OK SIGN UP!
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default NewsletterForm;
