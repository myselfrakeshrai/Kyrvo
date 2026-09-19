import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';

import React from 'react';
import { BlogCategoryService } from 'src/services/blogcategoryService';

const columns = [
  { field: 'Id', headerName: 'Category Id', width: 250, editable: false },
  { field: 'Name', headerName: 'Category', width: 250, editable: false },
];
const BlogCategoriesPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['blogcategories'],
    queryFn: () =>
      BlogCategoryService.getAll().then((res) => {
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
      action={dtAction('blogcategory')}
      name="Roles"
      feature={FEATURES.ROLES}
    />
  );
};

export default BlogCategoriesPage;
