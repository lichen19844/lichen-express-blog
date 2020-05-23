<template>
  <el-container style="height: 100vh;">
    <el-aside width="210px" style="height: 100vh; background-color: rgb(238, 241, 246)">
      <el-menu
        mode="vertical" 
        :default-active="$router.path"
        :default-openeds="openeds"
        :unique-opened="uniqueOpened" 
        active-text-color="#ffd04b"
        text-color="#fff"
        background-color="#545c64"
        :router=true
      >
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`${index} + 1`"
          :key="`menu-item-${index}`">
          <template slot="title">{{item.title}}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :index="subItem.path"
            :key="`menu-item-${index}-${subIndex}`">
              {{subItem.title}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header height="">

      </el-header>
      <el-main height="">
        <!-- <h1 v-show="handleShow">欢迎进入管理后台</h1> -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      openeds: ['2'],
      uniqueOpened: true,
      menu: {
        items: [
          {
            title: '内容管理',
            items: [
              { title: '首页', path: '/' },
              { title: '文章列表', path: '/articles/list' },
              { title: '新建文章', path: '/articles/create' }            
            ]
          },
          {
            title: '分类管理',
            items: [
              { title: '分类列表', path: '/categories/list' },
              { title: '新建分类', path: '/categories/create' }            
            ]
          },
          {
            title: '用户管理',
            items: [
              { title: '用户列表', path: '/adminUsers/list' },
              { title: '新建用户', path: '/adminUsers/create' }            
            ]
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>

