import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import './sectionheader.css';

interface SectionHeaderProps {
  title?: string;
  fontWeight?: boolean;
  alignment?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  subtitle?: string;
  text?: string;
  margin?: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  fontWeight,
  alignment,
  margin,
}) => {
  const theme = useTheme();
  return (
    <Box className="ky-section-header" alignItems={alignment}>
      {title && (
        <Typography
          variant="h1"
          className="ky-section-header-title"
          sx={{
            mb: subtitle ? 3 : 5,
            color: theme.palette.primary.main,
            fontWeight: fontWeight ? '500' : '',
            margin: margin,
            padding: '10px 25px',
            borderBottom: `2px solid ${theme.palette.secondary.main}7e`,
            backgroundColor: `${theme.palette.secondary.main}4e`,
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant="subtitle1"
          className="ky-section-header-subtitle"
          textAlign={alignment}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;
