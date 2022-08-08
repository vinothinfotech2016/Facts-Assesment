import React from "react";
import { Button } from "@mui/material";

export const CustomButton = (props) => {
  const {
    color,
    startIcon,
    schema: { label },
    variant = "contained",
    isViewMode = false,
  } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button
        variant={variant}
        className={props.uiSchema.className}
        onClick={() => props.uiSchema.onClick && props.uiSchema.onClick()}
        // type={type || "submit"}
        color={color}
        startIcon={startIcon}
        disabled={isViewMode}
      >
        {label || "add"}
      </Button>
    </div>
  );
};
