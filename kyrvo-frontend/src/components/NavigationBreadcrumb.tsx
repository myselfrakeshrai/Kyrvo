import React from 'react';
import { useLocation, Link as RouterLink, Outlet } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Chip } from '@mui/material';

const NavigationBreadcrumb: React.FC = () => {
  const location = useLocation();
  let paths = location.pathname.split('/').filter((path) => path);
  const isHome = paths.length === 0;
  if (paths[0] === '/') {
    paths.shift();
  }
  paths = paths.slice(0, paths.length > 2 ? 2 : paths.length);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '10px' }}>
        {/* Home Chip */}
        <Chip
          key="home"
          label="Home"
          component={RouterLink}
          to="/"
          size="small"
          color={'secondary'}
          variant={isHome ? 'filled' : 'outlined'}
          sx={{ cursor: 'pointer' }}
        />

        {/* Dynamic Chips */}
        {paths.map((item, index) => {
          const last = index === paths.length - 1;
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const chipKey = `chip-${index}`; // Unique key for each Chip
          return last ? (
            <Chip
              key={chipKey}
              label={item}
              component={RouterLink}
              to={href}
              size="small"
              color="secondary"
              variant="filled"
              sx={{ cursor: 'pointer', minWidth: '35px' }}
            />
          ) : (
            <Chip
              key={chipKey}
              label={item}
              variant="outlined"
              component={RouterLink}
              to={href}
              size="small"
              color="secondary"
              sx={{ cursor: 'pointer', minWidth: '34px' }}
            />
          );
        })}
      </Breadcrumbs>
      <Outlet />
    </>
  );
};

export default NavigationBreadcrumb;
