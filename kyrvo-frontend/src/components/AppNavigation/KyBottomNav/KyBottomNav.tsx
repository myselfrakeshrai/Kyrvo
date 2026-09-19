import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuOpen } from '@mui/icons-material';
import UserMenu from '../UserMenu';
import AppDrawer from '../AppDrawer';
import { useAppStore } from 'src/stores';
import { NavLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import NotificationAlert from '../Notifications';
import { getImageUrl } from 'src/utils/helpers';
import CartAlert from '../CartIcon';
import { CartProvider } from 'react-use-cart';
import { UserMenuType } from 'src/apptypes';
import KyContentSection from 'src/components/KyContentSection';
import PublicMenuData from 'src/models/PublicMenuData';

const drawerWidth = 250;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 0,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(99% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface KyBottomNavProps {
  NoDrawer?: boolean;
  Fixed?: boolean;
}

const KyBottomNav: React.FC<KyBottomNavProps> = ({ NoDrawer, Fixed }) => {
  const { getCollection } = useAppStore();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const publicMenuData = getCollection('PublicMenu') as PublicMenuData;
  const userMenuData = getCollection('UserMenu') as UserMenuType;
  const appConfig = getCollection('AppConfig');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const logoWidth = appConfig?.TextLogo ? '50px' : '200px';

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
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#fff',
      }}
    >
      <CssBaseline />
      <AppBar
        open={open}
        sx={{
          boxShadow: 'none',
          backgroundColor: '#fff',
          position:
            !NoDrawer || Fixed ? 'fixed' : isScrolled ? 'fixed' : 'relative',
        }}
      >
        <Toolbar
          sx={{
            mt: !NoDrawer ? '0' : isScrolled ? '0' : '-30px',
            padding: '0px !important',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {!NoDrawer && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{ marginLeft: open ? '10px' : '5%' }}
            >
              {open ? <MenuOpen /> : <Menu />}
            </IconButton>
          )}
          {!NoDrawer && userMenuData && (
            <Box
              sx={{
                position: 'absolute',
                right: '0px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {userMenuData.promo && (
                <NavLink
                  to={userMenuData.promo?.link as string}
                  target={userMenuData.promo?.target || '_self'}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 10,
                      boxShadow: 'none',
                    }}
                  >
                    {userMenuData.promo?.text}
                  </Button>
                </NavLink>
              )}
              <CartProvider>{userMenuData.cart && <CartAlert />}</CartProvider>
              {userMenuData.notification && <NotificationAlert />}
              {userMenuData.profile && <UserMenu />}
            </Box>
          )}
          {NoDrawer && (
            <KyContentSection py={0} my={0} backgroundColor={'#fff'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  backgroundColor: '#fff',
                  height: '60px',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {NoDrawer && (
                    <>
                      <Box
                        component={'img'}
                        sx={{
                          display: { xs: 'none', md: 'flex' },
                          maxWidth: logoWidth,
                          height: 'auto',
                        }}
                        alt="Logo"
                        src={getImageUrl(appConfig?.PrimaryLogo as string)}
                      />
                      { appConfig?.TextLogo &&<Box>
                      <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                          mr: 2,
                          ml: 1,
                          display: { xs: 'none', md: 'flex' },
                          fontWeight: 700,
                          fontSize: '1.87rem',
                          color: theme.palette.primary.main,
                          textDecoration: 'none',
                          lineHeight: '1',
                        }}
                      >
                        {appConfig?.AppName}
                      </Typography>
                      {appConfig?.Slogan && <Typography variant='body1' sx={{fontSize: '0.67rem', color: theme.palette.secondary.main, textAlign: 'right', marginRight: '17px'}}>{appConfig?.Slogan}</Typography>}

                      </Box>}
                    </>
                  )}
                </Box>
                {userMenuData?.promo && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 10,
                      boxShadow: 'none',
                      marginRight: '16px',
                    }}
                  >
                    {userMenuData.promo?.text}
                  </Button>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  mt: 0,
                  mb: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {NoDrawer &&
                    publicMenuData?.PublicMenu.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.Link as string}
                        style={{
                          textDecoration: 'none',
                          display: 'inline-block',
                          padding: '5px 10px',
                          borderRadius: '50%',
                          color: theme.palette.primary.main,
                          marginRight: '8px',
                          textAlign: 'center',
                        }}
                        target={item.Target || '_self'}
                      >
                        {item.Text}
                      </NavLink>
                    ))}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '16px',
                  }}
                >
                  {userMenuData && (
                    <>
                      <CartProvider>
                        {userMenuData.cart && <CartAlert />}
                      </CartProvider>
                      {userMenuData.notification && <NotificationAlert />}
                      {userMenuData.profile && <UserMenu />}
                    </>
                  )}
                </Box>
              </Box>
            </KyContentSection>
          )}
        </Toolbar>
      </AppBar>
      {!NoDrawer && <AppDrawer open={open} />}
    </Box>
  );
};

export default KyBottomNav;
