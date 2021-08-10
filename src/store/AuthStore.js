import Vue from "vue";
import Vuex from "vuex";
import AuthService from "../services/AuthService";

Vue.use(Vuex);

const auth_key = "auth-user";
const auth = JSON.parse(localStorage.getItem(auth_key));

const initialState = {
  user: auth ? auth.user : "",
  jwt: auth ? auth.jwt : "",
  isLoggedIn: auth ? true : false,
};

export default new Vuex.Store({
  state: initialState,
  getters: {
    user: (state) => state.user,
    jwt: (state) => state.jwt,
    isLoggedIn: (state) => state.isLoggedIn,
    isAdmin: (state) => state.user.role.type
  },
  mutations: {
    loginSuccess(state, res) {
      state.user = res.user;
      state.jwt = res.jwt;
      state.isLoggedIn = res.success;
      console.log(state);
    },
    logoutSuccess(state) {
      state.user = "";
      state.jwt = "";
      state.isLoggedIn = false;
    },
    fetch(state, { res }) {
      state.data = res.data;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const res = await AuthService.login({ email, password });
      if (res.success) {
        commit("loginSuccess", res);
      }
      return res;
    },
    async logout({ commit }) {
      await AuthService.logout();
      commit("logoutSuccess");
    },
    async register({ commit }, { username, email, password }) {
      const res = await AuthService.register({ username, email, password });
      if (res.success) {
        commit("loginSuccess", res);
      }
      return res;
    },
  },
  modules: {},
});
