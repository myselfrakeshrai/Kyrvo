import { Avatar, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { VehicleServices } from 'src/services';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';

const columns = [
  {
    field: 'Image1',
    headerName: 'Image Url',
    width: 200,
    editable: false,
    renderCell: (params: any) => {
      if (params.value) {
        const images = params.value.split('|');
        return (
          <Avatar
            alt={params.row.Name}
            src={import.meta.env.VITE_STATIC_URL + images[0]}
          />
        );
      }
    },
  },
  { field: 'Id', headerName: 'Id', width: 100, editable: false },
  { field: 'Name', headerName: 'Name', width: 100, editable: false },
  {
    field: 'Desc',
    headerName: 'Description',
    width: 230,
    editable: false,
  },
  {
    field: 'LocationId',
    headerName: 'Located At',
    width: 130,
    editable: false,
  },
];
const VehiclesPage: React.FC = () => {
  const { dtAction } = useAppRoute();
  const { isLoading, error, data } = useQuery({
    queryKey: ['vehicle_page'],
    queryFn: () => VehicleServices.getAll().then((res) => res),
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
      action={dtAction('vehicles')}
      idColumn="Id"
      name="Vehicle"
      feature={FEATURES.VEHICLES}
      mobileFilters={['Image1', 'Name']}
    />
  );
};

export default VehiclesPage;
