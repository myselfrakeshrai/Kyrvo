import { Alert, Card, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { VariableService } from 'src/services';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { VARIBLETYPE } from 'src/constants/appConstants';
import { getImageUrl } from 'src/utils/helpers';
import { useSearchParams } from 'react-router-dom';

const columns = [
  { field: 'Id', headerName: 'Id', width: 250, editable: true },
  { field: 'Name', headerName: 'Name', width: 250, editable: true },
  {
    field: 'Description',
    headerName: 'Description',
    width: 230,
    editable: true,
  },
  { field: 'Type', headerName: 'Type', width: 230, editable: true },
  { field: 'VarGroup', headerName: 'Group', width: 230, editable: true },
  {
    field: 'Value',
    headerName: 'Value',
    width: 230,
    editable: true,
    renderCell: (params: any) => {
      if (params.row.Type === VARIBLETYPE.COLOR) {
        return (
          <Card sx={{ bgcolor: params.value, padding: 2, width: 100 }}></Card>
        );
      } else if (params.row.Type === VARIBLETYPE.IMAGE) {
        return (
          <Card
            sx={{
              backgroundImage: `URL(${getImageUrl(params.value)})`,
              width: 40,
              height: 40,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></Card>
        );
      }
      return params.value;
    },
  },
];
const VariablesPage: React.FC = () => {
  const { dtAction } = useAppRoute();
  const [searchParams] = useSearchParams();
  const group = searchParams.get('group') || undefined;

  const { isLoading, error, data } = useQuery({
    queryKey: ['permissions'],
    queryFn: () =>
      VariableService.getAll().then((res) => {
        return res;
      }),
    staleTime: 0,
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
  const filteredData = group ? data?.filter((x) => x.VarGroup === group) : data;
  const actionParam = group ? `group=${group}` : '';
  return (
    <DataTable
      iRows={filteredData || []}
      iCols={columns}
      idColumn="Id"
      action={dtAction('variables', actionParam)}
      name="Variables"
      mobileFilters={['Name', 'Value']}
    />
  );
};

export default VariablesPage;
