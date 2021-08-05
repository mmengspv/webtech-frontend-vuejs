import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import RewardPage from '@/views/reward/View'
import AddReward from '@/views/reward/Add'
import EditReward from '@/views/reward/Edit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/reward/view',
    name: 'RewardPage',
    component: RewardPage
  },
  {
    path: '/reward/add',
    name: 'AddReward',
    component: AddReward
  },
  {
    path: '/reward/:id/edit',
    name: 'EditReward',
    component: EditReward
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
