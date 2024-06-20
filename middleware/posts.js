const { postSchema } = require("../Schema");
const ExpressError = require("../utility/ExpressError")


//Server side schema validation using Joi npm package
module.exports.validatePost = (req, res, next) => {

  let { error } = postSchema.validate(req.body);
  if (error) {
    // console.log(error);
    throw new ExpressError(400, error);
  } else {
    next();
  }
}
