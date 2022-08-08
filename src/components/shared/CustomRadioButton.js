import * as React from "react";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormHelperText } from "@mui/material";

export function CustomRadioButton(props) {
  const {
    inputValues,
    name,
    onChange,
    onBlur,
    error,
    value,
    labelStyle,
    label,
    helpertext,
    style,
    rowWise,
    readonly,
  } = props;

  return (
    <FormControl>
      <div
        style={{
          display: "flex",
          alignItems: rowWise ? "left" : "center",
          flexDirection: rowWise && "column",
        }}
      >
        <span style={labelStyle}>{label}</span>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          value={value || ""}
          style={style}
          row
        >
          {inputValues?.map((option, i) => (
            <FormControlLabel
              value={
                option?.accessor
                  ? option[option?.accessor]
                  : option?.id || option?.value
              }
              control={<Radio />}
              label={option.name || option.label}
              key={i}
              name={name}
              disabled={readonly}
              // sx={{ marginLeft: "22px" }}
            />
          ))}
        </RadioGroup>
      </div>
      <FormHelperText style={{ marginLeft: "32px", color: "#d33730" }}>
        {helpertext}
      </FormHelperText>
    </FormControl>
  );
}
