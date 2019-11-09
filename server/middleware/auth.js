module.exports = options => async (req, res, next) => {
  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");
  const token = req.headers.authoriztion
    ? req.headers.authoriztion.split(" ").pop()
    : "";
  assert(token, 401, "请先登录");
  const { id } = jwt.verify(token, req.app.get("secret"));
  assert(id, 401, "登录失效");
  req.user = require("../models/User").findById(id);
  assert(req.user, 401, "请先登录");
  await next();
};
