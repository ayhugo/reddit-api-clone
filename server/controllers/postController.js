import db from './../models';
const postController = {};

//shoudn't pass in suerId but just for testing
postController.post = (req, res) => {
    const {
        title,
        text,
        link,
        userId,
    } = req.body;

    const post = new db.Post({
        title,
        text,
        link,
        _creator: userId
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

export default postController;
