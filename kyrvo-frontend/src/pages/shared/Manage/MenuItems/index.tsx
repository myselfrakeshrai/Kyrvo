import React from 'react';
import { Alert, LinearProgress } from '@mui/material';
import { DataTable } from 'src/components';
import { MenuItemService } from 'src/services/menuItemService';
import { useQuery } from '@tanstack/react-query';
import { useAppRoute } from 'src/hooks/useAppRoute';
import { FEATURES } from 'src/constants/appConstants';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { MenuItems } from 'src/models/MenuItems';
import { getFormattedDate } from 'src/utils/helpers';
import { EventCategoryService } from 'src/services/eventcategoryService';

const columns = [
  { field: 'Id', headerName: 'Item Id', width: 250, editable: false },
  { field: 'Name', headerName: 'Name', width: 250, editable: false },
  {
    field: 'Description',
    headerName: 'Description',
    width: 250,
    editable: false,
  },
  { field: 'Price', headerName: 'Price', width: 250, editable: false },
  { field: 'Category', headerName: 'Category', width: 250, editable: false },
  { field: 'MealType', headerName: 'Meal type', width: 250, editable: false },
  { field: 'PrepTime', headerName: 'Prep Time', width: 250, editable: false },
  {
    field: 'CreatedOn',
    headerName: 'Created On',
    width: 230,
    editable: false,
    renderCell: (params: GridRenderCellParams<MenuItems>) => {
      return getFormattedDate(params?.row?.CreatedOn as number);
    },
  },
];

const MenuItemsPage: React.FC = () => {
  const { dtAction } = useAppRoute();
  const { isLoading, error, data } = useQuery({
    queryKey: ['menuitems'],
    queryFn: async () => {
      const menuItems = await MenuItemService.getAll();
      const mappedMenuItems = await Promise.all(
        menuItems.map(async (item: MenuItems) => {
          const category = await EventCategoryService.get(item.Category);
          const categoryName = category?.Name || '';
          return { ...item, Category: categoryName };
        }),
      );
      return mappedMenuItems;
    },
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
      action={dtAction('menu')}
      name="MenuTems"
      feature={FEATURES.MENUITEMS}
    />
  );
};

export default MenuItemsPage;
