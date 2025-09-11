const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const {
  WentWrongError,
  WrongAuthError,
  NotFoundError,
  ServerError,
} = require("../errors/handle-err");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // eslint-disable-next-line object-shorthand
  return User.findOne({ email: email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new WrongAuthError("Correo o contraseña incorrectos");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new WrongAuthError("Correo o contraseña incorrectos");
        }
        return user;
      });
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuario no encontrado");
      }
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      email: req.body.email,
      password: hash,
    })
      .then((user) => {
        if (!user) {
          throw new ServerError("Error interno del servidor");
        }
        res.send({
          _id: user._id,
          email: user.email,
        });
      })
      .catch(next);
  });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user._id;

  User.findOne({ id: _id })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError("Usuario no encontrado");
      }
      return res.status(200).send(userData);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError("No se encontraron usuarios");
      }
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError("Usuario no encontrado");
      }
      return res.status(200).send(userData);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new WentWrongError("Solicitud inválida");
      }
      res.status(200).send(updatedUser);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new WentWrongError("Solicitud inválida");
      }
      res.status(200).send(updatedUser);
    })
    .catch(next);
};
