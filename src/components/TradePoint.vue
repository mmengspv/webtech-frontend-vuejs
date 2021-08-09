<template>
  <div>
    <navbar></navbar>
    <h3>Trading Point</h3>
    <div class="card-group">
      <div class="col-sm-4" v-for="(reward, index) in rewards" :key="index">
        <div class="card mx-auto mt-3" style="width: 35%">
          <img
            class="card-img-top"
            :src="api_endpoint + reward.image[0].url"
            height="200px"
          />
          <div class="card-body">
            <h5 class="card-title">{{ reward.reward_name }}</h5>
            <h6 class="card-subtitle">{{ reward.exchange_point }} Point</h6>
            <p class="card-text">{{ reward.detail }}</p>
            <button @click="editPoint(reward)">Use Point</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import RewardApiStore from "@/store/RewardApi";
import AuthStore from "@/store/AuthStore";
import UserApi from "@/store/UserApi";
import UserService from "@/services/UserService";
import PointApi from "@/store/PointApi";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      rewards: [],
      users: [],
      api_endpoint: process.env.VUE_APP_STRAPI_API,
      user_id: "",
    };
  },
  created() {
    this.fetchData();
    this.thisUser();
  },
  methods: {
    async fetchData() {
      await RewardApiStore.dispatch("fetchReward");
      this.rewards = RewardApiStore.getters.rewards;
      await UserApi.dispatch("fetchUser");
      this.users = UserApi.getters.users;
    },
    async editPoint(reward) {
      if (reward.amount > 0) {
        const user = await UserService.getUserById(this.user_id);
        if (reward.exchange_point < user.point) {
          let payload_user = {
            index: this.user_id,
            point: user.point - reward.exchange_point,
          };
          await UserApi.dispatch("updatePoint", payload_user);
          const today = new Date();
          let payload_point = {
            type: "use",
            point: reward.exchange_point,
            date: today,
            user: this.user_id,
          };
          // console.log(this.point);
          await PointApi.dispatch("addPoint", payload_point);
          let payload_reward = {
            id: reward.id,
            reward_name: reward.reward_name,
            exchange_point: reward.exchange_point,
            detail: reward.detail,
            amount: reward.amount - 1,
            image: reward.image_id,
          };
          await RewardApiStore.dispatch("editReward", payload_reward);
          this.$swal(
            "Successful redemption",
            `You have successfully redeemed ${reward.reward_name}`,
            "success"
          );
        } else {
          this.$swal(
            "Rewards cannot be redeemed now",
            "Your points are not enough",
            "warning"
          );
        }
      } else {
        this.$swal(
          "Rewards cannot be redeemed now",
          "Rewards out of stock",
          "warning"
        );
      }
    },
    async thisUser() {
      this.user_id = AuthStore.getters.user.id;
    },
  },
};
</script>

<style>
.ml-1 {
  margin-top: 15px;
}
</style>