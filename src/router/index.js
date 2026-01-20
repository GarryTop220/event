import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EventDetail from '../views/EventDetail.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router