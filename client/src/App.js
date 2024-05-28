import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./Style.scss";
import Home from "../client/src/view/home/Home";
import BoardComponent from "../client/src/view/board/Board";
import Login from "../client/src/view/login/Login";
import Register from "../client/src/view/login/Register";

function App() {
  let navigate = useNavigate();

  // useEffect(() => {
  //   let authToken = localStorage.getItem("Auth Token");

  //   if (authToken) {
  //     navigate("/home");
  //   }
  // }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/boards" element={<BoardComponent/>}></Route>
      </Routes>
    </>
  );
}

export default App;
