<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items" border stripe>
      <el-table-column v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        width="230px">
      </el-table-column>
      <!-- <el-table-column prop="_id" label="ID" width="230px"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column> -->
      <el-table-column
        fixed="right"
        label="操作"
        width="180px">
        <template v-slot="{row}">
          <el-button type="text" @click="$router.push(`/categories/edit/${row._id}`)">编辑</el-button>
          <!-- <el-button type="text" @click="">删除</el-button> -->
        </template>
      </el-table-column>
      
    </el-table>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      fields: {
        _id: {label: 'ID'},
        name: {label: '分类名称'}
      }
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/categories')
      this.items = res.data
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style>

</style>