import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Box,
  Button,
  Alert,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tab,
  useTheme,
  Typography,
} from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Reservation } from 'src/models';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationPicker from '../../../components/LocationPicker';
import RouteMap from './Components/RouteMap';
import { RESERVATION_TYPES } from 'src/constants/appConstants';
import { CustomDatePicker, CustomTimePicker } from 'src/components';
import dayjs from 'dayjs';
import { BookingInfo } from './Components';

interface HireSearchFormProps {
  formData: Reservation;
  onPrevious?: () => void;
  onSubmit: (formData: Reservation) => void;
}

interface HireSearchFormData {
  PickupLocation: string;
  PickupDate: string;
  PickupTime: string;
  Hours?: number | null;
  DropoffLocation?: string;
  ReservationType: string;
  Flight?: string;
}

const HireSearchFormSchema: z.ZodType<HireSearchFormData> = z
  .object({
    PickupLocation: z.string().min(5, 'Provide a valid pickup location.'),
    PickupDate: z.string().min(5, 'Provide a valid pickup date.'),
    PickupTime: z.string().min(2, 'Provide a valid pickup time.'),
    DropoffLocation: z
      .string({ required_error: 'Provide a valid dropoff location.' })
      .optional(),
    ReservationType: z.string().min(1, 'Reservation Type is required.'),
    Flight: z.string().optional(),
    Hours: z.number().optional().nullable(),
  })
  .refine(
    (val: HireSearchFormData) => {
      if (val.ReservationType === RESERVATION_TYPES.hire_dis) {
        if (!val.DropoffLocation) return false;
      }
      return true;
    },
    {
      message: 'Dropoff location is required.',
      path: ['DropoffLocation'],
    },
  )
  .refine(
    (val: HireSearchFormData) => {
      if (val.ReservationType === RESERVATION_TYPES.hire_dis) {
        return true;
      }
      if (val.ReservationType === RESERVATION_TYPES.hire_hour) {
        if (!val.Hours) return false;
      }
      return true;
    },
    {
      message: 'Number of hours is required.',
      path: ['Hours'],
    },
  )
  .refine(
    (params: HireSearchFormData) => {
      const format = 'DD/MM/YYYY HH:mm';
      const isPast = dayjs(
        params.PickupDate + ' ' + params.PickupTime,
        format,
      ).isBefore(dayjs());
      if (isPast) {
        return false;
      }
      return true;
    },
    {
      message: 'Time must be in future',
      path: ['PickupTime'],
    },
  );

