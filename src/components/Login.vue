<template>
  <div class="hello">
    <h1>Welcome</h1>
    <div>
        <label >Username</label>
        <input type="text">
    </div>
    <div>
        <label >Password</label>
        <input type="password">
    </div>
    <div>
        <button @click="next">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    next(){
      this.$router.push('/homePage')
    }

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
