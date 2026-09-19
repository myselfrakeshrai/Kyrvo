import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  IconButton,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Paper,
  Collapse,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add,
  Remove,
  ExpandLess,
  ExpandMore,
  Check,
  Close,
} from '@mui/icons-material';
import { tryParseJSON } from 'src/utils/helpers';

interface JsonSchemaCreatorProps {
  uiSchemaString: string | undefined | null;
  onChange: (
    jsonSchemaString: string,
    fields: string,
    uiSchemaString: string,
  ) => void;
}

interface SchemaField {
  name: string;
  title: string;
  type: string;
  isRequired: boolean;
  children?: SchemaField[];
  isCollapsed?: boolean;
}

interface RecordType {
  type: string;
  title: string;
  properties?: Record<string, RecordType>;
  items?: RecordType;
  required?: string[];
}

const fieldTypes = [
  { id: 'array', name: 'Array' },
  { id: 'boolean', name: 'Boolean' },
  { id: 'color', name: 'Color' },
  { id: 'date', name: 'Date' },
  { id: 'html', name: 'HTML' },
  { id: 'image-multi', name: 'Image Multi' },
  { id: 'image-single', name: 'Image Single' },
  { id: 'json', name: 'JSON' },
  { id: 'location', name: 'Location' },
  { id: 'number', name: 'Number' },
  { id: 'string', name: 'String' },
  { id: 'time', name: 'Time' },
];
const JsonSchemaCreator: React.FC<JsonSchemaCreatorProps> = ({
  uiSchemaString,
  onChange,
}) => {
  const [dirty, setDirty] = useState<boolean>(false);
  console.log('schema', uiSchemaString);
  const [fields, setFields] = useState<SchemaField[]>(
    uiSchemaString ? tryParseJSON(uiSchemaString) : [],
  );
  useEffect(() => {
    setDirty(false);
    setFields(uiSchemaString ? tryParseJSON(uiSchemaString) : []);
  }, [uiSchemaString]);

  useEffect(() => {
    setDirty(true);
  }, [fields]);

  const onAcceptChanges = () => {
    const buildSchema = (fields: SchemaField[]): Record<string, RecordType> => {
      return fields.reduce(
        (acc, field) => {
          if (field.name && field.type) {
            const fieldSchema: RecordType = {
              type: field.type,
              title: field.title,
            };
            if (field.children) {
              if (field.type === 'json') {
                fieldSchema.type = 'object';
                fieldSchema.properties = buildSchema(field.children);
                fieldSchema.required = buildRequired(field.children);
              } else if (field.type === 'array') {
                fieldSchema.type = 'array';
                const childFieldSchema: RecordType = {
                  type: 'object',
                  title: field.title,
                };
                childFieldSchema.properties = buildSchema(field.children);
                childFieldSchema.required = buildRequired(field.children);
                fieldSchema.items = childFieldSchema;
              }
            }
            if (
              field.type === 'image-single' ||
              field.type === 'image-multi' ||
              field.type === 'color' ||
              field.type === 'html' ||
              field.type === 'location' ||
              field.type === 'time' ||
              field.type === 'date'
            ) {
              fieldSchema.type = 'string';
            }
            acc[field.name] = fieldSchema;
          }
          return acc;
        },
        {} as Record<string, RecordType>,
      );
    };

    const buildRequired = (fields: SchemaField[]): string[] => {
      return fields
        .filter((field) => field.isRequired)
        .reduce((acc, field) => {
          acc.push(field.name);
          // if (field.children) {
          //   acc = acc.concat(buildRequired(field.children));
          // }
          return acc;
        }, [] as string[]);
    };

    const buildUiSchema = (fields: SchemaField[]): any => {
      return fields.reduce((uiSchema: any, field: SchemaField) => {
        const fieldUiSchema: any = {};
        if (field.type === 'image-single') {
          fieldUiSchema['ui:widget'] = 'singleImage';
        }
        if (field.type === 'image-multi') {
          fieldUiSchema['ui:widget'] = 'multiImage';
        }
        if (field.type === 'color') {
          fieldUiSchema['ui:widget'] = 'colorPicker';
        }
        if (field.type === 'location') {
          fieldUiSchema['ui:widget'] = 'locationPicker';
        }
        if (field.type === 'date') {
          fieldUiSchema['ui:widget'] = 'datePicker';
        }
        if (field.type === 'time') {
          fieldUiSchema['ui:widget'] = 'timePicker';
        }
        if (field.type === 'html') {
          fieldUiSchema['ui:widget'] = 'htmlEditor';
        }
        if (
          field.children &&
          field.children.length > 0 &&
          field.type === 'json'
        ) {
          fieldUiSchema[field.name] = buildUiSchema(field.children);
          uiSchema = fieldUiSchema;
        } else if (
          field.children &&
          field.children.length > 0 &&
          field.type === 'array'
        ) {
          fieldUiSchema['items'] = buildUiSchema(field.children);
          uiSchema[field.name] = fieldUiSchema;
        } else {
          uiSchema[field.name] = fieldUiSchema;
        }
        return uiSchema;
      }, {});
    };
    const schema = {
      type: 'object',
      properties: buildSchema(fields),
      required: buildRequired(fields),
    };
    onChange(
      JSON.stringify(schema),
      JSON.stringify(fields),
      JSON.stringify(buildUiSchema(fields)),
    );
    setDirty(false);
  };

  const onRejectChanges = () => {
    setFields(JSON.parse(uiSchemaString || '[]'));
    setDirty(false);
  };

  const handleFieldChange = (
    event:
      | React.ChangeEvent<
          | HTMLInputElement
          | HTMLTextAreaElement
          | {
              value: unknown;
            }
        >
      | SelectChangeEvent<string>,
    field: SchemaField,
  ) => {
    const { name, value, type } = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement;
    const newValue =
      type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
    if (name === 'name' || name === 'type' || name === 'title') {
      field[name as 'name' | 'type' | 'title'] = newValue as string;
    } else if (name === 'isRequired') {
      field[name as 'isRequired'] = newValue as boolean;
    }
    if (name === 'type' && (newValue === 'json' || newValue === 'array')) {
      field.children = field.children || [];
    } else if (name === 'type') {
      delete field.children;
    }
    setFields([...fields]);
  };

  const handleAddField = () => {
    const newField = {
      name: '',
      type: '',
      title: '',
      isRequired: false,
      isCollapsed: false,
    };
    setFields([...fields, newField]);
  };

  const handleAddChildField = (field: SchemaField) => {
    const newField = {
      name: '',
      type: '',
      title: '',
      isRequired: false,
      isCollapsed: false,
    };
    field.children = field.children || [];
    field.children.push(newField);
    setFields([...fields]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleRemoveChildField = (parentField: SchemaField, index: number) => {
    if (parentField.children) {
      const updatedChildren = [...parentField.children];
      updatedChildren.splice(index, 1);
      parentField.children = updatedChildren;
      setFields([...fields]);
    }
  };

  const handleToggleCollapse = (field: SchemaField) => {
    field.isCollapsed = !field.isCollapsed;
    setFields([...fields]);
  };

  const renderFields = (
    fields: SchemaField[],
    level: number = 0,
    parentField?: SchemaField,
    parentIndex?: string,
  ) => {
    return fields?.map((field, index) => {
      const currentIndex = parentIndex
        ? `${parentIndex}.${index + 1}`
        : `${index + 1}`;
      return (
        <Box key={currentIndex} my={0} style={{ marginLeft: level * 2 }}>
          <Box
            sx={{
              padding: '10px',
              borderLeft: '1px dotted',
            }}
          >
            <Grid container spacing={1} alignItems="center">
              {/* <Grid item xs={1} sx={{ float: 'right' }}>
                <Typography variant="body2" px={1}>
                  {currentIndex}
                </Typography>
              </Grid> */}

              <Grid item xs={1}>
                {(field.type === 'json' || field.type === 'array') && (
                  <Button
                    color="info"
                    onClick={() => handleToggleCollapse(field)}
                    startIcon={
                      field.isCollapsed ? <ExpandMore /> : <ExpandLess />
                    }
                  >
                    {currentIndex}
                  </Button>
                )}
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Name"
                  name="name"
                  value={field.name}
                  onChange={(event) => handleFieldChange(event, field)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Title"
                  name="title"
                  value={field.title}
                  onChange={(event) => handleFieldChange(event, field)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth required>
                  <InputLabel>Field Type</InputLabel>
                  <Select
                    label="Field Type"
                    name="type"
                    value={field.type}
                    onChange={(event) => handleFieldChange(event, field)}
                  >
                    {fieldTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.isRequired}
                      onChange={(event) => handleFieldChange(event, field)}
                      name="isRequired"
                      color="primary"
                    />
                  }
                  label="Required"
                />
              </Grid>
              <Grid item xs={1}>
                {parentField ? (
                  <IconButton
                    onClick={() => handleRemoveChildField(parentField, index)}
                    color="error"
                  >
                    <Remove />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => handleRemoveField(index)}
                    color="error"
                  >
                    <Remove />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            {(field.type === 'json' || field.type === 'array') && (
              <Collapse in={!field.isCollapsed}>
                <Box ml={2} mt={2}>
                  {renderFields(
                    field.children!,
                    level + 1,
                    field,
                    currentIndex,
                  )}
                  <IconButton
                    onClick={() => handleAddChildField(field)}
                    style={{ marginTop: '10px', marginLeft: '-10px' }}
                    color="success"
                  >
                    <Add />
                  </IconButton>
                </Box>
              </Collapse>
            )}
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box>
      {dirty && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<Check />}
            sx={{ mx: 1 }}
            onClick={onAcceptChanges}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            startIcon={<Close />}
            sx={{ mx: 1 }}
            onClick={onRejectChanges}
          >
            Cancel
          </Button>
        </Box>
      )}
      <Paper elevation={2} style={{ padding: '10px' }}>
        {renderFields(fields)}
        <IconButton
          onClick={handleAddField}
          style={{ marginTop: '10px' }}
          color="success"
        >
          <Add />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default JsonSchemaCreator;
