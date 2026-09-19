import React, { useState } from 'react';
import {
  Link,
  TextField,
  Avatar,
  Typography,
  Button,
  Alert,
  AlertColor,
} from '@mui/material';
import {LockReset as LockResetIcon} from '@mui/icons-material';
import { z } from 'zod';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserServices } from 'src/services';
import { User } from 'src/models';

const LoginSchema: z.ZodType<User> = z
  .object({
    Email: z.string().email({ message: 'Please enter a valid email.' }),
    Pwd: z
      .string()
      .min(7, { message: 'Password must be at least 7 character long.' }),
    Confirm: z
      .string()
      .min(7, { message: 'Password must be at least 7 character long.' }),
  })
  .refine((data) => data.Pwd == data.Confirm, {
    message: "Passwords don't match",
    path: ['Confirm'],
  })
  .superRefine(({ Pwd }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0;
    for (let i = 0; i < Pwd.length; i++) {
      const ch = Pwd.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
    }
    if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfNumbers < 1) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['Pwd'],
        message:
          'Your password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }
  });
const SignupPage: React.FC = () => {
  const [serverMessage, setServerMessage] = useState<{
    Message: string;
    Severity: AlertColor;
  }>();
  const [success, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(LoginSchema),
  });

  //const navigate = useNavigate();
  const onSubmit: SubmitHandler<User> = (formData: User) => {
    //navigate('/dashboard');
    setSuccess(false);
    delete formData['Confirm'];
    UserServices.signup(formData)
      .then((res) => {
        if (res?.Email) setSuccess(true);
      })
      .catch((e) => {
        setServerMessage({
          Message: `${e.error}`,
          Severity: 'error',
        });
      });
  };
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockResetIcon />
      </Avatar>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {serverMessage && serverMessage.Message && (
          <Alert severity={serverMessage.Severity}>
            {serverMessage.Message}
          </Alert>
        )}
        {!success && (
          <>
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              error={errors.Pwd ? true : undefined}
              helperText={errors.Pwd?.message}
              {...register('Pwd')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              error={errors.Confirm ? true : undefined}
              helperText={errors.Confirm?.message}
              {...register('Confirm')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
            >
              Submit
            </Button>
          </>
        )}
        {success && (
          <>
            <Typography sx={{ my: 2 }}>
              We have sent verification email to your email account. Please
              check your email and verify your account.
            </Typography>
          </>
        )}
        <Link
          to="/login"
          variant="body2"
          component={RouterLink}
          color="primary"
        >
          Back to login
        </Link>
      </form>
    </>
  );
};

export default SignupPage;
