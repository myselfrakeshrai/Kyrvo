import React from 'react';
import { useCart } from 'react-use-cart';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem: React.FC = () => {
  const { items, updateItemQuantity, removeItem } = useCart();
  const totalItems = items.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <Grid container spacing={3}>
      <Grid item xs={1} sm={2} />
      <Grid item xs={10} sm={5}>
        <Typography variant="h5" gutterBottom>
          {totalItems} item(s) in your cart
        </Typography>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card style={{ width: '100%' }}>
                <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                  {item.image && (
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="150"
                      image={`${import.meta.env.VITE_STATIC_URL}${item.image}`}
                      title={item.name}
                      style={{ width: '150px', objectFit: 'cover', marginRight: '16px' }}
                    />
                  )}
                  <div>
                    <Typography variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.Description}
                    </Typography>
                    <Grid container alignItems="center" style={{ marginTop: '8px' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => updateItemQuantity(item.id, (item.quantity || 0) - 1)}
                      >
                        -
                      </Button>
                      <span style={{ margin: '0 12px' }}>{item.quantity}</span>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => updateItemQuantity(item.id, (item.quantity || 0) + 1)}
                      >
                        +
                      </Button>
                      <Typography variant="body1" style={{ marginLeft: '16px' }}>
                        ${item.itemTotal?.toFixed(2)}
                      </Typography>
                      <span style={{ margin: '0 12px' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => removeItem(item.id)}
                          startIcon={<DeleteIcon />}
                        >
                          Remove
                        </Button>
                      </span>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={10} sm={5} style={{ marginTop: '40px' }}>
        <Card style={{ width: '100%', padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Checkout
          </Typography>
          <Typography variant="h6" style={{ marginTop: '16px' }}>
            Total: ${items.reduce((acc, item) => acc + (item.itemTotal || 0), 0).toFixed(2)}
          </Typography>
          <Button variant="contained" href='/checkout' color="primary" style={{ marginTop: '16px' }}>
            Checkout
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CartItem;
