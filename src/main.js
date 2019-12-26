import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import files from './assets/files/logo_nt.png'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  files,
  render: h => h(App)
}).$mount('#app')
