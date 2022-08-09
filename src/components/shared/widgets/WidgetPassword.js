import React from "react";
import { CustomPassword } from "../CustomPassword";

export function WidgetPassword(props) {
  const { className, schema, value, onChange, readonly, uiSchema } = props;

  return (
    <CustomPassword
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
