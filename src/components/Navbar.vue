<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-nav class="nav-item">
        <b-icon icon="person-fill" class="person-icon middle"></b-icon>
        <b-navbar-brand class="username"></b-navbar-brand>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button v-if="!isLoggedIn()" @click="register()" variant="dark">
          <b-icon icon="power" aria-hidden="true"></b-icon>
          Register
        </b-button>
        <b-button v-if="!isLoggedIn()" @click="login()" variant="dark">
          <b-icon icon="power" aria-hidden="true"></b-icon>
          Login
        </b-button>
        <b-button v-if="isLoggedIn()" @click="logout()" variant="dark">
          <b-icon icon="power" aria-hidden="true"></b-icon>
          Logout
        </b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import AuthStore from "../store/AuthStore";
export default {
  created() {
    this.isLoggedIn();
  },
  methods: {
    isLoggedIn() {
      return AuthStore.getters.isLoggedIn;
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    async logout() {
      this.$swal({
        title: "Are you sure",
        text: "you want to logout?",
        icon: "warning",
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Logout ", {
            icon: "success",
          });
          AuthStore.dispatch("logout");
        }
      });
    },
  },
};
</script>

<style>
.ml-auto {
  margin-left: auto;
}
.item {
  width: 100px;
}
.person-icon {
  height: 25px;
  width: 100%;
  margin-left: 10px;
}
.middle {
  margin-top: auto;
  margin-bottom: auto;
}
.username {
  padding-left: 10px;
  position: relative;
  top: 1px;
}
</style>