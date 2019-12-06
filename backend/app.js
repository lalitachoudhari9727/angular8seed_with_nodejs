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
// Add new post
app.post('/api/posts',(req,res,next)=> {
  console.log('/posts');
  const post = new Post({
    title: req.body.title,
    content:req.body.content
  });
 post.save().then((createdPost)=> {
   res.status(201).json({
     message:'post added successfully.',
     id:createdPost._id
   });
 });

});

// Get all posts
app.get('/api/posts',(req,res,next)=> {
 Post.find().then(documents=> {
   res.status(200).json({message:'posts fetched success', posts:documents});

 });
});

// Delete specific post.
app.delete('/api/posts/:id',(req,res,next)=> {
  Post.deleteOne({_id:req.params.id}).then((result)=> {
    console.log(result);
    res.status(200).json({message:'Post deleted successfully.'});
  }).catch(()=>{
    res.status(200).json({message:'Post deleted successfully.'});
  })
});

module.exports = app;
