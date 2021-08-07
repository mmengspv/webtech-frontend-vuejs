import Vue from "vue";
import Vuex from "vuex";
import ExchangeService from "../services/ExchangeService";

let api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    exchanges: (state) => state.data,
  },
  mutations: {
    fetch(state, { res }) {
      state.data = res.data;
    },
    add(state, { payload }) {
      state.data.push(payload);
    },
    edit(state, index, data) {
      state.data[index] = data;
    },
  },
  actions: {
    async fetchExchange({ commit }) {
      const res = await ExchangeService.getAllExchange();
      commit("fetch", { res });
    },
    async addExchange({ commit }, payload) {
      const res = await ExchangeService.create(payload);
      if (res.status === 200) {
        commit("add", res.data);
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          message: "Error: " + res.status,
        };
      }
    },
  },
  modules: {},
});
