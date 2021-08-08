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
          <th>Amount</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(exchange, index) in exchanges" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="user.role['type'] === 'admin'">
            {{ exchange.users.username }}
          </td>
          <td>{{ exchange.date }}</td>
          <td>{{ exchange.amount }}</td>
          <td>{{ exchange.type }}</td>
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
        if (ex.type === "deposit") {
          this.balance += ex.amount;
        } else if (ex.type === "withdraw") {
          this.balance -= ex.amount;
        }
      });
    },
  },
};
</script>

<style>
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