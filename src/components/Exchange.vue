<template>
  <div class="exchange">
    <navbar></navbar>
    <h1>Deposit and Withdraw</h1>
    <button @click="deposit">Deposit</button>
    <button @click="withdraw">Withdraw</button>
    <div v-if="user.role['type'] === 'authenticated'" class="ml-1">
      <h4>My Balance: {{ balance }}</h4>
    </div>
    <table class="exchange-table">
      <thead>
        <tr>
          <th>No.</th>
          <th v-if="user.role['type'] === 'admin'">Username</th>
          <th>Date</th>
          <th>Type</th>
          <th>Approve</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(exchange, index) in exchanges" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="user.role['type'] === 'admin'">
            {{ exchange.users.username }}
          </td>
          <td>{{ convertDate(exchange.date) }}</td>
          <td v-if="exchange.type === 'deposit'" class="depo">
            {{ exchange.type }}
          </td>
          <td v-if="exchange.type === 'withdraw'" class="wd">
            {{ exchange.type }}
          </td>
          <td v-if="exchange.approve === true">Yes</td>
          <td v-if="exchange.approve === false" class="bg-warning">No</td>
          <td>{{ exchange.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserApi from "../store/UserApi";
import ExchangeApiStore from "@/store/ExchangeApi";
import Navbar from "./Navbar.vue";
import AuthStore from "../store/AuthStore";
import moment from "moment";
export default {
  components: { Navbar },
  data() {
    return {
      user: [],
      exchanges: [],
      balance: 0,
      api_endpoint: process.env.VUE_APP_STRAPI_API,
    };
  },
  created() {
    this.fetchExchange();
  },
  methods: {
    async fetchExchange() {
      this.user = AuthStore.getters.user;
      if (this.user.role.type === "authenticated") {
        await UserApi.dispatch("fetchUserById", this.user.id);
        this.exchanges = UserApi.getters.users.exchanges;
      } else if (this.user.role.type === "admin") {
        await ExchangeApiStore.dispatch("fetchExchange");
        this.exchanges = ExchangeApiStore.getters.exchanges;
      }
      this.sortExchange();
      this.calBalance();
    },
    deposit() {
      this.$router.push("/exchange/income");
    },
    withdraw() {
      this.$router.push("/exchange/withdraw");
    },
    calBalance() {
      this.exchanges.forEach((ex) => {
        if (ex.type === "deposit" && ex.approve === true) {
          this.balance += ex.amount;
        } else if (ex.type === "withdraw" && ex.approve === true) {
          this.balance -= ex.amount;
        }
      });
    },
    sortExchange() {
      this.exchanges.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    },
    convertDate(date) {
      const newDate = moment(date).format("YYYY-MM-DD h:mm:ss a");
      return newDate;
    },
  },
};
</script>

<style>
.depo {
  background-color: rgb(125, 248, 76);
}
.wd {
  background-color: rgb(236, 6, 6);
}
.exchange h3 {
  margin-top: 50px;
}
.exchange-table {
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