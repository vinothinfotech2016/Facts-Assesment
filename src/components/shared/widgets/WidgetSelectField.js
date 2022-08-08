import React from "react";
import { CustomSelectField } from "../CustomSelectField";

export function WidgetSelectField(props) {
  const { schema, value, onChange, options, readonly, className } = props;

  const [dynamicOptions, setDynamicOptions] = React.useState(
    options?.enumOptions
  );

  React.useEffect(() => {
    schema?.options && setDynamicOptions(schema.options);
  }, [schema?.options]);

  return (
    <CustomSelectField
      label={schema.label}
      value={value}
      inputValues={dynamicOptions ? dynamicOptions : []}
      onChange={(event) => onChange(event.target.value)}
      isViewMode={readonly}
      className={className}
    />
  );
}
