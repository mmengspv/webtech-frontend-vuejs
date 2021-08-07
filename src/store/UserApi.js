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
        }
    },
    actions: {
        async fetchUser({ commit }){
            let res = await Axios.get(api_endpoint+ "/users")
            commit('fetch',{ res })
        },
        
    },
    modules: {
    }
})