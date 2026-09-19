import React, { useState } from 'react';
import { z } from 'zod';

import {
  Alert,
  Grid,
  LinearProgress,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ContactUsService } from 'src/services/contactusService';
import { ContactUs } from 'src/models/ContactUs';
import './ContactForm.css';

const ContactUsSchema: z.ZodType<ContactUs> = z.object({
  Name: z
    .string()
    .min(3, 'Name must be at least 3 characters long.')
    .nonempty(),
  Email: z.string().email('Email cannot be empty').nonempty(),
  Message: z
    .string()
    .min(10, 'Message must be at least 10 characters long.')
    .nonempty(),
});

const ContactUsPage: React.FC = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUs>({
    resolver: zodResolver(ContactUsSchema),
  });

  const onSubmit: SubmitHandler<ContactUs> = async (formData: ContactUs) => {
    try {
      setLoading(true);
      await ContactUsService.addNew(formData);
      alert('Message sent successfully!');
      reset();
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Typography variant="h6" component="h1" gutterBottom className="header">
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="Name"
            label="Name"
            variant="outlined"
            fullWidth
            error={!!errors.Name}
            helperText={errors.Name?.message}
            InputLabelProps={{ shrink: true }}
            {...register('Name')}
            className="text-field"
            margin="normal"
          />
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
          <TextField
            id="Message"
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            error={!!errors.Message}
            helperText={errors.Message?.message}
            InputLabelProps={{ shrink: true }}
            {...register('Message')}
            className="text-field"
            margin="normal"
          />
          <Grid container justifyContent="center" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className="button"
            >
              Send Message
            </Button>
          </Grid>
        </form>
        {loading && <LinearProgress />}
        {error && (
          <Alert variant="standard" severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default ContactUsPage;
