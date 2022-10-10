import React from "react";
import { styled } from "@mui/system";
import { Box, Button, IconButton, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { CustomSearchField } from "../shared/CustomSearchField";
// import { FilterModal } from "../shared";

const Container = styled(Box)({
  height: 80,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const ContianerAlign = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const Title = styled(Typography)({
  // color: "white",
});
const IconsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
// const TopbarIcons = styled(Box)({
//   color: "white",
//   backgroundColor: "#E46D35",
//   padding: 6,
//   // borderRadius: 4,
// });
const DownloadBarIcons = styled(DownloadIcon)({
  color: "white",
  backgroundColor: "#264DB5",
  padding: 7,
  borderRadius: 4,
});
const NewButton = styled("span")({
  color: "white",
  background: "#59B961 0% 0% no-repeat padding-box",
  boxShadow: "0px 2px 4px #00000033",
  borderRadius: "4px",
  fontSize: "14px",
  padding: "8px 16px",
});

export function ListTopbar(props) {
  // const [downloadData, setDownloadData] = useState();

  const navigate = useNavigate();

  const {
    label,
    searchField,
    // filter,
    download,
    newForm,
    newFormPath,
    onClickNew,
    // listPath,
    // getFilterValue,
    // filterFields,
    // filterFieldInitial,
  } = props;

  return (
    <Container>
      <ContianerAlign>
        <Title variant="h6">{label}</Title>
        <IconsContainer>
          {searchField && <CustomSearchField />}
          {/* {filter && (
            <Button>
              <FilterModal
                listPath={listPath}
                getFilterValue={getFilterValue}
                filterFields={filterFields}
                filterFieldInitial={filterFieldInitial}
              />
            </Button>
          )} */}
          {newForm && (
            <Button
              onClick={newFormPath ? () => navigate(newFormPath) : onClickNew}
            >
              <NewButton>{props.buttonLabel || "NEW"}</NewButton>
            </Button>
          )}
          {download && (
            <IconButton>
              <DownloadBarIcons />
            </IconButton>
          )}
        </IconsContainer>
      </ContianerAlign>
    </Container>
  );
}
