import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { formatDate } from 'src/utils/helpers';
import { Event } from 'src/models/Event';
import SectionHeader from '../SectionHeader/SectionHeader';
import './LatestEventCard.css';
interface LatestEventProps {
  header: string;
  items: Event[] | undefined;
}

const EventCard: React.FC<LatestEventProps> = ({ items, header }) => {
  const extractTextFromHTML = (html: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText;
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className='event-card-container'
        mx={0}
        my={2}
      >
        <SectionHeader
          title={header}
          fontWeight={false}
          margin="auto"
          text="center"
        />
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        className="event-card-grid"
        mx={0}
      >
        {(!items || items.length == 0) && (
          <Typography textAlign="center" variant="h6" color="textSecondary">
            No events have taken place yet.
          </Typography>
        )}
        {items?.map((event, index) => (
          <Grid item key={event.Id} xs={12} sm={12} md={6} lg={6} mx={0} className='latest-event-card'>
            <a href={`/event/${event.Id}`} style={{ textDecoration: 'none' }}>
              <Card
                className='event-card'
              >
                {(index % 4 === 0 || index % 4 === 1) &&
                  event.FeaturedImage && (
                    <CardMedia
                      component="img"
                      height="100%"
                      image={`${import.meta.env.VITE_STATIC_URL}${
                        event.FeaturedImage
                      }`}
                      alt={event.Title}
                      className='event-card-media'
                    />
                  )}
               <div className="event-card-content" >
                  <CardContent className='event-card-body-content'>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className='event-card-title'
                    >
                      {formatDate(event.ScheduledDate || '')}
                    </Typography>

                    <Typography gutterBottom variant="h6">
                      {event.Title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {extractTextFromHTML(event.Body).slice(0, 150)}
                    </Typography>
                  </CardContent>

                  <CardContent className='event-card-category'>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      display="inline"
                    >
                      {'In '}
                    </Typography>
                    <Typography
                      variant="body2"
                      className='event-card-category-text'
                    >
                      {event.Category || 'Unknown'}
                    </Typography>
                  </CardContent>
                </div>
                {(index % 4 === 2 || index % 4 === 3) &&
                  event.FeaturedImage && (
                    <CardMedia
                      component="img"
                      height="100%"
                      image={`${import.meta.env.VITE_STATIC_URL}${
                        event.FeaturedImage
                      }`}
                      alt={event.Title}
                      style={{
                        width: '50%',
                        objectFit: 'cover',
                        maxHeight: '100%',
                      }}
                    />
                  )}
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default EventCard;
