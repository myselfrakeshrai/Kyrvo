import React from 'react';

import Box from '@mui/material/Box';

import { Edit, ReadMore, Create, Work } from '@mui/icons-material';

import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { useResponsive } from 'src/hooks/useResponsive';
import { PAGE_ACTIONS, PERMISSION } from 'src/constants/appConstants';
import { Alert, Button, Grid, LinearProgress } from '@mui/material';
import { useAppStore } from 'src/stores';

interface DataTableProps {
  name?: string;
  iRows: GridRowsProp;
  iCols: GridColDef[];
  idColumn: string;
  baseFilters?: string[];
  mobileFilters?: string[];
  addManage?: boolean;
  feature?: string;
  action: (type: string, id?: string) => void;
}

const CustomToolbar =
  (canWrite: boolean, name: string = '', onCreate: () => void) =>
  () => {
    return (
      <GridToolbarContainer>
        <Grid container>
          <Grid item>
            <GridToolbarQuickFilter placeholder={`Search ${name}`} />
          </Grid>
          {canWrite && (
            <Grid item sx={{ marginLeft: 'auto' }}>
              <Button
                variant="outlined"
                startIcon={<Create />}
                onClick={onCreate}
                color="secondary"
                size="small"
              >
                Add
              </Button>
            </Grid>
          )}
        </Grid>
      </GridToolbarContainer>
    );
  };

const DataTable: React.FC<DataTableProps> = ({
  name,
  iRows,
  iCols,
  baseFilters,
  mobileFilters,
  idColumn,
  addManage,
  feature,
  action,
}) => {
  const { permissions } = useAppStore();
  const { isMobile } = useResponsive();
  const permissionLevel =
    permissions.find((x) => x.FeatureId === feature)?.PermissionLevel || 4;
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columnVisibilityModel = React.useMemo(() => {
    const result: any = {};
    if (isMobile) {
      return iCols?.reduce((accum, current) => {
        accum[current.field] = mobileFilters
          ? mobileFilters.includes(current.field)
          : true;
        return result;
      }, result);
    } else {
      return iCols?.reduce((accum, current) => {
        accum[current.field] = baseFilters
          ? baseFilters.includes(current.field)
          : true;
        return result;
      }, result);
    }
  }, [isMobile, baseFilters, mobileFilters, iCols]);
  const cols: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      width: 10,
      getActions: ({ row }) => {
        const buttons = [
          <GridActionsCellItem
            icon={<ReadMore />}
            label="View"
            onClick={() => action(PAGE_ACTIONS.view, row[idColumn])}
            color="inherit"
            disabled={permissionLevel < PERMISSION.view}
            showInMenu={true}
          />,
          <GridActionsCellItem
            icon={<Edit />}
            label="Update"
            className="textPrimary"
            onClick={() => action(PAGE_ACTIONS.edit, row[idColumn])}
            color="inherit"
            disabled={permissionLevel < PERMISSION.update}
            showInMenu={true}
          />,
        ];
        if (addManage)
          buttons.push(
            <GridActionsCellItem
              icon={<Work />}
              label="Manage"
              className="textPrimary"
              onClick={() => action(PAGE_ACTIONS.manage, row[idColumn])}
              color="inherit"
              disabled={permissionLevel < PERMISSION.update}
              showInMenu={true}
            />,
          );
        return buttons;
      },
    },
    ...iCols.map((x) => {
      //disable editing completely
      // x.editable = x.editable && (canWrite || canDelete);
      // return x;
      x.editable = false;
      x.flex = 1;
      return x;
    }),
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        getRowId={(row) => row[idColumn]}
        rows={iRows.map((item, index) => ({ index: index + 1, ...item }))}
        columns={cols}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        columnVisibilityModel={columnVisibilityModel}
        onRowEditStop={handleRowEditStop}
        slotProps={{
          toolbar: { showQuickFilter: true },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pageSizeOptions={[100]}
        disableRowSelectionOnClick
        slots={{
          toolbar: CustomToolbar(
            permissionLevel >= PERMISSION.write,
            name,
            () => action(PAGE_ACTIONS.create),
          ),
          loadingOverlay: LinearProgress,
          noResultsOverlay: () => (
            <Alert
              variant="standard"
              severity="info"
              sx={{ m: '0px auto', maxWidth: 180 }}
            >
              No records found.
            </Alert>
          ),
          noRowsOverlay: () => (
            <Alert
              variant="standard"
              severity="warning"
              sx={{ m: '0px auto', maxWidth: 250 }}
            >
              {`No ${name?.toLowerCase()} found.`}
            </Alert>
          ),
        }}
        sx={{
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '600!important',
          },
          '.css-qvtrhg-MuiDataGrid-virtualScroller': {
            minHeight: 'calc(100vh - 250px)',
          },
          padding: { xs: '0px', sm: 4 },
          border: { xs: '0px', sm: '1px' },
          marginTop: { xs: 4 },
          minHeight: '100px',
        }}
      />
    </Box>
  );
};

export default DataTable;
