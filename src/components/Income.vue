<template>
  <div>
    <navbar></navbar>
    <h1>Deposit</h1>
    <form @submit.prevent="addExchange">
      <div>
        <label for="amount">Amount</label>
        <input
          type="number"
          v-model="form.amount"
          name="amount"
          min="1"
          autocomplete="off"
        />
      </div>
      <button>Confirm</button>
    </form>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ExchangeApiStore from "@/store/ExchangeApi";
import AuthStore from "../store/AuthStore";
export default {
  components: { Navbar },
  data() {
    return {
      form: {
        date: "",
        amount: 0,
        type: "",
      },
    };
  },
  methods: {
    clearForm() {
      this.form = {
        date: "",
        amount: "",
        type: "",
      };
    },
    async addExchange() {
      const payload = {
        date: new Date(),
        amount: this.form.amount,
        type: "deposit",
        users: AuthStore.getters.user.id,
        balance: 0,
      };
      const res = await ExchangeApiStore.dispatch("addExchange", payload);
      if (res.success) {
        this.$swal("Success!", res.data.date, "success");
        this.$router.push("/exchange");
      } else {
        this.$swal("Add Failed", res.message, "error");
      }
    },
  },
};
</script>

<style>
</style>