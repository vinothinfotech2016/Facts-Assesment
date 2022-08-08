import React from "react";
import { CustomRadioButton } from "../CustomRadioButton";

export function WidgetRadioBtn(props) {
  const { schema, value, onChange, options, readonly, uiSchema } = props;

  const [dynamicOptions, setDynamicOptions] = React.useState(
    options?.enumOptions
  );

  React.useEffect(() => {
    schema.options && setDynamicOptions(schema.options);
  }, [schema.options]);

  return (
    <CustomRadioButton
      label={schema.label}
      labelStyle={uiSchema?.labelStyle}
      value={value}
      rowWise={uiSchema?.rowWise}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      readonly={readonly}
      inputValues={dynamicOptions ? dynamicOptions : []}
    />
  );
}
