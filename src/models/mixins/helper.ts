export function removeUnwantedFields(jsonschema: any, data: any) {
  const fields = jsonschema.properties
    ? Object.keys(jsonschema.properties)
    : [];
  Object.keys(data).map((key) => {
    if (!fields.includes(key)) {
      delete data[key];
    }
  });
}
