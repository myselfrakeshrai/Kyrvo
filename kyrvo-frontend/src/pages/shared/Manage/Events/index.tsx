import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { EventService } from 'src/services/eventService';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { getFormattedDate } from 'src/utils/helpers';
import { Event } from 'src/models/Event';

const columns = [
  { field: 'Id', headerName: 'Event Id', width: 250, editable: false },
  { field: 'Title', headerName: 'Name', width: 250, editable: false },
  { field: 'Venue', headerName: 'Venue', width: 250, editable: false },
  {
    field: 'ScheduledDate',
    headerName: 'Scheduled Date',
    width: 230,
    editable: false,
  },
  {
    field: 'ScheduledTime',
    headerName: 'Scheduled Time',
    width: 230,
    editable: false,
  },

  {
    field: 'Published',
    headerName: 'Is Published',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<Event>) => {
      return params?.row?.Published ? 'Published' : 'Draft';
    },
  },
  {
    field: 'Featured',
    headerName: 'Is Featured',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<Event>) => {
      return params?.row?.IsFeatured ? 'Yes' : 'No';
    },
  },
  {
    field: 'CreatedOn',
    headerName: 'Created On',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<Event>) => {
      return getFormattedDate(params?.row?.CreatedOn as number);
    },
  },
];
const EventsPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['events'],
    queryFn: () =>
      EventService.getAll().then((res) => {
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
      action={dtAction('event')}
      name="Event"
      feature={FEATURES.EVENTS}
    />
  );
};

export default EventsPage;
