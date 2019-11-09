module.exports = options => async (req, res, next) => {
  const modelName = require("inflection").classify(req.params.resourse);
  req.model = require(`../models/${modelName}`);
  next();
};
