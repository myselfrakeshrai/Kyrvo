import React from 'react';
import {
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Event } from 'src/models/Event';
import { formatDate, getImageUrl } from 'src/utils/helpers';
import './EventListCard.css';
const formatDateToMonthDay = (dateString: string | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayOfMonth = date.getDate();
  return `${dayOfWeek} ${dayOfMonth}`;
};

const limitDescription = (description: string | undefined) => {
  if (!description) return '';
  return description.length > 250
    ? `${description.substring(0, 250)}...`
    : description;
};

interface EventListCardProps {
  events?: Event[];
}

const EventListCard: React.FC<EventListCardProps> = ({ events }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const groupedEvents: { [key: string]: Event[] } = {};

  if (events) {
    events.forEach((event) => {
      const date = new Date(event.ScheduledDate || '');
      const year = date.getFullYear();
      const month = date.toLocaleDateString('en-US', { month: 'long' });
      const key = `${month} ${year}`;
      if (!groupedEvents[key]) {
        groupedEvents[key] = [];
      }
      groupedEvents[key].push(event);
    });
  }

  return (
    <Grid container direction="column" spacing={2} marginTop={2} mx={0}>
      {Object.keys(groupedEvents).map((key) => {
        const eventsOfMonth = groupedEvents[key];
        return (
          <Grid container direction="column" key={key} mx={0} pt={5}>
            {eventsOfMonth.map((event) => (
              <>
                {isMobile && event.FeaturedImage && (
                  <CardMedia
                    component="img"
                    height="150"
                    image={`${getImageUrl(event.FeaturedImage)}`}
                    alt={event.Title}
                    sx={{objectFit: "contain", backgroundImage: `url(${getImageUrl(event.FeaturedImage)})`, backgroundColor: "rgba(0,0,0,0.8)", backgroundBlendMode:'multiply', backgroundSize:'cover', padding: '15px 0px'}}
                  />
                )}
                <Grid container>
                  {!isMobile && (
                    <Grid item xs={2}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        className="mb-4"
                      >
                        {formatDateToMonthDay(event.ScheduledDate)}, {key}
                      </Typography>
                    </Grid>
                  )}

                  <Grid item xs={isMobile ? 12 : 6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="date-title"
                    >
                      {formatDate(event.ScheduledDate)} / {event.ScheduledTime}{' '}
                      - {formatDate(event.EndDate)} / {event.EndTime}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      color="textPrimary"
                      fontWeight="bold"
                      className="header"
                      textAlign="left"
                    >
                      <a href={`/event/${event.Id}`} className="link">
                        {event.Title}
                      </a>
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="mt-10"
                    >
                      {event.Venue}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="mt-20"
                      dangerouslySetInnerHTML={{
                        __html: limitDescription(event.Body),
                      }}
                    />
                  </Grid>

                  {!isMobile && event.FeaturedImage && (
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={`${import.meta.env.VITE_STATIC_URL}${
                          event.FeaturedImage
                        }`}
                        alt={event.Title}
                        sx={{objectFit: "contain", backgroundImage: `url(${getImageUrl(event.FeaturedImage)})`, backgroundColor: "rgba(0,0,0,0.8)", backgroundBlendMode:'multiply', backgroundSize:'cover', padding: '15px 0px'}}
                      />
                    </Grid>
                  )}
                </Grid>
              </>
            ))}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default EventListCard;
