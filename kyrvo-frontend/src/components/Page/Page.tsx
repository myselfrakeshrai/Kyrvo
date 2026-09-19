import React, { ReactNode } from 'react';
import { Box, LinearProgress, Alert } from '@mui/material';
import './page.css';

interface PageProps {
  isLoading: boolean;
  isAlert: boolean;
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  children?: ReactNode;
}

const PageComponent: React.FC<PageProps> = ({ isLoading, isAlert, severity, message, children }) => {
  return (
    <Box>
      {isLoading && <LinearProgress color="success" className="progress-bar" />}
      {isAlert && (
        <Alert severity={severity} className="alert">
          {message}
        </Alert>
      )}
      {!isLoading && !isAlert && children}
    </Box>
  );
};

export default PageComponent;
