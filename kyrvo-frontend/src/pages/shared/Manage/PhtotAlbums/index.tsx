import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { getFormattedDate } from 'src/utils/helpers';
import { PhotoAlbum } from 'src/models/PhotoAlbum';
import { PhotoAlbumService } from 'src/services/photoAlbumService';

const columns = [
  { field: 'Id', headerName: 'PhotoAlbum Id', width: 250, editable: false },
  { field: 'Name', headerName: 'Name', width: 250, editable: false },
  { field: 'Type', headerName: 'Type', width: 250, editable: false },
  {
    field: 'CreatedOn',
    headerName: 'Created On',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<PhotoAlbum>) => {
      return getFormattedDate(params?.row?.CreatedOn as number);
    },
  },
];
const PhotoAlbumsPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['photoalbums'],
    queryFn: () =>
      PhotoAlbumService.getAll().then((res) => {
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
      action={dtAction('photoalbum')}
      name="PhotoAlbum"
      feature={FEATURES.EVENTS}
    />
  );
};

export default PhotoAlbumsPage;
