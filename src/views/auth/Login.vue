<template>
  <div class="home">
    <form @submit.prevent="login">
      <div class="hello">
        <h1>Welcome</h1>
        <div>
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="email"
            autocomplete="off"
          />
        </div>
        <div>
          <label>Password</label>
          <input v-model="form.password" type="password" />
        </div>
        <div>
          <button>Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AuthStore from "../../store/AuthStore";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    if (this.isLoggedIn()) {
      this.$swal("Login", "you already login", "warning");
      this.$router.push("/");
    }
  },
  methods: {
    async login() {
      const res = await AuthStore.dispatch("login", this.form);
      if (res.success) {
        this.$swal(
          "Login Success",
          `Welcome, ${res.user.username} `,
          "success" 
        );
        this.$router.push("/");
      } else {
        this.$swal("Login Failed", res.message, "error");
      }
    },
    isLoggedIn() {
      return AuthStore.getters.isLoggedIn;
    },
  },
};
</script>
