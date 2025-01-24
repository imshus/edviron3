const tasks = require('./router/tasks.js');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB=require("./db/connect.js")
const jwt=require('jsonwebtoken')
const app = express();

const secretKey="secretkey"

app.use(express.json());
app.use(cors());

app.post('/login',(req,res)=>{
  const user={
    id:1,
    username:"imshu",
    email:"abc@test.com",
    password:"Shudh@99553"
  }
  jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
     res.json({
      token
    })
  })
})

const verification = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    jwt.verify(token, secretKey, (err, authData) => {
      if (err) {
        return res.status(403).json({ result: "Invalid token" }); 
      }
      req.authData = authData; 
      next(); 
    });
  } else {
    return res.status(401).json({ result: 'Token is missing or invalid' }); 
  }
};

app.use('/api',verification,tasks)
const PORT = process.env.PORT || 5000;
const start= async ()=>{
  try{
    await connectDB(process.env.MONGODBURL);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
  catch(error){
    console.log(error)
  }
}

start()


