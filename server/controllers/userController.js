const User = require("../models/user");

const bcrypt = require("bcrypt");

exports.createUser = (req, res, next) => {
  // Validation
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save().then((newUser) => {
    res.status(200).json({
      success: true,
      data: newUser,
    });
  }).catch((err) => {
    res.status(500).json({
      message: err,
    });
  });
};

