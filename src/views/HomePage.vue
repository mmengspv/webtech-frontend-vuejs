<template>
  <div class="about">
    <router-link to="reward">Reward</router-link> |
    <router-link to="point">Point services</router-link>
    <home></home>
  </div>
</template>

<script>
import Home from '@/components/Home.vue'
export default {
    components: {
    Home
  }
}
</script>