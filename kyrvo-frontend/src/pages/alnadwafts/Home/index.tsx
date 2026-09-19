import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SectionHeader } from 'src/components';
import CountDownCard from 'src/components/Events/CountDownCard';
import EventItemList from 'src/components/Events/EventList';
import PageComponent from 'src/components/Page/Page';
import Slider from 'src/pages/shared/Slider/Slider';
import { EventService } from 'src/services/eventService';
import './index.css';
import KyContentSection from 'src/components/KyContentSection';

const HomePage: React.FC = () => {
  const { isLoading: eventsLoading, data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () =>
      EventService.getAll().then((res) => res.filter((x) => x.Published === 1)),
  });

  const upcomingEvents = events
    ?.filter((event) => {
      const today = new Date();
      const scheduledDate = new Date(event.ScheduledDate || '');
      return scheduledDate > today;
    })
    .sort((a, b) => {
      const aDate = new Date(a.ScheduledDate || '').getTime();
      const bDate = new Date(b.ScheduledDate || '').getTime();
      return aDate - bDate;
    })
    .slice(0, 3);

  const firstUpcomingEvent = upcomingEvents?.find((event) => event.IsFeatured);

  return (
    <>
      <PageComponent
        isLoading={eventsLoading}
        isAlert={false}
        severity="info"
        message=""
      > 
        <Slider />
        <KyContentSection maxWidth="xl" py={10}>
          <SectionHeader
            title={'Events'}
            fontWeight={false}
            margin="auto"
            text="center"
          />
          <Grid container className="event-list-container" mx={0} my={2} spacing={5}>
            <Grid item xs={12} sm={12} md={6} lg={6} mx={0} px={2}>
              <CountDownCard
                Id={firstUpcomingEvent?.Id}
                Title={firstUpcomingEvent?.Title}
                Body={firstUpcomingEvent?.Body}
                ScheduledDate={firstUpcomingEvent?.ScheduledDate}
                ScheduledTime={firstUpcomingEvent?.ScheduledTime}
                Image={firstUpcomingEvent?.FeaturedImage}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} mx={0} py={2}>
              <EventItemList events={upcomingEvents} />
            </Grid>
          </Grid>
        </KyContentSection>
      </PageComponent>
    </>
  );
};

export default HomePage;
