import React, { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import { Button, FormLabel, Popover } from '@mui/material';

interface ColorPickerProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

const CustomColorPicker: React.FC<ColorPickerProps> = ({
  value = '#f17013',
  label,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState<ColorResult>({
    hex: value,
    rgb: { r: 241, g: 112, b: 19, a: 1 },
    hsl: { h: 24, s: 90, l: 52, a: 1 },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor: ColorResult) => {
    setColor(newColor);
    onChange(newColor.hex);
  };

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <Button
        variant="contained"
        sx={{
          marginLeft: '10px',
          padding: '10px 4px',
          background: color.hex,
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          border: '2px solid #fff',
        }}
        onClick={handleClick}
      ></Button>
      <Popover
        open={displayColorPicker}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ zIndex: 2 }}
      >
        <SketchPicker color={color.rgb} onChange={handleChange} />
      </Popover>
    </div>
  );
};

export default CustomColorPicker;
