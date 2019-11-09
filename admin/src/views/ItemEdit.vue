<template>
  <div>
    <h3>{{ id ? '编辑' : '创建' }}物品</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="上级分类">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
        if (res) {
          this.$router.push("/items/list");
          this.$message({
            type: "success",
            message: "保存成功"
          });
        }
      } else {
        res = await this.$http.post("rest/items", this.model);
        this.$router.push("/items/list");
        this.$message.success("保存成功");
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    // async fetchParents() {
    //   const res = await this.$http.get("rest/items");
    //   this.parents = res.data;
    // }
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    }
  },
  created() {
    // this.fetchParents();
    this.id && this.fetch();
  }
};
</script>

<style>
</style>