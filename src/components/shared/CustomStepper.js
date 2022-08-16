import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StepperCont = styled(Box)`
  height: 94vh;
  margin-top: 56px;
  width: 15%;
  border: 1px solid #9e9e9e;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
`;

const CustomStepper = (props) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <StepperCont value={value} onChange={handleChange}>
        {props.stepperVal.map((item, index) => {
          return (
            <Tab
              key={index}
              sx={{
                width: "200px",
                marginTop: "15px",
                border: "2px  solid #9e9e9e",
                borderRadius: "5px",
              }}
              onClick={(event) => {
                event.preventDefault();
                navigate(`${item.route}`);
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
