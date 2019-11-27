const express = require("express");


const PostController = require('../controllers/post');


const router = express.Router();

//create post
router.post("", PostController.createPost);

//get posts
router.get("/getposts", PostController.getPosts);

//upvote post
router.put('/:id/upvote', PostController.vote);


module.exports = router;