<template>
  <div>
    <form @submit.prevent="addReward">
      <div>
        <label for="reward_name">Reward Name</label>
        <input type="text" v-model="form.reward_name" name="reward_name" />
      </div>
      <div>
        <label for="exchange_point">Exchange Point</label>
        <input
          type="number"
          v-model="form.exchange_point"
          name="exchange_point"
        />
      </div>
      <div>
        <label for="img">Select image:</label>
        <input type="file" name="image" />
      </div>
      <div>
        <input type="submit" name="Submit" />
      </div>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
import AuthService from "../services/AuthService";
import RewardApiStore from "@/store/RewardApi";
export default {
  data() {
    return {
      form: {
        reward_name: "",
        exchange_point: "",
        image: "",
      },
    };
  },

  methods: {
    // onFileChange(e) {
    //   this.form.image = e.target.files[0];
    // },
    clearForm() {
      this.form = {
        reward_name: "",
        exchange_point: "",
        image: "",
      };
    },
    async addReward() {
      const request = new XMLHttpRequest();

      const formElement = document.querySelector("form");

      formElement.addEventListener("submit", async (e) => {
        e.preventDefault();

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

                formData.append(
                  `files.${currentElement.name}`,
                  file,
                  file.name
                );
              }
            }
          }
        }

        formData.append("data", JSON.stringify(data));
        // const headers = AuthService.getHeaders();
        // await Axios.post(
        //   "http://localhost:1337/rewards",
        //   formData,
        //   headers
        // ).then((res) => console.log(res));
        let res = await RewardApiStore.dispatch("addReward", formData);
        if (res.success) {
          this.$router.push("/reward/view");
          //   this.clearForm();
        } else {
          this.$swal("Add Failed", res.message, "error");
        }
      });
    },
  },
};
</script>

<style>
</style>