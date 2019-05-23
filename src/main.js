import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import svgJs from './plugins/vueSvgPlugin'

Vue.config.productionTip = false

Vue.use(svgJs)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
