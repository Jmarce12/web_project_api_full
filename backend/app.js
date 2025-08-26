/* eslint-disable comma-dangle */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { celebrate, Joi } = require("celebrate");
const { errors } = require("celebrate");
require("dotenv").config();

const { createUser, login, getCurrentUser } = require("./controllers/users");
const auth = require("./middleware/auth");
const { requestLogger, errorLogger } = require("./middleware/loggers");
const users = require("./routes/users");
const cards = require("./routes/cards");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/aroundb");

const { PORT = 3001 } = process.env;

app.use(requestLogger);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.use(auth);
app.get("/users/me", getCurrentUser);
app.use("/users", users);
app.use("/cards", cards);

app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.use(errorLogger);

app.use(errors());

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
