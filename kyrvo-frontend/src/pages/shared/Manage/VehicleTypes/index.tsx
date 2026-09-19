import { LinearProgress } from '@mui/material';
import { DataTable, RowImage } from 'src/components';
import { VehicleTypesServices } from 'src/services';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';
import { getImageUrl } from 'src/utils/helpers';

const columns = [
  {
    field: 'Image',
    headerName: 'Image',
    width: 130,
    editable: false,
    renderCell: (params: any) => {
      if (params.value) {
        const images = params.value.split('|');
        return <RowImage Url={getImageUrl(images[0])} />;
      }
    },
  },
  { field: 'Id', headerName: 'Vehicle Id', width: 100, editable: false },
  { field: 'Name', headerName: 'Name', width: 150, editable: false },
  { field: 'Desc', headerName: 'Description', width: 130, editable: false },
  { field: 'Seats', headerName: 'Seats', width: 100, editable: false },
  { field: 'Luggages', headerName: 'Luggages', width: 100, editable: false },
  { field: 'BasePrice', headerName: 'Base Price', width: 150, editable: false },
  { field: 'Price', headerName: 'Price per KM', width: 150, editable: false },
  {
    field: 'HourlyPrice',
    headerName: 'Price per Hour',
    width: 150,
    editable: false,
  },
  {
    field: 'DiscountedPrice',
    headerName: 'Discounted Price',
    width: 150,
    editable: false,
  },
  {
    field: 'DiscountedDistance',
    headerName: 'Dis. Price Distance',
    width: 150,
    editable: false,
  },
];
const VehicleTypesPage: React.FC = () => {
  const { dtAction } = useAppRoute();
  const { isLoading, error, data } = useQuery({
    queryKey: ['vehicle_types_page'],
    queryFn: () => VehicleTypesServices.getAll().then((res) => res),
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
      action={dtAction('vehicletypes')}
      idColumn="Id"
      name="Vehicle"
      feature={FEATURES.VEHICLETYPES}
      mobileFilters={['Image', 'Name']}
    />
  );
};

export default VehicleTypesPage;
