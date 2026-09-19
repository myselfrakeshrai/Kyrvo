import {
  Alert,
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Reservation, VehicleTypes } from 'src/models';
import { VehicleTypesServices } from 'src/services';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from '@mui/icons-material';

import CarCard from '../../../components/CarCard';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from 'src/stores';
import { BookingInfo } from './Components';

interface VehicleTypeFormProps {
  formData: Reservation;
  onSubmit: (val: Reservation) => void;
  onPrevious: () => void;
}

interface VehicleTypeData {
  VehicleType: string;
}

const VehicleTypeSchema: z.ZodType<VehicleTypeData> = z.object({
  VehicleType: z.string().min(1, 'Please select a vehicle type.'),
});

const VehicleTypeForm: React.FC<VehicleTypeFormProps> = ({
  formData,
  onSubmit,
  }) => {
  const [vehicleType, setVehicleType] = useState<string>(
    formData?.VehicleType as string,
  );
  const themeInstance = useTheme();
  const { setVehicleTypes } = useAppStore();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(VehicleTypeSchema),
    defaultValues: formData,
  });

  const { isLoading, data } = useQuery({
    queryKey: ['vehicle_types'],
    queryFn: () =>
      VehicleTypesServices.getAll().then((res) => {
        setVehicleTypes(res);
        return res;
      }),
  });

  useEffect(() => {
    setValue('VehicleType', vehicleType);
  }, [vehicleType, setValue]);

  const onNext: SubmitHandler<Reservation> = (formData: Reservation) => {
    onSubmit({ ...formData } as Reservation);
  };

  return (
    <Box sx={{ margin: 'auto', my: 5 }}>
      <form onSubmit={handleSubmit(onNext)}>
        {isLoading && <LinearProgress />}
        <Grid
          container
          sx={{
            flexDirection: { xs: 'column-reverse', sm: 'row' },
          }}
        >
          <Grid item xs={12} sm={6} mt={{xs: 1, sm: 0}} pr={{ xs: 0, sm: 1 }}>
            <BookingInfo formData={formData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack
              direction="column"
              sx={{
                height: '50vh',
                overflow: 'auto',
                /* width */
                '::-webkit-scrollbar': {
                  width: '5px',
                },
                /* Track */
                '::-webkit-scrollbar-track': {
                  boxShadow: 'inset 0 0 5px grey',
                  borderRadius: '10px',
                },
                /* Handle */
                '::-webkit-scrollbar-thumb': {
                  background: themeInstance.palette.primary.main,
                  borderRadius: '10px',
                },
                /* Handle on hover */
                '::-webkit-scrollbar-thumb:hover': {
                  background: themeInstance.palette.secondary.main,
                },
              }}
            >
              <ToggleButtonGroup
                sx={{ flexWrap: 'wrap' }}
                orientation="horizontal"
                value={vehicleType}
                onChange={(e: React.MouseEvent, val: string) => {
                  e?.preventDefault();
                  setVehicleType(val);
                }}
                exclusive
              >
                {data?.map((vehicleType: VehicleTypes) => (
                  <ToggleButton
                    value={vehicleType.Id as string}
                    aria-label="list"
                    sx={{
                      m: '2px!important',
                      border: '0px',
                      width: '100%',
                      p: 0,
                    }}
                    color="success"
                    key={vehicleType.Id}
                  >
                    <CarCard vehicleType={vehicleType} />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>

            {errors?.VehicleType && (
              <Alert variant="outlined" severity="error" sx={{ mt: 1, mb: 3 }}>
                Please select a vehilce type.
              </Alert>
            )}
            <Grid item xs={12} sx={{ mt: 1 }}>
              {/* <Button
                variant="outlined"
                sx={{ float: 'left' }}
                onClick={onPrevious}
                startIcon={<ChevronLeft />}
              >
                Previous
              </Button> */}
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

export default VehicleTypeForm;
