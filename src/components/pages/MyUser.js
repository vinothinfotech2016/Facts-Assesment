import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasicForm } from "../pages/Newuser";
import { Usertable } from "./Usertable";

export const MyUser = (props) => {
  return (
    <Routes>
      <Route
        path="/userTable"
        element={<Usertable navigate={props.navigate} />}
      />
      <Route
        path="/newUser"
        element={<BasicForm navigate={props.navigate} />}
      />
    </Routes>
  );
};
