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
import UserService from "../services/UserService";
import moment from "moment";
export default {
  components: { Navbar },
  data() {
    return {
      currentUser: [],
      form: {
        date: "",
        amount: "",
        type: "",
      },
    };
  },
  created() {
    this.fetchUser();
  },
  mounted() {
    if (!this.isLoggedIn()) {
      this.$swal("Resticted Area", "You don't have permission", "warning");
      this.$router.push("/");
    }
  },
  methods: {
    async fetchUser() {
      const user = AuthStore.getters.user;
      this.currentUser = await UserService.getUserById(user.id);
    },
    clearForm() {
      this.form = {
        date: "",
        amount: "",
        type: "",
      };
    },
    isLoggedIn() {
      return AuthStore.getters.isLoggedIn;
    },
    async withdraw() {
      const withdrawNotApprove = this.currentUser.exchanges.filter(
        (ex) => ex.type === "withdraw" && ex.approve === false
      );
      const withdraw =
        withdrawNotApprove.reduce((a, b) => a + b.amount, 0) +
        Number(this.form.amount);

      if (this.currentUser.balance < withdraw) {
        this.$swal(
          "Withdraw Failed",
          `Money is not enough Please check you money \nand withdraw waiting for approve`,
          "error"
        );
      } else {
        const payload = {
          date: new Date(),
          amount: this.form.amount,
          type: "withdraw",
          users: AuthStore.getters.user.id,
          balance: 0,
        };
        const res = await ExchangeApiStore.dispatch("addExchange", payload);
        if (res.success) {
          this.$swal(
            "Withdraw success!",
            `Waiting admin approve ${moment(res.data.date).format(
              "YYYY-MM-DD h:mm:ss"
            )}`,
            "success"
          );
          this.$router.push("/exchange");
        } else {
          this.$swal("Withdraw Failed", res.message, "error");
        }
      }
    },
  },
};
</script>

<style>
</style>