import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

import './App.css';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import {
  CollectionDataService,
  FeatureServices,
  RoleServices,
  UserServices,
} from './services';
import { useAppStore } from './stores/appStore';
import dayjs from 'dayjs';
import { LinearProgress } from '@mui/material';
import { SharedAppRoutes } from './pages/shared/shared-routes';
import { CollectionData } from './models';
import { tryParseJSON } from './utils/helpers';

const queryClient = new QueryClient();
const libraries: Libraries = ['places'];
function App() {
  //loadGoogleMapScripts();
  const [loading, setLoading] = useState(false);
  const {
    setFeatures,
    setModules,
    setRoles,
    reservation,
    delReservation,
    setUser,
    delUser,
    setCollections,
  } = useAppStore();
  const [appTheme, setTheme] = useState(theme('', '', '', 'popins'));
  useMemo(() => {
    FeatureServices.getAll().then((res) => {
      setFeatures(res);
    });
    RoleServices.getAll().then((res) => {
      setRoles(res);
    });
    FeatureServices.getModules().then((res) => {
      setModules(res);
      console.log(res);
    });
  }, [setRoles, setFeatures, setModules]);

  useMemo(() => {
    setLoading(true);
    CollectionDataService.getAll().then((res) => {
      setCollections(res);
      const appConfig = res.find((x) => x.Id === 'AppConfig') as CollectionData;
      const appConfigData = tryParseJSON(appConfig?.Data as string);
      setTheme(
        theme(
          appConfigData?.['PrimaryColor'],
          appConfigData?.['SecondaryColor'],
          appConfigData?.['TertiaryColor'],
          appConfigData?.['FontFamily'],
        ),
      );
      setLoading(false);
    });
  }, [setCollections]);
  useMemo(() => {
    UserServices.getCurrent()
      .then((res) => {
        setUser(res);
      })
      .catch((e) => {
        if (e) {
          delUser();
        }
      });
  }, [delUser, setUser]);
  useMemo(() => {
    if (reservation.PickupDate && dayjs(reservation.PickupDate) < dayjs()) {
      delReservation();
    }
  }, [reservation, delReservation]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_KEY,
    libraries: libraries,
  });
  if (!isLoaded || loading) {
    return <LinearProgress color="success" />;
  }
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <QueryClientProvider client={queryClient}>
            <SharedAppRoutes />
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
