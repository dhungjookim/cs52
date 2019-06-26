import Vue from 'vue'
import ToDo from './ToDo.vue'


new Vue({
    render: h => h(ToDo)
  }).$mount('#app')

Vue.config.productionTip = false


