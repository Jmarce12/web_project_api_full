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
  getUsers,
);

router.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
      "content-type": Joi.string().valid("application/json").required(),
    }),
  }),
  getUserById,
);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
        "content-type": Joi.string().valid("application/json").required(),
      })
      .unknown(true),
  }),
  updateUser,
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object({
      avatar: Joi.string()
        .uri({ scheme: ["http", "https"] })
        .required(),
    }),
    headers: Joi.object({
      authorization: Joi.string()
        .pattern(/^Bearer\s.+$/)
        .required(),
      "content-type": Joi.string()
        .pattern(/^application\/json\b/i)
        .required(),
    }).unknown(true),
  }),
  updateAvatar,
);

module.exports = router;
