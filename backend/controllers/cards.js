/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .populate("owner")
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((foundCard) => {
      if (!foundCard) {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      if (foundCard.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .send({ message: "No tienes permiso para eliminar esta tarjeta" });
      }
      return Card.findByIdAndDelete(cardId).then((deletedCard) => {
        res.status(200).send(deletedCard);
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" });
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" });
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error interno del servidor" });
    });
