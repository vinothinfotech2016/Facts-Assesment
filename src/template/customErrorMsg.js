export const customErrorMsg = (errors, initialSchema) => {
  return errors?.map((error) => {
    if (error?.name === "required") {
      error.message = `${
        initialSchema?.properties[error.params.missingProperty]?.label
      } is mandatory`;
    }
    return error;
  });
};
