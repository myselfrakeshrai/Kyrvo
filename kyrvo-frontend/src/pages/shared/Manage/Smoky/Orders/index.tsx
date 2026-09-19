import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { MenuItems } from 'src/models/MenuItems';
import { getFormattedDate } from 'src/utils/helpers';
import { OrderService } from 'src/services/Smoky/OrderService';

const columns = [
  { field: 'Id', headerName: 'Item Id', width: 250, editable: false },
  { field: 'OrderNumber', headerName: 'Order No.', width: 250, editable: false },
  {
    field: 'GrandTotal',
    headerName: 'GrandTotal',
    width: 250,
    editable: false,
  },
  { field: 'Status', headerName: 'Status', width: 250, editable: false },

  {
    field: 'CreatedOn',
    headerName: 'Created On',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<MenuItems>) => {
      return getFormattedDate(params?.row?.CreatedOn as number);
    },
  },
];
const OrderPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['menuitems'],
    queryFn: () =>
      OrderService.getAll().then((res) => {
        return res;
      }),
    staleTime: 10,
  });
  if (isLoading) {
    return <LinearProgress color="primary" />;
  }
  if (error) {
    return (
      <Alert variant="outlined" severity="error">
        Couldn't load data.
      </Alert>
    );
  }
  return (
    <DataTable
      iRows={data || []}
      iCols={columns}
      idColumn="Id"
      action={dtAction('menu')}
      name="Roles"
      feature={FEATURES.ROLES}
    />
  );
};

export default OrderPage;
