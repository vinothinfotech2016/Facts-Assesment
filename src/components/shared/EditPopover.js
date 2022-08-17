import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { createSearchParams, useNavigate } from "react-router-dom";

const PopoverComponent = styled(Popover)({
  "& .MuiPaper-root": {
    minWidth: "150px",
  },
});
const Titles = styled(Typography)({
  padding: "14px !important",
  cursor: "pointer !important",
  font: "normal normal normal 16px/19px Rubik !important",
  color: "#000000 !important",
});

export function EditPopover(props) {

  const { rowId, toShow, paths, updateStatus } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = (path) => {
    navigate({
      pathname: path,
      search: `?${createSearchParams({
        editId: rowId,
        isViewMode: true,
      })}`,
    });
  };

  const handleEdit = (path) => {
    path &&
      navigate({
        pathname: path,
        search: `?${createSearchParams({
          editId: rowId,
        })}`,
      });
  };

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <MoreHorizTwoToneIcon />
      </IconButton>
      <PopoverComponent
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {toShow["edit"] && (
          <Titles onClick={() => handleEdit(paths?.edit)}>Edit</Titles>
        )}
        {toShow["viewDetails"] && (
          <Titles onClick={() => handleView(paths.viewDetails)}>
            View Details
          </Titles>
        )}

        {toShow["response"] && (
          <Titles onClick={() => handleEdit(paths?.viewResponse)}>
            View Responses
          </Titles>
        )}
        {toShow["transfer"] && (
          <Titles onClick={() => handleEdit(paths?.transfer)}>TRANSFER</Titles>
        )}
        {toShow["logHistory"] && (
          <Titles onClick={() => handleEdit(paths?.logHistory)}>
            Log History
          </Titles>
        )}
        {toShow["updateStatus"] && <Titles>{updateStatus}</Titles>}
      </PopoverComponent>
    </div>
  );
}
