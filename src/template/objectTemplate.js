import { Grid } from "@mui/material";

export const objectFieldTemplate = (props) => {
  const { DescriptionField, description, TitleField, title, properties } =
    props;

  return (
    <>
      {title && <TitleField title={title} />}
      {description && <DescriptionField description={description} />}
      <Grid container spacing={3}>
        {properties.map(({ content }, index) => {
          const { uiSchema } = content.props;

          return (
            <Grid
              item
              xs={uiSchema?.xs || 12}
              sm={uiSchema?.sm || uiSchema?.xs || 12}
              md={uiSchema?.md || uiSchema?.xs || 12}
              lg={uiSchema?.lg || uiSchema?.xs || 12}
              xl={uiSchema?.xl || uiSchema?.xs || 12}
              key={index}
            >
              {content}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
