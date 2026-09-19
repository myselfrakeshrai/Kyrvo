import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';
import { CollectionService } from 'src/services/collectionService';

const columns = [
  { field: 'Id', headerName: 'Collection Id', width: 250, editable: false },
  { field: 'Name', headerName: 'Name', width: 250, editable: false },
  { field: 'CreatedOn', headerName: 'Created On', width: 230, editable: false },
];
const CollectionsPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['collections-queries'],
    queryFn: () =>
      CollectionService.getAll().then((res) => {
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
      action={dtAction('collections')}
      name="Collections"
      feature={FEATURES.COLLECTION}
      addManage
    />
  );
};

export default CollectionsPage;
