import React, { useEffect } from "react";
import {useNavigate,  } from "react-router-dom";
import { useLocation } from "react-router-dom";



export default function Dashboard() {
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    const search = location.search;
    debugger
    const id=new URLSearchParams(search).get("code");
    sessionStorage.setItem("Auth Code",id);
    const code =    sessionStorage.getItem("Auth Code");


    alert(id)


    if (authToken) {
     

      verifyToken();

        }
        else if(code){
          navigate("/dashboard");


        }
else{
  navigate("/login");

}
  },[])

const  verifyToken=async ()=>{
  let authToken = sessionStorage.getItem("Auth Token");
  

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "token": authToken })
};
const response = await fetch('http://localhost:7071/api/login', requestOptions);
if(response.status==200){

  navigate("/dashboard");

}
else{
  navigate("/login");
  sessionStorage.getItem("Auth Token","")

}

}

  
  return <div>Dashboard Page</div>;
}
