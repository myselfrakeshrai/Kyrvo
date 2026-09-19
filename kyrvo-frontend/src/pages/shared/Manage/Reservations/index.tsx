import { LinearProgress, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from 'src/components';
import { ReservationServices } from 'src/services';
import { Check, Close } from '@mui/icons-material';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';

const ReservationsPage: React.FC = () => {
  const theme = useTheme();
  const { dtAction } = useAppRoute();
  const { isLoading, error, data } = useQuery({
    queryKey: ['reservations_page'],
    queryFn: () => ReservationServices.getAll().then((res) => res),
    staleTime: 10,
  });
  const columns = [
    { field: 'Id', headerName: 'Reservation Id', width: 100, editable: false },
    {
      field: 'FirstName',
      headerName: 'FirstName',
      width: 100,
      editable: true,
    },
    {
      field: 'LastName',
      headerName: 'Last Name',
      width: 100,
      editable: true,
    },
    {
      field: 'Email',
      headerName: 'Email',
      width: 150,
      editable: true,
    },
    {
      field: 'PhoneNumber',
      headerName: 'Phone Number',
      width: 120,
      editable: true,
    },
    {
      field: 'PickupDate',
      headerName: 'Pickup Date',
      width: 100,
      editable: true,
    },
    {
      field: 'PickupTime',
      headerName: 'Pickup Time',
      width: 100,
      editable: true,
    },
    {
      field: 'Price',
      headerName: 'Price',
      editable: true,
      renderCell: (params: any) => `$${params.value}.00`,
    },
    {
      field: 'IsPaid',
      headerName: 'Payment',
      type: 'number',
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
      action={dtAction('reservations')}
      idColumn="Id"
      name="Reservations"
      addManage={true}
      feature={FEATURES.RESERVATIONS}
      mobileFilters={['Id', 'Email']}
    />
  );
};

export default ReservationsPage;
