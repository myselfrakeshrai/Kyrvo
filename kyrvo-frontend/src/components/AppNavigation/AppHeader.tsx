import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuOpen } from '@mui/icons-material';
import UserMenu from './UserMenu';
import AppDrawer from './AppDrawer';
import { useAppStore } from 'src/stores';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import NotificationAlert from './Notifications';
import { getImageUrl } from 'src/utils/helpers';
import CartAlert from './CartIcon';
import { CartProvider } from 'react-use-cart';
import {  UserMenuType } from 'src/apptypes';
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

interface AppHeaderProps {
  NoDrawer?: boolean;
  Fixed?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ NoDrawer, Fixed }) => {
  const location = useLocation();
  const isManagePage = location.pathname.startsWith('/manage');
  const { getCollectionValue, getCollection } = useAppStore();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const public_menu = getCollection('PublicMenu') as
    | PublicMenuData
    | undefined;
  const userMenuData = getCollection('UserMenu') as
    | UserMenuType
    | undefined;
  const [isScrolled, setIsScrolled] = useState(false);
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
    <>
      <Box sx={{ display: 'flex' }}>
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
          <Container maxWidth={NoDrawer ? 'xl' : false}>
            <Toolbar
              sx={{
                mt: !NoDrawer ? '0' : isScrolled ? '0' : '-30px',
                padding: '0px!important',
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
              {NoDrawer && (
                <>
                  <Box
                    component={'img'}
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      width: '50px',
                      height: 'auto',
                    }}
                    alt="Logo"
                    src={getImageUrl(getCollectionValue('AppConfig','PrimaryLogo'))}
                  ></Box>
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
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                    }}
                  >
                    {getCollectionValue('AppConfig','AppName')}
                  </Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: { xs: 'none', md: 'flex', sm: 'flex' },
                    }}
                  >
                    {public_menu?.PublicMenu?.map((item) => (
                      <NavLink
                        key={item.Text}
                        to={item.Link as string}
                        
                        target={item.Target || '_self'}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '5px 10px',
                            borderRadius: '50%',
                            color:
                              theme.palette.secondary.main,
                          }}
                        >
                          {item.Text}
                        </span>
                      </NavLink>
                    ))}
                  </Box>
                </>
              )}

              {userMenuData && (
                <Box sx={{ position: 'absolute', right: '0px' }}>
                  {!isManagePage && userMenuData.promo && (
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
                  <CartProvider>
                    {!isManagePage && userMenuData.cart && <CartAlert />}
                  </CartProvider>
                  {isManagePage && userMenuData.notification && (
                    <NotificationAlert />
                  )}
                  {userMenuData.profile && <UserMenu />}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
        {!NoDrawer && <AppDrawer open={open} />}
      </Box>
    </>
  );
};

export default AppHeader;
