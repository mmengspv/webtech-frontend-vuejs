<template>
  <div>
    <navbar></navbar>
    <h1>Find a lucky user</h1>
    <div class="prize">
      <div class="first">
        <h3>first prize</h3>
        <h3>{{ lucky_user1 }}</h3>
      </div>
      <div class="second">
        <h3>second prize</h3>
        <h3>{{ lucky_user2 }}</h3>
      </div>
      <div class="third">
        <h3>third prize</h3>
        <h3>{{ lucky_user3 }}</h3>
      </div>
      <img src="@/assets/pic1.png" />
      <div class="consolation">
        <h3>consolation prize</h3>
        <h3>{{ lucky_user4 }}</h3>
        <h3>{{ lucky_user5 }}</h3>
      </div>
      <div class="random-btn">
        <h3>{{ prize }}</h3>
        <button @click="random">{{ btn }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "@/store/UserApi";
import PointApi from "@/store/PointApi";
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      users: [],
      lucky_user1: "",
      lucky_user2: "",
      lucky_user3: "",
      lucky_user4: "",
      lucky_user5: "",
      id: "",
      count: 0,
      point: 0,
      pointEarn: 0,
      prize: "random consolation prize",
      btn: "Random",
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      await UserApi.dispatch("fetchUser");
      this.users = UserApi.getters.users;
    },
    random() {
      if (this.count >= 5) {
        this.$swal({
          title: "Score Summary",
          text: `${this.lucky_user1} win first prize
                ${this.lucky_user2} win second prize
                ${this.lucky_user3} win third prize
                ${this.lucky_user4} & ${this.lucky_user5} win consolation prize`,
        });
      } else {
        let lucky = this.users[Math.floor(Math.random() * this.users.length)];
        this.id = lucky.id;
        if (this.count == 0) {
          this.lucky_user5 = lucky.username;
          this.pointEarn = lucky.balance * 0.1;
        } else if (this.count == 1) {
          this.lucky_user4 = lucky.username;
          this.pointEarn = lucky.balance * 0.1;
          this.prize = "random third prize";
        } else if (this.count == 2) {
          this.pointEarn = lucky.balance * 0.25;
          this.lucky_user3 = lucky.username;
          this.prize = "random second prize";
        } else if (this.count == 3) {
          this.pointEarn = lucky.balance * 0.3;
          this.lucky_user2 = lucky.username;
          this.prize = "random first prize";
        } else if (this.count == 4) {
          this.pointEarn = lucky.balance * 0.5;
          this.lucky_user1 = lucky.username;
          this.prize = "view summary";
          this.btn = "view";
        }
        this.point = lucky.point + this.pointEarn;
        this.editPoint();
        this.addPoint();
      }
      this.count += 1;
    },
    async editPoint() {
      let payload = {
        index: this.id,
        point: this.point,
      };
      let res = await UserApi.dispatch("editPoint", payload);
      if (res.success) {
      } else {
        this.$swal("Add Failed", res.message, "error");
      }
    },
    async addPoint() {
      let payload = {
        type: "earn",
        point: this.pointEarn,
        user: this.id,
      };
      // console.log(this.point);
      let res = await PointApi.dispatch("addPoint", payload);
    },
  },
};
</script>

<style scoped>
.first {
  position: absolute;
  top: 200px;
  left: 46%;
}
.second {
  position: absolute;
  top: 270px;
  left: 30%;
}
.third {
  position: absolute;
  top: 270px;
  left: 61%;
}
.prize {
  margin-top: 150px;
}
.consolation {
  margin-top: 50px;
  border-style: solid;
  display: block;
  width: 300px;
  height: 150px;
  margin-right: auto;
  margin-left: auto;
  padding: 20px;
}
.random-btn {
  margin-top: 50px;
}
</style>