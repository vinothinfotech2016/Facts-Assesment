import React from "react";
import { Route, Routes } from "react-router";

import { Main } from "./Main";

function App() {
  return (
    <Routes>
      <Route key={"main"} path={"/"} element={<Main />} />
    </Routes>
  );
}

export default App;
