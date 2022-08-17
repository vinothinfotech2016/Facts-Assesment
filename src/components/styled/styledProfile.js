import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Header = styled(Box)`
  padding: 25px;
`;

export const MainCont = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 85%;
`;

export const UserCont = styled(Box)`
  padding: 20px;
  width: 50%;
  height: 170px;
  border: 2px solid #9e9e9e;
  border-radius: 10px;
  margin-left: 25px;
  display: flex;
  align-items: center;
`;

export const ImgCont = styled(Box)`
  height: 140px;
  width: 140px;
  border-radius: 50%;
  border: 1px solid #9e9e9e;
  margin-left: 15px;
`;

export const TextCont = styled(Box)`
  height: 140px;
  width: 60%;
  margin-left: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const Title = styled(Box)`
  background-color: #f0eded;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconCont = styled(Box)`
  display: flex;
  justify-content: space-between;
  height: 140px;
  width: 120px;
`;
export const ChangePass = styled(Box)`
  background-color: #f0eded;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

export const EditUserIcon = styled(Box)`
  background-color: #f0eded;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
`;
export const ListContainer = styled(Box)`
  box-sizing: border-box;
  width: 96%;
  padding-left: 30px;
`;
