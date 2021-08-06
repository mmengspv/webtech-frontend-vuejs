<template>
   <div class="reward">
    <h3>Reward</h3>
    <button @click="addPokemon">Add Reward</button>
    <table class="reward-table">
      <thead>
        <tr>
          <th></th>
          <th>Reward ID</th>
          <th>Name</th>
          <th>Exchange Point</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reward, index) in rewards" :key="index">
          <td>{{ index+1}}</td>
          <td>{{reward.reward_id}}</td>
          <td>{{reward.reward_name}}</td>
          <td>{{reward.exchange_point}}</td>
          <td>
              <router-link :to="{name: 'EditReward', params: {id: reward.id}}">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Reward from "@/components/Reward.vue"
import RewardApiStore from '@/store/RewardApi'
export default {
    components:{
      Reward
    },
    data(){
        return{
            rewards: []
        }
    },
    created(){
        this.fetchReward()
    },
    methods: {
        async fetchReward(){
            
            await RewardApiStore.dispatch('fetchReward')
            this.rewards = RewardApiStore.getters.rewards
            console.log(this.rewards);
        },
        addPokemon(){
            this.$router.push("/reward/add") 
        }
    },
}
</script>















<style>
  .reward h3{
      margin-top: 50px;
  }
  .reward-table{
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    width: 70%;
    margin-top: 50px;
  }
  thead th,tbody td{
    border: 1px solid #ddd;
    padding: 2px;
  }
  tbody tr:nth-child(even){
    background-color: #f2f2f2;
  }
  tbody tr:hover {
    background-color: #ddd;
  }
  thead th{
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #28242c;
    color: white;
  }
  .point{
    left: 800px;
    position: relative;
  }
</style>