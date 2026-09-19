import React from 'react';
import { Event } from 'src/models/Event';
import { Typography, Paper, Box } from '@mui/material';
import './EventList.css';
import { formatDate, getDay, getMonthName } from 'src/utils/helpers';
import { Link } from 'react-router-dom';
import SectionHeader from '../SectionHeader/SectionHeader';

interface UpcomingEventListProps {
  events?: Event[];
  header?: string;
}

const EventItemList: React.FC<UpcomingEventListProps> = ({
  events,
  header,
}) => {
  if (!events || events.length === 0) {
    return (
      <Paper
       className="event-list"
      >
        {header && (
          <SectionHeader
            title={header}
            fontWeight={false}
            margin="auto"
            text="center"
          />
        )}
        <Typography textAlign="center" variant="h6" color="textSecondary">
          No events are planned for now. Keep an eye out for future
          announcements.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      className="event-list"
    >
      <SectionHeader
        title={header}
        fontWeight={false}
        margin="auto"
        text="center"
      />
      {events.map((event) => (
        <Link className='link'
          key={event.Id}
          to={`/event/${event.Id}`}>
          <Box marginTop={2}
            key={event.Id || event.Title}
            className="event-detail"
           
          >
            <Box
              className="event-date-column"
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {getMonthName(event.ScheduledDate)}
              </Typography>
              <Typography variant="h5">
                {getDay(event.ScheduledDate)}
              </Typography>
            </Box>
            <Box
              className="event-info-column"
            >
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {formatDate(event?.ScheduledDate)} / {event?.ScheduledTime} -{' '}
                {formatDate(event?.EndDate)} / {event?.EndTime}
              </Typography>
              <Typography variant="h6">{event.Title}</Typography>
            </Box>
          </Box>
        </Link>
      ))}
    </Paper>
  );
};

export default EventItemList;
