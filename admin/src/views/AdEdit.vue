<template>
  <div>
    <h3>{{ id ? '编辑' : '创建' }}广告位</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="text" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>
      </el-form-item>
      <el-row type="flex" style="flex-wrap: wrap">
        <el-col :md="12" v-for="(item, index) in model.items" :key="index">
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :on-success="res => $set(item, 'image', res.url)"
            >
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="item.url" placeholder></el-input>
          </el-form-item>
          <el-form-item label>
            <el-button type="danger" @click="model.items.splice(index, 1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

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
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
        if (res) {
          this.$router.push("/ads/list");
          this.$message({
            type: "success",
            message: "保存成功"
          });
        }
      } else {
        res = await this.$http.post("rest/ads", this.model);
        this.$router.push("/ads/list");
        this.$message.success("保存成功");
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
</style>