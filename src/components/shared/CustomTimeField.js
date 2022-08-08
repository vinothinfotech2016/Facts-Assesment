import { TextField } from "@mui/material";
import React from "react";

export function CustomTimeField(props) {
  const { className, label, isViewMode, value, onChange, variant } = props;

  return (
    <TextField
      type="time"
      variant={variant || "outlined"}
      InputLabelProps={{ shrink: true }}
      className={className}
      label={label}
      disabled={isViewMode}
      value={value || ""}
      fullWidth
      onChange={onChange}
    />
  );
}
