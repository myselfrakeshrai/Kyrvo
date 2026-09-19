import * as React from 'react';
import { Button, Typography, Card, CardMedia, Grid } from '@mui/material';
import './JumbotronStyle.css';
import KyContentSection from '../KyContentSection';
import { Description } from '@mui/icons-material';

interface JumbotronProps {
  title?: string;
  titleColor?: string;
  subtitle?: string;
  contentAlignment?: string;
  subtitleColor?: string;
  subtitleBackground?: string;
  signImage?: string;
  desc?: string;
  labelButton?: string;
  buttonLink?: string;
  buttonCustomColor?: string;
  buttonDisplay?: string;
  buttonCustomBackground?: string;
  contentWidth?: string;
  descriptionColor?: string;
  imagePosition?: string;
}

const JumbotronImage: React.FC<{ imageUrl: string | undefined }> = ({
  imageUrl,
}) => {
  return (
    <Grid item xs={12} sm={5} sx={{ alignContent: 'center', justifyItems:'center' }} px={5}>
      {imageUrl && (
        <Card elevation={0} className="ky-jumbotron-sign">
          <CardMedia
            className="ky-jumbotron-sign-img"
            component="img"
            image={imageUrl}
          />
        </Card>
      )}
    </Grid>
  );
};

const Jumbotron: React.FC<JumbotronProps> = ({
  title,
  titleColor,
  subtitle,
  contentAlignment = 'center',
  subtitleBackground,
  subtitleColor,
  desc,
  labelButton,
  buttonLink,
  signImage,
  buttonCustomColor,
  buttonDisplay = 'inline',
  buttonCustomBackground,
  imagePosition = 'left',
}) => {
  const openLink = (link: string | undefined) => {
    if (window && link) {
      window.open(link, '_blank');
    }
  };

  let marginValue: string | number = 0;

  if (contentAlignment === 'center') {
    marginValue = '0 auto';
  } else if (contentAlignment === 'left') {
    marginValue = 0;
  } else if (contentAlignment === 'right') {
    marginValue = 0;
  }

  return (
    <KyContentSection maxWidth={'xl'} py={0}>
      <Grid
        container
        sx={{
          textAlign: contentAlignment,
          alignItems: contentAlignment,
          margin: marginValue,
        }}
        spacing={2}
      >
        {imagePosition === 'left' && <JumbotronImage imageUrl={signImage} />}
        <Grid item xs={12} sm={7} px={5}>
          <>
            {title && (
              <Typography
                variant="h2"
                className="ky-jumbotron-title"
                sx={{
                  color: titleColor,
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="h5"
                className="ky-jumbotron-subtitle"
                sx={{
                  color: subtitleColor,
                  background: subtitleBackground,
                }}
              >
                {subtitle}
              </Typography>
            )}
            {desc && (
              
                <div dangerouslySetInnerHTML={{
                  __html: desc || '',
                }}/>
            )}
            {labelButton && (
              <Button
                className="ky-jumbotron-button"
                variant="contained"
                sx={{
                  background: buttonCustomBackground,
                  color: buttonCustomColor,
                  display: buttonDisplay,
                }}
                onClick={() => openLink(buttonLink)}
              >
                {labelButton}
              </Button>
            )}
          </>
        </Grid>
        {imagePosition !== 'left' && <JumbotronImage imageUrl={signImage} />}
      </Grid>
    </KyContentSection>
  );
};

export default Jumbotron;
