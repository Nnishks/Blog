const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../Server/models/user.model");
const AddBlog = require("../Server/models/Addblog");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/Nishant-Blog");

app.post("/api/reg", async (req, res) => {
  console.log(req.body);
  try {
    const role =
      req.body.email === process.env.admin_mail ? "admin" : "creator";
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: role,
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
    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
      },
      "secret017",
      { expiresIn: "5 second" }
    );

    const refreshToken = jwt.sign(
      {
        email: user.email,
        name: user.name,
      },
      "secret710"
    );

    return res.json({ status: "ok", user: token, refreshToken: refreshToken });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/refresh", async (req, res) => {
  const refreshToken = req.body.token;
  try {
    const data = jwt.verify(refreshToken, "secret710");
    const maintoken = jwt.sign(data, "secret017");
    return res.json({
      status: "ok",
      user: maintoken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    return res.json({ status: "err", user: false });
  }
});
app.get("/forgotpass", (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "jonathon74@ethereal.email", // generated ethereal user
      pass: "97PZcAefj2CAGkdVyX", // generated ethereal password
    },
  });
  transporter
    .sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    })
    .then(() => {
      res.send("succes");
    });
});

app.post("/addblog", async (req, res) => {
  // console.log(req.body);
  try {
    let current = new Date();
    let cDate =
      current.getFullYear() +
      "-" +
      (current.getMonth() + 1) +
      "-" +
      current.getDate();
    let cTime =
      current.getHours() +
      ":" +
      current.getMinutes() +
      ":" +
      current.getSeconds();
    let dateTime = cDate + " " + cTime;
    // console.log(typeof req.body.id);
    const addedblog = await AddBlog.insertMany({
      id: Number(req.body.id),
      name: req.body.name,
      mail: req.body.mail,
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
      content: req.body.content,
      date: dateTime,
    });

    console.log(addedblog, "hiii");

    res.status(200).send("ok");
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
});

app.get("/allblog", async (req, res) => {
  // console.log(req.body);
  try {
    const allblog = await AddBlog.find({});
    // console.log(,"hiii")
    res.status(200).send(allblog);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
});

app.post("/singleblog", async (req, res) => {
  try {
    // var objectId = mongoose.Types.ObjectId(`${req.body.id}`);
    console.log(req.body.id);
    //  console.log(req.body);
    const singleblog = await AddBlog.find({ id: req.body.id });
    // console.log(singleblog[1]._id)
    res.status(200).send(singleblog);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
});

const githubLogin = async (code) => {
  try {
    let response = await axios.post(
      `https://github.com/login/oauth/access_token`,
      null,
      {
        params: {
          client_id: "39b7642483ea15c083e8",
          client_secret: "be379853bfbbe8458810a7b4c41e4c876c0268fb",
          code,
        },
        headers: {
          accept: "application/json",
        },
      }
    );
    let resp = response.data;
    console.log(resp);

    let userData = await axios.get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${resp.access_token}`,
        accept: "application/json",
      },
    });
    let userDataFromGH = userData.data;
    return {
      res:"ok",
      gbuseremail:userDataFromGH[0].email,
    }

  } catch (error) {
    return {
      message: error,
    };
  }
};

app.get("/github/oauth", async (req, res) => {
  const { code } = req.query;
  // console.log(code, state);
  let x = await githubLogin(code);
  console.log(x);
  if (x.res === "ok") {
    const user = await User.findOne({
      email: x.gbuseremail,
    });
    if (user) {
      const token = jwt.sign(
        {
          email: user.email,
          
        },
        "secret017",
        { expiresIn: "5 second" }
      );
  
      const refreshToken = jwt.sign(
        {
          email: user.email,
          
        },
        "secret710"
      );
      res.append("hi");
      res.send("hiiiiii")
      //  res.redirect(`http://localhost:3000/`);
      // console.log("hi")
      // res.json({ status: "ok", user: token, refreshToken: refreshToken });
      
    } else {
      return res.json({ status: "error", user: false });
    }
    // res.redirect(`http://localhost:3000/`);
  } else {
    res.send("hi,kya hua,kuch toh err hua ");
  }
});
const middle= (req,res,next)=>{
  console.log("hi");
  res.send("jii")
  next()
 
}
app.get("/next",(req,res)=>{
 res.locals
})
// app.post("/ruk",(req,res)=>{
//   res.send("hii")
// })
app.listen(8080, () => {
  console.log("server started at port 8080");
});
