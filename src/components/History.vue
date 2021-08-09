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
          <th>Reward</th>
          <th>Details</th>
          <th>Point Used</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
        <td>1</td>
        <td>05-08-2021</td>
        <td>Cake</td>
        <td>Dessert</td>
        <td>10</td>
      </tbody>
    </table>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  methods: {
    pointUsed() {
      this.$router.push("/used/Trade");
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