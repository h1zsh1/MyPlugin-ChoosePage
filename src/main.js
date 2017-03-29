import Vue from 'vue'
import App from './App.vue'
import ChoosePages from './plugin/choosePage/index'
Vue.use(ChoosePages);
new Vue({
  el: '#app',
  render: h => h(App)
})
