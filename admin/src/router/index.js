import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// import Home from '../views/Home.vue'
import CategoryEdit from '../views/categories/CategoryEdit.vue'
import CategoryList from '../views/categories/CategoryList.vue'
import ArticleEdit from '../views/articles/ArticleEdit.vue'
import ArticleList from '../views/articles/ArticleList.vue'
import AdminUserEdit from '../views/adminUsers/AdminUserEdit.vue'
import AdminUserList from '../views/adminUsers/AdminUserList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,

    children: [
      { path: '/articles/list', component: ArticleList },
      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/categories/list', component: CategoryList },
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/adminUsers/list', component: AdminUserList },
      { path: '/adminUsers/create', component: AdminUserEdit },
      { path: '/adminUsers/edit/:id', component: AdminUserEdit, props: true }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
