import { Route, Routes } from "react-router-dom";
import { BasicForm } from "../pages/Newuser";
import { Usertable } from "./Usertable";
import { paths } from "../navigation/routePaths";

export const MyUser = (props) => {
  return (
    <Routes>
      <Route
        path={paths.MYUSER}
        element={<Usertable navigate={props.navigate} />}
      />
      <Route
        path={paths.MYUSERFORM}
        element={<BasicForm navigate={props.navigate} />}
      />
    </Routes>
  );
};
