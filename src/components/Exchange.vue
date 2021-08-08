<template>
  <div class="exchange">
    <navbar></navbar>
      <h1>Deposit and Withdraw</h1>
      <button @click="addExchange">Deposit Withdraw</button>
      <table class="exchange-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(exchange, index) in exchanges" :key="index">
            <td> {{ index+1 }} </td>
            <td> {{ exchange.date }} </td>
            <td> {{ exchange.amount }} </td>
            <td> {{ exchange.balance }} </td>
            <td> {{ exchange.point}} </td>
          </tr>
        </tbody>

      </table>
      
  </div>
</template>

<script>
import ExchangeApiStore from "@/store/ExchangeApi"
import Navbar from "./Navbar.vue"
export default {
  components: { Navbar },
  data() {
    return{
      exchanges: [],
      api_endpoint: process.env.VUE_APP_STRAPI_API
    };
  },
  created(){
    this.fetchExchange()
  },
  methods: {
    async fetchExchange(){        
      await ExchangeApiStore.dispatch('fetchExchange')
      this.exchanges = ExchangeApiStore.getters.exchanges
  },
  addExchange(){
    this.$router.push("/exchange/income") 
    }
  },
};
</script>

<style>
.exchange h3{
      margin-top: 50px;
  }
  .exchange-table{
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