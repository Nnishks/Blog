import React from 'react'
import { Route, Routes } from "react-router-dom";
import AddBlog from '../Components/AddBlog';
import AllBlog from '../Components/AllBlog';
import Home from '../Components/Home';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Singleblog from '../Components/Singleblog';
const AllRoutes = () => {
  return (
    <div>

   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Addblog" element={<AddBlog />} />
        <Route path="/Allblog" element={<AllBlog />} />
        <Route path="/singleblog/:id" element={<Singleblog />} />
      </Routes>
    </div>
  )
}

export default AllRoutes