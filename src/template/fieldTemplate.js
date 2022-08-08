export const CustomFieldTemplate = (props) => {
  const { classNames, help, description, children, rawErrors } = props;
  return (
    <div className={classNames}>
      {description}
      {children}
      <div
        style={{
          color: "#f44336",
          fontSize: "0.85rem",
          marginTop: 8,
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {rawErrors?.length && rawErrors[0]}
      </div>
      {help}
    </div>
  );
};
