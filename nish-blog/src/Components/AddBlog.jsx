import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
       const navigate = useNavigate();
    const {Info}= useSelector((store)=>store.auth); 

    function addblog(e){
        e.preventDefault();
        let title = document.querySelector("#tle").value;
        let description=document.querySelector("#para").value;
        let img=document.querySelector("#img").value;
        let content=document.querySelector("#paraL").value;
        let mail = Info.email;
        let name = Info.name;
        console.log(Info)

        const datatoadd= {
             id:Math.floor(100000 + Math.random() * 900000),
            title,
            imgUrl:img,
            description,
            content,
            mail,
            name,
           
        }
         console.log(datatoadd)
        axios.post("http://localhost:8080/addblog",datatoadd)
        .then((res)=>{
            alert("added");
            navigate ("/Allblog")
            console.log(res)
        })
        // console.log("clicked")
    }
  return (
    <div>
        <form onSubmit={addblog}>
        <input required style={{minWidth:"800px"}} placeholder='add title' id="tle"></input>
        <br></br> <br></br> <br></br>
        <input required style={{minWidth:"800px"}} placeholder='add img url' id="img"></input>
        <br></br> <br></br> <br></br>
        <textarea id="para" required type="text" style={{paddingTop:"-200px",minWidth:"800px",
         minHeight:"100px",paddingLeft:"10px"}} placeholder='add description'>
         </textarea>
        <br></br> <br></br> <br></br>
        <textarea id="paraL" required type="text" style={{paddingTop:"-200px",minWidth:"800px",
         minHeight:"100px",paddingLeft:"10px"}} placeholder='add content'>
         </textarea>
         <br></br> <br></br> <br></br>
        <input type='submit' placeholder='submit'></input>
        </form>
    </div>
  )
}

export default AddBlog