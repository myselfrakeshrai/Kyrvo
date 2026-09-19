import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Event } from 'src/models/Event';
import { EventService } from 'src/services/eventService';
import PageComponent from 'src/components/Page/Page';
import { Grid, TextField, Button } from '@mui/material';
import EventListCard from 'src/components/Events/EventListCard';
import { LocationPicker } from 'src/components';
import './index.css';
import KyContentSection from 'src/components/KyContentSection';

const EventListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [venueAddress, setVenueAddress] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { isLoading: eventsLoading, data: events } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: () =>
      EventService.getAll().then((res) => {
        return res;
      }),
  });

  const filteredEvents = events
    ?.filter(
      (event) =>
        new Date(event.ScheduledDate || 0) > today &&
        (event.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.Body.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (venueAddress === '' ||
          event.Venue?.toLowerCase().includes(venueAddress.toLowerCase())),
    )
    .sort((a, b) => {
      const dateA = new Date(a.ScheduledDate || 0);
      const dateB = new Date(b.ScheduledDate || 0);
      return dateA.getTime() - dateB.getTime();
    });

  const eventsPerPage = 5;

  const startIndex = Math.max((currentPage - 1) * eventsPerPage, 0);
  const endIndex = Math.min(
    startIndex + eventsPerPage,
    filteredEvents?.length || 0,
  );

  const paginatedEvents = filteredEvents?.slice(startIndex, endIndex);

  const totalPages = Math.ceil((filteredEvents?.length || 0) / eventsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <PageComponent
      isLoading={eventsLoading}
      isAlert={false}
      severity="success"
      message=""
    >
      <KyContentSection maxWidth="xl">
        <Grid
          container
          spacing={2}
          alignItems="center"
          className="searchContainer"
        >
          <div className="searchBox">
            <TextField
              label="Search for events"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searchInput"
            />
          </div>
          <div className="locationPickerBox">
            <LocationPicker
              label="In a location"
              defaultValue=""
              onSelect={(value: string) => setVenueAddress(value)}
              error={false}
              message=""
              country="us"
            />
          </div>
        </Grid>
        <EventListCard events={paginatedEvents || []} />
        <Grid
          container
          justifyContent="space-between"
          className="paginationButtons"
          mt={5}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Grid>
      </KyContentSection>
    </PageComponent>
  );
};

export default EventListPage;
