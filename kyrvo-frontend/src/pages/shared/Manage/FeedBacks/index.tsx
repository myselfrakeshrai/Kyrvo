import { LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from 'src/components';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FeedBackServices } from 'src/services';

const FeedBacksPage: React.FC = () => {
  const { dtAction } = useAppRoute();
  const { isLoading, error, data } = useQuery({
    queryKey: ['feedbacks_page'],
    queryFn: () => FeedBackServices.getAll().then((res) => res),
    staleTime: 10,
  });

  const columns = [
    { field: 'Id', headerName: 'FeedBack Id', width: 100, editable: false },
    {
      field: 'FeedbackName',
      headerName: 'Feed Back Name',
      width: 250,
      editable: true,
    },
    {
      field: 'FeedBackUsername',
      headerName: 'Feed Back Username',
      width: 200,
      editable: true,
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
      action={dtAction('feedbacks')}
      idColumn="Id"
      name="FeedBacks"
    />
  );
};

export default FeedBacksPage;
