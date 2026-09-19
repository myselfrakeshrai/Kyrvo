import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, FormHelperText, SxProps, Theme, useTheme } from '@mui/material';
import dayjs from 'dayjs';

interface CustomDatePickerProps {
  defaultValue: any;
  onChange: (value: any) => void;
  maxDateInDays?: number;
  sx?: SxProps<Theme>;
  error?: boolean;
  message?: string;
  label?: string;
  format?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  sx,
  label,
  defaultValue,
  maxDateInDays,
  error,
  message,
  format,
  onChange,
}) => {
  const currentDate = new Date();
  const theme = useTheme();
  const formatX = format || 'DD/MM/YYYY';
  const setMaxDate = (daysToAdd?: number) => {
    const addDays = daysToAdd || 365;
    const now = new Date();
    const nowPlusDays = now.setDate(now.getDate() + addDays);
    return dayjs(nowPlusDays);
  };
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={dayjs(defaultValue, format)}
          format={formatX}
          sx={sx}
          onChange={(val: any) => {
            return onChange(val.format(format));
          }}
          minDate={dayjs(currentDate)}
          maxDate={setMaxDate(maxDateInDays)}
          slotProps={{
            textField: {
              InputLabelProps: { shrink: true, error: error },
              fullWidth: true,
            },
          }}
        />
        {error && (
          <FormHelperText
            sx={{ color: error ? theme.palette.error?.main : '#---', mt: 2 }}
          >
            {message}
          </FormHelperText>
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default CustomDatePicker;
