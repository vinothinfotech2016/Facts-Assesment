import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { paths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";

const NewRole = (props) => {
  const [acessState, setAcessState] = useState({
    productMaster: false,
    menuMaster: false,
    formMaster: false,
  });

  const { productMaster, menuMaster, formMaster } = acessState;

  const handleChange = (e) => {
    setAcessState({ ...acessState, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <Box>
        <FormTopbar label="New Role" listPath={paths.ROLES} />
        <Box className="container">
          <TextField label="Role Name*" style={{ marginBottom: "20px" }} />
          <Box>
            <FormControl>
              <FormLabel component="legend">Access</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={productMaster}
                      onChange={handleChange}
                      name="productMaster"
                      color="default"
                    />
                  }
                  label="Product Master"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={menuMaster}
                      onChange={handleChange}
                      name="menuMaster"
                      color="default"
                    />
                  }
                  label="Menu Master"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formMaster}
                      onChange={handleChange}
                      name="formMaster"
                      color="default"
                    />
                  }
                  label="Form Master"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewRole;
