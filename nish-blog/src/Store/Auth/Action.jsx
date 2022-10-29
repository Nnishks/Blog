import {SIGN_IN,SIGN_OUT,SIGN_IN_GB}
from "./Model";
 import axios from 'axios';
 import jwt_decode from 'jwt-decode';
 import { Link, NavLink, redirect, useNavigate} from "react-router-dom"

 export const loginAction=(creds)=>async(dispatch)=>{
    
    const res= await fetch("http://localhost:8080/api/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
           creds
        )
    })

    const data = await res.json();
    
    if(data.user){
        var userdata = jwt_decode(data.user);
        console.log(userdata)
        localStorage.setItem("UserInfo",JSON.stringify(userdata))
        dispatch({type:SIGN_IN,payload:userdata});
        return
    }
    else{
        alert("err");
        return
    }
 }

 
 export const loginViaGB=(creds)=>async(dispatch)=>{
    
    const res= await fetch("http://localhost:8080/github/oauth",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
           creds
        )
    })

    const data = await res.json();
    
    if(data.user){
        var userdata = jwt_decode(data.user);
        console.log(userdata)
        localStorage.setItem("UserInfoGB",JSON.stringify(userdata))
        dispatch({type:SIGN_IN_GB,payload:userdata});
        return
    }
    else{
        alert("err");
        return
    }
 }
 export const logoutAction=(dispatch)=>{
    localStorage.removeItem("UserInfo")
    dispatch({type:SIGN_OUT});
    
 }