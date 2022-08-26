import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React from "react";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import {
  newFormMasterSchema,
  newFormMasterUiSchema,
} from "../schema/newFormMaster";
import { useNavigate } from "react-router";
import { TableBodyCell, TableHeadingCell } from "../styled/styledProfile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const NewFormMaster = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [actionItemList, setActionItemList] = React.useState([]);

  const addToTable = () => {
    // console.log(actionItem, "actionItem");
    setActionItemList([...actionItemList, userData]);
    console.log(actionItemList, "actionItemList");
  };

  return (
    <>
      <Box>
        <FormTopbar
          label="New Form Master"
          listPath={clickPaths.USENAVIGATEFORMMASTER}
        />
        <Box className="container">
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
        </Box>
      </Box>
    </>
  );
};
