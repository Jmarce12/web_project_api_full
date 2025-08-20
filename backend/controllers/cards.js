/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
const Card = require("../models/card");

const {
  WentWrongError,
  WrongAuthError,
  UnauthorizedError,
  NotFoundError,
  ServerError,
} = require("../errors/handle-err");

module.exports.createCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((newCard) => {
      if (!newCard) {
        throw new ServerError("Error interno del servidor");
      }
      res.status(201).send(newCard);
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate("owner")
    .then((cards) => {
      if (!cards) {
        throw new ServerError("Error interno del servidor");
      }
      res.status(200).send(cards);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((foundCard) => {
      if (!foundCard) {
        throw new NotFoundError("Tarjeta no encontrada");
      }
      if (foundCard.owner.toString() !== req.user._id) {
        throw new UnauthorizedError(
          "No tienes permiso para eliminar esta tarjeta"
        );
      }
      return Card.findByIdAndDelete(cardId).then((deletedCard) => {
        res.status(200).send(deletedCard);
      });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Tarjeta no encontrada");
      }
      return res.status(200).send(card);
    })
    .catch(next);

module.exports.dislikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Tarjeta no encontrada");
      }
      return res.status(200).send(card);
    })
    .catch(next);
