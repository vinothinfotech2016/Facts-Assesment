import React, { useEffect, useRef } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { makeStyles } from "@mui/styles";
import CustomSnackbar from "./CustomSnackbar";

// Basic user image
const User =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const useStyles = makeStyles({
  inputField: {
    display: "none",
  },
  fileInputHolder: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    border: "1px dashed #c4c4c4",
    height: "35px !important",
    borderRadius: 5,
  },
  imgContainer: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    marginRight: 12,
  },
});

export function CustomUploadImage({
  name,
  label,
  error,
  url,
  touched,
  value,
  sytle,
  onChange,
  profileUrl,
  isViewMode,
  uploadFile,
  editId,
}) {
  const classes = useStyles();
  const [imgUrl, setImgUrl] = React.useState(url);
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

  const handleClick = (e) => {
    myRefname.current.click();
  };

  const [open, setOpen] = React.useState(false);

  const onImageChange = (event) => {
    if (!formats.includes(event.target.files[0].type)) {
      setOpen(true);
      return;
    }
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        value = [reader.result];
        setImgUrl(reader.result);
        // onChange(name, event.target.files[0]);
        // onChange([event.target.files[0]]);
        onChange(value);
        setFileName(event.target.files[0].name);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      if (typeof value === "string") {
        setFileName(value);
      }
      if (Array.isArray(value)) {
        setImgUrl(value[0]);
        const fullName = value[0]?.split("/");
        if (fullName) {
          setFileName(fullName[fullName?.length - 1]);
        }
      }
    }
  }, [value]);

  useEffect(() => {
    setImgUrl(url);
  }, [url]);

  return (
    <>
      <FormControl fullWidth>
        <input
          ref={myRefname}
          className={classes.inputField}
          name={name}
          type={"file"}
          error={touched && error}
          onChange={(event) => onImageChange(event)}
          label={label}
          disabled={isViewMode}
          accept={"image/*"}
        />
        <div
          onClick={(e) => handleClick(e)}
          className={classes.fileInputHolder}
        >
          {uploadFile ? (
            <FileUploadIcon style={{ marginRight: 10 }} />
          ) : (
            <img
              src={imgUrl || profileUrl || User}
              className={classes.imgContainer}
              alt=""
            ></img>
          )}
          <span style={{ color: "grey" }}>{fileName || label}</span>
        </div>
        <FormHelperText style={{ color: "#d32f2f" }}>{error}</FormHelperText>
      </FormControl>
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        message={"please select a valid file"}
      />
    </>
  );
}
