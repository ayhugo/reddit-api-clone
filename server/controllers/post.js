const Post = require("../models/post");


//shoudn't pass in userId but just for testing
exports.createPost = (req, res) => { 
  const post = new Post({
        title: req.body.title,
        text: req.body.text,
        creator: req.userData.userId
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

//bad practice to use req.body.userID but just for testing
exports.updatePost = (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    text: req.body.content,
    creator: req.userData.userId
  });


Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
  if (result.n > 0) {
    res.status(200).json({ message: "post update successful!" });
  } else {
    res.status(401).json({ message: "Not successful updating" });
  }
  })
  .catch(error => {
    res.status(500).json({
      message: "Oops something went wrong. Couldn't update post"
    })
  });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.body.id, creator: req.body.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  }).catch( error => {
    res.status(500).json({
      message: "Fetching posts failed"
    })
  });
};
