import {
  Avatar,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FeedBack } from 'src/models';
import { FeedBackServices } from 'src/services';
import { getImageUrl } from 'src/utils/helpers';

const Feedback: React.FC = () => {
  const theme = useTheme();

  const themeInstance = useTheme();
  const isTablet = useMediaQuery(themeInstance.breakpoints.down('md'));

  const { data } = useQuery({
    queryKey: ['feedback'],
    queryFn: () =>
      FeedBackServices.getAll().then((res) => {
        //setFeedBack(res);
        return res;
      }),
  });
  return (
    <Grid sx={{ margin: '0 5%' }}>
      <>
        <Grid
          sx={{
            mt: 5,
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              backgroundColor: `${theme.palette.primary.main}26`,
              color: theme.palette.primary.main,
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
              fontSize: '15px',
              textTransform: 'uppercase',
              fontWeight: '500',
              width: 'fit-content',
              margin: 'auto',
            }}
          >
            Feedback subTitle
          </Typography>
        </Grid>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontWeight: '500',
          }}
        >
          FeedbackTitle
        </Typography>
        <Grid
          container
          sx={{
            justifyContent: 'center',
          }}
        >
          {data?.map((feedback: FeedBack) => (
            <>
              <Grid item xs={12} sm={isTablet ? 6 : 3} padding={'40px'}>
                <Typography variant="body1">{feedback.FeedBackDesc}</Typography>
                <Box
                  sx={{
                    marginTop: 1,
                    color: theme.palette.primary.main,
                    padding: '30px',
                    borderRadius: '50px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Avatar src={getImageUrl(feedback.FeedBackImage as string)} />
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '700',
                      ml: 1,
                    }}
                  >
                    {feedback.FeedBackName}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: '100',
                    ml: 2,
                    mt: -2,
                  }}
                >
                  {feedback.FeedBackUsername}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </>
    </Grid>
  );
};

export default Feedback;
