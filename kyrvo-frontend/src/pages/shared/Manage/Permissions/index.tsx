import { Alert, LinearProgress } from '@mui/material';
import React from 'react';
import { DataTable } from 'src/components';
import {
  FeatureServices,
  PermissionServices,
  RoleServices,
} from 'src/services';
import { useQuery } from '@tanstack/react-query';
import { Feature, Role } from 'src/models';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';

const PermissionsPage: React.FC = () => {
  const { dtAction } = useAppRoute();
  const { isLoading, error, data } = useQuery({
    queryKey: ['permissions_page'],
    queryFn: () =>
      PermissionServices.getAll().then((res) => {
        return res;
      }),
    staleTime: 20,
  });
  const roles = useQuery({
    queryKey: ['roles'],
    queryFn: () => RoleServices.getAll().then((res) => res),
  });

  const features = useQuery({
    queryKey: ['features'],
    queryFn: () => FeatureServices.getAll().then((res) => res),
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
  const columns = [
    {
      field: 'RoleId',
      headerName: 'Role',
      width: 250,
      editable: false,
      type: 'singleSelect',
      valueOptions: (roles.data as Role[])?.map((role) => ({
        value: role.Id,
        label: role.Name,
      })),
    },
    {
      field: 'FeatureId',
      headerName: 'Feature',
      width: 250,
      editable: false,
      type: 'singleSelect',
      valueOptions: (features.data as Feature[])?.map((feature) => ({
        value: feature.Id,
        label: feature.Name,
      })),
    },
    {
      field: 'PermissionLevel',
      headerName: 'PermissionLevel',
      width: 230,
      editable: false,
      type: 'singleSelect',
      valueOptions: [
        { value: 1, label: 'Read' },
        { value: 2, label: 'Write' },
        { value: 3, label: 'Update' },
        { value: 4, label: 'Delete' },
      ],
    },
  ];
  return (
    <DataTable
      iRows={data || []}
      iCols={columns}
      idColumn="Id"
      action={dtAction('permissions')}
      name="permissions"
      feature={FEATURES.PERMISSION}
    />
  );
};

export default PermissionsPage;
