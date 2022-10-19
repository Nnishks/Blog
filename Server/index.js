const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../../Server/models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/Nishant-Blog");

app.post("/api/reg", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign({
       email:user.email,
       name:user.name
    }, "secret017",{expiresIn:"5 second"})

    const refreshToken=jwt.sign({
      email:user.email,
      name:user.name
   },"secret710")

     return res.json({ status: "ok", user: token , refreshToken:refreshToken});
  } else {
    return res.json({ status: "error", user:false });
  }
});

app.post("/refresh",async (req,res)=>{
  const refreshToken=req.body.token;
  try{
   const data= jwt.verify(refreshToken,"secret710");
   const maintoken= jwt.sign(data,"secret017");
   return res.json({status:"ok", user:maintoken,refreshToken:refreshToken})
  }
  catch(err){
    return res.json({status:"err", user:false})
  }

})
app.get("/forgotpass",(req,res)=>{
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "jonathon74@ethereal.email", // generated ethereal user
      pass: 	"97PZcAefj2CAGkdVyX", // generated ethereal password
    },
  });
   transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }).then(()=>{
         res.send("succes")
  })
})

app.listen(8080, () => {
  console.log("server started at port 8080");
});
