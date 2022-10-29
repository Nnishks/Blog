import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../styles/Allblog.css";

const AllBlog = () => {
    const [data, setdata] = useState([]);

    const {Info}= useSelector((store)=>store.auth);

    useEffect(() => {
      axios.get("http://localhost:8080/allblog").then((res)=>{
        console.log(res.data)
        setdata(res.data)
      })
    
      return () => {
        
      }
    }, [])
    

  return (
    <div>
       { data &&  data.map((el)=>{
        console.log(el._id)
        return <div className='allbbox' >
                {Info && Info.role==="admin"?<h5>Delete</h5>:null}
                {Info && Info.email===el.mail?<h5>Edit</h5>:null}
                <p>{el.name}</p>
                <span>{el.title}</span>
                <p>{el.date}</p>
                <img src={el.imgUrl} alt="err"></img>
                <p>{el.description}</p>
                <Link to={`/singleblog/${el.id}`}><h5>Read more</h5></Link>
            </div>
       })
        }
    </div>
  )
}

export default AllBlog