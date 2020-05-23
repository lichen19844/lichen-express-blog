<template>
  <div>
    <h1>分类列表</h1>
    <el-table
      :data="items"
      border
      stripe
      :header-cell-style="rowClass"
      :cell-style="cellStyle"
    >
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        min-width="230px"
      >
      </el-table-column>

      <el-table-column prop="parent.name" label="上级分类" min-width="200px">
      </el-table-column>

      <el-table-column fixed="right" label="操作" min-width="100px">
        <template v-slot="{ row }">
          <el-button
            type="text"
            @click="$router.push(`/categories/edit/${row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      fields: {
        _id: { label: "ID" },
        name: { label: "分类名称" },
        // parent: {label: "上级分类"}
      },
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/categories");
      this.items = res.data;
    },
    async remove(row) {
      try {
        // $confirm 是element提供的
        await this.$confirm(`是否确定要删除分类？"${row.name}"`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } catch (e) {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
        return;
      }
      await this.$http.delete(`rest/categories/${row._id}`);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
      this.fetch();
    },
    rowClass() {
      return "background: #cccccc; text-align: center; color: #000000; font-weight: 600;";
    },
    cellStyle() {
      return "background: #ffffff; text-align: center;";
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style></style>
