import React from 'react'
import { styled } from "@mui/material/styles";
import { Box, Tab } from "@mui/material";

const StepperCont = styled(Box)`
  height: 94vh;
  width: 15%;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CustomStepper = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleindividual = (event) => {
      event.preventDefault();
      props.navigate("home/indiTable");
    };
    const handlecompany = (event) => {
      event.preventDefault();
      props.navigate("home/compTable");
    };
  return (
    <div>
        <StepperCont value={value} onChange={handleChange}>
          <Tab
            sx={{
              width: "200px",
              marginTop: "40px",
              border: "2px  solid blue",
              borderRadius: "5px",
            }}
            onClick={handleindividual}
            label="INDIVIDUAL USER"
          />
          <Tab
            sx={{
              width: "200px",
              marginTop: "10px",
              border: "2px  solid blue",
              borderRadius: "5px",
            }}
            onClick={handlecompany}
            label="COMPANY USER"
          />
        </StepperCont>
    </div>
  )
}
