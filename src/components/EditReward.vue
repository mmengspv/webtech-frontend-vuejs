<template>
  <div>
    <form @submit.prevent="editReward">
      <h1>Edit reward id {{ this.id }}</h1>
      <div>
        <label for="reward_name">Reward Name</label>
        <input type="text" v-model="form.reward_name" autocomplete="off" />
      </div>
      <div>
        <label for="exchange_point">Exchange Point</label>
        <input type="number" v-model="form.exchange_point" autocomplete="off" />
      </div>
      <div>
        <label for="detail">Detail</label>
        <input type="text" v-model="form.detail" autocomplete="off" />
      </div>
      <div>
        <label for="amount">Amount</label>
        <input
          type="number"
          min="0"
          v-model="form.amount"
          ฟautocomplete="off"
        />
      </div>
      <div v-if="this.form.image !== undefined">
        <img
          :src="api_endpoint + this.form.image.url"
          height="100"
          width="100"
        />
      </div>
      <div>
        <label for="img">Select image:</label>
        <input type="file" @change="onFileChange" />
      </div>
      <div>
        <button>Edit reward</button>
      </div>
    </form>
  </div>
</template>

<script>
import RewardApiStore from "@/store/RewardApi";
import RewardService from "@/services/RewardService";
export default {
  data() {
    return {
      api_endpoint: process.env.VUE_APP_STRAPI_API || "http://localhost:1337",
      id: "",
      newImage: null,
      newImageId: null,
      form: {
        reward_name: "",
        exchange_point: "",
        detail: "",
        amount: 0,
        image: [],
      },
    };
  },
  created() {
    this.fetchRewardData();
  },
  methods: {
    onFileChange(e) {
      this.newImage = e.target.files[0];
    },
    async fetchRewardData() {
      this.id = this.$route.params.id;
      const reward = await RewardService.getRewardById(this.id);
      this.form.reward_name = reward.reward_name;
      this.form.exchange_point = reward.exchange_point;
      this.form.detail = reward.detail;
      this.form.amount = reward.amount;
      this.form.image = reward.image[0];
    },
    async editReward() {
      if (this.newImage) {
        console.log("do upload image");
        await this.uploadImage();
      }
      const payload = {
        id: this.id,
        reward_name: this.form.reward_name,
        exchange_point: this.form.exchange_point,
        detail: this.form.detail,
        amount: this.form.amount,
        image_id: this.newImageId ? this.newImageId : this.form.image.id,
      };
      const res = await RewardApiStore.dispatch("editReward", payload);

      if (res.success) {
        this.$swal(
          "Edit Success",
          `${res.data.id}: ${res.data.reward_name}`,
          "success"
        );
        this.$router.push("/reward");
      } else {
        this.$swal("Edit Failed", res.message, "error");
      }
    },
    async uploadImage() {
      const data = new FormData();
      data.append("files", this.newImage);
      const res = await RewardService.uploadImage(data);
      this.newImageId = res.data[0].id;
    },
  },
};
</script>

<style>
</style>