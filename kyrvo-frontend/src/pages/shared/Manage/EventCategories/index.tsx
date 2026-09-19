import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';

import React from 'react';
import { EventCategoryService } from 'src/services/eventcategoryService';

const columns = [
  { field: 'Id', headerName: 'Category Id', width: 250, editable: false },
  { field: 'Name', headerName: 'Category', width: 250, editable: false },
  {
    field: 'Description',
    headerName: 'Description',
    width: 250,
    editable: false,
  },
  {
    field: 'DisplayOrder',
    headerName: 'Display Order',
    width: 100,
    editable: false,
  },
];
const EventCategoriesPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['eventcategories'],
    queryFn: () =>
      EventCategoryService.getAll().then((res) => {
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
      action={dtAction('eventcategory')}
      name="Category"
      feature={FEATURES.CATEGORIES}
    />
  );
};

export default EventCategoriesPage;
