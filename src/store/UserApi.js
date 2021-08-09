import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import AuthService from "../services/AuthService";
let api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    users: (state) => state.data,
  },
  mutations: {
    fetch(state, { res }) {
      state.data = res.data;
    },
    edit(state, index, data) {
      state.data[index] = data;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      const headers = AuthService.getHeaders();
      let res = await Axios.get(api_endpoint + "/users", headers);
      commit("fetch", { res });
    },
    async fetchUserById({ commit }, id) {
      const headers = AuthService.getHeaders();
      const res = await Axios.get(api_endpoint + `/users/${id}`, headers);
      commit("fetch", { res });
    },
    async updatePoint({ commit }, payload) {
      const headers = AuthService.getHeaders();
      const url = api_endpoint + "/users/" + payload.index;
      await Axios.put(url, payload, headers);
      commit("edit", { payload });
    },
    async editPoint({ commit }, payload) {
      let url = api_endpoint + "/users/" + payload.index;
      let body = {
        point: payload.point,
      };
      const headers = AuthService.getHeaders();
      let res = await Axios.put(url, body, headers);
      if (res.status === 200) {
        let data = res.data;
        data.index = payload.index;
        commit("edit", { payload });
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
