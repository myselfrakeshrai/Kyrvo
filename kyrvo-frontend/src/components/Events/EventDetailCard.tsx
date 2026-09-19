import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Event } from 'src/models/Event';
import { formatDate } from 'src/utils/helpers';
import { EventTicketTypes } from 'src/models/EventType';

interface EventDetailCardProps {
  event: Event | undefined;
  eventType: EventTicketTypes | undefined;
}

const EventCard: React.FC<EventDetailCardProps> = ({ event, eventType }) => {

  
  const mainHeaderStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const subHeaderStyle = {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: 'text.secondary', 
    marginBottom: '0.25rem', 
  };

  const contentStyle = {
    fontSize: '0.8rem',
    color: 'text.secondary',
    marginBottom: '0.5rem', 
  };

  const colorStyle = {
    color: '#d43c18', 
  };

  const categoryStyle = {
    marginRight: '0.5rem', 
    marginBottom: '0.5rem',  
    display: 'inline-block',  
  };

  const boxStyle = {
    margin: '0.5rem',
  };
  return (
    <Grid container spacing={2} display="flex" flexDirection="row" justifyContent="space-between">
      <Grid item xs={12} display={'flex'}>
          <Box flex="1" sx={boxStyle}>
            <Typography variant="subtitle1" sx={mainHeaderStyle}>Details</Typography>
            <Typography variant="subtitle1" sx={subHeaderStyle}>Start:</Typography>
            <Typography variant="subtitle1" sx={contentStyle}>{formatDate(event?.ScheduledDate)} / {event?.ScheduledTime}</Typography>
            <Typography variant="subtitle1" sx={subHeaderStyle}>End:</Typography>
            <Typography variant="subtitle1" sx={contentStyle}>{formatDate(event?.EndDate)} / {event?.EndTime}</Typography>
            <Typography variant="subtitle1" sx={subHeaderStyle}>Category:</Typography>
            <Typography variant="subtitle1" sx={contentStyle}>
              {event?.Category?.split('|').map((category, index, array) => (
                <React.Fragment key={index}>
                  <span style={categoryStyle}>{category.trim()}</span>
                  {index !== array.length - 1 && ', '}
                </React.Fragment>
              ))}
            </Typography>
            <Typography variant="subtitle1" sx={subHeaderStyle}>Cost:</Typography>
            {eventType && (
              <Typography variant="subtitle1" sx={{ ...contentStyle, ...colorStyle }}>
                {eventType.Price === 0 ? 'Free' : `$${eventType.Price}`}
              </Typography>
            )}
            <Typography variant="subtitle1" sx={subHeaderStyle}>Website:</Typography>
            <a href={event?.EventWebsite}>
            <Typography variant="subtitle1" sx={{...contentStyle, ...colorStyle}}>{event?.EventWebsite}</Typography>
            </a>
          </Box>
          <Box flex="1" sx={boxStyle}>
            <Typography variant="subtitle1" sx={mainHeaderStyle}>Organizer</Typography>
            <Typography variant="subtitle1" sx={subHeaderStyle}>Name:</Typography>
            <Typography variant="subtitle1" sx={{ ...contentStyle, ...colorStyle }}>{event?.Organizer}</Typography>
            <Typography variant="subtitle1" sx={subHeaderStyle}>Phone:</Typography>
            <Typography variant="subtitle1" sx={{ ...contentStyle}}>{event?.OrganizerNumber}</Typography>
            <Typography variant="subtitle1" sx={subHeaderStyle}>Name:</Typography>
            <Typography variant="subtitle1" sx={{ ...contentStyle}}>{event?.OrganizerEmail}</Typography>
          </Box>
          <Box flex="1" sx={boxStyle}>
            <Typography variant="subtitle1" sx={mainHeaderStyle}>Venue</Typography>
            <Typography variant="subtitle1" sx={subHeaderStyle}>Location:</Typography>
            <Typography variant="subtitle1" sx={contentStyle}>{event?.Venue}</Typography>
          </Box>
      </Grid>
    </Grid>
  );
};

export default EventCard;
