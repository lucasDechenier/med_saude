import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "login" */'../views/Auth/Login.vue')
const Register = () => import(/* webpackChunkName: "Register" */'../views/Auth/Register.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login},
  { path: '/register', name: 'registro', component: Register},
]

const router = new VueRouter({
  routes
})

export default router
