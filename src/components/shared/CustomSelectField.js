import { TextField, MenuItem } from "@mui/material";
import { Box } from "@mui/material";
export const CustomSelectField = (props) => {
  const {
    label,
    variant,
    inputValues,
    name,
    onChange,
    onBlur,
    value,
    className,
    style,
    fieldStyle,
    error,
    isViewMode,
  } = props;

  return (
    <>
      <Box style={style}>
        <TextField
          select
          value={value || ""}
          label={label}
          onChange={onChange}
          variant={variant || "outlined"}
          fullWidth
          name={name}
          onBlur={onBlur}
          error={Boolean(error)}
          helperText={error}
          className={className}
          style={fieldStyle}
          InputProps={{
            readOnly: isViewMode,
          }}
        >
          {inputValues?.map((option, index) => (
            <MenuItem
              key={index}
              value={
                option?.accessor
                  ? option[option?.accessor]
                  : option.id || option.value
              }
            >
              {option.name || option.label || "No data Found"}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </>
  );
};
