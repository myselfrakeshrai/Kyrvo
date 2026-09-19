import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material';
import React from 'react';
import { Agency, Reservation } from 'src/models';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AgencyServices, ReservationServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface AssignAgencyFormProps {
  Reservation: Reservation;
  onUpdate: (reservation: Reservation) => void;
}

interface AssignAgencyFormData {
  AgencyId: string;
}

const AssignAgencyFormSchema: z.ZodType<AssignAgencyFormData> = z.object({
  AgencyId: z.string().min(5, 'AgencyId is required.'),
});

const AssignAgencyForm: React.FC<AssignAgencyFormProps> = ({
  Reservation,
  onUpdate,
}) => {
  //React hook form related intiialization
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignAgencyFormData>({
    resolver: zodResolver(AssignAgencyFormSchema),
  });
  const agency = useQuery({
    queryKey: ['Agency'],
    queryFn: () => AgencyServices.getAll().then((res) => res),
  });
  const mutation = useMutation({
    mutationFn: (agencyId: string) =>
      ReservationServices.assignAgency(Reservation.Id as string, agencyId),
    onSuccess: (res: any) => {
      alert('Agency Assigned Successfully');
      onUpdate(res);
    },
    onError: () => {
      alert("Couldn't process your request");
    },
  });
  const onSubmit: SubmitHandler<AssignAgencyFormData> = (
    formData: AssignAgencyFormData,
  ) => {
    mutation.mutate(formData.AgencyId);
  };

  const agencyOptions = () => {
    if (agency.data) {
      return agency.data.map((a: Agency) => {
        return { label: a.Name, id: a.Id };
      });
    }
    return [];
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={agencyOptions()}
              sx={{ width: 300 }}
              onChange={(e: React.SyntheticEvent<Element, Event>, val: any) => {
                if (e) {
                  setValue('AgencyId', val.id);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select an Agency" />
              )}
            />
            {errors?.AgencyId && (
              <FormHelperText>{errors.AgencyId?.message}</FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ float: 'right' }}>
              Assign Agency
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AssignAgencyForm;
