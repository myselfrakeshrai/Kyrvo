import { Alert, Box, LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import MenuItemCard from 'src/components/Menu/MenuitemCard';
import { MenuItems } from 'src/models/MenuItems';
import { Orders } from 'src/models/Smoky/Order';
import { OrderItem } from 'src/models/Smoky/OrderItem';
import { OrderItemService } from 'src/services/Smoky/OrderItemService';
import { OrderService } from 'src/services/Smoky/OrderService';
import { MenuItemService } from 'src/services/menuItemService';
import { useAppStore } from 'src/stores';

const MenuPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();
  const { user } = useAppStore();
  const { isLoading, data } = useQuery({
    queryKey: ['menuitem'],
    queryFn: () =>
      MenuItemService.getAll().then((res) => {
        return res;
      }),
    staleTime: 100,
  });
  const calculateTax = (amount: number): number => {
    const taxRate = 0.13; // 13%
    const taxAmount = amount * taxRate;
    return taxAmount;
  };
  const addNewOrderItem = (orderItem: OrderItem) => {
    OrderItemService.addNew(orderItem)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleAddToCart = (item: MenuItems, quantity: number) => {
    console.log(`Added ${quantity} ${item.Name} to the cart.`);
    const totalPrice = item.Price * quantity;
    const tax = calculateTax(totalPrice);
    const newOrder: Orders = {
      OrderNumber: 1,
      TotalPrice: totalPrice,
      Tax: tax,
      GrandTotal: totalPrice + tax,
      Tips: 0,
      PaymentMethod: 'Cash',
      PaymnetStatus: 0,
      CustomerId: user?.Id,
      Status: 0,
      EstDuration: 123,
      OrderMethod: 'Online',
      OrderType: 'Online',
      OrderDate: 123,
    };
    if (newOrder) {
      setLoading(true);
      OrderService.addNew(newOrder)
        .then((res) => {
          const itemOrder: OrderItem = {
            OrderId: res.Id || '',
            ItemId: item.Id || '',
            Quantity: quantity,
          };
          addNewOrderItem(itemOrder);
          return res;
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  if (isLoading || loading) {
    return <LinearProgress />;
  }
  if (error) {
    return (
      <Alert variant="outlined" severity="error">
        Couldn't load data.
      </Alert>
    );
  }
  if (!data) {
    return <div>Data not available</div>;
  }
  return (
    <Box m={0} ml={3} display="flex" flexWrap="wrap" gap={4}>
      {data.map((item: MenuItems) => (
        <MenuItemCard
          key={item.Id}
          menuItemType={item}
          onAddToCart={handleAddToCart}
        />
      ))}
    </Box>
  );
};

export default MenuPage;
