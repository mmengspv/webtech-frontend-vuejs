<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label>Username</label>
        <input
          v-model="form.username"
          type="text"
          autocomplete="off"
          placeholder="username"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          v-model="form.email"
          type="email"
          autocomplete="off"
          placeholder="email"
        />
      </div>
      <div>
        <label>Password</label>
        <input v-model="form.password" type="password" />
      </div>
      <div>
        <label>confirmPassword</label>
        <input v-model="form.confirmPassword" type="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import AuthStore from "../../store/AuthStore";
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  mounted() {
    if (this.isLoggedIn()) {
      this.$swal("Register", "Please logout before register", "warning");
      this.$router.push("/");
    }
  },
  methods: {
    async register() {
      if (this.form.password === this.form.confirmPassword) {
        const res = await AuthStore.dispatch("register", this.form);
        if (res.success) {
          this.$swal(
            "Register Success",
            `Welcome, ${res.user.username} `,
            "success"
          );
          this.$router.push("/");
        } else {
          this.$swal("Register Failed", res.message, "error");
        }
      } else {
        this.$swal("Register Failed", "Please check your password", "error");
      }
    },
    isLoggedIn() {
      return AuthStore.getters.isLoggedIn;
    },
  },
};
</script>

<style>
</style>