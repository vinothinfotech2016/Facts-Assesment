import { Box, FormControl, FormHelperText } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
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
  const { isViewMode, label, touched, error, name, value, onChange } = props;

  const classes = useStyles();
  const [imgUrl, setImgUrl] = React.useState("");
  // const [fileName, setFileName] = React.useState("");
  const [fileName, setFileName] = React.useState(value && value[0]?.name);
  const myRefname = useRef(null);
  const formats = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/img",
    "image/svg",
  ];
  const dispatch = useDispatch();

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
          multiple={"multiple"}
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
