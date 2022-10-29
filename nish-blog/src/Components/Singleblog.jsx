import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AiOutlineComment } from "react-icons/ai";
import  "../styles/Singleblog.css"


const Singleblog = () => {
  const [data, setdata] = useState([]);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    axios.post("http://localhost:8080/singleblog",{id}).then((res)=>{
      console.log(res.data)
      setdata(res.data)
    })
  
    return () => {
      
    }
  }, [])
  return (
    <div>
    { data &&  data.map((el)=>{
     return <div >
         
             <span>{el.title}</span>
             <p>{el.date}</p>
             <img src={el.imgUrl} alt="err"></img>
             <p>{el.content}</p>
             <div className='commentSticky'>
             <AiOutlineComment />
             </div>
         </div>
    })
     }
     
 </div>
  )
}

export default Singleblog