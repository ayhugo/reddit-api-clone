const Post = require("../models/post");

exports.createPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    creator: req.userData.userId
  });
  post
    .save()
    .then(newPost => {
      res.status(200).json({
        success: true,
        data: newPost
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

exports.getPosts = (req, res, next) => {
  const postQuery = Post.find();
  let fetchedPosts;
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed"
      });
    });
};

exports.updatePost = (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    text: req.body.content,
    creator: req.userData.userId
  });

  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "post update successful!" });
      } else {
        res.status(401).json({ message: "Not successful updating" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Oops something went wrong. Couldn't update post"
      });
    });
};

exports.vote = (req, res, next) => {
  if (req.body.isUpVote == "true") {
    //check if user has already upvoted
    Post.findOne({ positive: req.userData.userId, _id: req.params.id }).then(
      result => {
        if (result != null) {
          res.status(200).json({ message: "already upvoted" });
        }
        //check if user has downvoted
        Post.find({ _id: req.params.id, negative: req.userData.userId }).then(
          result => {
            if (result != null) {
              try {
                Post.bulkWrite([
                  { updateOne : {
                    filter: {_id: req.params.id} ,
                    update: {$push:  {positive: req.userData.userId}}
                  }
                },
                  { updateOne : {
                    filter: {_id: req.params.id} ,
                    update: {$pull:  {negative: req.userData.userId}}
                  }
                }
                  
                ])
                .then(result => {
                  if (result.nModified > 0) {
                    res.status(200).json({ message: "upvote successful!" });
                  } else {
                    res.status(401).json({ message: "Not successful updating" });
                  }
                })
                .catch(error => {
                  res.status(500).json({
                    message: "Oops something went wrong. Couldn't update post"
                  });
                });
              } catch(error) {
                res.status(401).json({message: "couldn't vote"})
              }
              // if  hasn't upvoted or downvoted
            } else {
              Post.updateOne(
                { _id: req.params.id },
                { $push: { positive: req.userData.userId } }
              )
                .then(result => {
                  if (result.n > 0) {
                    res.status(200).json({ message: "upvote successful!" });
                  } else {
                    res
                      .status(401)
                      .json({ message: "Not successful updating" });
                  }
                })
                .catch(error => {
                  res.status(500).json({
                    message: "Oops something went wrong. Couldn't update post"
                  });
                });
            }
          }
        );
      }
    );
  }
  //DOWNVOTE
  if (req.body.isUpVote == "false") {
    //check if user has already downvoted
    Post.findOne({ negative: req.userData.userId, _id: req.params.id }).then(
      result => {
        if (result != null) {
          res.status(200).json({ message: "already downvoted" });
        }
        //check if user has upvoted
        Post.find({ _id: req.params.id, positive: req.userData.userId }).then(
          result => {
            if (result != null) {
              try {
                Post.bulkWrite([
                  { updateOne : {
                    filter: {_id: req.params.id} ,
                    update: {$push:  {negative: req.userData.userId}}
                  }
                },
                  { updateOne : {
                    filter: {_id: req.params.id} ,
                    update: {$pull:  {positive: req.userData.userId}}
                  }
                }
                  
                ])
                .then(result => {
                  if (result.nModified > 0) {
                    res.status(200).json({ message: "downvote successful!" });
                  } else {
                    res.status(401).json({ message: "Not successful updating" });
                  }
                })
                .catch(error => {
                  res.status(500).json({
                    message: "Oops something went wrong. Couldn't update post"
                  });
                });
              } catch(error) {
                res.status(401).json({message: "bulkwrite failed"})
              }

                
              // if  hasn't upvoted or downvoted
            } else {
              Post.updateOne(
                { _id: req.params.id },
                { $push: { negative: req.userData.userId } }
              )
                .then(result => {
                  if (result.n > 0) {
                    res.status(200).json({ message: "downvote successful!" });
                  } else {
                    res
                      .status(401)
                      .json({ message: "Not successful updating" });
                  }
                })
                .catch(error => {
                  res.status(500).json({
                    message: "Oops something went wrong. Couldn't update post"
                  });
                });
            }
          }
        );
      }
    );
  }
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed"
      });
    });
};
