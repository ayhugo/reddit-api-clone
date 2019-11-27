const Post = require("../models/post");


//shoudn't pass in userId but just for testing
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

exports.getPosts = (req, res, next) => {
  const postQuery = Post.find();
  let fetchedPosts;
  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPosts,
      maxPosts: count
    });
  }).catch( error => {
    res.status(500).json({
      message: "Fetching posts failed"
    })
  });
};

