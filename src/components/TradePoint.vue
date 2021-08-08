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
            <h6 class="card-subtitle">{{reward.exchange_point}} Point</h6>
            <p class="card-text">{{ reward.detail }}</p>
            <button>Use Point</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import RewardApiStore from "@/store/RewardApi";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      rewards: [],
      api_endpoint: process.env.VUE_APP_STRAPI_API,
      users:[],
    };
  },
  created() {
    this.fetchReward();
  },
  methods: {
    async fetchReward() {
      await RewardApiStore.dispatch("fetchReward");
      this.rewards = RewardApiStore.getters.rewards;
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
    }
  },
};
</script>

<style>
.ml-1 {
  margin-top: 15px;
}
</style>