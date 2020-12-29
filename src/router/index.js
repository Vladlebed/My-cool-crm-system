import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Apps from '../views/Apps.vue'
import AppsList from './AppsList.js'
import GoalsAndDreams from '../views/GoalsAndDreams.vue'
import Bad from '../views/Bad.vue'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
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
    path: '/apps',
    name: 'Apps',
    meta: {layout: 'main', auth: true},
    component: Apps
  },
  ...AppsList,    
  {
    path: '/goals-and-dreams',
    name: 'Goals-and-Dreams',
    meta: {layout: 'main', auth: true},
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

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
