import "./App.css";
import Login from "./components/pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./components/pages/Home";

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login navigate={navigate}/>}/>
        <Route
          path="home/*"
          element={<Home navigate={navigate} />}
        />
      </Routes>
    </div>
  );
}

export default App;
