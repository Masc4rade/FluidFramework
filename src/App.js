import React from "react";
import Login from "./screens/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./Style.scss";
import Dashboard from "./screens/Dashboard";
import Home from "./screens/Home";

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
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/home" element={<Home />}></Route>

        <Route path="/login" element={<Login title="Login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
