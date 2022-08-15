import React from "react";
import { AppNavigation } from "./components/navigation/Navigation";
import "./App.css";
import { UserForm } from "./components/pages/UserForm";

function App() {
  return (
    <div className="App">
      {/* <AppNavigation /> */}
      <UserForm />
    </div>
  );
}

export default App;
