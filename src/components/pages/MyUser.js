import { Route, Routes } from "react-router-dom";
import { UserForm } from "../pages/Newuser";
import { Usertable } from "./Usertable";

export const MyUser = (props) => {
  return (
    <Routes>
      <Route
        path="/userTable"
        element={<Usertable navigate={props.navigate} />}
      />
      <Route path="/newUser" element={<UserForm navigate={props.navigate} />} />
    </Routes>
  );
};
