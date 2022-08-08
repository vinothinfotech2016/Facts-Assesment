import React from "react";
import moment from "moment";
import { CustomDatePicker } from "../CustomDatePicker";

export function WidgetDateField(props) {
  const { className, schema, value, onChange, readonly } = props;
  return (
    <CustomDatePicker
      label={schema.label}
      value={value}
      className={className}
      isViewMode={readonly}
      onChange={(value) => {
        onChange(moment(value).format("L"));
      }}
    />
  );
}
