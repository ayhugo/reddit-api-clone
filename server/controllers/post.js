const Post = require("../models/post");


//shoudn't pass in suerId but just for testing
exports.createPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        creator: req.body.userId
    });
    post.save().then((newPost) => {
        res.status(200).json({
          success: true,
          data: newPost,
        });
      }).catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
};

