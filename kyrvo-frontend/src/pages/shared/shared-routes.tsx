import { Route, Routes, useLocation } from 'react-router-dom';
import { AdminLayout, AuthLayout } from 'src/templates/template';
import { useAppStore } from 'src/stores';
import LoginPage from '../shared/Login';
import RequestPasswordResetPage from '../shared/RequestPasswordReset';
import SignupPage from '../shared/Signup';
import RegisterPage from '../shared/Register';
import PasswordResetPage from '../shared/PasswordReset';
import {
  NavigationBreadcrumb,
  ProtectedPermissionRoute,
  ProtectedRoute,
} from 'src/components';
import {
  AgenciesPage,
  AgencyPage,
  AgentPage,
  AgentsPage,
  BlogPostPage,
  BlogPostsPage,
  FeaturePage,
  FeaturesPage,
  MediaPage,
  PermissionPage,
  PermissionsPage,
  PricingPage,
  PricingsPage,
  ReservationPage,
  ReservationsPage,
  RolePage,
  RolesPage,
  UserPage,
  UsersPage,
  VariablePage,
  VariablesPage,
  VehicleTypePage,
  VehicleTypesPage,
  VehiclesPage,
  WebCarFeaturePage,
  WebChiefMessagePage,
  WebHeaderPage,
  WebSystemPage,
} from '../shared/Manage';
import { FEATURES } from 'src/constants/appConstants';
import BlogTagsPage from '../shared/Manage/BlogTags';
import BlogTagPage from '../shared/Manage/BlogTags/Tags';
import BlogCategoriesPage from '../shared/Manage/BlogCategories';
import BlogCategoryPage from '../shared/Manage/BlogCategories/BlogCategory';
import EventTagsPage from '../shared/Manage/EventTags';
import EventTagPage from '../shared/Manage/EventTags/EventTag';
import EventCategoriesPage from '../shared/Manage/EventCategories';
import EventCategoryPage from '../shared/Manage/EventCategories/EventCategory';
import EventsPage from '../shared/Manage/Events';
import EventPage from '../shared/Manage/Events/Event';
import EventTypesPage from '../shared/Manage/EventTypes';
import EventTypePage from '../shared/Manage/EventTypes/EventType';
import FeedBacksPage from '../shared/Manage/FeedBacks';
import FeedBackPage from '../shared/Manage/FeedBacks/FeedBack';
import ManageReservation from '../shared/Manage/Reservations/ManageReservation';
import NotificationPage from '../shared/Manage/Notifications';
import MenuItemsPage from '../shared/Manage/MenuItems';
import MenuItemPage from '../shared/Manage/MenuItems/MenuItem';
import OrderPage from '../shared/Manage/Smoky/Orders';
import OrderItemsPage from '../shared/Manage/Smoky/OrderItems';
import ErrorPage from './Error';
import { useEffect } from 'react';
import { AppRoutes } from '../AppRoutes';
import ContactsUsPage from './Manage/ContactsUs';
//import ContactUsPage from 'src/components/ContactForm';
import ContactUsPage from './Manage/ContactsUs/ContactUs';
import CollectionPage from './Manage/CollectionSchema/CollectionSchemas';
import CollectionsPage from './Manage/CollectionSchema';
import CollectionDataPage from './Manage/CollectionData';
import PhotoAlbumPage from './Manage/PhtotAlbums/PhotoAlbum';
import PhotoAlbumsPage from './Manage/PhtotAlbums';
import NewsLettersPage from './Manage/NewsLetters';
import NewsLetterPage from './Manage/NewsLetters/NewsLetter';

