import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useAppStore } from 'src/stores';
import { LocalOffer, SupportAgent, Person3 } from '@mui/icons-material';
import { getImageUrl } from 'src/utils/helpers';
import { StepDetail } from '..';
import { SectionHeader } from '..';

const CarFeature: React.FC = () => {
  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down('sm'));
  const isTablet = useMediaQuery(themeInstance.breakpoints.down('md'));

  const { getVariable } = useAppStore();

  return (
    <>
      {/* Start show */}
      <Grid
        container
        sx={{
          minHeight: isMobile ? '40vh' : isTablet ? '20vh' : '50vh',
          borderRadius: '10px',
          mx: isMobile? '20px': '',
          width: 'auto',
        }}
      >
        <Grid
          item
          xs={12}
          sm={isMobile ? 12 : 6}
          sx={{
            backgroundImage: `url(${getImageUrl(
              getVariable('CarFeaturePicture'),
            )})`,
            backgroundSize: isMobile ? '300px' : isTablet ? '300px' : '500px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        />
        <Grid
          item
          xs={12}
          sm={isMobile ? 12 : 6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile ? 1 : isTablet ? 3 : 5,
          }}
        >
          <Grid item xs={12}>
            <SectionHeader
              title="WHY CHOOSE US"
              subtitle="We offer the best experience with our hire car service"
              fontWeight={false}
              text="left"
            />
          </Grid>
          <Grid container>
            <StepDetail
              title="Best Price Guaranteed"
              desc="Find a lower price? We'll refund you 100% of the difference."
              icon={<LocalOffer />}
              iconPlacement={'SIDE'}
            />
          </Grid>
          <Grid container>
            <StepDetail
              title="Experience Drivers"
              desc="We Guarantee Professional, Top-Quality Drivers with Our Service."
              icon={<Person3 />}
              iconPlacement={'SIDE'}
            />
          </Grid>
          <Grid container>
            <StepDetail
              title="24/7 Support"
              desc="support ensuring assistance anytime, anywhere for your peace of mind."
              icon={<SupportAgent />}
              iconPlacement={'SIDE'}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CarFeature;
