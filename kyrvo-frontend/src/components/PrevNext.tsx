import { Grid} from '@mui/material';
import React from 'react';
import RedirectTypography from './RedirectTypography';
import { TitleUrl } from 'src/models/TitleUrl';
import { Box } from '@mui/system';
const greaterThan = '\u003E';
const lessThan = '\u003C';
interface ItemListProps {
  previous?: TitleUrl | null;
  next?: TitleUrl | null;
}

const CarCard: React.FC<ItemListProps> = ({ previous, next }) => {
  return (
    <Grid
  container
  direction="row"
  justifyContent="space-between"
  alignItems="flex-start"
>
      <Box>
     {previous && (
        <RedirectTypography text={`${lessThan} ${previous.title}`} url={previous.url} />
      )}
      </Box>
      <Box>
      {next && (
        <RedirectTypography text={`${next.title} ${greaterThan}`} url={next.url} />
      )}
      </Box>
    </Grid>
  );
};

export default CarCard;
