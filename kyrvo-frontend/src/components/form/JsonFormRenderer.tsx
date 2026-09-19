import { Form } from '@rjsf/mui';
import React from 'react';
import Validator from '@rjsf/validator-ajv8';
import { WidgetProps, RegistryWidgetsType } from '@rjsf/utils';
import {
  CustomDatePicker,
  CustomTimePicker,
  HtmlEditor,
  ImageSelector,
  LocationPicker,
} from '..';
import CustomColorPicker from '../CustomColorPicker';

interface JsonFormRendererProps {
  schema: string;
  data: string;
  uiSchema?: string;
  onSubmit: (data: string) => void;
}
const CustomSingleImage: React.FC<WidgetProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <ImageSelector
      label={label}
      displaySize={50}
      initial={[value]}
      onSubmit={(imageIds: string[]) => {
        onChange(imageIds[0]);
      }}
      singleSelect={true}
    />
  );
};
const CustomMultiImage: React.FC<WidgetProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <ImageSelector
      label={label}
      displaySize={50}
      initial={value?.split('|') || []}
      onSubmit={(imageIds: string[]) => {
        onChange(imageIds.join('|'));
      }}
      singleSelect={false}
    />
  );
};

const CustomColorSelector: React.FC<WidgetProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <CustomColorPicker
      label={label}
      value={value}
      onChange={(color: string) => onChange(color)}
    />
  );
};

const CustomLocationPicker: React.FC<WidgetProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <LocationPicker
      label={label}
      defaultValue={value}
      error={false}
      message=""
      onSelect={(color: string) => onChange(color)}
    />
  );
};

const customDatePicker: React.FC<WidgetProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <CustomDatePicker
      label={label}
      defaultValue={value}
      error={false}
      message=""
      onChange={(value: string) => onChange(value)}
    />
  );
};

const customTimePicker: React.FC<WidgetProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <CustomTimePicker
      label={label}
      defaultValue={value}
      error={false}
      message=""
      onChange={(value: string) => onChange(value)}
    />
  );
};
const customHtmlEditor: React.FC<WidgetProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <HtmlEditor
      key={label}
      label={label}
      value={value}
      error={false}
      helperText=""
      onEditorUpdate={(value: string) => onChange(value as string)}
    />
  );
};
const JsonFormRenderer: React.FC<JsonFormRendererProps> = ({
  schema,
  data,
  uiSchema,
  onSubmit,
}) => {
  const widgets: RegistryWidgetsType = {
    singleImage: CustomSingleImage,
    multiImage: CustomMultiImage,
    colorPicker: CustomColorSelector,
    locationPicker: CustomLocationPicker,
    datePicker: customDatePicker,
    timePicker: customTimePicker,
    htmlEditor: customHtmlEditor,
  };
  return (
    <Form
      schema={JSON.parse(schema || '{}')}
      formData={JSON.parse(data || '{}')}
      uiSchema={JSON.parse(uiSchema || '{}')}
      widgets={widgets}
      validator={Validator}
      onSubmit={({ formData }) => onSubmit(JSON.stringify(formData))}
    ></Form>
  );
};

export default JsonFormRenderer;
