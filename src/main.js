import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import './assets/js/rem'

import {formatBeijingDate} from './utils/date_utils';
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import { Notify } from 'vant';
Vue.use(Notify);

//引入lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/loading.png'),
  loading: require('./assets/images/loading.png'),
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})


Vue.prototype.formatBeijingDate = function(str) {
  return formatBeijingDate(str);
};

Vue.prototype.$baseUrl = process.env.VUE_APP_REQUEST_URL;


Vue.prototype.$ws = null;

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
	if (!to.matched.some(record => record.meta.noAuth)) {
		if (localStorage.getItem('token')) {
			next();
		} else {
			next('/login');
		}
	} else {
		next();
	}
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
