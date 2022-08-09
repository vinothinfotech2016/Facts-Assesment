import "./App.css";
import Login from "./components/pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import { Profile } from "./components/pages/Profile";
import { Customer } from "./components/pages/Customer";
import { Roles } from "./components/pages/Roles";
import { MyUser } from "./components/pages/MyUser";
import { Parameters } from "./components/pages/Parameters";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login navigate={navigate} />} />
        <Route path="home/*" element={<Home navigate={navigate} />} />
        <Route path="profile/*" element={<Profile navigate={navigate} />} />
        <Route path="customer/*" element={<Customer navigate={navigate} />} />
        <Route path="roles/*" element={<Roles navigate={navigate} />} />
        <Route path="myuser/*" element={<MyUser navigate={navigate} />} />
        <Route path="parameters/*" element={<Parameters navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;
