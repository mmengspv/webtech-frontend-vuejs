<template>
  <div>
    <navbar></navbar>
    <h1>Withdraw</h1>
    <form @submit.prevent="withdraw">
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
    async withdraw() {
      const payload = {
        date: new Date().toISOString(),
        amount: this.form.amount,
        type: "withdraw",
        users: AuthStore.getters.user.id,
        balance: 0,
      };
      const res = await ExchangeApiStore.dispatch("addExchange", payload);
      if (res.success) {
        this.$swal("Withdraw success!", res.data.date, "success");
        this.$router.push("/exchange");
      } else {
        this.$swal("Withdraw Failed", res.message, "error");
      }
    },
  },
};
</script>

<style>
</style>