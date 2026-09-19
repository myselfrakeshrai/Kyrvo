import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Event } from 'src/models/Event';
import { formatDate } from 'src/utils/helpers';
import './EventCard.css';

interface EventCardProps {
  header: string;
  events: Event[] | undefined;
}

const EventCard: React.FC<EventCardProps> = ({ events, header }) => {
  const filteredItems = events?.filter(event => {
    const today = new Date();
    const scheduledDate = new Date(event.ScheduledDate || '');
    return scheduledDate > today;
  }).slice(0, 4); 

  return (
    <>
      <Typography variant="h6" component="h3" marginBottom={2} align="left">{header}</Typography>
      
        <Grid container spacing={2}>
          {filteredItems?.map((event, index) => (
            <Grid item xs={12} sm={6} key={event.Id}>
              <a href={`/event/${event.Id}`} className="event-link"> 
                <Card className='content-container'>
                  <CardMedia
                    component="img"
                    height="50"
                    width="100%" 
                    image={`${import.meta.env.VITE_STATIC_URL}${event.FeaturedImage}`}
                    alt={event.Title}
                    className='image-container' 
                  />
                  <CardContent className='p-16'> 
                    <Typography variant="h6" component="h2" align="left" className="event-title">
                      {event.Title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      <span>{formatDate(event?.ScheduledDate)} / {event?.ScheduledTime} - {formatDate(event?.EndDate)} / {event?.EndTime}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </a>
              {index !== filteredItems.length - 1 && ( 
                <hr className="event-separator" />
              )}
            </Grid>
          ))}
        </Grid>
    </>
  );
};

export default EventCard;
