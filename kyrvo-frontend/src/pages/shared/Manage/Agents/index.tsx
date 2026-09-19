import { LinearProgress, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from 'src/components';
import { AgentServices } from 'src/services';
import { Check, Close } from '@mui/icons-material';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';

const AgentsPage: React.FC = () => {
  const theme = useTheme();
  const { dtAction } = useAppRoute();
  const { isLoading, error, data } = useQuery({
    queryKey: ['agents_page'],
    queryFn: () => AgentServices.getAll().then((res) => res),
    staleTime: 10,
  });

  const columns = [
    { field: 'Id', headerName: 'Agent Id', width: 100, editable: false },
    {
      field: 'Email',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'AgencyId',
      headerName: 'AgencyId',
      width: 200,
      editable: true,
    },
    {
      field: 'Address1',
      headerName: 'Address 1',
      width: 200,
      editable: true,
    },
    {
      field: 'PostalCode',
      headerName: 'Postal Code',
      width: 100,
      editable: true,
    },
    {
      field: 'IsActive',
      headerName: 'Active',
      type: 'number',
      width: 120,
      editable: true,
      renderCell: (params: any) => {
        return parseInt(params.value) === 1 ? (
          <Check
            style={{
              color: theme.palette.success.light,
            }}
          />
        ) : (
          <Close
            style={{
              color: theme.palette.error.light,
            }}
          />
        );
      },
    },
  ];
  if (isLoading) {
    return <LinearProgress color="primary" />;
  }
  if (error) {
    return <span>Couldn't load data.</span>;
  }
  return (
    <DataTable
      iRows={data || []}
      iCols={columns}
      action={dtAction('agents')}
      idColumn="Id"
      name="Agents"
      feature={FEATURES.AGENTS}
    />
  );
};

export default AgentsPage;
