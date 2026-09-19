import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import React, { useMemo, useState } from 'react';
import { MENUITEMS } from 'src/constants/appConstants';
import { checkItemNodePermission, checkParentNodePermission } from './helpers';
import { useAppStore } from 'src/stores';
import DynamicIcon from '../DynamicIcon';
import { useNavigate } from 'react-router-dom';
import { MenuParent, MenuSubItem } from 'src/apptypes';
import PublicMenuData, { PublicMenuItem } from 'src/models/PublicMenuData';

interface MobileAppFooterProps {
  publicLinksOnly?: boolean;
}

const isPublicMenuItem = (
  item: MenuParent | PublicMenuItem,
): item is PublicMenuItem => {
  return (item as PublicMenuItem).Text !== undefined;
};

const MobileAppFooter: React.FC<MobileAppFooterProps> = ({
  publicLinksOnly,
}) => {
  const { getCollection } = useAppStore();
  const navigate = useNavigate();
  const theme = useTheme();

  const publicMenuData = getCollection('PublicMenu') as PublicMenuData;
  const publicMenu = publicMenuData?.PublicMenu;

  const menuItemList = publicLinksOnly ? publicMenu : MENUITEMS;
  const { permissions } = useAppStore();
  const [contextMenu, setContextMenu] = useState<
    MenuParent | PublicMenuItem | null
  >(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const validParents = useMemo(() => {
    return menuItemList?.filter((x) =>
      checkParentNodePermission(permissions, x as MenuParent),
    );
  }, [permissions, menuItemList]);
  const validChildren = useMemo(() => {
    return contextMenu && 'subItems' in contextMenu
      ? contextMenu.subItems?.filter((item: MenuSubItem) =>
          checkItemNodePermission(permissions, item),
        )
      : [];
  }, [contextMenu, permissions]);

  if (!isMobile) {
    return <></>;
  }

  const handleClick = (menuItem: MenuParent | PublicMenuItem) => {
    if ('subItems' in menuItem && menuItem.subItems) {
      setContextMenu(menuItem);
    } else {
      setContextMenu(null);
      const link = isPublicMenuItem(menuItem) ? menuItem.Link : menuItem.link;
      if (link) {
        navigate(link);
      }
    }
  };

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
      elevation={3}
    >
      {contextMenu && validChildren && validChildren.length > 0 && (
        <>
          <BottomNavigation showLabels>
            {validChildren?.map((item: MenuSubItem) => (
              <BottomNavigationAction
                key={item.text}
                onClick={() => {
                  if (item.link) {
                    navigate(item.link);
                  }
                  setContextMenu(null);
                }}
                icon={<DynamicIcon name={item.icon} />}
                label={item.text}
                sx={{
                  minWidth: '50px',
                  fontSize: '0.2rem',
                  overflow: 'hidden',
                  textWrap: 'nowrap',
                  maxWidth: `calc(100vw/${validChildren.length})`,
                }}
              />
            ))}
          </BottomNavigation>
          <Divider />
        </>
      )}
      <BottomNavigation showLabels>
        {validParents?.map((menuItem) => (
          <BottomNavigationAction
            key={isPublicMenuItem(menuItem) ? menuItem.Text : menuItem.text}
            onClick={() => handleClick(menuItem)}
            icon={
              <DynamicIcon
                name={
                  isPublicMenuItem(menuItem) ? menuItem.Icon : menuItem.icon
                }
              />
            }
            label={isPublicMenuItem(menuItem) ? menuItem.Text : menuItem.text}
            sx={{
              minWidth: '50px',
              maxWidth: `calc(100vw/${validParents?.length})`,
              fontSize: '0.2rem',
              overflow: 'hidden',
              textWrap: 'nowrap',
            }}
          />
        ))}
      </BottomNavigation>
      <Backdrop
        open={!!contextMenu}
        sx={{ color: '#fff', zIndex: -1 }}
        onClick={() => setContextMenu(null)}
      ></Backdrop>
    </Paper>
  );
};

export default MobileAppFooter;
