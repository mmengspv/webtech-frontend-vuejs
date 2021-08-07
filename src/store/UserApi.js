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
        edit(state, index, data){
            state.data[index] = data
          
          }
    },
    actions: {
        async fetchUser({ commit }){
            let res = await Axios.get(api_endpoint+ "/users")
            commit('fetch',{ res })
        },
        async editPoint({commit},  payload ){
            let url = api_endpoint +"/users/" + payload.index
            let body = {
              point: payload.point,
            }
            let res = await Axios.put(url,body)
            if(res.status === 200){
              let data = res.data
              data.index = payload.index
              commit("edit", {payload})
              return{
                success: true,
                data: res.data
              }
            }else{
              return{
                success: false,
                message: "Error: " + res.status
              }
            }
            
          }
    },
    modules: {
    }
})