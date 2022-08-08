import "./App.css";
import Login from "./components/pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import { Menu } from "./components/pages/Menu";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login navigate={navigate} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="home/*" element={<Home navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;
