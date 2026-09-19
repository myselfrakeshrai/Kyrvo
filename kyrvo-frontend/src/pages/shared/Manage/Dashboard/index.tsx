import React from 'react';
import { Grid, Typography } from '@mui/material';
import { UserInfo } from 'src/components';
import NotificationList from 'src/components/NotificationList';

const DashboardPage: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        {/* <AnalyticInfo /> */}
        <Typography variant="h6">System Notification</Typography>
        <NotificationList />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} sx={{ 
        '@media screen and (max-width: 600px)': {
          ml: 0,
          mt: 1, 
        },
        '@media screen and (max-width: 1000px)': {
          ml: 0,
          mt: 1, 
        },
        ml: 4  }}>
        <UserInfo />
        {/* <Typography variant="h6">Quick Links</Typography> */}
        {/* <QuickLinks /> */}
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
