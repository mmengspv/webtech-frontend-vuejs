<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="collapse navbar-collapse ml-1" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <button type="button" @click="home()" class="btn btn-dark">
              Home
            </button>
          </li>
        </ul>
      </div>
      <b-navbar-nav v-if="isLoggedIn()" class="nav-item">
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
    home() {
      if (window.location.pathname === "/") this.$router.go();
      else this.$router.push("/");
    },
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
.ml-1 {
  margin-left: 50px;
}
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