import React, { useEffect } from "react";
import { ListTopbar } from "../shared/ListTopbar";
import { clickPaths } from "../navigation/routePaths";
import { ListContainer } from "../styled";
import CustomMultipleImageUpload from "../shared/CustomMultipleImageUpload";
import { Grid } from "@mui/material";
import { CustomSelectField } from "../shared/CustomSelectField";
import { getProductById } from "../api/api";

export const FormMaster = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [files, setFiles] = React.useState([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("user"));
    const userId = localData.data.id;

    getProductById(userId)
      .then((res) => {
        setTableData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const storingImage = (event) => {
    for (let i = 0; i < event.target?.files?.length; i++) {
      // console.log(event.target.files, "files");
      const newImage = event.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  useEffect(() => {
    images?.forEach((image, index) => {
      let reader = new FileReader();
      reader.onload = () => {
        setFiles((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(image);
    });
  }, [images]);

  return (
    <>
      <ListContainer>
        <ListTopbar
          searchField={false}
          newForm={false}
          download={false}
          filter={false}
          label={"FORM MASTER"}
          newFormPath={clickPaths.USENAVIGATEFORMMASTERFORM}
        />
        {/* <CustomMultipleImageUpload label="upload image" /> */}
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12}>
            <CustomSelectField
              inputValues={tableData}
              label={"Select Product"}
              value={value}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomMultipleImageUpload
              label={"upload image"}
              value={images}
              onChange={storingImage}
            />
          </Grid>
          {files?.map((file, index) => {
            return (
              <Grid item xs={3}>
                <img src={file} alt={index} height={"100px"} width={"100%"} />
              </Grid>
            );
          })}
        </Grid>
      </ListContainer>
    </>
  );
};
