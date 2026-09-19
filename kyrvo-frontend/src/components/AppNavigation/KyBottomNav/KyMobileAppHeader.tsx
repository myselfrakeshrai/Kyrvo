import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Menu,
  MenuItem,
} from '@mui/material';
import { useAppStore } from 'src/stores';
import { getImageUrl } from 'src/utils/helpers';
import UserMenu from '../UserMenu';
import CartAlert from '../CartIcon';
import { UserMenuType, MenuParent } from 'src/apptypes';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const KyMobileAppHeader: React.FC = () => {
  const { getCollectionValue , getCollection} = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userMenuData = getCollection('UserMenu') as
    | UserMenuType
    | undefined;
  const publicMenu = getCollection('PublicMenu') as
    | MenuParent[]
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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

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
              display: 'flex',
              alignItems: 'center',
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
            />
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Button
              onClick={handleMenuClick}
              color="inherit"
              aria-controls="menu"
              aria-haspopup="true"
              aria-label="open menu"
              sx={{ textTransform: 'none' }}
              startIcon={<MenuIcon />}
            >
              Menu
            </Button>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              PaperProps={{
                style: {
                  width: '100%', // Full width
                  top: '48px', // Adjust top position to be below the AppBar
                  left: 0, // Align to the left
                  marginTop: '48px', // Ensure it starts below the AppBar
                },
              }}
            >
              {publicMenu?.map((item) => (
                <MenuItem
                  key={item.text}
                  component={NavLink}
                  to={item.link as string}
                  sx={{ justifyContent: 'center', textAlign: 'center' }} // Center the text
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
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

export default KyMobileAppHeader;
