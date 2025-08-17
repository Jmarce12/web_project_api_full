/* eslint-disable comma-dangle */
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }),
  createCard
);
router.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
      "content-type": Joi.string().valid("application/json").required(),
    }),
  }),
  deleteCard
);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);
module.exports = router;
