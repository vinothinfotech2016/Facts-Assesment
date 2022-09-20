import React from "react";
import { CustomUploadImage } from "../CustomUploadImage";

export const WidgetUploadFile = (props) => {
  const { url, value, onChange, readonly, schema } = props;

  return (
    <CustomUploadImage
      label={schema?.label}
      url={url}
      value={value}
      onChange={(val) => onChange(val)}
      profileUrl=""
      isViewMode={readonly}
      uploadFile={schema?.uploadFile}
    />
  );
};
