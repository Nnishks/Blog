import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutAction } from "../Store/Auth/Action";
import { useNavigate} from "react-router-dom"

const Naavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Info } = useSelector((store) => store.auth);
  console.log(Info);
  function logoutSubmit (){
    dispatch(logoutAction);
    let check = JSON.parse(localStorage.getItem("UserInfo"));
    if(!check){
      navigate("/")
    }
    console.log(check)
    
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {Info && Info.email && (
              <div>
                <Nav.Link>{Info.email}</Nav.Link>
                <Nav.Link onClick={logoutSubmit}>Logout</Nav.Link>
              </div>
            )}
            {!Info &&  (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}

            <Nav.Link href="#pricing">Read blog</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Naavbar;
