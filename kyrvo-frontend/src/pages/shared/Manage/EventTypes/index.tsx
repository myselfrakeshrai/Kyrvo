import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';

import React from 'react';
import { EventTypeService } from 'src/services/eventtypeService';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { EventTicketTypes } from 'src/models/EventType';

const columns = [
  { field: 'Id', headerName: 'Id', width: 250, editable: false },
  { field: 'Title', headerName: 'Title', width: 250, editable: false },
  { field: 'Price', headerName: 'Price', width: 250, editable: false },
  {
    field: 'IsActive',
    headerName: 'IsActive',
    width: 250,
    editable: false,
    renderCell: (params: GridRenderCellParams<EventTicketTypes>) => {
      return params?.row?.IsActive ? 'Yes' : 'No';
    },
  },
  {
    field: 'MaxQuantity',
    headerName: 'MaxQuantity',
    width: 250,
    editable: false,
  },
  {
    field: 'AllowMultiple',
    headerName: 'AllowMultiple',
    width: 250,
    editable: false,
    renderCell: (params: GridRenderCellParams<EventTicketTypes>) => {
      return params?.row?.AllowMultiple ? 'Yes' : 'No';
    },
  },
];
const EventTypesPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['EventTypes'],
    queryFn: () =>
      EventTypeService.getAll().then((res) => {
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
      action={dtAction('eventtype')}
      name="Event Types"
      feature={FEATURES.ROLES}
    />
  );
};

export default EventTypesPage;
