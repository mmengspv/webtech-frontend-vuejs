import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
let api_endpoint = process.env.VUE_APP_POKEMON_ENDPOINT || "http://localhost:3000"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data:[]
    },
    getters:{
        users:(state) => state.data,
    },
    mutations: {
        fetch(state, {res}){
            state.data = res.data
        },
        edit(state, index, data) {
            state.data[index] = data;
        },
    },
    actions: {
        async fetchUser({ commit }){
            let res = await Axios.get(api_endpoint+ "/users")
            commit('fetch',{ res })
        },
        async updatePoint({ commit }, payload){
            const url = api_endpoint + "/users/" + payload.index;
            commit("edit", { payload });
            await Axios.put(url, payload);
        },
        async getUserById(id) {
            const res = await Axios.get(`${api_endpoint}/users/${id}`);
            return res.data;
          },
        
    },
    modules: {
    }
})