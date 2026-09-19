import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import KyBottomNav from './KyBottomNav/KyBottomNav';
import MobileAppHeader from './MobileAppHeader';
interface AppNavigationProps {
  NoDrawer?: boolean;
}
const AppNavigation: React.FC<AppNavigationProps> = ({ NoDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  //return isMobile ? <MobileAppHeader /> : <AppHeader NoDrawer={NoDrawer} />;
  return isMobile ? <MobileAppHeader /> : <KyBottomNav NoDrawer={NoDrawer} />;
};

export default AppNavigation;
