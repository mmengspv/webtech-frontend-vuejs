import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
let api_endpoint = process.env.VUE_APP_POKEMON_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: []
      },
      getters:{
        exchanges: (state) => state.data,
      },
      mutations: {
        fetch (state, { res }){
            state.data = res.data
        },
        add(state, {payload}){
          state.data.push(payload)
        },
    },
  actions: {
    async fetchExchange({ commit }){
        let res = await Axios.get(api_endpoint + "/exchanges")
        commit("fetch",{ res })
      },
      async addExchange({ commit }, payload){
        let url = api_endpoint + "/exchanges"
        let body = {
          order: payload.order,
          date: payload.date,
          amount: payload.amount,
          balance: payload.balance,
          point: payload.point
        }
        let res = await Axios.post(url, body)
        if(res.status === 200){
          commit("add", res.data)
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
    },
      

  },
  modules: {
  }
})