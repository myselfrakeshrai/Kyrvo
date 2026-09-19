import { AppBar, Box, Button, CssBaseline, Toolbar } from '@mui/material';
import { useAppStore } from 'src/stores';
import { getImageUrl } from 'src/utils/helpers';
import UserMenu from './UserMenu';
import { useEffect, useState } from 'react';
import CartAlert from './CartIcon';
import { UserMenuType } from 'src/apptypes';
import { NavLink } from 'react-router-dom';

const MobileAppHeader = () => {
  const { getCollectionValue, getCollection } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuData = getCollection('UserMenu') as
    | UserMenuType
    | undefined;
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        color="primary"
        sx={{
          mt: isScrolled ? '0' : '-31px',
          boxShadow: 'none',
          backdropFilter: isScrolled ? 'blur(1px)' : 'blur(2px)',
          position: isScrolled ? 'fixed' : 'relative',
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Box
              component={'img'}
              sx={{
                width: '35px',
                height: 'auto',
              }}
              alt="Logo"
              src={getImageUrl(getCollectionValue('AppConfig','SecondaryLogo'))}
            ></Box>
          </Box>
          {userMenuData?.promo && (
            <NavLink
              to={userMenuData.promo?.link as string}
              target={userMenuData.promo?.target || '_self'}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  textTransform: 'none',
                  borderRadius: 20,
                  boxShadow: 'none',
                }}
              >
                {userMenuData.promo?.text}
              </Button>
              {userMenuData?.cart && <CartAlert />}
            </NavLink>
          )}
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileAppHeader;
