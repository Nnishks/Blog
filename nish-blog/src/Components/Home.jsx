import React from 'react';
import { useSelector } from "react-redux";

const Home = () => {
  const {Info}= useSelector((store)=>store.auth);
  console.log(Info)
  return (
    <>
    <div>Home </div>
    <div>
      <img src='https://tse4.explicit.bing.net/th?id=OIP.OwAz-7-9LHMErrFeQP8D0AHaCw&pid=Api&P=0'
    alt="err" />
    </div>
    </>
  )
}

export default Home;