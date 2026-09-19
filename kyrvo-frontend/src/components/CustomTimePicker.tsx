import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, FormHelperText, SxProps, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
import { Theme } from '@emotion/react';

interface CustomTimePickerProps {
  defaultValue: any;
  onChange: (value: any) => void;
  sx?: SxProps<Theme>;
  error?: boolean;
  message?: string;
  label?: string;
  minuteSteps?: number;
  format?: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  sx,
  defaultValue,
  label,
  onChange,
  error,
  message,
  minuteSteps,
  format,
}) => {
  const theme = useTheme();
  const timeFormat = format || 'HH:mm';
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          timeSteps={{ minutes: minuteSteps || 10 }}
          value={dayjs(defaultValue, timeFormat)}
          label={label}
          format={timeFormat}
          sx={sx}
          onChange={(val: any) => onChange(dayjs(val).format(timeFormat))}
          slotProps={{
            textField: {
              InputLabelProps: { shrink: true, error: error },
              fullWidth: true,
            },
          }}
        />
        {error && (
          <FormHelperText sx={{ color: theme.palette.error?.main, mt: 2 }}>
            {message}
          </FormHelperText>
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default CustomTimePicker;
