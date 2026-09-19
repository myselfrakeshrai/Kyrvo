import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

interface StepDetailProps {
  icon: any;
  title: string;
  desc: string;
  iconPlacement?: 'TOP' | 'SIDE';
}
const StepDetail: React.FC<StepDetailProps> = ({
  icon,
  title,
  desc,
  iconPlacement = 'TOP',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const varientHeader = iconPlacement === 'TOP' ? 'h4' : 'h6';
  const varientBody = iconPlacement === 'TOP' ? 'body1' : 'subtitle1';
  return (
    <Box
      display="flex"
      flexDirection={iconPlacement === 'SIDE' ? 'row' : 'column'}
      alignItems="center"
      gap={2}
    >
      <IconButton
        sx={{
          display: iconPlacement === 'TOP' ? 'block' : 'initial',
          padding: isMobile ? '20px' : isTablet ? '16px' : '30px',
          borderRadius: '10px',
          mb: 1,
          color: theme.palette.primary.main,
          backgroundColor: `${theme.palette.primary.main}26`,
        }}
      >
        {icon}
      </IconButton>
      <Box>
        <Typography
          variant={varientHeader}
          sx={{
            fontWeight: iconPlacement === 'TOP' ? '400' : '500',
            fontSize: isMobile ? '15x' : isTablet ? '20px' : '25px',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant={varientBody}
          sx={{
            fontSize: isMobile ? '10px' : isTablet ? '10px' : '15px',
            p: iconPlacement === 'TOP' ? '0 15%' : null,
            width: iconPlacement === 'TOP' ? null : '70%',
            mb: iconPlacement === 'TOP' ? null : 2,
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};

export default StepDetail;
