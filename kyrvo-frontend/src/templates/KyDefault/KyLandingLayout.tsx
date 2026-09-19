import { Box, Paper } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import { HomeFooter } from 'src/components';
import { AppNavigation } from 'src/components';
import MobileAppFooter from 'src/components/AppNavigation/MobileAppFooter';
import TopAppbar from 'src/components/AppNavigation/TopAppbar';
const HomeLayout: React.FC = () => {
  return (
    <CartProvider>
      <Box sx={{ paddingTop: '70px' }}>
        <TopAppbar />
        <AppNavigation NoDrawer={true} />
        <Paper
          elevation={0}
          sx={{
            minHeight: '80vh',
          }}
        >
          <Outlet />
        </Paper>
        <HomeFooter />
        <MobileAppFooter publicLinksOnly={true} />
      </Box>
    </CartProvider>
  );
};

export default HomeLayout;
