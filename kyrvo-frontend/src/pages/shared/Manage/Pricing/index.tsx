import { LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { PricingServices } from 'src/services';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';

const columns = [
  { field: 'Id', headerName: 'Id', width: 100, editable: false },
  { field: 'Name', headerName: 'Name', width: 150, editable: false },
  {
    field: 'Description',
    headerName: 'Description',
    width: 130,
    editable: false,
  },
  { field: 'StartDate', headerName: 'Start Date', width: 100, editable: false },
  { field: 'StartTime', headerName: 'Start Time', width: 100, editable: false },
  {
    field: 'Multiplier',
    headerName: 'Price Multiplier',
    width: 100,
    editable: false,
  },
  {
    field: 'Code',
    headerName: 'Promo Code',
    width: 100,
    editable: false,
  },
  { field: 'EndDate', headerName: 'End Date', width: 150, editable: false },
  { field: 'EndTime', headerName: 'End Time', width: 150, editable: false },
];
const PricingsPage: React.FC = () => {
  const { dtAction } = useAppRoute();
  const { isLoading, error, data } = useQuery({
    queryKey: ['pricing_page'],
    queryFn: () => PricingServices.getAll().then((res) => res),
    staleTime: 5,
  });
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
      action={dtAction('pricings')}
      idColumn="Id"
      name="Pricing"
    />
  );
};

export default PricingsPage;
