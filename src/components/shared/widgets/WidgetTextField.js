import React from "react";
import { CustomTextField } from "../CustomTextField";

export function WidgetTextField(props) {
  const { className, schema, value, onChange, readonly, uiSchema } = props;

  return (
    <CustomTextField
      type={props?.type || schema?.type}
      fieldType={uiSchema?.field}
      label={schema.label}
      className={className}
      value={value}
      onChange={(event) => onChange(event.target.value || undefined)}
      isViewMode={readonly}
      fullWidth={true}
      showEyeIcon={uiSchema?.showEyeIcon}
    />
  );
}
