import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../Components/Home';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
const AllRoutes = () => {
  return (
    <div>

   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default AllRoutes