import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import routes from '../src/routes'
import store from "./store";

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(VueRouter)
Vue.use(BootstrapVue)


const router = new VueRouter({routes});
new Vue({
    store,
    render: h => h(App),
    router,
}).$mount('#app')