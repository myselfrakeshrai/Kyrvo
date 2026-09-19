import { Route } from 'react-router-dom';
import { LandingLayout } from 'src/templates/template';
import HomePage from './Home';
import AboutPage from './About';
import EventListPage from './Events';
import React from 'react';
import ContactPage from './Contact';
import CartPage from '../shared/Cart';
import EventPage from './EventDetail';
import MediaPage from './Media';

export function AppRoutes() {
  return (
    <React.Fragment>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="who-we-are" element={<AboutPage />} />
        <Route path="get-in-touch" element={<ContactPage />} />
        <Route path="event" element={<EventListPage />} />
        <Route path="event/:id" element={<EventPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="media" element={<MediaPage />} />
      </Route>
    </React.Fragment>
  );
}
