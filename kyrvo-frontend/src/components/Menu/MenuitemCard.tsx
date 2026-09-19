import { useCart } from 'react-use-cart';

import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  useTheme,
} from '@mui/material';
import { formatCurrencyAUD, getImageUrl } from 'src/utils/helpers';
import { MenuItems } from 'src/models/MenuItems';
import './menuitem.css';

interface MenuItemCardProps {
  menuItemType: MenuItems;
  onAddToCart: (item: MenuItems, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ menuItemType }) => {
  const themeInstance = useTheme();
  const { addItem, items } = useCart();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const handleAddToCart = () => {
    const item = {
      id: menuItemType.Id || '',
      price: menuItemType.Price,
      name: menuItemType.Name,
      description: menuItemType.Description,
      image: menuItemType.Images,
    };

    addItem(item, 1);
    window.alert(`${menuItemType.Name} has been added to the cart.`);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          background: 'transparent',
          boxShadow: `0px 0px 10px 0px #0000001a`,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(0.97)',
          },
          width: '80%',
          aspectRatio: '1',
          marginLeft: '100px',
          marginTop: '100px',
          position: 'relative',
          height: '300px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '90%',
            transform: 'translateX(-50%)',
            backgroundColor: '#FFA500',
            borderRadius: '50%',
            padding: '5px',
            color: '#fff',
            fontSize: '14px',
            zIndex: 1,
          }}
        >
          {formatCurrencyAUD(menuItemType.Price)}
        </div>
        <CardMedia
          component="img"
          alt="Menu"
          height="150px"
          image={getImageUrl(menuItemType.Images as string)}
          sx={{ width: '100%', objectFit: 'cover', borderRadius: '10px' }}
        />

        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            background: `${themeInstance.palette.primary.main}12`,
            m: '5px',
            borderRadius: '10px',
            paddingTop: '30px',
          }}
        >
          <Typography
            component="div"
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '5px',
              fontStyle: 'italic',
              color: themeInstance.palette.primary.main,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              fontFamily: 'italicFont',
            }}
          >
            {menuItemType.Name}
          </Typography>

          <Typography
            component="div"
            sx={{
              fontSize: '14px',
              marginBottom: '5px',
              maxHeight: '50px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {menuItemType.Description}
          </Typography>
          <Button
            variant="outlined"
            onClick={handleAddToCart}
            color="secondary"
            size="small"
          >
            Add To Cart
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MenuItemCard;
