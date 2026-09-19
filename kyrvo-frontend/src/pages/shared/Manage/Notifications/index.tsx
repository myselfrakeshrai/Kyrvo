import { Grid, Typography } from '@mui/material';
import React from 'react';
import NotificationList from 'src/components/NotificationList';

const NotificationPage: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Typography variant="h6">System Notification</Typography>
        <NotificationList />
      </Grid>
    </Grid>
  );
};

export default NotificationPage;