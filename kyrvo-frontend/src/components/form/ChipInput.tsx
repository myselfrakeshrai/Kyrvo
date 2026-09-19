import {
  Autocomplete,
  FilterOptionsState,
  TextField,
  TextFieldProps,
  createFilterOptions,
} from '@mui/material';
import React from 'react';
type ChipInputProps = TextFieldProps & {
  options: string[] | undefined;
  onUpdate: (val: string[]) => void;
};
interface OptionItemInterface {
  option: string;
  selected: boolean;
  props: React.HTMLAttributes<HTMLLIElement>;
}
const _filterOptions = createFilterOptions<string>();
const filterOption = (props: string[], state: FilterOptionsState<string>) => {
  const results = _filterOptions(props, state);

  return results.slice(0, 6);
};

const OptionItem: React.FC<OptionItemInterface> = ({ option, props }) => {
  return (
    <li
      {...props}
      style={{
        display: 'block',
        width: '100%',
      }}
    >
      {option}
    </li>
  );
};

const ChipInput: React.FC<ChipInputProps> = (props) => {
  console.log(props.options);
  return (
    <Autocomplete
      multiple
      options={props.options || ['No category']}
      fullWidth={true}
      disableCloseOnSelect
      filterOptions={filterOption}
      filterSelectedOptions
      getOptionLabel={(option) => option as string}
      isOptionEqualToValue={(option, newValue) => {
        return option === newValue;
      }}
      inputValue={''}
      value={(props.value as string[]) || []}
      renderOption={(childProps, option, { selected }) => (
        <OptionItem
          props={childProps}
          option={option}
          selected={selected}
          key={option}
        />
      )}
      onChange={(e, tagOption) => {
        if (e) return props.onUpdate(tagOption);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label={props.label}
          placeholder={props.placeholder}
        />
      )}
    />
  );
};

export default ChipInput;