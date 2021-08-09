<template>
  <div>
    <navbar></navbar>
    <h1>Approve</h1>
    <table class="approve-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Username</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(exchange, index) in queryExchange" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ convertDate(exchange.date) }}</td>
          <td>{{ exchange.users.username }}</td>
          <td>{{ exchange.amount }}</td>
          <td v-if="exchange.type === 'deposit'" class="depo">
            {{ exchange.type }}
          </td>
          <td v-if="exchange.type === 'withdraw'" class="wd">
            {{ exchange.type }}
          </td>
          <td>
            <button @click="onApprove(exchange)" class="bg-success text-white">
              Approve
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import Navbar from "./Navbar.vue";
import ExchangeApi from "../store/ExchangeApi";
export default {
  components: { Navbar },
  data() {
    return {
      exchanges: [],
      queryExchange: [],
    };
  },
  created() {
    this.fetchExchange();
  },
  methods: {
    async fetchExchange() {
      await ExchangeApi.dispatch("fetchExchange");
      this.exchanges = ExchangeApi.getters.exchanges;
      this.queryExchangeNotApprove();
    },
    queryExchangeNotApprove() {
      this.queryExchange = this.exchanges.filter((ex) => ex.approve === false);
      //Sort by date
      this.queryExchange.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    },
    async onApprove(exchange) {
      const payload = {
        ...exchange,
        approve: true,
      };
      const res = await ExchangeApi.dispatch("updateExchange", payload);
      if (res.success) {
        this.$swal("Approve Success", `approve id: ${res.data.id}`, "success");
        this.$router.go();
      }
    },
    convertDate(date) {
      const newDate = moment(date).format("YYYY-MM-DD h:mm:ss a");
      console.log(newDate);
      return newDate;
    },
  },
};
</script>

<style>
.approve-table {
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