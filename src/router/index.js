import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

const Login = () => import(/* webpackChunkName: "login" */'../views/Auth/Login.vue')
const Register = () => import(/* webpackChunkName: "Register" */'../views/Auth/Register.vue')

const Home = () => import('../views/Home.vue')

const UserSchedule = () => import('../views/User/UserSchedule.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '*', redirect: { name: 'Home' } },

  { path: '/login', name: 'login', component: Login},
  { path: '/register', name: 'registro', component: Register},
  { path: '/schedule', name: 'registro', component: UserSchedule},
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicRoutes = ['/login', '/register']
  if(publicRoutes.includes(to.path)){
    next();
  }else if(!store.getters.isLogged) {
    router.push('/login');
  }else{
    next();
  }
});

export default router
