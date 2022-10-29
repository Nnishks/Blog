import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/login.css"
import {useState} from 'react';
import {useNavigate} from "react-router-dom"
import { loginAction, logoutAction } from '../Store/Auth/Action';
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

   async function login(event){
      event.preventDefault();
     await dispatch(loginAction({email,password}));
       let checkk = JSON.parse(localStorage.getItem("UserInfo"));
       console.log(checkk)
      // console.log(check.email)
      if(checkk){
        navigate("/")
      }
      // navigate("/")
    
    //  const res= await fetch("http://localhost:8080/api/login",{
    //       method:"POST",
    //       headers:{
    //           "Content-Type":"application/json"
    //       },
    //       body:JSON.stringify({
    //           email,
    //           password,
    //       })
    //   })

    //   const data = await res.json();
    //    console.log(data)

    //   if(data.user){
    //     alert("login success");
    //     navigate("/")
    //   }
    //   else{
    //     alert("error")
    //   }

    //   console.log(data)
  }
  
  return (
    <div>
      <h2>Login</h2>
 <Form onSubmit={login} >
      
      <Form.Group className="mb-3 "  controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={(e)=>setemail(e.target.value)}
         type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e)=>setpassword(e.target.value)} 
        type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
         <br/>
    <Button variant="dark">Google</Button>{' '}
    <a href="https://github.com/login/oauth/authorize?client_id=39b7642483ea15c083e8">
      <Button variant="secondary">Github</Button></a>
     <br/><br/>
      <a href=''><h2>Forgot password?</h2></a>


    </div>
  )
}

export default Login