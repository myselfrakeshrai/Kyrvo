import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from 'src/utils/helpers';
import { useAppStore } from 'src/stores';
import { MENUITEMS } from 'src/constants/appConstants';
import DynamicIcon from '../DynamicIcon';
import { checkItemNodePermission, checkParentNodePermission } from './helpers';
import { MenuParent } from 'src/apptypes';
import './appNavigation.css';
const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface AppDrawerProps {
  open: boolean;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ open }) => {
  const { getVariable, getModules, permissions } = useAppStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const [openItem, setOpenItem] = useState<MenuParent | undefined>(undefined);
  useEffect(() => {
    setOpenItem(undefined);
  }, [open]);

  const validModule = useCallback(
    (features: string[] | undefined) => {
      if (!features) {
        return true;
      }
      for (let index = 0; index < features.length; index++) {
        if (getModules().indexOf(features[index]) > -1) {
          return true;
        }
      }
      return false;
    },
    [getModules],
  );

  const validParents = useMemo(() => {
    return MENUITEMS.filter((parent) => {
      if (!validModule(parent.features)) {
        return false;
      }

      if (!checkParentNodePermission(permissions, parent)) {
        return false;
      }

      if (parent.subItems) {
        parent.subItems = parent.subItems.filter((child) =>
          checkItemNodePermission(permissions, child),
        );
      }

      return true;
    });
  }, [permissions, validModule]);

  const handleClick = (menuItem: MenuParent) => {
    if (openItem && openItem.text !== menuItem.text) {
      setOpenItem(undefined);
    }

    if (menuItem.subItems) {
      setOpenItem(openItem === menuItem ? undefined : menuItem);
    } else {
      setOpenItem(undefined);
      navigate(menuItem.link as string);
    }
  };
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    console.log(event.target);
    const drawerElement = document.querySelector('.MuiDrawer-root');
    const target = event.target as Node;
    if (drawerElement && !drawerElement.contains(target)) {
      setOpenItem(undefined);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);
  const generateButtonStyles = () => ({
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    color: theme.palette.tertiary?.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '10px',
      border: 'none',
      margin: '5px 5px',
    },
  });

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.primary.main,
          borderRadius: '10px',
          margin: '5px',
          height: '99%',
        },
      }}
    >
      {open ? (
        <DrawerHeader sx={{ color: theme.palette.tertiary?.main }}>
          <Box
            component={'img'}
            className='ky-logo-mobile'
            alt="Logo"
            src={getImageUrl(getVariable('SecondaryLogo'))}
          ></Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            className='ky-logo-name'
          >
            {getVariable('AppName')}
          </Typography>
        </DrawerHeader>
      ) : (
        <Box
          component={'img'}
          className='ky-logo-desk'
          alt="Web Logo"
          src={getImageUrl(getVariable('SecondaryLogo'))}
        ></Box>
      )}
      <Divider
        sx={{
          border: `1px solid ${theme.palette.secondary.main}`,
        }}
        className='ky-nav-line'
      />
      <List>
        {validParents.map((menuItem, index) => (
          <React.Fragment key={index}>
            {menuItem.subItems ? (
              <React.Fragment>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    color: theme.palette.tertiary?.main,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.tertiary?.main,
                      margin: '5px',
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.tertiary?.main,
                        borderRadius: '10px',
                      },
                    },
                  }}
                  onClick={() => handleClick(menuItem)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      ml: open ? 'auto' : 3,
                      color: theme.palette.tertiary?.main,
                    }}
                  >
                    <DynamicIcon name={menuItem.icon} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      ml: open ? 1 : 3,
                    }}
                    primary={menuItem.text}
                  />
                  {open ? (
                    openItem && openItem.text === menuItem.text ? (
                      <ExpandLess
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(menuItem);
                        }}
                      />
                    ) : (
                      <ExpandMore
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(menuItem);
                        }}
                      />
                    )
                  ) : null}
                </ListItemButton>
                <Collapse in={openItem && openItem.text === menuItem.text}>
                  {open ? (
                    <List component="div" disablePadding sx={{ ml: 3 }}>
                      {menuItem.subItems.map((subItem, subIndex) => (
                        <React.Fragment key={`${index}-${subIndex}`}>
                          <Box key={index}>
                            <ListItemButton
                              key={subIndex}
                              onClick={() => {
                                if (subItem.link) {
                                  navigate(subItem.link);
                                  setOpenItem(undefined);
                                }
                              }}
                              sx={{
                                borderLeft: `1px solid ${theme.palette.secondary.main}`,
                                width: '95%',
                                ...generateButtonStyles(),
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  color: theme.palette.tertiary?.main,
                                }}
                              >
                                <DynamicIcon name={subItem.icon} />
                              </ListItemIcon>
                              <ListItemText primary={subItem.text} />
                            </ListItemButton>
                          </Box>
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <List
                      component="div"
                      disablePadding
                      sx={{
                        m: 10,
                        position: 'fixed',
                        background: `${theme.palette.primary.main}`,
                        borderRadius: '10px',
                        mt: -7,
                        width: 1 / 5,
                        backdropFilter: 'blur(5px)',
                      }}
                    >
                      {menuItem.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          onClick={() => {
                            if (subItem.link) {
                              navigate(subItem.link);
                              setOpenItem(undefined);
                            }
                          }}
                          sx={{
                            display: 'flex',
                            alignContent: 'space-between',
                            ...generateButtonStyles(),
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: theme.palette.tertiary?.main,
                            }}
                          >
                            <DynamicIcon name={subItem.icon} />
                          </ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      ))}
                    </List>
                  )}
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItemButton
                onClick={() => {
                  if (menuItem.link) {
                    navigate(menuItem.link);
                    setOpenItem(undefined);
                  }
                }}
                sx={{
                  ...generateButtonStyles(),
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.tertiary?.main,
                    mr: 1,
                    ml: open ? 'auto' : 3,
                  }}
                >
                  <DynamicIcon name={menuItem.icon} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    ml: open ? -3 : -2,
                  }}
                  primary={menuItem.text}
                />
              </ListItemButton>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
