import { Typography, useTheme } from '@mui/material';
import React from 'react';

interface SectionHeaderProps {
  title: string;
  fontWeight: boolean;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, fontWeight }) => {
  const theme = useTheme();
  return (
    <Typography
      variant="subtitle1"
      sx={{
        backgroundColor: `${theme.palette.primary?.main}2e`,
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
        fontWeight: fontWeight ? '500' : '',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        fontSize: '15px',
        width: 'fit-content',
        margin: 'auto',
        mb: 2,
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;
