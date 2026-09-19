import { Route } from 'react-router-dom';
import { LandingLayout } from 'src/templates/template';
import HomePage from './Home';
import AboutPage from './About';
import { ContactPage } from '@mui/icons-material';
import BlogPage from './Blog';
import PostPage from './Blog/PostPage';
import React from 'react';

export function AppRoutes() {
  return (
    <React.Fragment>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<PostPage />} />
      </Route>
    </React.Fragment>
  );
}
