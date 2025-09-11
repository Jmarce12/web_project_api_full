/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/handle-err");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Se requiere autorización" });
  }
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    return new UnauthorizedError("Se requiere autorización");
  }

  req.user = payload;

  next();
};
