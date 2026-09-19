import { Button, LinearProgress, Grid, Card, useTheme } from '@mui/material';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import { useQuery } from '@tanstack/react-query';
import { Notification } from 'src/models';
import { NotificationServices } from 'src/services';
import { useNavigate } from 'react-router-dom';

const NotificationList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isLoading, error, data } = useQuery<Notification[], Error>({
    queryKey: ['dashboardNotificationData'],
    queryFn: () => NotificationServices.getReservations().then((res) => res),
  });

  const handleView = (id: number) => {
    navigate(`/ride-status/${id}`);
  };
  const convertDate = (date: number) => {
    const d = new Date(date);
    return d.toDateString();
  };
  if (isLoading) {
    return <LinearProgress color="primary" />;
  }
  if (error) {
    return <span>Couldn't load data.</span>;
  }
  return (
    <Grid>
      <Card elevation={3} sx={{ overflow: 'auto' }}>
        <Timeline position="alternate">
          {data?.map((notification: Notification) => (
            <TimelineItem key={notification.Id}>
              <TimelineOppositeContent color="text.secondary">
                {convertDate(notification.CreatedOn)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent color={theme.palette.primary.main}>
                {notification.Message}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleView(notification.TypeId)}
                >
                  View
                </Button>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Card>
    </Grid>
  );
};

export default NotificationList;
