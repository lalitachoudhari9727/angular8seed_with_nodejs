const express = require('express');
const app = express();
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header", "X-Requested-With");
  next();
});
app.use('/get-posts',(req,res,next)=> {
  const posts = [{
    title:'first title',
    content:'first content'
  },{
    title:'second title',
    content:'second content'
  }];
res.status(200).json({message:'posts fetched success', posts:posts});
});


module.exports = app;
