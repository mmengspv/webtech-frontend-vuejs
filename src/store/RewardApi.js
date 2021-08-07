import Vue from "vue";
import Vuex from "vuex";
import RewardService from "../services/RewardService";

let api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    rewards: (state) => state.data,
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
    async fetchReward({ commit }) {
      const res = await RewardService.getAllReward();
      commit("fetch", { res });
    },
    async addReward({ commit }, payload) {
      const res = await RewardService.create(payload);
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
    async editReward({ commit }, payload) {
      const res = await RewardService.updateRewardById(payload);
      // console.log(res);
      if (res.status === 200) {
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
    async deleteReward({ commit }, id) {
      try {
        const res = await RewardService.deleteRewardById(id);
        return {
          success: true,
          data: res.data,
        };
      } catch (e) {
        return {
          success: false,
          message: "Error: " + res.status,
        };
      }
    },
  },
  modules: {},
});
