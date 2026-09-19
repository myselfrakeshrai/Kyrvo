import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';
import { EventTagService } from 'src/services/eventtagService';

const columns = [
  { field: 'Id', headerName: 'Event Tag Id', width: 250, editable: false },
  { field: 'Name', headerName: 'Name', width: 250, editable: false },
  { field: 'CreatedOn', headerName: 'Created On', width: 230, editable: false },
];
const EventTagsPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['eventtag'],
    queryFn: () =>
      EventTagService.getAll().then((res) => {
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
      action={dtAction('eventtag')}
      name="Event Tag"
      feature={FEATURES.BLOG}
    />
  );
};

export default EventTagsPage;
