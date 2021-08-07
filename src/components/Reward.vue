<template>
  <div class="reward">
    <navbar></navbar>
    <h3>Reward</h3>
    <button @click="addReward">Add reward</button>
    <table class="reward-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Reward ID</th>
          <th>Name</th>
          <th>Exchange Point</th>
          <th>Details</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reward, index) in rewards" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ reward.id }}</td>
          <td>{{ reward.reward_name }}</td>
          <td>{{ reward.exchange_point }}</td>
          <td>{{ reward.detail }}</td>
          <td v-if="reward.image.length !== 0">
            <img
              :src="api_endpoint + reward.image[0].url"
              height="100"
              width="100"
            />
          </td>
          <td v-if="reward.image.length === 0"></td>
          <td>
            <button
              @click="onEdit(reward.id)"
              type="button"
              class="btn btn-success"
            >
              EDIT
            </button>
            <button
              @click.prevent="onDelete(reward.id)"
              class="btn btn-danger ml-button"
            >
              DELTET
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RewardApiStore from "@/store/RewardApi";
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
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
    addReward() {
      this.$router.push("/reward/add");
    },
    onEdit(id) {
      this.$router.push(`/reward/${id}/edit`);
    },
    async onDelete(id) {
      this.$swal({
        title: "Are you sure",
        text: `Do you want to delete reward: ${id}?`,
        icon: "warning",
        buttons: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          swal("Delete success ", {
            icon: "success",
          });
          await RewardApiStore.dispatch("deleteReward", id);
          this.$router.go();
        }
      });
    },
  },
};
</script>

<style>
.ml-button {
  margin: 10px;
}
.reward h3 {
  margin-top: 50px;
}
.reward-table {
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  width: 70%;
  margin-top: 50px;
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
}
</style>