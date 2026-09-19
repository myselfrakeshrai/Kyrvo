import {
  Facebook,
  FmdGood,
  Instagram,
  Phone,
  Twitter,
} from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppStore } from 'src/stores';
import { TikTokIcon } from '../CustomIcons/TikTokIcon';
import KyContentSection from '../KyContentSection';

const TopAppbar: React.FC = () => {
  const themeInstance = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  const { getCollectionValue } = useAppStore();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <AppBar
      position="fixed"
      sx={{
        background: themeInstance.palette.primary.main,
        padding: { xs: '0', sm: '', lg: '', md: '' },
        width: '100%',
        height: '40px',
        boxShadow: 'none',
        display: isScrolled ? 'none' : 'block',
      }}
    >
      <KyContentSection py={0} px={0}>
        <Toolbar
          sx={{
            mt: '-11px',
            padding: '0px!important',
          }}
        >
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              display: { xs: 'none', sm: 'block', lg: 'block', md: 'block' },
              ml: -1,
            }}
          >
            <FmdGood />
          </IconButton>
          <Typography
            variant="body1"
            component="div"
            sx={{
              flexGrow: 0,
              display: { xs: 'none', sm: 'block', lg: 'block', md: 'block' },
            }}
          >
            {getCollectionValue('ContactInfo','Address')}
          </Typography>
          {getCollectionValue('ContactInfo','Phone')&& (
            <>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  ml: { xs: 1, md: 0, lg: 2 },
                  display: {
                    xs: 'block',
                    sm: 'block',
                    lg: 'block',
                    md: 'block',
                  },
                }}
              >
                <Phone />
              </IconButton>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'block',
                    sm: 'block',
                    lg: 'block',
                    md: 'block',
                  },
                }}
              >
                {getCollectionValue('ContactInfo','Phone')}
              </Typography>
            </>
          )}
          {getCollectionValue('ContactInfo','Facebook') && (
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              href={getCollectionValue('ContactInfo','Facebook')}
            >
              <Facebook />
            </IconButton>
          )}
          {getCollectionValue('ContactInfo','Instagram') && (
             <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              href={getCollectionValue('ContactInfo','Instagram')}
            >
              <Instagram />
            </IconButton>
          )}
          {getCollectionValue('ContactInfo','Twitter')&& (
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              href={getCollectionValue('ContactInfo','Twitter')}
            >
              <Twitter />
            </IconButton>
          )}
          {getCollectionValue('ContactInfo','Tiktok')&& (
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              href={getCollectionValue('ContactInfo','Tiktok')}
            >
              <TikTokIcon />
            </IconButton>
          )}
        </Toolbar>
      </KyContentSection>
    </AppBar>
  );
};

export default TopAppbar;
