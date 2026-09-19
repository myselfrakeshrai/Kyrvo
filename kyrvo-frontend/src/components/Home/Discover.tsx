import { CalendarMonth, DirectionsCar, LocationOn } from '@mui/icons-material';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { SectionHeader, StepDetail } from '..';
const steps = [
  {
    icon: <LocationOn />,
    title: 'Pickup location',
    desc: "Choose your location, and we'll come to you.",
  },
  {
    icon: <CalendarMonth />,
    title: 'Select a Date',
    desc: 'Choose Your Desired Pick-Up Date and Time.',
  },
  {
    icon: <DirectionsCar />,
    title: 'Book your Ride',
    desc: 'Reserve Your Journey with Assured Quality Service.',
  },
];
const Discover: React.FC = () => {
  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down('sm'));
  return (
    <Grid sx={{ margin: '5% 5%' }}>
      <Grid
        sx={{
          mt: 10,
        }}
      >
        <SectionHeader
          title="HOW IT WORKS"
          subtitle="Effortless, reliable hire car at your service."
          fontWeight={true}
          margin={'auto'}
          text="center"
        />
      </Grid>
      <Grid
        container
        sx={{
          mb: 2,
          justifyContent: 'center',
          textAlign: { xs: 'left', sm: 'center' },
        }}
      >
        {steps.map((step) => (
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              margin: isMobile ? 1 : 0,
            }}
          >
            <StepDetail {...step} iconPlacement={isMobile ? 'SIDE' : 'TOP'} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Discover;
