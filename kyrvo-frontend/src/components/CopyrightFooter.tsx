import React from 'react';

import { Typography, useTheme } from '@mui/material';

const CopyrightFooter: React.FC = () => {
  const themeInstance = useTheme();
  
  return (
    <Typography
      className="copyright"
      padding={2}
      variant="body2"
      color={themeInstance.palette.tertiary?.main}
      align="center"
    >
      © {new Date().getFullYear()} Aussie Everest pvt. ltd.
    </Typography>
  );
};

export default CopyrightFooter;
