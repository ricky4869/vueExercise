import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import 'jquery';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { ValidationProvider, ValidationObserver, extend, localize, configure} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import tw from 'vee-validate/dist/locale/zh_TW';
import App from './App.vue'
import router from './router'
import './bus';
import filterCurrency from './filters/currency'
import flyIn from './mixin/flyin'

axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.use(VueAxios, axios);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
localize('tw', tw)
localize({
  tw: {
    names: {
      email: 'E-mail',
      password: 'Password',
      name: '姓名',
      tel: '收件人電話',
      address: '收件人地址'
    },
  }
});
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], 
    // multiple classes per flag!
    // ...
  }
})
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
Vue.component('Loading', Loading);
Vue.filter('currency', filterCurrency);
Vue.mixin('flyIn', flyIn);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_APIPATH}api/user/check`;
    axios.post(api).then(response => {
      console.log(response.data)
      if(response.data.success){
        next();
      }else {
        next({
          path: '/login'
        })
      }
    });
  } else{
    next()
  }
})
