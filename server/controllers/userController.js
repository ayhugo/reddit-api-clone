const User = require("../models/user");

const bcrypt = require("bcrypt");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      username: req.body.username,
      password: hash
    });
    user
      .save()
      .then(newUser => {
        res.status(200).json({
          success: true,
          data: newUser
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  });
};
