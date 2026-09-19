import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

const CustomDialogTitle = styled(DialogTitle)`
  background-color: #2196f3;
  color: white;
`;

const CustomDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuantityInput = styled(TextField)`
  width: 80%;
  margin-bottom: 20px;
`;

interface CartModalMuiProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirmAdd: (quantity: number) => void;
}

const CartModalMui: React.FC<CartModalMuiProps> = ({
  isOpen,
  onRequestClose,
  onConfirmAdd,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
  };

  const handleConfirmAdd = () => {
    onConfirmAdd(quantity);
    onRequestClose();
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose}>
      <CustomDialogTitle>Add to Cart</CustomDialogTitle>
      <CustomDialogContent>
        <Typography variant="body1" align="center" gutterBottom>
          Select quantity and confirm to add to cart.
        </Typography>
        <QuantityInput
          type="number"
          label="Quantity"
          variant="outlined"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </CustomDialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="primary">
          Close
        </Button>
        <Button onClick={handleConfirmAdd} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartModalMui;
