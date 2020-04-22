<template>
  <div>
    <h3>文章列表</h3>
    <el-table :data="items">
      <el-table-column v-for="item in items"
        :prop="item.id"
        :key="item.id"
        :label="item.label"
        :min-width="item.width">
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