const HireSearchForm: React.FC<HireSearchFormProps> = ({
  formData: initialFormData,
  onSubmit,
}) => {
  const [routeError, setRouteError] = useState<string | null>();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<HireSearchFormData>({
    resolver: zodResolver(HireSearchFormSchema),
    defaultValues: initialFormData,
  });
  const [formData] = useState<Reservation>(initialFormData);

  const onNext: SubmitHandler<HireSearchFormData> = (
    formData: HireSearchFormData,
  ) => {
    if (!routeError) {
      onSubmit({ ...formData } as Reservation);
    }
  };

  const themeInstance = useTheme();

  const [radioValue, setRadioValue] = React.useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setRadioValue(newValue);
  };

  return (
    <Box sx={{ margin: 'auto', my: 0 }}>
      <form onSubmit={handleSubmit(onNext)}>
        <Grid
          container
          spacing={1}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
          }}
        >
          {routeError && (
            <Grid item xs={12}>
              <Alert severity="error">{routeError}</Alert>
            </Grid>
          )}
          <Grid item sm={7} xs={12} sx={{ zIndex: 1, pr: 1 }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={radioValue}>
                <Box
                  sx={{
                    background: `${themeInstance.palette.primary.main}12`,
                    borderRadius: '10px 10px 0 0',
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="Map and Summary"
                    centered
                  >
                    <Tab label="Map" value="1" />
                    <Tab label="Summary" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ p: 0 }}>
                  <RouteMap
                    origin={watch('PickupLocation')}
                    destination={watch('DropoffLocation')}
                    onError={setRouteError}
                    originOnly={
                      watch('ReservationType') === RESERVATION_TYPES.hire_hour
                    }
                  />
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0 }}>
                  <BookingInfo formData={formData} />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
          <Grid
            item
            sm={5}
            xs={12}
            sx={{ mt: { xs: 2, sm: 0 }, background: '#fff', zIndex: 0 }}
          >
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Box
                sx={{
                  padding: '10px',
                  width: '100%',
                  borderRadius: '5px',
                  mb: 1,
                  background: themeInstance.palette.primary.main,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{color: themeInstance.palette.tertiary?.main}}>Reservation Type</Typography>
              </Box>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  defaultValue={formData?.ReservationType}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue('ReservationType', e.target.value)
                  }
                >
                  <FormControlLabel
                    value={RESERVATION_TYPES.hire_dis}
                    control={<Radio />}
                    label="Distance"
                  />
                  <FormControlLabel
                    value={RESERVATION_TYPES.hire_hour}
                    control={<Radio />}
                    label="Hourly"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LocationPicker
                label="Pickup location"
                defaultValue={getValues('PickupLocation') || ''}
                onSelect={(val: string) => setValue('PickupLocation', val)}
                error={errors.PickupLocation ? true : false}
                message={errors.PickupLocation?.message}
                showLabel={true}
              />
            </Grid>
            {watch('ReservationType') === 'HIRE_CAR_DISTANCE' && (
              <Grid item xs={12} mt={3}>
                <LocationPicker
                  label="Dropoff location"
                  defaultValue={getValues('DropoffLocation') || ''}
                  onSelect={(val: string) => setValue('DropoffLocation', val)}
                  error={errors.DropoffLocation ? true : false}
                  message={errors.DropoffLocation?.message}
                  showLabel={true}
                />
              </Grid>
            )}
            <CustomDatePicker
              label="Pickup Date"
              defaultValue={getValues('PickupDate') || ''}
              error={errors.PickupDate ? true : false}
              message={errors.PickupDate?.message}
              onChange={(val: any) => setValue('PickupDate', val)}
              maxDateInDays={90}
              sx={{
                borderRadius: '0',
                height: '50px',
                mt: 2,
              }}
            />
            <CustomTimePicker
              label="Pickup Time"
              defaultValue={getValues('PickupTime') || ''}
              error={errors.PickupTime ? true : false}
              message={errors.PickupTime?.message}
              onChange={(val: any) => setValue('PickupTime', val)}
              sx={{
                height: '50px',
                mt: 3,
              }}
            />
            {watch('ReservationType') === RESERVATION_TYPES.hire_hour && (
              <Grid item xs={12} mt={3}>
                <TextField
                  fullWidth
                  label="Duration in Hours"
                  type="number"
                  inputProps={{
                    min: 2,
                    max: 24,
                    step: 1,
                  }}
                  defaultValue={getValues('Hours') || 2}
                  InputLabelProps={{ shrink: true }}
                  error={errors.Hours ? true : false}
                  helperText={errors.Hours?.message}
                  {...register('Hours', { valueAsNumber: true })}
                />
              </Grid>
            )}
            <Grid item xs={12} mt={3}>
              <TextField
                fullWidth
                label="Flight Number"
                type="text"
                InputLabelProps={{ shrink: true }}
                error={errors.Flight ? true : false}
                helperText={errors.Flight?.message}
                {...register('Flight')}
              />
            </Grid>
            <Alert
              severity="warning"
              sx={{
                mt: 2,
                mb: 0,
                fontSize: '0.8rem',
                fontWeight: 'medium',
                fontStyle: 'italic',
              }}
            >
              Please provide your flight number for airport pickup.
            </Alert>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ float: 'right' }}
                endIcon={<ChevronRightIcon />}
                disabled={!!routeError}
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

export default HireSearchForm;
