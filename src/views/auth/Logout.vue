<template></template>

<script>
import AuthStore from "../../store/AuthStore";
export default {
  async mounted() {
    await AuthStore.dispatch("logout");
    this.$router.push("/");
  },
};
</script>

<style>
</style>