module.exports = app => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://localhost:27017/express_vue_moba", {
    useNewUrlParser: true,
    useFindAndModify: false
  });

  require("require-all")(__dirname + "/../models");
};
