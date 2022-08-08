import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export function CustomAutoComplete(props) {
  const {
    inputValues,
    className,
    label,
    name,
    onChange,
    onBlur,
    error,
    helperText,
    value,
    isViewMode,
  } = props;
  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple
        id="tags-filled"
        className={className}
        onBlur={onBlur}
        value={value || []}
        onChange={onChange}
        disabled={isViewMode}
        options={inputValues.map((option) => option)}
        getOptionLabel={(option) => option?.name || option?.label}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option?.name || option?.label}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            name={name}
            error={Boolean(error)}
            helperText={helperText}
            fullWidth
          />
        )}
      />
    </Stack>
  );
}
