const jwt = require("jsonwebtoken");
const AdminUser = require("../../models/User");
const assert = require("http-assert");
// 登录校验中间件
const authMiddleware = require("../../middleware/auth");
// 资源中间件
const resourceMiddleware = require("../../middleware/resource");

module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true
  });
  // 创建资源
  router.post("/", async (req, res) => {
    const model = await req.model.create(req.body);
    res.send(model);
  });
  // 获取资源
  router.get("/", async (req, res) => {
    const queryOtions = {};
    if (req.model.modelName === "Category") {
      queryOtions.populate = "parent";
    }
    const items = await req.model.find().setOptions(queryOtions);
    res.send(items);
  });
  // 资源详情
  router.get("/:id", async (req, res) => {
    const model = await req.model.findById(req.params.id);
    res.send(model);
  });
  // 更新资源
  router.put("/:id", async (req, res) => {
    const model = await req.model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  // 删除资源
  router.delete("/:id", async (req, res) => {
    await req.model.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    });
  });
  app.use(
    "/admin/api/rest/:resourse",
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = await req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // 根据用户名找用户
    const user = await AdminUser.findOne({ username }).select("+password");
    assert(user, 422, "用户不存在");
    // 校验密码
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "用户不存在");
    // 返回token
    const token = jwt.sign(
      {
        id: user._id
        // _id: user._id,
        // username: user.username
      },
      app.get("secret")
    );
    res.send(token);
  });

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
};
