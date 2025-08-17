const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
require("dotenv").config();

const { createUser, login } = require("./controllers/users");
const auth = require("./middleware/auth");
const { requestLogger, errorLogger } = require("./middleware/loggers");
const users = require("./routes/users");
const cards = require("./routes/cards");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/aroundb");

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.post("/signup", createUser);
app.post("/signin", login);
app.use(auth);
app.use("/users", users);
app.use("/cards", cards);

app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  req.user = {
    _id: "686ed60d84ef414f235edc53",
  };

  next();
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
