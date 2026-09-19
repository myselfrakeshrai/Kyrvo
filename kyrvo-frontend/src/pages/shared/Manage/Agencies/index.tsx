import { LinearProgress, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from 'src/components';
import { AgencyServices } from 'src/services';
import { Check, Close } from '@mui/icons-material';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';

const AgenciesPage: React.FC = () => {
  const theme = useTheme();
  const { dtAction } = useAppRoute();
  const { isLoading, error, data } = useQuery({
    queryKey: ['agencies_page'],
    queryFn: () => AgencyServices.getAll().then((res) => res),
    staleTime: 10,
  });

  const columns = [
    { field: 'Id', headerName: 'Agency Id', width: 100, editable: false },
    {
      field: 'Name',
      headerName: 'Name',
      width: 250,
      editable: true,
    },
    {
      field: 'Address1',
      headerName: 'Address 1',
      width: 200,
      editable: true,
    },
    {
      field: 'Address2',
      headerName: 'Address 2',
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
      action={dtAction('agencies')}
      idColumn="Id"
      name="Agencies"
      feature={FEATURES.AGENCIES}
    />
  );
};

export default AgenciesPage;
