import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserServices } from 'src/services';
import { useAppStore } from 'src/stores';
const UserMenu: React.FC = () => {
  const { delUser, user } = useAppStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate('/login');
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = (link: string) => {
    navigate(link);
    handleMenuClose();
  };

  const handleLogout = () => {
    delUser();
    handleMenuClose();
    UserServices.logout().then(() => {
      navigate('/');
    });
  };
  return (
    <>
      <IconButton
        className='ky-nav-user'
        aria-label="user profile"
        onClick={handleMenuOpen}
        size="large"
        sx={{ p: '2px', color: { xs: '#fff', sm: theme.palette.primary.main } }}
      >
        <AccountCircle sx={{ fontSize: '2.1rem' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => onMenuItemClick('/')}>Home</MenuItem>
        <MenuItem onClick={() => onMenuItemClick('/manage')}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
