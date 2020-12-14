import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CRM from '../views/CRM.vue'
import Todo from '../views/Todo.vue'
import GoalsAndDreams from '../views/GoalsAndDreams.vue'
import Bad from '../views/Bad.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, 
  {
    path: '/register',
    name: 'Register',
    component: Register
  },  
  {
    path: '/crm',
    name: 'CRM',
    component: CRM
  },   
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  },    
  {
    path: '/goals-and-dreams',
    name: 'Goals-and-Dreams',
    component: GoalsAndDreams
  },  
  {
    path: '*',
    name: 'bad',
    component: Bad
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
