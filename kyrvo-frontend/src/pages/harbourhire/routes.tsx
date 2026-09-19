import { Route, Routes } from 'react-router-dom';
import { LandingLayout } from 'src/templates/template';
import HomePage from './Home';
import ErrorPage from '../shared/Error';
import AboutPage from './About';
import { ContactPage } from '@mui/icons-material';
import BookingPage from './Booking';
import BlogPage from './Blog';
import PostPage from './Blog/PostPage';
import { SharedAppRoutes } from '../shared/shared-routes';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="booking/:step?" element={<BookingPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<PostPage />} />
      </Route>
      <SharedAppRoutes />
    </Routes>
  );
}
