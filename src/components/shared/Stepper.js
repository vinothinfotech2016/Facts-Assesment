import { Box, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";
import { getScreenById, getScreenByMenu } from "../api/api";

const StepperCont = styled(Tabs)`
  height: 94vh;
  margin-top: 56px;
  width: 15%;
  border: 1px solid #9e9e9e;
  position: fixed;
  zindex: 1000;
`;

function Stepper(props) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <StepperCont
        value={value}
        onChange={handleChange}
        orientation="vertical"
        sx={{
          "& button:focus": { backgroundColor: "#d6d6d6", color: "black" },
        }}
      >
        {props?.stepperVal?.map((item, index) => {
          return (
            <Tab
              key={index}
              sx={{
                width: "75%",
                height: "50px",
                // marginTop: "15px",
                // marginLeft: "10%",
                margin: "7% 10%",
                border: "2px  solid #9e9e9e",
                borderRadius: "5px",
              }}
              onClick={(event) => {
                console.log(item.id);
                getScreenByMenu(item.id)
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              label={item.name}
            />
          );
        })}
      </StepperCont>
    </Box>
  );
}

export default Stepper;
