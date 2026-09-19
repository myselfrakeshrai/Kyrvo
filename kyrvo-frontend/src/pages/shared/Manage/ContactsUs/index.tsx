import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { ContactUsService } from 'src/services/contactusService';
import { FEATURES } from 'src/constants/appConstants';
import { getFormattedDate } from 'src/utils/helpers';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { ContactUs } from 'src/models/ContactUs';

const columns = [
  { field: 'Id', headerName: 'Id', width: 250, editable: false },
  { field: 'Name', headerName: 'Name', width: 250, editable: false },
  { field: 'Email', headerName: 'Email', width: 250, editable: false },
  { field: 'Message', headerName: 'Message', width: 250, editable: false },
  {
    field: 'CreatedOn',
    headerName: 'Created On',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<ContactUs>) => {
      return getFormattedDate(params?.row?.CreatedOn as number);
    },
  },
];
const ContactsUsPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['contactus'],
    queryFn: () =>
      ContactUsService.getAll().then((res) => {
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
      action={dtAction('contactus')}
      name="Contact Us"
      feature={FEATURES.CONTACTUS}
    />
  );
};

export default ContactsUsPage;
