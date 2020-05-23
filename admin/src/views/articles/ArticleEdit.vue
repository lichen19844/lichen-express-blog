<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select
          placeholder="请选择"
          v-model="model.categories"
          style="width: 100%"
          multiple filterable
        >
          <el-option
            v-for="item of categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章标题">
        <el-input placeholder="请输入内容" v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <!-- <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="model.body"
        ></el-input> -->
        <vue-editor v-model="model.body"
          useCustomImageHandler @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" round
          >立即{{ id ? "编辑" : "创建" }}</el-button
        >
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        title: "",
        body: "",
      },
      categories: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories () {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },

    async save() {
      const url = this.id ? `rest/articles/${this.id}` : "rest/articles";
      const method = this.id ? "put" : "post";
      await this.$http[method](url, this.model);
      this.model = {};
      // this.$router.go(-1)
      this.$router.push("/articles/list");
      this.$message.success("保存成功");
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData
      // })
      //   .then(result => {
      //     let url = result.data.url; // Get url from response
      //     Editor.insertEmbed(cursorLocation, "image", url);
      //     resetUploader();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  },
};
</script>

<style></style>
