import React from 'react';
import { useSelector } from "react-redux";

const Home = () => {
  const {Info}= useSelector((store)=>store.auth);
  console.log(Info)
  return (
    <div>Home </div>
  )
}

export default Home;