const User = require("../models/user");
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      username: req.body.username,
      password: hash
    });
    user.save()
      .then(result => {
        res.status(200).json({
          message: "user created",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invailded user credentials"
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({username: req.body.username}).then(user =>{
    if (!user) {
      return res.status(404).json({
        message: "Auth Failed, usernames don't match"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result){
      return res.status(401).json({
        message: "Passwords don't match"
      });
    }
    const token = jwt.sign(
      {username: fetchedUser.username, userId: fetchedUser._id},
      'process.env.JWT_KEY',
      {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Invailded User Credentials"
    });
  });
};

