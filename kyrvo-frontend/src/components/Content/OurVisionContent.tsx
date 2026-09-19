import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import SectionHeader from '../SectionHeader/SectionHeader';
import KyContentSection from '../KyContentSection';
import './ourVision.css';
import { useAppStore } from 'src/stores';
import { WhoWeAreData } from 'src/models/Team';
import DynamicIcon from '../DynamicIcon';

interface DiscoverContentProps {
  title: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  subtitle?: string;
}

const DiscoverContent: React.FC<DiscoverContentProps> = ({
  title,
  align,
  subtitle,
}) => {
  const { getCollection } = useAppStore();
  const WhoWeAreData = getCollection('WhoWeArePage') as WhoWeAreData;
  const themeInstance = useTheme();

  return (
    <KyContentSection maxWidth={'xl'} py={2} px={0}>
      <Grid mb={1}>
        <SectionHeader
          title={title}
          subtitle={subtitle}
          fontWeight={false}
          alignment={align || 'center'}
        />
      </Grid>
      <Grid container justifyContent={'space-between'}>
        {WhoWeAreData.Visions.map((vision) => (
          <Grid
            item
            xs={12}
            sm={2.9}
            key={vision.Icon}
            className="ky-our-vision-card"
            sx={{
              background: vision.Feature
                ? themeInstance.palette.primary.main
                : themeInstance.palette.secondary.main,
            }}
          >
            <Grid
              container
              className="ky-our-vision-card-icon"
              sx={{
                background: themeInstance.palette.tertiary?.main,
                color: vision.Feature
                  ? themeInstance.palette.primary.main
                  : themeInstance.palette.secondary.main,
              }}
            >
              <>{<DynamicIcon name={vision.Icon!} />}</>
            </Grid>
            <Typography
              variant="body1"
              sx={{
                color: themeInstance.palette.tertiary?.main,
              }}
            >
              <p
                className="ky-description-body"
                dangerouslySetInnerHTML={{ __html: vision.Info || '' }}
              />
            </Typography>
          </Grid>
        ))}
      </Grid>
    </KyContentSection>
  );
};

export default DiscoverContent;
