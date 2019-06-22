import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


/* Vuetify */
import './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

/* Vuelidate */
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
