<template>
  <div class="pb-1">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <button type="button" @click="home()" class="btn btn-dark">
              Home
            </button>
          </li>
          <li v-if="isLoggedIn()" class="nav-item active ml-2">
            <button type="button" @click="reward()" class="btn btn-dark">
              Reward
            </button>
          </li>
          <li v-if="isLoggedIn()" class="nav-item active">
            <button type="button" @click="exchange()" class="btn btn-dark">
              Deposit&withdraw
            </button>
          </li>
          <li v-if="isLoggedIn()" class="nav-item active">
            <button type="button" @click="leaderboard()" class="btn btn-dark">
              Leaderboard
            </button>
          </li>
          <li v-if="isLoggedIn()" class="nav-item active">
            <button type="button" @click="randomPoint()" class="btn btn-dark">
              Randompoint
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
        <b-button
          class="mr-1"
          v-if="!isLoggedIn()"
          @click="login()"
          variant="dark"
        >
          <b-icon icon="power" aria-hidden="true"></b-icon>
          Login
        </b-button>
        <b-button
          class="mr-1"
          v-if="isLoggedIn()"
          @click="logout()"
          variant="dark"
        >
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
    reward() {
      if (window.location.pathname === "/reward") this.$router.go();
      else this.$router.push("/reward");
    },
    exchange() {
      if (window.location.pathname === "/exchange") this.$router.go();
      else this.$router.push("/exchange");
    },
    leaderboard() {
      if (window.location.pathname === "/leaderboard") this.$router.go();
      else this.$router.push("/leaderboard");
    },
    randomPoint() {
      if (window.location.pathname === "/randompoint") this.$router.go();
      else this.$router.push("/randompoint");
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
          if (window.location.pathname === "/") this.$router.go();
          else this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style >
.pb-1 {
  margin-bottom: 40px;
}

.ml-2 {
  margin-left: 120px;
}
.ml-auto {
  margin-left: auto;
}
.mr-1 {
  margin-right: 20px;
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