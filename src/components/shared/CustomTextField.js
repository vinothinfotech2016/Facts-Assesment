import React from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles((theme) => ({
  hidePassword: {
    "& div > input": {
      "-webkit-text-security": "disc",
    },
  },
}));

export function CustomTextField(props) {
  const {
    type,
    name,
    onChange,
    error,
    helpertext,
    value,
    variant,
    onBlur,
    label,
    disabled,
    style,
    isViewMode,
    maxLength,
    showEyeIcon,
    fullWidth,
    fieldType,
    autoComplete,
    className,
  } = props;
  const classes = useStyle();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (e) => {
    if (fieldType === "mobile") {
      return !/[0-9+-]/.test(e.key) && e.preventDefault();
    }
    if (fieldType === "alphaNumeric") {
      return !/[0-9A-Za-z]/.test(e.key) && e.preventDefault();
    }
    if (type === "number") {
      return !/[0-9]/.test(e.key) && e.preventDefault();
    }
  };

  return (
    <>
      <TextField
        id="standard-basic"
        label={label}
        variant={variant ? variant : "outlined"}
        type={showPassword ? "text" : type}
        name={name}
        fullWidth={fullWidth}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ""}
        error={Boolean(error)}
        helperText={helpertext || error}
        style={style}
        className={clsx(
          showPassword && value && classes.hidePassword,
          className
        )}
        InputProps={{
          onKeyPress: (e) => handleKeyPress(e),
          readOnly: isViewMode,
          disabled: disabled,
          endAdornment: showEyeIcon && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onInput={(e) => {
          e.target.value &&
            maxLength &&
            (e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, maxLength));
        }}
      />
    </>
  );
}
