import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { EventService } from 'src/services/eventService';
import { UserServices } from 'src/services';
import PageComponent from 'src/components/Page/Page';
import EventPost from 'src/components/Events/Event';
import EventCard from 'src/components/Events/EventCard';
import EventDetailCard from 'src/components/Events/EventDetailCard';
import { Box } from '@mui/material';
import { EventTypeService } from 'src/services/eventtypeService';
import { EventTicketTypes } from 'src/models/EventType';
import EventTicketTypeCard from 'src/components/Events/EventTicketTypeCard';
import { CartProvider } from 'react-use-cart';
import './index.css';
import KyContentSection from 'src/components/KyContentSection';

const EventPage: React.FC = () => {
  const { id } = useParams();

  const { isLoading: eventsLoading, data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () =>
      EventService.getAll().then((res) => {
        return res;
      }),
  });

  const { isLoading: currentEventLoading, data: currentEvent } = useQuery({
    queryKey: ['currentEvent'],
    queryFn: () =>
      id
        ? EventService.get(id as string).then((res) => res)
        : Promise.resolve(null),
  });

  const { isLoading: eventTypeLoading, data: eventTypeData } = useQuery({
    queryKey: currentEvent?.EventTicketTypeId?.split('|') || [],
    queryFn: async () => {
      const eventTypes = await Promise.all(
        currentEvent?.EventTicketTypeId?.split('|').map((id) =>
          EventTypeService.getType(id as string),
        ) || [],
      );
      console.log(eventTypes);
      return eventTypes;
    },
    staleTime: 100,
  });

  const findSmallestPriceEventType = () => {
    if (!eventTypeData || eventTypeData.length === 0) {
      return undefined;
    }
    return eventTypeData.reduce(
      (acc: EventTicketTypes | undefined, eventType: EventTicketTypes) => {
        if (!acc || eventType.Price < acc.Price) {
          return eventType;
        }
        return acc;
      },
      undefined,
    );
  };

  const smallestPriceEventType = findSmallestPriceEventType();

  const [userProfileEnabled, setUserProfileEnabled] = useState(false);

  useEffect(() => {
    if (currentEvent && currentEvent.OrganizerId) {
      setUserProfileEnabled(true);
    }
  }, [currentEvent]);

  const userProfileQuery = useQuery({
    queryKey: ['userProfile'],
    queryFn: () =>
      UserServices.getProfile(currentEvent?.OrganizerId as string).then(
        (res) => res,
      ),
    enabled: userProfileEnabled,
  });

  const { isLoading: userProfileLoading, data: userProfile } = userProfileQuery;

  if (userProfile && currentEvent) {
    currentEvent.Organizer = `${userProfile.FirstName} ${userProfile.LastName}`;
  }

  const categories = currentEvent?.Category
    ? currentEvent.Category.split('|')
    : [];
  const relatedEvents = events?.filter(
    (event) =>
      categories.some(
        (category) => event.Category?.split('|').includes(category.trim()),
      ) && event.Id !== id,
  );

  return (
    <PageComponent
      isLoading={
        eventsLoading ||
        currentEventLoading ||
        userProfileLoading ||
        eventTypeLoading
      }
      isAlert={!id || !currentEvent}
      severity="error"
      message=""
    >
      <KyContentSection maxWidth="xl" py={5}>
        {currentEvent && (
          <Box className="event-page-container" mx={0}>
            <Box className="event-page-box">
              <EventPost
                event={currentEvent}
                eventType={smallestPriceEventType}
              />
            </Box>
            <Box className="event-page-box">
              <EventDetailCard
                event={currentEvent}
                eventType={smallestPriceEventType}
              />
            </Box>
            {relatedEvents && relatedEvents.length > 0 && (
              <Box className="related-events-box">
                <EventCard header="Related Events" events={relatedEvents} />
              </Box>
            )}
            {eventTypeData && eventTypeData.length > 0 && currentEvent.Id && (
              <Box className="ticket-types-box">
                <CartProvider>
                  <EventTicketTypeCard
                    eventId={currentEvent.Id}
                    eventTitle={currentEvent.Title}
                    ticketTypes={eventTypeData}
                  />
                </CartProvider>
              </Box>
            )}
          </Box>
        )}
      </KyContentSection>
    </PageComponent>
  );
};

export default EventPage;
