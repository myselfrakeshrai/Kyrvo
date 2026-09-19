import React from 'react';
import { Outlet } from 'react-router-dom';
import { HomeFooter } from 'src/components';
import AppHeader from 'src/components/AppNavigation/AppHeader';

const KyLandingLayout: React.FC = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <HomeFooter />
    </>
  );
};

export default KyLandingLayout;
