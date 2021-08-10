<template>
  <div>
    <navbar></navbar>
    <div class="pt-1">
      <h1>WELCOME!</h1>
      <div class="history">
        <h3>history</h3>
        <table class="history-table">
          <thead>
            <tr>
              <th></th>
              <th>date</th>
              <th>Point</th>
              <th>Reward</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>ไม่ระบุ</td>
              <td>ไม่ระบุ</td>
              <td>ไม่ระบุ</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000"
          controls
          indicators
        >
          <b-carousel-slide v-for="(img, index) in imgurl" :key="index">
            <template #img>
              <img
                :src="api_endpoint + img"
                class="card-img-top"
                height="200px"
              />
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <div class="point">
        <h3>Point:</h3>
        <h3 v-if="islogin()">{{ userpoint }}</h3>
        <h3 v-if="!islogin()">Please login or register</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import RewardApiStore from "@/store/RewardApi";
import AuthStore from "@/store/AuthStore";
import UserApi from "@/store/UserApi";
export default {
  components: { Navbar },
  data() {
    return {
      currentUser: this.$route.params.index,
      api_endpoint: process.env.VUE_APP_STRAPI_API,
      imgurl: [],
      userpoint: "",
      users: [],
    };
  },
  props: {
    index: Number,
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      if (this.islogin()) {
        this.userpoint = AuthStore.getters.user.point;
      }
      await UserApi.dispatch("fetchUser");
      this.users = UserApi.getters.users;
      await RewardApiStore.dispatch("fetchReward");
      const rewards = RewardApiStore.getters.rewards;
      for (let i = 0; i < rewards.length && i < 4; i++) {
        this.imgurl.push(rewards[i].image[0].url);
      }
    },
    islogin() {
      return AuthStore.getters.isLoggedIn;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pt-1 {
  padding-top: 40px;
}
.slide {
  margin-top: 250px;
  margin-right: 50px;
  width: 500px;
  height: 235px;
  float: right;
}
.history {
  position: relative;
  margin-left: 50px;
  top: 100px;
  width: 600px;
}
.history-table {
  border-collapse: collapse;
  width: 100%;
}
thead th,
tbody td {
  border: 1px solid #ddd;
  padding: 2px;
}
tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
tbody tr:hover {
  background-color: #ddd;
}
thead th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #28242c;
  color: white;
}
.point {
  left: 800px;
  position: relative;
  h3 {
    padding: 5px;
    display: inline;
  }
}
</style>