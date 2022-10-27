import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

const Login = () => import(/* webpackChunkName: "login" */'../views/Auth/Login.vue')
const Register = () => import(/* webpackChunkName: "Register" */'../views/Auth/Register.vue')

const Home = () => import('../views/Home.vue')

const UserSchedule = () => import('../views/User/UserSchedule.vue')
const UserHistory = () => import('../views/User/UserHistory.vue')

//Admin
const Admin = () => import('../views/Admin/Admin.vue')
const AdminSchedule = () => import('../views/Admin/Schedule.vue')
const AdminHistory = () => import('../views/Admin/AdminHistory.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { onlyUser: true }},
  { path: '*', redirect: { name: 'Home' } },

  { path: '/login', name: 'login', component: Login},
  { path: '/register', name: 'registro', component: Register},

  { path: '/schedule', name: 'tarefas', component: UserSchedule, meta: { onlyUser: true }},
  { path: '/history', name: 'histórico', component: UserHistory, meta: { onlyUser: true }},

  { path: '/admin', name: 'Admin', component: Admin, meta: { adminRequired: true } },
  { path: '/admin/schedule', name: 'Admin', component: AdminSchedule, meta: { adminRequired: true } },
  { path: '/admin/history', name: 'Histórico admin', component: AdminHistory, meta: { adminRequired: true }},
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicRoutes = ['/login', '/register']

  if(store?.getters?.isLogged){
    if(to.meta.adminRequired && !store?.getters?.isAdmin){
      return router.push('/')
    }

    if(to.meta.onlyUser && store?.getters?.isAdmin){
      return router.push('/admin')
    }
  }

  if(publicRoutes.includes(to.path)){
    next();
  }else if(!store.getters.isLogged) {
    router.push('/login');
  }else{
    next();
  }
});

export default router
