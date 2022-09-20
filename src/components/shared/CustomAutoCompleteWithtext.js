import { Autocomplete, Chip, TextField } from "@mui/material";
import React from "react";

function CustomAutoCompleteWithtext(props) {
  const { value, onChange, name, error, helperText, schema } = props;
  const { label, items } = schema;

  return (
    <>
      <Autocomplete
        multiple
        id="tags-filled"
        options={items?.options?.map((option) => option || [])}
        value={value || []}
        getOptionLabel={(option) => option?.name || option?.label}
        onChange={(event, newValue) => {
          onChange(newValue);
          // onChange(newValue?.length ? newValue : null);
        }}
        freeSolo
        renderTags={(value, getTagProps) =>
          value?.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
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
    </>
  );
}

export default CustomAutoCompleteWithtext;
