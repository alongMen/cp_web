import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import base from './map/base';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  namespaced: true,
  modules:{
    base
  },

  mutations:{

  },

  plugins: debug ? [createLogger()] : []
});