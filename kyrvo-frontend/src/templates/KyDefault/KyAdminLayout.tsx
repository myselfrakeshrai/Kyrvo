import { AppNavigation } from 'src/components';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import MobileAppFooter from 'src/components/AppNavigation/MobileAppFooter';
function KyAdminLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppNavigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingX: { xs: 1, sm: 3 },
          paddingY: 10,
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
      <MobileAppFooter />
    </Box>
  );
}

export default KyAdminLayout;
