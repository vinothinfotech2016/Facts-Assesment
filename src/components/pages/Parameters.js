import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { parameterSchema, parameterUiSchema } from "../schema/Parameters";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import { TableBodyCell, TableHeadingCell } from "../styled/styledProfile";

// import { Routes, Route } from "react-router-dom";

export const Parameters = (props) => {
  const [parameter, setParameter] = useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [formType, setFormtype] = useState([]);

  return (
    <>
      <Box>
        <h3 style={{ paddingLeft: "50px" }}>PARAMETERS</h3>
        <Box className="container">
          <Form
            schema={parameterSchema}
            uiSchema={parameterUiSchema()}
            widgets={widgets}
            formData={parameter}
            showErrorList={false}
            liveValidate={liveValidator}
            noHtml5Validate
            ObjectFieldTemplate={objectFieldTemplate}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={(errors) =>
              customErrorMsg(errors, parameterSchema)
            }
            onChange={(e) => {
              console.log(e.formData);
              setParameter({
                ...e.formData,
              });
            }}
            onSubmit={() => {
              setLiveValidator(true);
              setFormtype([...formType, parameter]);

              // console.log(customErrorMsg);
            }}
          >
            <Box className="btnContainer ">
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
                    <TableHeadingCell>Form Type</TableHeadingCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formType &&
                    formType.map((data, index) => {
                      return (
                        <TableRow key={index + 1}>
                          <TableBodyCell>
                            <Box>{data.formType}</Box>
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
          </Box>
          <Box className="btnContainer">
            <Button variant="outlined" className="btn">
              CANCEL
            </Button>
            <Button variant="outlined" className="btn">
              SUBMIT
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
