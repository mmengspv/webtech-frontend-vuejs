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
    rewards: (state) => state.data,
  },
  mutations: {
    fetch (state, { res }){
        state.data = res.data
    },
    add(state, {payload}){
      state.data.push(payload)
    },
    edit(state, index, data){
      state.data[index] = data
    
    }
  },
  actions: {
      async fetchReward({ commit }){
        let res = await Axios.get(api_endpoint + "/rewards")
        commit("fetch",{ res })
      },
      async addReward({ commit }, payload){
        let url = api_endpoint + "/rewards"
        let body = {
          reward_id: payload.reward_id,
          reward_name: payload.reward_name,
          exchange_point: payload.exchange_point,
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
      async editReward({commit},  payload ){
        let url = api_endpoint +"/rewards/" + payload.index
        let body = {
          reward_id: payload.reward_id,
          reward_name: payload.reward_name,
          exchange_point: payload.exchange_point,
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