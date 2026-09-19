import { Route } from 'react-router-dom';
import { LandingLayout } from 'src/templates/template';
import HomePage from './Home';
import React from 'react';

export function AppRoutes() {
  return (
    <React.Fragment>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </React.Fragment>
  );
}
