const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/post');
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/posts_db")
  .then(()=>{
    console.log('connect to db');
  }).catch(()=>{
   console.log('connection failed.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req,res,next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

  next();
});
app.post('/posts',(req,res,next)=> {
  console.log('/posts');
  const post = new Post({
    title: req.body.title,
    content:req.body.content
  });
 post.save();
 res.status(201).json({message:'post added successfully.'});
});

app.get('/posts',(req,res,next)=> {
 Post.find().then(documents=> {
   res.status(200).json({message:'posts fetched success', posts:documents});

 });
});


module.exports = app;
