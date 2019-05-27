import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import svgJs from './plugins/vueSvgPlugin'
import svgDrag from './plugins/vueSvgDrag'

Vue.config.productionTip = false

Vue.use(svgJs)
Vue.use(svgDrag)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
