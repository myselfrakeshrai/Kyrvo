import React from 'react';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import OpeningHours from 'src/pages/mistersmoky/components/Footer/OpenHours';
import {
  Facebook,
  FmdGood,
  Twitter,
  Instagram,
  Phone,
} from '@mui/icons-material';
import { getImageUrl } from 'src/utils/helpers';
import { useAppStore } from 'src/stores';
import { TikTokIcon } from '../CustomIcons/TikTokIcon';
import KyContentSection from '../KyContentSection';
import NewsletterForm from '../Content/NewsLetterForm';

const HomeFooter: React.FC = () => {
  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down('md'));
  const { getCollectionValue, getCollection } = useAppStore();
  const OpeningHoursData = getCollection('OpeningHours');
  console.log(OpeningHoursData)
  const newsletter = getCollectionValue('FooterConfig', 'newsletter');
  return (
    <KyContentSection
      maxWidth={'xl'}
      backgroundColor={themeInstance.palette.primary.main}
      py={10}
    >
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} sm={(OpeningHoursData || newsletter) ? 9 : 12}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
            }}
          >
            <Box
              component={'img'}
              sx={{
                width: '50px',
                height: 'auto',
              }}
              alt="Logo"
              src={getImageUrl(getCollectionValue('AppConfig', 'SecondaryLogo'))}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 1,
                mb: 1,
                fontWeight: 700,
                color: themeInstance.palette.tertiary?.main,
                textDecoration: 'none',
              }}
            >
              {getCollectionValue('AppConfig', 'AppName')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              mb: 1,
              display: 'flex',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mr: 2,
                ml: 1,
                color: themeInstance.palette.tertiary?.main,
                textDecoration: 'none',
              }}
            >
              {getCollectionValue('FooterConfig', 'footerText')}
            </Typography>
          </Grid>
          <Divider />
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              margin: { xs: '5px 0' },
              alignItems: 'center',
            }}
          >
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                color: themeInstance.palette.tertiary?.main,
                mr: 1,
              }}
            >
              <FmdGood />
            </IconButton>
            <Typography
              variant="body1"
              component="div"
              sx={{
                flexGrow: 0,
                fontSize: {
                  xs: '10px',
                  sm: '15px',
                  lg: '20px',
                  md: '18px',
                },
                color: themeInstance.palette.tertiary?.main,
              }}
            >
              {getCollectionValue('ContactInfo', 'Address')}
            </Typography>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 1,
                ml: { xs: 1, md: 0, lg: 2 },
                color: themeInstance.palette.tertiary?.main,
              }}
            >
              <Phone />
            </IconButton>
            <Typography
              variant="body1"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: {
                  xs: '10px',
                  sm: '15px',
                  lg: '20px',
                  md: '18px',
                },
                color: themeInstance.palette.tertiary?.main,
              }}
            >
              {getCollectionValue('ContactInfo', 'Phone')}
            </Typography>
          </Grid>
        </Grid>

        {OpeningHoursData?.Day && (
          <Grid item xs={12} sm={3} mt={isMobile ? 1 : 0}>
            <Box alignItems="center" mt={isMobile ? 1 : 0}>
              <OpeningHours />
            </Box>
          </Grid>
        )}
        {newsletter && (
          <Grid item xs={12} sm={3} mt={isMobile ? 1 : 0}>
            <Box alignItems="center" mt={isMobile ? 1 : 0}>
              <NewsletterForm />
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid display={'flex'} justifyContent={'center'}>
            {getCollectionValue('ContactInfo', 'Facebook') && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  background: themeInstance.palette.tertiary?.main,
                  color: themeInstance.palette.primary.main,
                  mr: '1px',
                  ml: '1px',
                }}
                href={getCollectionValue('ContactInfo', 'Facebook')}
              >
                <Facebook />
              </IconButton>
            )}
            {getCollectionValue('ContactInfo', 'Instagram') && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  background: themeInstance.palette.tertiary?.main,
                  color: themeInstance.palette.primary.main,
                  mr: 1,
                  ml: 1,
                }}
                href={getCollectionValue('ContactInfo', 'Instagram')}
              >
                <Instagram />
              </IconButton>
            )}
            {getCollectionValue('ContactInfo', 'Twitter') && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  background: themeInstance.palette.tertiary?.main,
                  color: themeInstance.palette.primary.main,
                }}
                href={getCollectionValue('ContactInfo', 'Twitter')}
              >
                <Twitter />
              </IconButton>
            )}
            {getCollectionValue('ContactInfo', 'Tiktok') && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  background: themeInstance.palette.tertiary?.main,
                  color: themeInstance.palette.primary.main,
                }}
                href={getCollectionValue('ContactInfo', 'Tiktok')}
              >
                <TikTokIcon />
              </IconButton>
            )}
          </Grid>
          <Typography
            variant="body2"
            color={themeInstance.palette.tertiary?.main}
            align="center"
            sx={{ p: 2 }}
          >
            © {new Date().getFullYear()} {getCollectionValue('FooterConfig', 'copyRight')}
          </Typography>
        </Grid>
      </Grid>
    </KyContentSection>
  );
};

export default HomeFooter;
