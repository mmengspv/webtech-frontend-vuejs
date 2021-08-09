<template>
  <div class="history">
    <navbar></navbar>
    <h1>History</h1>
    <button @click="pointUsed">Use Point</button>
    <table class="history-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Reward Name</th>
          <th>Reward Image</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tran, index) in transactions" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ convertDate(tran.date) }}</td>
          <td>{{ tran.type}}</td>
          <td>{{ tran.point }}</td>
          <td>{{ rewardName(tran) }}</td>
          <img
            class="card-img-top"
            :src= "rewardImg(tran)"
            height="200px"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import AuthStore from '@/store/AuthStore'
import RewardService from '@/services/RewardService'
import moment from "moment";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      transactions:[],
      api_endpoint: process.env.VUE_APP_STRAPI_API,
    };
  },
  created(){
    this.getUserTransaction()
  },
  methods: {
    pointUsed() {
      this.$router.push("/used/Trade");
    },
    getUserTransaction(){
      this.transactions = AuthStore.getters.user.transaction_point;
    },
    async rewardName(transaction){

      const a =await RewardService.getRewardById(transaction.reward)
      // console.log(a.reward_name);
      return a.reward_name
    },
    async rewardImg(transaction){
      const a =await RewardService.getRewardById(transaction.reward)
      // console.log(a);
      return this.api_endpoint + a.image[0].url
    },
    convertDate(date) {
      const newDate = moment(date).format("YYYY-MM-DD h:mm:ss a");
      return newDate;
    },
  },
};
</script>

<style>
.ml-button {
  margin: 10px;
}
.history h3 {
  margin-top: 50px;
}
.history-table {
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  width: 70%;
  margin-top: 50px;
}
thead th,
tbody td {
  border: 1px solid #ddd;
  padding: 2px;
}
tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
tbody tr:hover {
  background-color: #ddd;
}
thead th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #28242c;
  color: white;
}
.point {
  left: 800px;
  position: relative;
}
</style>