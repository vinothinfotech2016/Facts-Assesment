import {
  WidgetAutocomplete,
  WidgetDateField,
  WidgetRadioBtn,
  WidgetSelectField,
  WidgetTextField,
  WidgetTimeField,
  WidgetPassword,
  WidgetUploadFile,
  CustomButton,
  DividerLine,
  WidgetChipAutocomplete,
  WidgetCheckbox,
} from "../components/shared/widgets";

export const widgets = {
  TextWidget: WidgetTextField,
  DateWidget: WidgetDateField,
  SelectWidget: WidgetSelectField,
  RadioWidget: WidgetRadioBtn,
  CheckboxWidget: WidgetCheckbox,
  time: WidgetTimeField,
  FileWidget: WidgetUploadFile,
  multiSelect: WidgetAutocomplete,
  customButton: CustomButton,
  customDivider: DividerLine,
  chipType: WidgetChipAutocomplete,
  PasswordWidget: WidgetPassword,
};
