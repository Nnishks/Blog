import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import "../styles/login.css";
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    async function register(event){
        event.preventDefault()
       const res= await fetch("http://localhost:8080/api/reg",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        })

        const data = await res.json();

        if(data.status==="ok"){
            navigate("/login")
        }

        console.log(data)
    }

  return (
    <div>
      <h2>Signup</h2>
      <Form onSubmit={register}>
      <Form.Group className="mb-3 "  controlId="formBasicUserName">
        <Form.Label>UserName</Form.Label>
       <Form.Control value={name} onChange={(e)=>setname(e.target.value)}
        size="sm"  type="username" placeholder="Username" />
      </Form.Group>
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
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </div>
  )
}

export default Signup