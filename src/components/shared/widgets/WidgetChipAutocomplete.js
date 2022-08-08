import { Autocomplete, Chip, TextField } from "@mui/material";
import React from "react";

export function WidgetChipAutocomplete(props) {
  const { label, placeholder, onChange, readonly, value } = props;

  return (
    <Autocomplete
      value={value || []}
      onChange={(event, newValue) => {
        onChange(newValue);
        // onChange(newValue?.length ? newValue : null);
      }}
      disabled={readonly}
      multiple
      id="tags-filled"
      options={[]}
      freeSolo
      renderTags={(value, getTagProps) => {
        return value?.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
}
