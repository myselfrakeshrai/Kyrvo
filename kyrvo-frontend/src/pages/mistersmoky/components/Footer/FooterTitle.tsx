import React from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { useAppStore } from 'src/stores';
import SocialMediaIcons from '../SocialMediaIcons';

const FooterTitle: React.FC = () => {
  const { getVariable } = useAppStore();
  const FooterTitleData = getVariable('FooterTitle');
  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down('sm'));
  if (!FooterTitleData) {
    return null;
  }

  let footerTitleObject;
  try {
    footerTitleObject = JSON.parse(FooterTitleData).FooterTitle[0];
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    return null;
  }

  return (
    <Box
      sx={{
        mr: isMobile ? 0 : 40,
        mt: isMobile ? 2 : 1,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        overflow: 'auto',
        background: themeInstance.palette.primary.main,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Trebuchet MS, sans-serif',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          {footerTitleObject.title.toUpperCase()}
          <SocialMediaIcons />
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: isMobile ? '100%' : 700,
            mt: isMobile ? 1 : 2,
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          {footerTitleObject.subTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default FooterTitle;
