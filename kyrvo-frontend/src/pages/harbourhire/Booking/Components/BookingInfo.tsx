import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import {Luggage as LuggageIcon, EvStation as EvStationIcon, ElectricMeter as ElectricMeterIcon, People as PeopleIcon, ArrowDropDown as ArrowDropDownIcon} from '@mui/icons-material';
import { Reservation, VehicleTypes } from 'src/models';
import { RESERVATION_TYPES } from 'src/constants/appConstants';
import { getImageUrl } from 'src/utils/helpers';
import { useAppStore } from 'src/stores';
import { useTheme } from '@mui/system';

interface BookingInfoProps {
  formData: Reservation;
}

const BookingInfo: React.FC<BookingInfoProps> = ({ formData }) => {
  const themeInstance = useTheme();
  const { vehicleTypes } = useAppStore();
  const vehicleType: VehicleTypes | undefined = vehicleTypes?.find(
    (x) => x.Id === formData.VehicleType,
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card sx={{ p: 1 }} variant="outlined">
          <Typography
            component="p"
            sx={{
              padding: '10px',
              borderRadius: '5px',
              color: themeInstance.palette.tertiary?.main,
              background: themeInstance.palette.primary.main,
            }}
          >
            Reservation Details
          </Typography>
          <CardContent sx={{ textAlign: 'left' }}>
            {vehicleType && vehicleType.Image && (
              <Grid xs={12} sm={6}>
                <Box
                  component="div"
                  sx={{
                    background: themeInstance.palette.primary.main,
                    borderRadius: 50,
                    height: 70,
                    width:  70,
                    zIndex: 0,
                    display: {xs: 'none',sm:'block'},
                    ml:  45 ,
                    position: 'absolute',
                  }}
                />
                <Box
                  component="img"
                  src={getImageUrl(vehicleType.Image as string)}
                  sx={{
                    zIndex: 3,
                    height: { xs: 100, sm: 100 },
                    ml: { xs: 5, sm: 40 },
                    position: { xs: '', sm: 'absolute' },
                  }}
                />
              </Grid>
            )}
            <Grid xs={12} sm={8}>
              {formData && formData.FirstName && (
                <Typography variant="body2" component="p" sx={{ my: 1 }}>
                  <strong>Passenger:</strong> {formData.FirstName}{' '}
                  {formData.LastName}{' '}
                  <Button
                    href="personal-information"
                    sx={{
                      ml: 1,
                      fontSize: '10px',
                      border: `1px solid`,
                      height: '10px',
                      minWidth: '30px'
                    }}
                  >
                    Edit
                  </Button>
                </Typography>
              )}
              {vehicleType && vehicleType.Name && (
                <Typography variant="body2" component="p" sx={{ my: 1 }}>
                  <strong>Vehicle Type:</strong> {vehicleType?.Name}
                  <Button
                    href="vehicle"
                    sx={{
                      ml: 1,
                      fontSize: '10px',
                      border: `1px solid`,
                      height: '10px',
                      minWidth: '30px'
                    }}
                  >
                    Edit
                  </Button>
                </Typography>
              )}
              {formData && formData.PickupLocation && (
                <Typography variant="body2" component="p" sx={{ my: 1 }}>
                  <strong>From:</strong> {formData.PickupLocation}
                </Typography>
              )}
              {formData.ReservationType === RESERVATION_TYPES.hire_dis && (
                <Typography variant="body2" component="p" sx={{ my: 1 }}>
                  <strong>To:</strong> {formData.DropoffLocation}
                </Typography>
              )}
              {formData && formData.PickupDate && (
                <Typography variant="body2" component="p" sx={{ my: 1 }}>
                  <strong>Date/Time:</strong> {formData.PickupDate} /{' '}
                  {formData.PickupTime}
                  <Button
                    href="ride-information"
                    sx={{
                      ml: 1,
                      fontSize: '10px',
                      border: `1px solid`,
                      height: '10px',
                      minWidth: '30px'
                    }}
                  >
                    Edit
                  </Button>
                </Typography>
              )}
              {formData.ReservationType === RESERVATION_TYPES.hire_dis && (
                <Typography variant="body2" component="p" sx={{ my: 1 }}>
                  <strong>Estimated Distance:</strong> {formData.DistanceText}
                </Typography>
              )}
              {formData.ReservationType === RESERVATION_TYPES.hire_dis && (
                <Typography variant="body2" component="p" sx={{ my: 1 }}>
                  <strong>Estimated Duration:</strong> {formData.Duration}
                </Typography>
              )}
              {formData.ReservationType === RESERVATION_TYPES.hire_hour && (
                <Typography variant="body2" component="p" sx={{ my: 1 }}>
                  <strong>Booking Duration:</strong> {formData.Hours} Hours
                </Typography>
              )}
            </Grid>
            {vehicleType && vehicleType.Name && (
              <Accordion
                sx={{
                  boxShadow: 0,
                  background: `${themeInstance.palette.primary.main}12`,
                }}
              >
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Features of Car</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ display: 'flex' }}>
                    {vehicleType?.Desc}
                  </Typography>
                  <List sx={{ display: 'flex' }}>
                    <ListItem
                      disablePadding
                      sx={{
                        padding: '5px',
                        background: themeInstance.palette.tertiary.main,
                        borderRadius: '10px',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <ElectricMeterIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography>
                          {vehicleType?.MinMileage}
                          {vehicleType?.MileageUnit} min mileage
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      disablePadding
                      sx={{
                        padding: '5px',
                        background: themeInstance.palette.tertiary.main,
                        borderRadius: '10px',
                        ml: 0.5,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <EvStationIcon />
                      </ListItemIcon>
                      <Typography>
                        {vehicleType?.MaxMileage}
                        {vehicleType?.MileageUnit} max mileage.
                      </Typography>
                    </ListItem>
                  </List>
                  <List sx={{ display: 'flex' }}>
                    <ListItem
                      disablePadding
                      sx={{
                        padding: '5px',
                        background: themeInstance.palette.tertiary.main,
                        borderRadius: '10px',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <LuggageIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography>{vehicleType?.Luggages} Luggage</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      disablePadding
                      sx={{
                        padding: '5px',
                        background: themeInstance.palette.tertiary.main,
                        borderRadius: '10px',
                        ml: 0.5,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <PeopleIcon />
                      </ListItemIcon>
                      <Typography>{vehicleType?.Seats} Seats</Typography>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookingInfo;
