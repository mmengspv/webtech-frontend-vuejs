<template>
  <div>
    <h3>Trade</h3>
      <span>
        <tbody>
          <tr v-for="(reward, index) in rewards" :key="index">
            <div class="card" style="width: 10rem;">
              <img class="card-img-top" :src="api_endpoint + 
              reward.image[0].url" 
              >
                <div class="card-body">
                  <h5 class="card-title">{{ reward.reward_name }}</h5>
                  <p class="card-text">{{ reward.detail}}</p>
                  <button>Use Point</button>
                </div>
            </div>
          </tr>
        </tbody>
      </span>
  </div>
</template>

<script>

import RewardApiStore from "@/store/RewardApi";
export default {
components: {
    
    },
    data() {
    return {
      rewards: [],
      api_endpoint: process.env.VUE_APP_STRAPI_API,
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
  },
}
</script>

<style>
</style>