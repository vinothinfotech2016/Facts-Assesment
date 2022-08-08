import React from "react";
import { CustomAutoComplete } from "../CustomAutoComplete";

export function WidgetAutocomplete(props) {
  const { schema, value, onChange, readonly, className } = props;
  const { options } = schema.items;

  return (
    <CustomAutoComplete
      label={schema.label}
      className={className}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      isViewMode={readonly}
      inputValues={options}
    />
  );
}
