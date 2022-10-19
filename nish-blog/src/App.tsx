import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Login from './Components/Login';
import AllRoutes from './Routes/AllRoutes';
import Naavbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Naavbar />
     <AllRoutes />
    </div>
  );
}

export default App;
