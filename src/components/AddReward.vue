<template>
  <div>
    <navbar></navbar>
    <h1>Add Reward</h1>
    <form @submit.prevent="addReward">
      <div>
        <label for="reward_name">Reward Name</label>
        <input
          type="text"
          v-model="form.reward_name"
          name="reward_name"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="exchange_point">Exchange Point</label>
        <input
          type="number"
          v-model="form.exchange_point"
          name="exchange_point"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="detail">Detail</label>
        <input
          type="text"
          v-model="form.detail"
          name="detail"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="amount">Amount</label>
        <input
          type="number"
          v-model="form.amount"
          name="amount"
          min="0"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="img">Select image:</label>
        <input type="file" name="image" />
      </div>
      <div>
        <button>Add reward</button>
      </div>
    </form>
  </div>
</template>

<script>
import AuthStore from "@/store/AuthStore"
import RewardApiStore from "@/store/RewardApi";
import Navbar from "./Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      form: {
        reward_name: "",
        exchange_point: "",
        detail: "",
        amount: 0,
        image: "",
      },
    };
  },
  mounted() {
    if (!this.isLoggedIn()){
      this.$swal("Resticted Area", "You don't have permission","warning")
      this.$router.push("/")
    }
  },
  methods: {
    clearForm() {
      this.form = {
        reward_name: "",
        exchange_point: "",
        detail: "",
        amount: 0,
        image: "",
      };
    },
    isLoggedIn(){
      return AuthStore.getters.isLoggedIn
    },
    async addReward() {
      const formElement = document.querySelector("form");

      const formData = new FormData();

      const formElements = formElement.elements;

      const data = {};

      for (let i = 0; i < formElements.length; i++) {
        const currentElement = formElements[i];
        if (!["submit", "file"].includes(currentElement.type)) {
          data[currentElement.name] = currentElement.value;
        } else if (currentElement.type === "file") {
          if (currentElement.files.length === 1) {
            const file = currentElement.files[0];
            formData.append(`files.${currentElement.name}`, file, file.name);
          } else {
            for (let i = 0; i < currentElement.files.length; i++) {
              const file = currentElement.files[i];

              formData.append(`files.${currentElement.name}`, file, file.name);
            }
          }
        }
      }

      formData.append("data", JSON.stringify(data));
      let res = await RewardApiStore.dispatch("addReward", formData);
      if (res.success) {
        this.$swal("Success add reward", res.data.reward_name, "success");
        this.$router.push("/reward");
      } else {
        this.$swal("Add Failed", res.message, "error");
      }
    },
  },
};
</script>

<style>
</style>