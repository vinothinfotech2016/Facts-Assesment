import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StepperCont = styled(Tabs)`
  height: 94vh;
  margin-top: 56px;
  width: 15%;
  border: 1px solid #9e9e9e;
  position: fixed;
  zindex: 1000;
`;

const CustomStepper = (props) => {
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
                event.preventDefault();
               navigate(`${item.route}`) 
              }}
              label={item.name}
            />
          );
        })}
      </StepperCont>
    </Box>
  );
};

export { CustomStepper };
