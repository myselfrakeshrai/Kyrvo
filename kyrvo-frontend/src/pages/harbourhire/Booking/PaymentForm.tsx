import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Reservation } from 'src/models';
import { formatCurrencyAUD } from 'src/utils/helpers';
import { BookingInfo, PaymentInfo } from './Components';

interface PaymentFormProps {
  formData: Reservation;
  onSubmit?: (val: Reservation) => void;
  onPrevious?: () => void;
}
const PaymentForm: React.FC<PaymentFormProps> = ({ formData }) => {
  const themeInstance = useTheme();
  const onPaynow = () => {
    if (window)
      window.location.href = `${import.meta.env.VITE_API_URL}/payments/${
        formData.Id
      }`;
  };

  return (
    <Grid container sx={{
      flexDirection:{xs:'column-reverse', sm:'row'},
    }}>
      <Grid item xs={12} sm={6} sx={{ pr: {xs:0, sm:4}, pb: 2 }}>
        <PaymentInfo formData={formData} />
        <BookingInfo formData={formData} />
      </Grid>
      <Grid item xs={12} sm={6} mb={1}>
        <Card
          sx={{ minWidth: 275, p: 2, textAlign: 'center' }}
          variant="outlined"
        >
          <Typography
            variant="h2"
            sx={{
              margin: '5px',
              padding: '10px',
              borderRadius: '5px',
              color: themeInstance.palette.tertiary?.main,
              background: themeInstance.palette.primary.main,
            }}
          >
            Payment Details
          </Typography>
          <CardContent sx={{ textAlign: 'left' }}>
            <Typography variant="body2" component="p" mb={2}>
              We are dedicated to enhancing your experience by collaborating
              closely with our drivers, ensuring you enjoy superior service at a
              more affordable price. Utilizing the information you provided,
              we've calculated your ride fare with our advanced algorithms. To
              finalize your booking, please proceed by clicking 'Pay Now'.
            </Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel value="accept" control={<Radio />} label="Yes, i want to received the newsletter." />
                <FormControlLabel value="denied" control={<Radio />} label="No." />
              </RadioGroup>
            </FormControl>
            <Box>
              <Typography variant="h5" textAlign="center" padding={2}>
                Due Today: {formatCurrencyAUD(formData.Price || 0)}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Button variant="contained" sx={{ m: 4 }} onClick={onPaynow}>
                Pay Now
              </Button>
            </Box>
            <Typography variant="body2" component="p">
              Note: Your reservation will only be confirmed upon receipt of full
              payment.
            </Typography>
          </CardContent>
        </Card>
        {/* <Grid item xs={12} mt={1}>
          {onPrevious && (
            <Button
              variant="outlined"
              sx={{ float: 'left', mb: 1, }}
              onClick={onPrevious}
            >
              Previous
            </Button>
          )}
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default PaymentForm;
