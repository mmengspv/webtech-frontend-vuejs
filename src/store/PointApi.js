import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import PointService from "../services/PointService";

let api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    points: (state) => state.data,
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
    async fetchPoint({ commit }) {
      const res = await PointService.getAllPoint();
      commit("fetch", { res });
    },
    async addPoint({ commit }, payload) {
      const res = await PointService.create(payload);
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
