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
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserServices } from 'src/services';
import { User } from 'src/models';

interface ResetPasswordInterface {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordSchema: z.ZodType<ResetPasswordInterface> = z
  .object({
    newPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters long.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters long.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })
  .superRefine(({ newPassword }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0;
    for (let i = 0; i < newPassword.length; i++) {
      const ch = newPassword.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
    }
    if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfNumbers < 1) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['newPassword'],
        message:
          'Your password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }
  });

const PasswordResetPage: React.FC = () => {
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInterface>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordInterface> = (
    formData: ResetPasswordInterface,
  ) => {
    setLoading(true);
    const user = {
      Pwd: formData.newPassword,
      VerificationToken: token,
    } as User;
    UserServices.resetPassword(user)
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
      <Typography component="h1" variant="h5" sx={{ mt: 1, mb: 1 }}>
        Reset Password
      </Typography>
      {serverError && <Alert severity="error">{serverError}</Alert>}
      {!success && (
        <>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="New Password"
              type="password"
              error={errors.newPassword ? true : undefined}
              helperText={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              error={errors.confirmPassword ? true : undefined}
              helperText={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              disabled={loading}
            >
              Submit
            </Button>
          </form>
        </>
      )}
      {success && (
        <Typography component="p" sx={{ my: 4 }}>
          Password Updated Successfully. Please LogIn to Continue.
        </Typography>
      )}
      <Link to="/login" variant="body2" component={RouterLink}>
        Login
      </Link>
    </>
  );
};

export default PasswordResetPage;
