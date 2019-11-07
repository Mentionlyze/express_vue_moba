<template>
  <div>
    <h3>广告位列表</h3>
    <el-table :data="ads">
      <el-table-column
        v-for="col in fields"
        :key="col._id"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="$router.push(`/ads/edit/${row._id}`)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ads: [],
      fields: [
        { prop: "_id", label: "ID", width: "320" },
        { prop: "name", label: "广告名称" }
      ]
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/ads");
      this.ads = res.data;
    },
    async remove(row) {
      try {
        await this.$confirm("确认删除吗", "提示");
        const res = await this.$http.delete(`rest/ads/${row._id}`);
        if (res) {
          res && this.$message.success("删除成功");
          this.fetch();
        }
      } catch (e) {
        global.console.log(e);
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
</style>