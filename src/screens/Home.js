import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let navigate = useNavigate();
  useEffect(() => {}, []);
  const login = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      Home Page
      <Button style={{ float: "right" }} variant="contained" onClick={login}>
        Login
      </Button>
    </div>
  );
}
