import React from "react";
import { CustomTimeField } from "../CustomTimeField";

export function WidgetTimeField(props) {
  const { className, schema, value, onChange, readonly } = props;

  return (
    <CustomTimeField
      InputLabelProps={{ shrink: true }}
      className={className}
      label={schema.label}
      isViewMode={readonly}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
