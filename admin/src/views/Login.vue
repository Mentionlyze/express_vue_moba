<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header">
        <span>登录</span>
      </div>
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      localStorage.express_vue_moba_token = res.data;
      this.$router.push("/");
      this.$message.success("登录成功");
    }
  }
};
</script>

<style>
.login-container {
}
.login-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>