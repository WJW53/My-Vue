import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index'
import "./assets/reset.css";


// console.log(new Vue());
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
