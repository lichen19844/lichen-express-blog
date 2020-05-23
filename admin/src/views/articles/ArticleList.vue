<template>
  <div>
    <h1>文章列表</h1>
    <el-table
      :data="items"
      border
      stripe
      :header-cell-style="rowClass"
      :cell-style="cellStyle"
    >
      <el-table-column
        v-for="(field, title) in fields"
        :prop="title"
        :key="title"
        :label="field.label"
        min-width="230px"
      >
      </el-table-column>

      <el-table-column prop="catArray" label="文章分类" min-width="200px">
      </el-table-column>

      <!-- <el-table-column prop="_id" label="ID" width="230px"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column> -->
      <el-table-column fixed="right" label="操作" min-width="180px">
        <template v-slot="{ row }">
          <el-button
            type="text"
            @click="$router.push(`/articles/edit/${row._id}`)"
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
        title: { label: "文章标题" },
      },
      categories: [],
    };
  },
  methods: {
    async fetch() {
      // await this.$http.get(`rest/categories`)
      const res = await this.$http.get("rest/articles");
      this.items = res.data;
      // 针对分类做细化：
      this.items.map((item) => {
        if (item.categories) {
          let catArray = [];
          item.categories.map((cat) => {
            catArray.push(cat.name);
          });
          item.catArray = catArray.join(", ");
        }
        return item;
      });
      console.log("articles list is ", this.items);
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
      await this.$http.delete(`rest/articles/${row._id}`);
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
    this.headerStyle();
  },
};
</script>

<style>

</style>
