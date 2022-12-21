import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import Icons from '@/components/icons'
import 'element-ui/lib/theme-chalk/index.css'

import bootstrap from './config/bootstrap'
import './assets/common.scss'
import dict from './dict'
import { reImgUrl } from './utils/method'

Vue.use(ElementUI)

Vue.component('Icon', Icons)
Vue.prototype.$dict = dict
Vue.prototype.reImgUrl = reImgUrl
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
