import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { CANCEL, SAVE } from "../constants/ButtonConstants";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";

const NewRole = (props) => {
  const navigate = useNavigate();
  const [accessState, setAcessState] = React.useState({
    productMaster: false,
    menuMaster: false,
    formMaster: false,
  });
  const [role, setRole] = React.useState("");

  const { productMaster, menuMaster, formMaster } = accessState;

  const handleChange = (e) => {
    setAcessState({ ...accessState, [e.target.name]: e.target.checked });
  };

  const onSubmit = () => {
    const accessMenus = Object.keys(accessState).filter((option) => {
      return accessState[option] === true && option;
    });
    console.log(accessMenus);
    console.log(role);
  };

  return (
    <>
      <Box>
        <FormTopbar label="New Role" listPath={clickPaths.USENAVIGATEROLES} />
        <Box className="container">
          <TextField
            label="Role Name*"
            value={role}
            style={{ marginBottom: "20px" }}
            onChange={(e) => setRole(e.target.value)}
          />
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
          <div className="btnContainer">
            <Button
              variant="outlined"
              className="btn"
              onClick={() => navigate(clickPaths.USENAVIGATEROLES)}
            >
              {CANCEL}
            </Button>
            <Button
              variant="outlined"
              className="btn"
              onClick={() => onSubmit()}
            >
              {SAVE}
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default NewRole;
