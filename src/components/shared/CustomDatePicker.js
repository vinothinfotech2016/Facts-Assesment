import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormHelperText } from "@mui/material";

export function CustomDatePicker(props) {
  const {
    label,
    onChange,
    value,
    name,
    isViewMode,
    maxDate,
    minDate,
    className,
    helperText,
    error,
    style,
  } = props;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          name={name}
          label={label}
          value={value || ""}
          minDate={minDate}
          maxDate={maxDate}
          style={style}
          readOnly={isViewMode}
          className={className}
          onChange={(newValue) => {
            onChange(newValue?._d);
          }}
          renderInput={(params) => (
            <TextField {...params} error={error} fullWidth />
          )}
        />
      </LocalizationProvider>
      <FormHelperText style={{ color: "#d32f2f", marginLeft: "16px" }}>
        {helperText}
      </FormHelperText>
    </>
  );
}
