import { Box, FormHelperText, FormLabel, TextField } from '@mui/material';
import React from 'react';
import { ImageSelector } from 'src/components';
import { VARIBLETYPE } from 'src/constants/appConstants';
import { PhotoshopPicker } from 'react-color';
import JSONEditorReact from 'src/components/form/JsonEditor';

enum JSONEditorMode {
  Code = 'code',
  Tree = 'tree',
  Form = 'form',
  View = 'view',
  Text = 'text',
}
interface VariableValuePickerProps {
  type: string;
  label: string;
  value: any;
  error?: any;
  helperText?: string;
  defaultValue: any;
  disabled?: boolean;
  modes?: JSONEditorMode[];
  onChange: (value: any) => void;
}
const VariableValuePicker: React.FC<VariableValuePickerProps> = ({
  type,
  value,
  error,
  helperText,
  disabled,
  label,
  onChange,
}) => {
  if (type === VARIBLETYPE.TEXT || type === VARIBLETYPE.NUMBER) {
    return (
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        type={type}
        error={error}
        value={value}
        helperText={helperText}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    );
  } else if (type === VARIBLETYPE.JSON) {
    return (
      <Box>
        <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
        <JSONEditorReact
          text={value}
          modes={[
            JSONEditorMode.Code,
            JSONEditorMode.Tree,
            JSONEditorMode.Text,
            JSONEditorMode.View,
            JSONEditorMode.Form,
          ]}
          onChangeText={(v) => onChange(v)}
        />
        {error && (
          <FormHelperText sx={{ mb: 1 }} color={'danger'}>
            {error}
          </FormHelperText>
        )}
      </Box>
    );
  } else if (type === VARIBLETYPE.IMAGE) {
    return (
      <>
        <ImageSelector
          label="IntroImage"
          singleSelect={true}
          initial={value ? value?.split('|') : []}
          onSubmit={(ids: string[]) => {
            onChange(ids.join('|'));
          }}
        />
      </>
    );
  } else if (type === VARIBLETYPE.COLOR) {
    return (
      <>
        <FormHelperText sx={{ mb: 1 }}>{helperText}</FormHelperText>
        <PhotoshopPicker
          color={value}
          onChangeComplete={(color: any) => onChange(color.hex)}
        />
      </>
    );
  }
};

export default VariableValuePicker;
