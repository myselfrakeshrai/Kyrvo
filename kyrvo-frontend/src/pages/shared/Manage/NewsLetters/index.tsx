import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { NewsLetterService } from 'src/services/newsletterService';
import { FEATURES } from 'src/constants/appConstants';
import { getFormattedDate } from 'src/utils/helpers';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { NewsLetters } from 'src/models/NewsLetter';

const columns = [
  { field: 'Id', headerName: 'Id', width: 250, editable: false },
  { field: 'Email', headerName: 'Email', width: 250, editable: false },
  { field: 'Subscribed', headerName: 'Subscribed', width: 250, editable: false },
  {
    field: 'CreatedOn',
    headerName: 'Created On',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<NewsLetters>) => {
      return getFormattedDate(params?.row?.CreatedOn as number);
    },
  },
];
const NewsLettersPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['newsletter'],
    queryFn: () =>
      NewsLetterService.getAll().then((res) => {
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
      action={dtAction('newsletter')}
      name="News Letter"
      feature={FEATURES.NEWSLETTERS}
    />
  );
};

export default NewsLettersPage;
