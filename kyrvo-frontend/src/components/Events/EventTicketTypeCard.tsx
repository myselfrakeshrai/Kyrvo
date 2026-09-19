import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Typography, Box, Button } from '@mui/material';
import { EventTicketTypes } from 'src/models/EventType';
import { useCart } from 'react-use-cart';
import './EventTicketTypeCard.css';

interface EventTicketTypeCardProps {
  ticketTypes?: EventTicketTypes[];
  eventId: string;
  eventTitle:string;
}

const EventTicketTypeCard: React.FC<EventTicketTypeCardProps> = ({ ticketTypes, eventId, eventTitle }) => {
  const { addItem, items } = useCart();

  const isAlreadyInCart = (ticketId: string | undefined, eventId: string) => {
    return items.some(
      (item) => item.eventTicketTypeId === ticketId && item.eventId === eventId
    );
  };

  const handleAddToCart = (ticket: EventTicketTypes) => {
    if (isAlreadyInCart(ticket.Id?.toString(), eventId)) {
      window.alert(`${ticket.Title} is already in the cart.`);
      return;
    }

    const newItem = {
      id: uuidv4(),
      price: ticket.Price,
      name: eventTitle +"("+ ticket.Title + ")",
      description: ticket.Description,
      eventId,
      eventTicketTypeId: ticket.Id?.toString(),
    };

    addItem(newItem, 1);
    window.alert(`${ticket.Title} has been added to the cart.`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" component="h3" align="left">Event Tickets</Typography>
      </Grid>
      {ticketTypes && ticketTypes.length > 0 ? (
        ticketTypes.map((ticket) => (
          <Grid item xs={12} key={ticket.Id}>
            <Box className="ticket-box">
              <Typography variant="h6" className="ticket-title">{ticket.Title}</Typography>
              {ticket.Description && (
                <Typography variant="body2" className="ticket-description">
                  {ticket.Description}
                </Typography>
              )}
              <Typography variant="subtitle1" className="ticket-price">
                Price: {ticket.Price === 0 ? 'Free' : `$${ticket.Price}`}
              </Typography>
              <div className="button-container">
                {isAlreadyInCart(ticket.Id?.toString(), eventId) ? (
                  <Typography
                    variant="caption"
                    color="primary"
                  >
                    Already in Cart
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(ticket)}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </Box>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">No ticket types available.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default EventTicketTypeCard;
