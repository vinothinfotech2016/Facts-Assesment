import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import {
  Box,
  Button,
  Grid,
  Stack,
  // Button,
  // Paper,
  // Table,
  // TableBody,
  // TableContainer,
  // TableHead,
  // TableRow,
} from "@mui/material";
// import { customErrorMsg } from "../../template/customErrorMsg";
// import { CustomFieldTemplate } from "../../template/fieldTemplate";
// import { objectFieldTemplate } from "../../template/objectTemplate";
import React, { useEffect } from "react";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import { CustomUploadImage } from "../shared/CustomUploadImage";
import { height } from "@mui/system";
// import {
//   newFormMasterSchema,
//   newFormMasterUiSchema,
// } from "../schema/newFormMaster";
// import { useNavigate } from "react-router";
// import { TableBodyCell, TableHeadingCell } from "../styled/styledProfile";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

export const NewFormMaster = (props) => {
  // const navigate = useNavigate();
  // const [userData, setUserData] = React.useState({});
  // const [liveValidator, setLiveValidator] = React.useState(false);
  // const [actionItemList, setActionItemList] = React.useState([]);

  // const addToTable = () => {
  //   // console.log(actionItem, "actionItem");
  //   setActionItemList([...actionItemList, userData]);
  //   console.log(actionItemList, "actionItemList");
  // };
  const [source, setSource] = React.useState("");

  const changeHandler = (value) => {
    setSource(value);
  };

  const removeImage = () => {
    setSource("");
  };

  return (
    <>
      <Box>
        <FormTopbar
          label="New Form Master"
          listPath={clickPaths.USENAVIGATEFORMMASTER}
        />
        {/* <Box className="container">
          <Form
            schema={newFormMasterSchema}
            uiSchema={newFormMasterUiSchema()}
            widgets={widgets}
            formData={userData}
            showErrorList={false}
            liveValidate={liveValidator}
            noHtml5Validate
            ObjectFieldTemplate={objectFieldTemplate}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={(errors) =>
              customErrorMsg(errors, newFormMasterSchema)
            }
            onChange={(e) => {
              console.log(e.formData);
              setUserData({
                ...e.formData,
              });
            }}
            onSubmit={(props) => {
              console.log(props.formData);
              console.log(customErrorMsg);
            }}
          >
            <Box className="btnContainer">
              <Button
                variant="contained"
                className="btn"
                onClick={() => addToTable()}
              >
                ADD
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table style={{ padding: "50px" }}>
                <TableHead>
                  <TableRow>
                    <TableHeadingCell>Action Item</TableHeadingCell>
                    <TableHeadingCell>Form</TableHeadingCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {actionItemList &&
                    actionItemList.map((data, index) => {
                      return (
                        <TableRow key={index + 1}>
                          <TableBodyCell>
                            <Box>{data.selectActionItem}</Box>
                            <Box>{data.selectForm}</Box>

                            <Box style={{ marginRight: "50px" }}>
                              <EditIcon
                                color="action"
                                onClick={() => console.log("cliked")}
                              />
                              <DeleteIcon
                                color="action"
                                style={{ paddingLeft: "10px" }}
                                onClick={() => console.log("cliked")}
                              />
                            </Box>
                          </TableBodyCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box className="btnContainer">
              <Button
                variant="outlined"
                className="btn"
                onClick={() => navigate(clickPaths.USENAVIGATEFORMMASTER)}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="outlined"
                className="btn"
                onClick={() => setLiveValidator(true)}
              >
                SUBMIT
              </Button>
            </Box>
          </Form>

          {/* <CustomReactTable
              columnData={ActionItem()}
              rawData={actionItemList}
              disableRowSelection={true}
              columnSize={false}
              disablePagination={true}
            /> */}
        {/* </Box> */}

        {Boolean(source) ? (
          <>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={source} alt={"image"} width={500} height={500} />
                </Box>
                <Button
                  onClick={() => {
                    removeImage();
                  }}
                  sx={{
                    margin: "100px",
                  }}
                >
                  remove image
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              marginTop: "300px",
              zIndex: 9999,
              // backgroundColor: "#000",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={3}>
                <CustomUploadImage
                  value={source}
                  label={"upload image"}
                  onChange={changeHandler}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};
