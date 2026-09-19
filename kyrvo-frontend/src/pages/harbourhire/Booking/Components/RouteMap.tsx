import React, { useEffect } from 'react';
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { Box, useMediaQuery, useTheme } from '@mui/material';

interface GoogleMapProps {
  origin: string | undefined;
  destination: string | undefined;
  originOnly: boolean;
  onError: (val: string | null) => void;
}
interface LatLng {
  lat: number;
  lng: number;
}
const RouteMap: React.FC<GoogleMapProps> = ({
  origin,
  destination,
  originOnly,
  onError,
}) => {
  const [direction, setDirection] = React.useState<
    google.maps.DirectionsResult | undefined
  >();

  const [position, setPosition] = React.useState<LatLng>({
    lat: 0,
    lng: 0,
  });
  const theme = useTheme();
  const containerStyle = {
    width: '100%',
    height: '500px',
    margin: '0',
  };

  useEffect(() => {
    if (
      origin &&
      destination &&
      origin.length > 6 &&
      destination.length > 6 &&
      !originOnly
    ) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin || '',
          destination: destination || '',
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirection(result || undefined);
            onError(null);
          } else {
            onError(
              'Error fetching directions. Please enter valid pickup/dropoff locations.',
            );
          }
        },
      );
    } else if (origin && originOnly) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: origin }, function (results, status) {
        if (results && status == google.maps.GeocoderStatus.OK) {
          const g = results[0].geometry;
          setPosition({ lat: g.location.lat(), lng: g.location.lng() });
        }
      });
    }
  }, [origin, destination, onError, originOnly]);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: -3.745,
      lng: -38.523,
    });
    map.fitBounds(bounds);
  }, []);

  const onUnmount = React.useCallback(function callback() {}, []);
  let boxStyle = { width: '100%', position: 'relative', left: 0, top: 0 };
  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    containerStyle.height = '200px';
    containerStyle.width = '87vw';
    containerStyle.margin = '0';
    boxStyle = { width: '100%', position: 'relative', left: 0, top: 0 };
  }
  return (
    <Box  sx={boxStyle}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={30}
        onLoad={onLoad}
        onUnmount={onUnmount}
        clickableIcons={false}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
        }}
      >
        {!originOnly && <DirectionsRenderer directions={direction} />}
        {originOnly && <Marker position={position} />}
      </GoogleMap>
    </Box>
  );
};

export default RouteMap;
