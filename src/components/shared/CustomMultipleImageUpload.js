import { Box } from "@mui/material";
import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles({
  inputField: {
    display: "none",
  },
  fileInputHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    border: "1px dashed #c4c4c4",
    height: "100px !important",
    borderRadius: 5,
    backgroundColor: "#00000010",
  },
  imgContainer: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    marginRight: 12,
  },
});

function CustomMultipleImageUpload(props) {
  const { isViewMode, label, touched, error, name, onChange } = props;

  const classes = useStyles();
  const myRefname = useRef(null);

  const handleClick = (e) => {
    myRefname.current.click();
  };

  return (
    <>
      <Box>
        <input
          ref={myRefname}
          className={classes.inputField}
          name={name}
          type={"file"}
          error={touched && error}
          onChange={(event) => onChange(event)}
          label={label}
          disabled={isViewMode}
          accept={"image/*"}
        />
        <div
          onClick={(e) => handleClick(e)}
          className={classes.fileInputHolder}
        >
          <Box
            sx={{
              height: "50px",
              width: "50px",
              backgroundColor: "#00000050",
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <AddIcon
              sx={{
                fontSize: "42px",
              }}
            />
          </Box>
        </div>
      </Box>
    </>
  );
}

export default CustomMultipleImageUpload;
