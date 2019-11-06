<template>
  <div>
    <h3>分类列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="320"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/edit/${row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/categories");
      this.items = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
</style>