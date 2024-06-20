const Joi = require('joi');

module.exports.postSchema = Joi.object({
  post: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),

  }).required()
})