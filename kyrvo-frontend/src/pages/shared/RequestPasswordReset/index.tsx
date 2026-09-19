import React, { useState } from 'react';
import {
  Link,
  TextField,
  Avatar,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import {LockReset as LockResetIcon} from '@mui/icons-material';
import { z } from 'zod';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'src/models';
import { UserServices } from 'src/services';

const LoginSchema: z.ZodType<User> = z.object({
  Email: z.string().email({ message: 'Please enter a valid email.' }),
});

const RequestPasswordResetPage: React.FC = () => {
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<User> = (formData: User) => {
    setLoading(true);
    UserServices.requestReset(formData)
      .then((data) => {
        if (data) {
          setSuccess(true);
        }
      })
      .catch((e) => {
        setServerError(e.error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockResetIcon />
      </Avatar>

      {!success && (
        <>
          {serverError && (
            <Alert severity="error" variant="filled">
              {serverError}
            </Alert>
          )}
          <Typography variant="body2" textAlign="left" sx={{ mt: 3, mb: 1 }}>
            Enter your email address below, and we'll send you a link to reset
            your password.
          </Typography>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={errors.Email ? true : undefined}
              helperText={errors.Email?.message}
              {...register('Email')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              disabled={loading}
            >
              {!loading ? 'Submit' : 'Loading...'}
            </Button>
          </form>
        </>
      )}
      {success && (
        <Typography component="p" sx={{ my: 4 }}>
          We've sent an email with password reset instructions to your inbox.
          <br />
          If you haven't received it, simply{' '}
          <Button
            onClick={() => setSuccess(false)}
            color="secondary"
            size="small"
          >
            click here
          </Button>{' '}
          to request a new one.
        </Typography>
      )}

      <Link to="/login" variant="body2" component={RouterLink} color="primary">
        Back to login
      </Link>
    </>
  );
};

export default RequestPasswordResetPage;
