/* eslint-disable comma-dangle */
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get(
  "/",
  celebrate({
    headers: Joi.object().keys({
      "content-type": Joi.string().valid("application/json").required(),
    }),
  }),
  getUsers
);

router.get(
  "/:_id",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24).required(),
    }),
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
      "content-type": Joi.string().valid("application/json").required(),
    }),
  }),
  getUserById
);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
      "content-type": Joi.string().valid("application/json").required(),
    }),
  }),
  updateUser
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri().required(),
    }),
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
      "content-type": Joi.string().valid("application/json").required(),
    }),
  }),
  updateAvatar
);

module.exports = router;
