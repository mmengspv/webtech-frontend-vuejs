import Vue from "vue";
import Axios from "axios";
import Vuex from "vuex";
import ExchangeService from "../services/ExchangeService";

let api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:3000";

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
  },
  actions: {
    async fetchExchange({ commit }) {
      const res = await ExchangeService.getAllExchange();
      commit("fetch", { res });
    },
    async addExchange({ commit }, payload) {
      let userid = await Axios.get(api_endpoint+"/users?id="+payload.user_id)
      let body={
        type: payload.type,
        point: payload.point,
        users: userid.data.map((it) => it.id)
      }
      console.log(body);
      const res = await ExchangeService.create(body);
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