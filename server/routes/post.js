const express = require("express");

const PostController = require('../controllers/post');


const router = express.Router();

router.post("", PostController.createPost);


module.exports = router;