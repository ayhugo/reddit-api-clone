const express = require("express");


const PostController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

//create post
router.post("", checkAuth, PostController.createPost);

//get posts
router.get("/getposts", PostController.getPosts);

//edit post
router.put('/update/:id', checkAuth, PostController.updatePost);

//delete post
router.delete('/delete/:id', checkAuth, PostController.deletePost);

//vote on a post
router.put('/vote/:id', checkAuth, PostController.vote);



module.exports = router;