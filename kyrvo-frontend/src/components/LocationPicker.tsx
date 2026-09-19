import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocationOn as LocationOnIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

interface RequestType {
  input: string;
  componentRestrictions: {
    country: string;
  };
}
interface GoogleMapsProps {
  error: boolean;
  message: string | undefined;
  label: string;
  showLabel?: boolean;
  defaultValue: string | null;
  sx?: any;
  country?: string;
  onSelect: (val: string) => void;
}
const LocationPicker: React.FC<GoogleMapsProps> = ({
  error,
  message,
  label,
  defaultValue,
  sx,
  showLabel,
  country,
  onSelect,
}) => {
  const [value, setValue] = React.useState<PlaceType | null>({
    description: defaultValue,
  } as PlaceType);
  const [inputValue, setInputValue] = React.useState(defaultValue);
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);

  const updateValue = (val: string) => {
    setInputValue(val);
    onSelect(val);
  };

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: RequestType,
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(
      {
        input: inputValue || '',
        componentRestrictions: { country: country || 'us' },
      },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      },
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, country]);

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      fullWidth
      sx={sx}
      onChange={(event: React.SyntheticEvent, newValue: PlaceType | null) => {
        event?.preventDefault();
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event: React.SyntheticEvent, newInputValue) => {
        event?.preventDefault();
        updateValue(newInputValue);
      }}
      renderInput={(params) =>
        !showLabel ? (
          <TextField
            {...params}
            placeholder={label}
            fullWidth
            error={error}
            helperText={message}
            InputLabelProps={{ error: error }}
          />
        ) : (
          <TextField
            {...params}
            placeholder={label}
            fullWidth
            error={error}
            helperText={message}
            label={label}
            InputLabelProps={{ shrink: true, error: error }}
          />
        )
      }
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting?.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting?.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index: number) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting?.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default LocationPicker;
