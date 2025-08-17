/* eslint-disable comma-dangle */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      email: req.body.email,
      password: hash,
    })
      .then(
        (user) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          res.send({
            _id: user._id,
            email: user.email,
          })
        // eslint-disable-next-line function-paren-newline
      )
      .catch((err) => res.status(400).send(err));
  });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" });
    });
};

module.exports.getUserById = (req, res) => {
  const { _id } = req.params;

  User.findById(_id)
    .then((userData) => {
      if (!userData) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      return res.status(200).send(userData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" });
    });
};
