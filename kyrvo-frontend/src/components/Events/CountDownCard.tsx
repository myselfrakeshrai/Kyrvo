import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import SectionHeader from '../SectionHeader/SectionHeader';
import './CountDownCard.css';
import { getImageUrl } from 'src/utils/helpers';

interface EventCountDown {
  Id?:string;
  Title?: string;
  Body?: string;
  ScheduledDate?: string;
  ScheduledTime?: string;
  Header?: string;
  Image?: string | null;
}

const calculateTimeDifference = (targetDate: Date) => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { text: 'Event has already occurred' };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
};

// Limit description to a maximum of 150 characters
const limitDescription = (description: string | undefined): string => {
  if (!description) return '';
  return description.length > 150
    ? `${description.substring(0, 150)}...`
    : description;
};

const CountDownCard: React.FC<EventCountDown> = ({
  Id,
  Title,
  Body,
  ScheduledDate,
  ScheduledTime,
  Header,
  Image,
}) => {
  const [countdown, setCountdown] = useState<{
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    text?: string;
  }>({});
  const theme = useTheme();
  useEffect(() => {
    const targetDate = new Date(`${ScheduledDate} ${ScheduledTime}`);

    const updateCountdown = () => {
      setCountdown(calculateTimeDifference(targetDate));
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [ScheduledDate, ScheduledTime]);
  const allNull = !Image && !Title && !Body;

  if (allNull) {
    return (
      <Box className="countdown-box">
        {Header && (
          <SectionHeader
            title={Header}
            fontWeight={false}
            margin="auto"
            text="center"
          />
        )}
        <Typography textAlign="center" variant="h6" color="textSecondary">
          No special events to showcase currently.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="countdown-box">
      <SectionHeader
        title={Header}
        fontWeight={false}
        margin="auto"
        text="center"
      />
      {allNull && (
        <Typography textAlign="center" variant="h6" color="textSecondary">
          No events are planned for now. Keep an eye out for future
          announcements.
        </Typography>
      )}
      <Card className="content-card" >
        {Image && (
          <CardMedia
            component="img"
            className="countdown-card-media"
            image={`${import.meta.env.VITE_STATIC_URL}${Image}`}
            alt={Title || 'Countdown Image'}
            sx={{objectFit: "contain", backgroundImage: `url(${getImageUrl(Image)})`, backgroundColor: "rgba(0,0,0,0.8)", backgroundBlendMode:'multiply', backgroundSize:'cover', padding: '15px 0px'}}
          />
        )}
        <CardContent>
          <Grid container direction="column" spacing={1} p={3}>
            <Grid item>
              <Typography variant="h6" className="countdown-card-title">
                {Title}
              </Typography>
            </Grid>

            {countdown.text ? (
              <Grid item>
                <Typography variant="h4" className="countdown-text">
                  {countdown.text}
                </Typography>
              </Grid>
            ) : (
              <Grid container spacing={1} px={1} py={3}>
                {Object.entries(countdown).map(([unit, value]) => (
                  <Grid item key={unit} className="countdown-grid">
                    <Typography variant="h4" className="countdown-unit">
                      {value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}

            <Grid item>
              <Typography
                variant="body2"
                className="countdown-description"
                dangerouslySetInnerHTML={{
                  __html: limitDescription(Body),
                }}
              />
              <Typography variant="body2" textAlign='center'><a href={`/event/${Id}`} style={{color:theme.palette.secondary.main}}>view details</a> </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CountDownCard;
