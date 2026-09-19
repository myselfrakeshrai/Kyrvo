import React from 'react';
import {
  Container,
  Step,
  Stepper,
  StepLabel,
  Box,
  styled,
  useTheme,
} from '@mui/material';

import { Reservation } from 'src/models';
import VehicleTypeForm from './VehicleTypeForm';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import PaymentForm from './PaymentForm';
import HireSearchForm from './HireSearchForm';
import PersonalInformationForm from './PersonalInformation';
import { useAppStore } from 'src/stores/appStore';

// Override MUI Stepper styles to remove the connector line
const StyledStepper = styled(Stepper)(() => ({
  '.MuiStepConnector-lineHorizontal': {
    display: 'none',
  },
}));

interface StepType {
  id: number;
  name: string;
  uri: string;
}
const steps: StepType[] = [
  {
    id: 0,
    name: 'Ride',
    uri: 'ride-information',
  },
  {
    id: 1,
    name: 'Vehicle',
    uri: 'vehicle',
  },
  {
    id: 2,
    name: 'Personal',
    uri: 'personal-information',
  },
  {
    id: 3,
    name: 'Payment',
    uri: 'payment-information',
  },
];

const BookingPage: React.FC = () => {
  const themeInstance = useTheme();
  const { step } = useParams();
  const { reservation, setReservation } = useAppStore();
  const [searchParms] = useSearchParams();
  const navigate = useNavigate();
  const activeStep =
    (reservation?.PickupLocation && steps.find((x) => x.uri === step)) ||
    steps[0];

  const handleNext = (data: Reservation) => {
    setReservation({ ...reservation, ...data });
    navigate({
      pathname: `/booking/${steps[activeStep.id + 1].uri}`,
      search: createSearchParams(searchParms).toString(),
    });
  };

  const handleBack = () => {
    navigate(`/booking/${steps[activeStep.id - 1].uri}`);
  };

  const getStepContent = (step: StepType) => {
    switch (step.id) {
      case 0:
        return <HireSearchForm formData={reservation} onSubmit={handleNext} />;
      case 1:
        return (
          <VehicleTypeForm
            formData={reservation}
            onPrevious={handleBack}
            onSubmit={handleNext}
          />
        );
      case 2:
        return (
          <PersonalInformationForm
            formData={reservation}
            onPrevious={handleBack}
            onSubmit={handleNext}
          />
        );
      case 3:
        return <PaymentForm formData={reservation} onPrevious={handleBack} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Container
      sx={{ maxWidth: { xs: '100%', sm: 'lg' }, p: { xs: '0', sm: '' } }}
    >
      <StyledStepper
        activeStep={activeStep.id}
        sx={{
          background: `${themeInstance.palette.primary.main}12`,
          borderRadius: { xs: 0, sm: '10px' },
          mx: { xs: 0, sm: 20 },
          my: { xs: 0, sm: 6 },
          mt: { xs: '-12px' },
          padding: '10px',
        }}
      >
        {steps.map((step) => (
          <Step key={step.id}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  fontSize: { xs: '10px', sm: '15px' },
                },
              }}
            >
              {step.name}
            </StepLabel>
          </Step>
        ))}
      </StyledStepper>
      <Box sx={{ m: 3 }}>{getStepContent(activeStep)}</Box>
    </Container>
  );
};

export default BookingPage;
