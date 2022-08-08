import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

export const WidgetCheckbox = (props) => {
  const { schema, value, onChange, readonly } = props;

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value || false}
          onChange={(event) => {
            onChange(event.target.checked);
          }}
          inputProps={{ "aria-label": "controlled" }}
          disabled={readonly}
        />
      }
      label={schema.label}
    />
  );
};
