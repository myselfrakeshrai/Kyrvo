import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { Reservation } from 'src/models';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MuiTelInput } from 'mui-tel-input';
import { ChevronRight } from '@mui/icons-material';
import { BookingInfo, LoginButton } from './Components';
import { useAppStore } from 'src/stores';

interface HireSearchFormProps {
  formData: Reservation;
  onPrevious?: () => void;
  onSubmit: (formData: Reservation) => void;
}

interface PersonalInformationFormData {
  Email: string;
  PhoneNumber: string;
  FirstName: string;
  LastName: string;
}

const PersonalInformationFormSchema: z.ZodType<PersonalInformationFormData> =
  z.object({
    Email: z.string().email('Provide a valid email.'),
    PhoneNumber: z.string().min(6, 'Provide a valid phone number'),
    FirstName: z.string().min(2, 'Provide a valid first name.'),
    LastName: z.string().min(2, 'Provide a valid last name.'),
  });

const PersonalInformationForm: React.FC<HireSearchFormProps> = ({
  formData,
  onSubmit,
}) => {
  const {user} = useAppStore();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInformationFormData>({
    resolver: zodResolver(PersonalInformationFormSchema),
    defaultValues: formData || ({} as Reservation),
  });

  const [phone, setPhone] = useState<string>(
    user && user.PhoneNumber ? user.PhoneNumber : (formData?.PhoneNumber as string)
  );

  const registerPhone = (val: string) => {
    setValue('PhoneNumber', val);
    setPhone(val);
  };

  const onNext: SubmitHandler<PersonalInformationFormData> = (
    formData: PersonalInformationFormData,
  ) => {
    onSubmit({ ...formData } as Reservation);
  };

  return (
    <Box sx={{ margin: 'auto', my: 5 }}>
      <form onSubmit={handleSubmit(onNext)}>
        <Grid
          container
          spacing={4}
          sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' } }}
        >
          <Grid item xs={12} sm={6} pr={1}>
            <BookingInfo formData={formData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid xs={12}>
            <LoginButton/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                value={user?.FirstName}
                error={errors.FirstName ? true : false}
                helperText={errors.FirstName?.message}
                {...register('FirstName')}
              />
            </Grid>
            <Grid item xs={12} mt={3}>
              <TextField
                fullWidth
                label="Last Name"
                value={user?.LastName}
                error={errors.LastName ? true : false}
                helperText={errors.LastName?.message}
                {...register('LastName')}
              />
            </Grid>
            <Grid item xs={12} mt={3}>
              <MuiTelInput
                fullWidth
                label="Phone Number"
                defaultCountry="AU"
                value={phone} 
                onChange={registerPhone}
                error={errors?.PhoneNumber ? true : undefined}
                helperText={errors?.PhoneNumber?.message}
              />
            </Grid>
            <Grid item xs={12} mt={3}>
              <TextField
                fullWidth
                label="Email"
                value={user?.Email}
                error={errors.Email ? true : false}
                helperText={errors.Email?.message}
                {...register('Email')}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ float: 'right' }}
                endIcon={<ChevronRight />}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PersonalInformationForm;
