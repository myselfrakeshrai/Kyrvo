import { Notifications } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationServices } from 'src/services';
import { useAppStore } from 'src/stores';

const NotificationAlert: React.FC = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();
  const [notificationNo, setNotificationrNo] = useState<number>(0);
  const onNotificationClick = (link: string) => {
    navigate(link);
  };

  useEffect(() => {
    NotificationServices.getReservations().then((res) => {
      setNotificationrNo(res.length);
    });
  }, []);
  return user ? (
    <IconButton
      size="large"
      aria-label={`show ${notificationNo} new notifications`}
      color="primary"
      sx={{ marginLeft: 'auto' }}
      onClick={() => onNotificationClick('/manage/notifications')}
    >
      <Badge badgeContent={notificationNo} color="secondary">
        <Notifications />
      </Badge>
    </IconButton>
  ) : (
    <></>
  );
};

export default NotificationAlert;
