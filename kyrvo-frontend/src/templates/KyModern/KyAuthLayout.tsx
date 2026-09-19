import { Avatar, Container, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import './index.css';
import { CopyrightFooter } from 'src/components';
import { useAppStore } from 'src/stores';
import { getImageUrl } from 'src/utils/helpers';

const AuthLayout: React.FC = () => {
  const { config, getVariable } = useAppStore();
  const themeInstance = useTheme();

  return (
    <Container
      className="auth-layout-wrapper"
      style={{ backgroundColor: 'background.default' }}
    >
      <Container className="auth-box-container">
        <Avatar
          src={getImageUrl(getVariable('SecondaryLogo'))}
          sx={{
            height: '50px',
            width: '50px',
            backgroundColor: themeInstance.palette.primary.main,
            margin: '0px auto',
            boxShadow: '0px 1px 1px 1px rgba(0,0,0,0.2)',
          }}
        />
        <Typography
          variant="h5"
          sx={{ marginTop: 1, marginBottom: 2 }}
          color="primary"
        >
          {config.SystemName}
        </Typography>
        <Paper className="auth-box" elevation={10}>
          <Outlet />
        </Paper>
        <CopyrightFooter />
      </Container>
    </Container>
  );
};

export default AuthLayout;
