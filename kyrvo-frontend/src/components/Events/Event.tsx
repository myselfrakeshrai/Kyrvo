import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { Event } from 'src/models/Event';
import { formatDate } from 'src/utils/helpers';
import { EventTicketTypes } from 'src/models/EventType';
import './Event.css'; 

interface EventListProps {
  event: Event | undefined;
  eventType: EventTicketTypes | undefined;
}

const EventPost: React.FC<EventListProps> = ({ event, eventType }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">{event?.Title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box className="title-container">
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            <span>{formatDate(event?.ScheduledDate)} / {event?.ScheduledTime} - {formatDate(event?.EndDate)} / {event?.EndTime}</span> <span className='span'>
              {eventType?.Price === 0 ? 'Free' : `$${eventType?.Price}`}
            </span>
          </Typography>
        </Box>
      </Grid>
      {event?.FeaturedImage && (
        <Grid item xs={12}>
          <div className="post-image-container">
            <img
              src={`${import.meta.env.VITE_STATIC_URL}${event.FeaturedImage}`}
              alt={event.Title}
              className="post-image"
            />
          </div>
        </Grid>
      )}
      <Grid item xs={12}>
        <p className="post-body" dangerouslySetInnerHTML={{ __html: event?.Body || '' }}></p>
      </Grid>
    </Grid>
  );
};

export default EventPost;
