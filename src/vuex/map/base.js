import { get_userinfo, get_offline_charge_list } from '@/service/index';

const state = {
  userinfo: {
    balance: 0,
    charge_sum: 0,
    bet_sum: 0,
    commission: 0,
  },

  offline_charge_list: [], //线下充值列表
};

const getters = {
  getUserinfo(state) {
    return state.userinfo;
  },
};

const mutations = {
  set_userinfo(state, data) {
    state.userinfo = data;
  },

  set_offline_charge_list(state, data) {
    state.offline_charge_list = data;
  },

  setIsBets(state, data) {
    state.isBets = data;
  },

  set_user_balance(state , balance){
    state.userinfo.balance = balance;
  }
};

const actions = {
  async get_userinfo({ commit }) {
    const res = await get_userinfo();
    if (res.status < 400) {
      commit('set_userinfo', res.data);
    }
  },

  async get_offline_charge_list({ commit }) {
    const res = await get_offline_charge_list();
    if (res.status < 400) {
      commit('set_offline_charge_list', res.data);
      return;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
