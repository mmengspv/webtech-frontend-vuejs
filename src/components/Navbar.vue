<template>
  <div class="pb-1">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active mr-2">
            <button type="button" @click="home()" class="btn btn-dark">
              Home
            </button>
          </li>
          <li v-if="isAdmin()" class="nav-item active">
            <button type="button" @click="reward()" class="btn btn-dark">
              Reward
            </button>
          </li>
          <li v-if="isUser()" class="nav-item active">
            <button type="button" @click="exchange()" class="btn btn-dark">
              Deposit&withdraw
            </button>
          </li>
          <li v-if="isAdmin()" class="nav-item active">
            <button type="button" @click="approve()" class="btn btn-dark">
              Approve
            </button>
          </li>
          <li v-if="isLoggedIn()" class="nav-item active">
            <button type="button" @click="tradepoint()" class="btn btn-dark">
              Trade point
            </button>
          </li>
          <li v-if="isUser()" class="nav-item active">
            <button type="button" @click="history()" class="btn btn-dark">
              History
            </button>
          </li>
          <li v-if="isLoggedIn()" class="nav-item active">
            <button type="button" @click="leaderboard()" class="btn btn-dark">
              Leaderboard
            </button>
          </li>
          <li v-if="isAdmin()" class="nav-item active">
            <button type="button" @click="randomPoint()" class="btn btn-dark">
              Randompoint
            </button>
          </li>
        </ul>
      </div>
      <b-navbar-nav v-if="isLoggedIn()" class="nav-item">
        <b-icon icon="person-fill" class="person-icon middle"></b-icon>
        <b-navbar-brand class="username"></b-navbar-brand>
        <label class="text-white">{{ user.username }}</label>
        <label class="label text-white">Balance:</label>
        <label class="text-white">{{ user.balance ? user.balance : 0 }}</label>
        <label class="label text-white">Point:</label>
        <label class="text-white">{{ user.point ? user.point : 0 }}</label>
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
import UserService from "../services/UserService";
import AuthStore from "../store/AuthStore";
export default {
  data() {
    return {
      user: [],
    };
  },
  created() {
    this.isLoggedIn();
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user = AuthStore.getters.user;
    },
    isAdmin() {
      if (this.isLoggedIn()) {
        if (this.user.role.type === "admin") {
          return true;
        }
      }
      return false;
    },
    isUser() {
      if (this.isLoggedIn()) {
        if (this.user.role.type === "authenticated") {
          return true;
        }
      }
      return false;
    },
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
    tradepoint() {
      if (window.location.pathname === "/used/trade") this.$router.go();
      else this.$router.push("/used/trade");
    },
    history() {
      if (window.location.pathname === "/used") this.$router.go();
      else this.$router.push("/used");
    },
    leaderboard() {
      if (window.location.pathname === "/leaderboard") this.$router.go();
      else this.$router.push("/leaderboard");
    },
    randomPoint() {
      if (window.location.pathname === "/randompoint") this.$router.go();
      else this.$router.push("/randompoint");
    },
    approve() {
      if (window.location.pathname === "/approve") this.$router.go();
      else this.$router.push("/approve");
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
.label {
  margin-left: 10px;
}
.pb-1 {
  margin-bottom: 40px;
}

.mr-2 {
  margin-right: 120px;
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