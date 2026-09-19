import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material';
import React from 'react';
import { Agent, Reservation } from 'src/models';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AgentServices, ReservationServices } from 'src/services';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface AssignAgentFormProps {
  Reservation: Reservation;
  onUpdate: (reservation: Reservation) => void;
}

interface AssignAgentFormData {
  AgentId: string;
}

const AssignAgentFormSchema: z.ZodType<AssignAgentFormData> = z.object({
  AgentId: z.string().min(5, 'AgentId is required.'),
});

const AssignAgentForm: React.FC<AssignAgentFormProps> = ({
  Reservation,
  onUpdate,
}) => {
  //React hook form related intiialization
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignAgentFormData>({
    resolver: zodResolver(AssignAgentFormSchema),
  });
  const Agent = useQuery({
    queryKey: ['Agent'],
    queryFn: () =>
      AgentServices.getByAgency(Reservation.AgencyId as string).then(
        (res) => res,
      ),
  });
  const mutation = useMutation({
    mutationFn: (AgentId: string) =>
      ReservationServices.assignAgent(Reservation.Id as string, AgentId),
    onSuccess: (res: any) => {
      alert('Agent Assigned Successfully');
      onUpdate(res);
    },
    onError: () => {
      alert("Couldn't process your request");
    },
  });
  const onSubmit: SubmitHandler<AssignAgentFormData> = (
    formData: AssignAgentFormData,
  ) => {
    mutation.mutate(formData.AgentId);
  };

  const AgentOptions = () => {
    if (Agent.data) {
      return Agent.data.map((a: Agent) => {
        return { label: a.FirstName + ' ' + a.LastName, id: a.Id };
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
              options={AgentOptions()}
              sx={{ width: 300 }}
              onChange={(e, val: any) => {
                if (e) {
                  setValue('AgentId', val.id);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select an Agent" />
              )}
            />
            {errors?.AgentId && (
              <FormHelperText>{errors.AgentId?.message}</FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ float: 'right' }}>
              Assign Agent
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AssignAgentForm;
