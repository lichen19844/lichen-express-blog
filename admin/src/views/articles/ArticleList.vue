<template>
  <div>
    <h3>文章列表</h3>
    <el-table :data="items" border stripe>
      <el-table-column v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width">
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  }
}
</script>

<style>

</style>