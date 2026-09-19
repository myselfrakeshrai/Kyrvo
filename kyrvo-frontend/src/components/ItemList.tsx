import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { TitleUrl } from 'src/models/TitleUrl';

interface ItemListProps {
  header: string;
  items: TitleUrl[];
}

const CarCard: React.FC<ItemListProps> = ({ header, items }) => {
  return (
   <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          {header}
        </Typography>
         <List>
          {items.map(item=> <ListItem key={item.url} disablePadding>
          {item.url ? (
            <ListItemButton component="a" href={item.url}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ) : (
            <ListItemText primary={item.title} />
          )}

          </ListItem>)}
        </List>
    </Grid>
  );
};

export default CarCard;
