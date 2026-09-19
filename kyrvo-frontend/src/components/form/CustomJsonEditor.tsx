import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface JsonEditorProps {
  jsonString: string;
  depth?: number;
}

type JsonValueType = string | number | boolean | Record<string, any> | any[];

interface JsonField {
  key: string;
  value: JsonValueType;
  type: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonString, depth = 0 }) => {
  const [json, setJson] = useState<JsonField[]>([]);

  useEffect(() => {
    try {
      const parsedJson = JSON.parse(jsonString);
      const fields = Object.entries(parsedJson).map(([key, value]) => ({
        key,
        value,
        type: Array.isArray(value) ? 'array' : typeof value,
      }));
      setJson(fields as JsonField[]);
    } catch (error) {
      console.error('Invalid JSON string provided:', error);
    }
  }, [jsonString]);

  const handleChange = (
    index: number,
    key: string,
    value: JsonValueType,
    type: string,
  ) => {
    setJson((prevJson) =>
      prevJson.map((field, i) =>
        i === index ? { ...field, key, value, type } : field,
      ),
    );
  };

  const handleArrayItemChange = (
    fieldIndex: number,
    itemIndex: number,
    value: JsonValueType,
    _type: string,
  ) => {
    console.log(_type);
    setJson((prevJson) =>
      prevJson.map((field, i) =>
        i === fieldIndex
          ? {
              ...field,
              value: (field.value as any[]).map((item, j) =>
                j === itemIndex ? value : item,
              ),
              type: 'array',
            }
          : field,
      ),
    );
  };

  const handleArrayItemTypeChange = (
    fieldIndex: number,
    itemIndex: number,
    type: string,
  ) => {
    setJson((prevJson) =>
      prevJson.map((field, i) =>
        i === fieldIndex
          ? {
              ...field,
              value: (field.value as any[]).map((item, j) =>
                j === itemIndex
                  ? type === 'number'
                    ? 0
                    : type === 'boolean'
                      ? false
                      : ''
                  : item,
              ),
              type: 'array',
            }
          : field,
      ),
    );
  };

  const handleAddField = () => {
    setJson((prevJson) => [
      ...prevJson,
      { key: `newField${prevJson.length}`, value: '', type: 'string' },
    ]);
  };

  const handleDeleteField = (index: number) => {
    setJson((prevJson) => prevJson.filter((_, i) => i !== index));
  };

  const handleAddArrayItem = (fieldIndex: number) => {
    setJson((prevJson) =>
      prevJson.map((field, i) =>
        i === fieldIndex
          ? { ...field, value: [...(field.value as any[]), ''], type: 'array' }
          : field,
      ),
    );
  };

  const handleDeleteArrayItem = (fieldIndex: number, itemIndex: number) => {
    setJson((prevJson) =>
      prevJson.map((field, i) =>
        i === fieldIndex
          ? {
              ...field,
              value: (field.value as any[]).filter((_, j) => j !== itemIndex),
            }
          : field,
      ),
    );
  };

  const renderValue = (field: JsonField, index: number) => {
    const { key, value, type } = field;

    if (type === 'object' && value !== null && !Array.isArray(value)) {
      return (
        <Box
          sx={{
            borderLeft: '1px dotted gray',
            paddingLeft: 2,
            marginBottom: 2,
          }}
        >
          <JsonEditor jsonString={JSON.stringify(value)} depth={depth + 1} />
        </Box>
      );
    } else if (type === 'array' && Array.isArray(value)) {
      return (
        <Box
          sx={{
            borderLeft: '1px dotted gray',
            paddingLeft: 2,
            marginBottom: 2,
          }}
        >
          {(value as any[]).map((item, idx) => (
            <Box
              key={idx}
              sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}
            >
              <Typography variant="body2">{idx}:</Typography>
              <Box sx={{ marginLeft: 1, flexGrow: 1 }}>
                <FormControl
                  sx={{ marginRight: 1, minWidth: 120, marginTop: 1 }}
                >
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={typeof item}
                    onChange={(e) =>
                      handleArrayItemTypeChange(
                        index,
                        idx,
                        e.target.value as string,
                      )
                    }
                  >
                    <MenuItem value="string">String</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="boolean">Boolean</MenuItem>
                    <MenuItem value="object">Object</MenuItem>
                    <MenuItem value="array">Array</MenuItem>
                  </Select>
                </FormControl>
                {typeof item === 'object' &&
                item !== null &&
                !Array.isArray(item) ? (
                  <JsonEditor
                    jsonString={JSON.stringify(item)}
                    depth={depth + 1}
                  />
                ) : (
                  <TextField
                    label="Value"
                    variant="outlined"
                    value={item}
                    onChange={(e) => {
                      let newValue: JsonValueType = e.target.value;
                      if (typeof item === 'number')
                        newValue = parseFloat(e.target.value);
                      if (typeof item === 'boolean')
                        newValue = e.target.value === 'true';
                      handleArrayItemChange(index, idx, newValue, typeof item);
                    }}
                    sx={{ marginRight: 1, marginTop: 1 }}
                  />
                )}
                <IconButton onClick={() => handleDeleteArrayItem(index, idx)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => handleAddArrayItem(index)}
            startIcon={<AddIcon />}
            sx={{ marginTop: 1 }}
          >
            Add Item
          </Button>
        </Box>
      );
    } else {
      return (
        <TextField
          label="Value"
          variant="outlined"
          value={value}
          onChange={(e) => {
            let newValue: JsonValueType = e.target.value;
            if (type === 'number') newValue = parseFloat(e.target.value);
            if (type === 'boolean') newValue = e.target.value === 'true';
            handleChange(index, key, newValue, type);
          }}
          sx={{ marginRight: 1, marginTop: 1 }}
        />
      );
    }
  };

  return (
    <Box sx={{ paddingLeft: depth * 2 }}>
      <Typography variant="h6" gutterBottom>
        JSON Editor {depth > 0 && `(Level ${depth})`}
      </Typography>
      {json.map((field, index) => (
        <Box
          key={index}
          sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Key"
              variant="outlined"
              value={field.key}
              onChange={(e) =>
                handleChange(index, e.target.value, field.value, field.type)
              }
              sx={{ marginRight: 1, marginTop: 1 }}
            />
            <FormControl sx={{ marginRight: 1, minWidth: 120, marginTop: 1 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={field.type}
                onChange={(e) =>
                  handleChange(
                    index,
                    field.key,
                    field.value,
                    e.target.value as string,
                  )
                }
              >
                <MenuItem value="string">String</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="boolean">Boolean</MenuItem>
                <MenuItem value="object">Object</MenuItem>
                <MenuItem value="array">Array</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={() => handleDeleteField(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          {renderValue(field, index)}
        </Box>
      ))}
      <Button
        variant="contained"
        onClick={handleAddField}
        startIcon={<AddIcon />}
      >
        Add Field
      </Button>
    </Box>
  );
};

export default JsonEditor;
