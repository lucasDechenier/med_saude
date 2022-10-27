import Vue from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask'
import store from './store/index'
import SweetAlert from './mixins/SweetAlert'
import VueSweetalert2 from 'vue-sweetalert2'
import './filters/DateTime'

Vue.use(VueMask);

Vue.use(VueSweetalert2);
Vue.mixin(SweetAlert);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
