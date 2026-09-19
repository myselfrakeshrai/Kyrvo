import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { BlogService } from 'src/services';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { BlogPost } from 'src/models';
import { getFormattedDate } from 'src/utils/helpers';

const columns = [
  { field: 'Id', headerName: 'Blog Id', width: 250, editable: false },
  { field: 'Title', headerName: 'Name', width: 250, editable: false },
  {
    field: 'Published',
    headerName: 'Is Published',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<BlogPost>) => {
      return params?.row?.Published ? 'Published' : 'Draft';
    },
  },
  {
    field: 'Featured',
    headerName: 'Is Featured',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<BlogPost>) => {
      return params?.row?.IsFeatured ? 'Yes' : 'No';
    },
  },
  {
    field: 'CreatedOn',
    headerName: 'Created On',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<BlogPost>) => {
      return getFormattedDate(params?.row?.CreatedOn as number);
    },
  },
];
const BlogPostsPage: React.FC = () => {
  const { dtAction } = useAppRoute();

  const { isLoading, error, data } = useQuery({
    queryKey: ['blogposts'],
    queryFn: () =>
      BlogService.getAll().then((res) => {
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
      action={dtAction('blog')}
      name="Roles"
      feature={FEATURES.ROLES}
    />
  );
};

export default BlogPostsPage;
