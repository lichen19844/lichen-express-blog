<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="分类标题">
        <el-input placeholder="请输入内容" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" round
          >立即{{ id ? "编辑" : "新建" }}</el-button
        >
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        name: "",
      },
    };
  },
  methods: {
    async save() {
      const url = this.id ? `rest/categories/${this.id}` : "rest/categories";
      const method = this.id ? "put" : "post";
      await this.$http[method](url, this.model);
      this.model = {};
      // this.$router.go(-1)
      this.$router.push("/categories/list");
      this.$message.success("保存成功");
    },
    async fetch() {
      console.log(this.id);
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
      console.log("this.parents is ", this.parents);
    },
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
};
</script>

<style></style>