export function SharedAppRoutes() {
  const { user, permissions } = useAppStore();
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        window.scrollTo({
          behavior: element ? 'smooth' : 'auto',
          top: element ? element.offsetTop : 0,
        });
      }, 0);
    }
  }, [pathname, hash, key]);
  return (
    <Routes>
      {AppRoutes()}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="signup" element={<SignupPage />} />
        <Route path="register/:verficationToken" element={<RegisterPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="reset-password" element={<RequestPasswordResetPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="reset-password/:token" element={<PasswordResetPage />} />
      </Route>
      <Route path="manage" element={<ProtectedRoute user={user} />}>
        <Route element={<AdminLayout />}>
          <Route
            path=""
            element={
              <ProtectedPermissionRoute
                feature={FEATURES.COLLECTION}
                level={1}
                permissions={permissions}
                user={user}
              >
                <CollectionsPage />
              </ProtectedPermissionRoute>
            }
          />
          <Route element={<NavigationBreadcrumb />}>
            <Route
              path="vehicles"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.VEHICLES}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <VehiclesPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="vehicles/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.VEHICLES}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <VehiclesPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="vehicletypes"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.VEHICLETYPES}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <VehicleTypesPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="vehicletypes/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.VEHICLETYPES}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <VehicleTypePage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.USERS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <UsersPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="users/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.USERS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <UserPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="features"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PERMISSION}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <FeaturesPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="features/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PERMISSION}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <FeaturePage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="permissions"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PERMISSION}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <PermissionsPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="permissions/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PERMISSION}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <PermissionPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="pricings"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PRICING}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <PricingsPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="pricings/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PRICING}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <PricingPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="roles"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PERMISSION}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <RolesPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="roles/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PERMISSION}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <RolePage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="agencies"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.AGENCIES}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <AgenciesPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="agencies/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.AGENCIES}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <AgencyPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="agents"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.AGENTS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <AgentsPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="agents/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.AGENTS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <AgentPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="blogtags"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <BlogTagsPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="blogtag/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <BlogTagPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="contactus"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.CONTACTUS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <ContactsUsPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="contactus/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.CONTACTUS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <ContactUsPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="newsletter"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.NEWSLETTERS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <NewsLettersPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="newsletter/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.NEWSLETTERS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <NewsLetterPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="blog"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <BlogPostsPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="blog/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <BlogPostPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="blogcategory"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <BlogCategoriesPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="blogcategory/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <BlogCategoryPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="eventtag"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <EventTagsPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="eventtag/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <EventTagPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="photoalbum"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PHOTOALBUM}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <PhotoAlbumsPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="photoalbum/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.PHOTOALBUM}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <PhotoAlbumPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="eventcategory"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.CATEGORIES}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <EventCategoriesPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="eventcategory/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.CATEGORIES}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <EventCategoryPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="event"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <EventsPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="event/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <EventPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="eventtype"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <EventTypesPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="eventtype/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <EventTypePage />
                </ProtectedPermissionRoute>
              }
            />

            <Route path="feedbacks" element={<FeedBacksPage />} />
            <Route path="feedbacks/:action/:id?" element={<FeedBackPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="websystem" element={<WebSystemPage />} />
            <Route path="webcarfeature" element={<WebCarFeaturePage />} />
            <Route path="webchiefmessage" element={<WebChiefMessagePage />} />
            <Route path="webheader" element={<WebHeaderPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="variables" element={<VariablesPage />} />
            <Route path="variables/:action/:id?" element={<VariablePage />} />

            <Route
              path="reservations/manage/:id?"
              element={<ManageReservation />}
            />
            <Route
              path="reservations/:action/:id?"
              element={<ReservationPage />}
            />
            <Route
              path="notifications"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.DASHBOARD}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <NotificationPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="menu"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.MENUITEMS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <MenuItemsPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="menu/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.MENUITEMS}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <MenuItemPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="order"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <OrderPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="orderItem"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.BLOG}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <OrderItemsPage />
                </ProtectedPermissionRoute>
              }
            />
            {/* <Route path="menu" element={<MenuItemsPage />} />

            <Route path="menu/:action/:id?" element={<MenuItemPage />} /> */}
            <Route
              path="collections/manage/:id"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.COLLECTION}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <CollectionDataPage />
                </ProtectedPermissionRoute>
              }
            />
            <Route
              path="collections"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.COLLECTION}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <CollectionsPage />
                </ProtectedPermissionRoute>
              }
            />

            <Route
              path="collections/:action/:id?"
              element={
                <ProtectedPermissionRoute
                  feature={FEATURES.COLLECTION}
                  level={1}
                  permissions={permissions}
                  user={user}
                >
                  <CollectionPage />
                </ProtectedPermissionRoute>
              }
            />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
