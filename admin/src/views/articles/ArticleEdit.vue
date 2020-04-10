<template>
  <div>
    <h1>{{id? '编辑': '新建'}}文章</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="文章标题">
        <el-input placeholder="请输入内容" v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <el-input type="textarea" placeholder="请输入内容" v-model="model.body"></el-input>
        <!-- <vue-editor v-model="model.body"
          useCustomImageHandler @image-added="handleImageAdded"
        ></vue-editor> -->
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" native-type="submit" round>立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
export default {
  // components: {
  //   VueEditor
  // },
  prop: {
    id: {}
  },
  data () {
    return {
      model: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async save () {
      // console.log('save')
      await this.$http.post('rest/articles',this.model)
      this.$router.push('/articles/list')
      this.$message.success('成功创建数据')
    },
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post('upload', formData)
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
    }
  }
}
</script>

<style>

</style>