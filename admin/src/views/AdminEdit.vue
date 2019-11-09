<template>
  <div>
    <h3>{{ id ? '编辑' : '创建' }}管理员</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="账号">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password" placeholder></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      model: {}
      // parents: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/users/${this.id}`, this.model);
        if (res) {
          this.$router.push("/admin_users/list");
          this.$message({
            type: "success",
            message: "保存成功"
          });
        }
      } else {
        res = await this.$http.post("rest/users", this.model);
        this.$router.push("/admin_users/list");
        this.$message.success("保存成功");
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
</style>