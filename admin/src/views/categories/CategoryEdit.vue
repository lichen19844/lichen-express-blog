<template>
  <div>
    <h1>{{id? '编辑': '新建'}}分类</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="分类标题">
        <el-input placeholder="请输入内容" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button ttype="primary" native-type="submit" round>立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
export default {
  prop: {
    id: {}
  },
  data () {
    return {
      model: {
        name: ''
      }
    }
  },
  methods: {
    async save () {
      await this.$http.post('rest/categories', this.model)
      this.$router.push('/categories/list')
      this.$message.success('保存成功')
    }
  }
}
</script>

<style>

</style>
