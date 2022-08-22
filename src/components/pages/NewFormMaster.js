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
import { DividerLine } from "../shared/DividerLine";
import { actionItemSchema, actionItemUischema } from "../schema/formActionItem";
import { TableBodyCell, TableHeadingCell } from "../styled/styledProfile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { CustomReactTable } from "../shared/CustomReactTable";
// import { ActionItem } from "../constants/ActionItem";

export const NewFormMaster = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [actionItem, setActionItem] = React.useState({});
  const [liveValidator1, setLiveValidator1] = React.useState(false);
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [actionItemList, setActionItemList] = React.useState([]);

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
            liveValidate={liveValidator1}
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
                onClick={() => setLiveValidator1(true)}
              >
                SUBMIT
              </Button>
            </Box>
          </Form>
          <DividerLine />
          <h3 className="subheading">On Click</h3>
          <Form
            schema={actionItemSchema}
            uiSchema={actionItemUischema()}
            widgets={widgets}
            formData={actionItem}
            showErrorList={false}
            liveValidate={liveValidator}
            noHtml5Validate
            ObjectFieldTemplate={objectFieldTemplate}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={(errors) =>
              customErrorMsg(errors, actionItemSchema)
            }
            onChange={(e) => {
              console.log(e.formData, "actionItem");
              setActionItem({
                ...e.formData,
              });
            }}
            onSubmit={(props) => {
              setLiveValidator(true);
              setActionItemList([...actionItemList, actionItem]);

              console.log(actionItemList, "actionItemList");
            }}
          >
            <Box className="btnContainer">
              <Button type="submit" variant="contained" className="btn">
                ADD
              </Button>
            </Box>
          </Form>
          <Box>
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

            {/* <CustomReactTable
              columnData={ActionItem()}
              rawData={actionItemList}
              disableRowSelection={true}
              columnSize={false}
              disablePagination={true}
            /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};
