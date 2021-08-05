<template>
  <div class="hello">
    <h1>Welcome</h1>
    <div>
        <label >Username</label>
        <input type="text" v-model="form.username">
    </div>
    <div>
        <label >Password</label>
        <input type="password" v-model="form.password">
    </div>
    <div>
        <button @click="next">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  
  data(){
        return{
            users: [],
            form:{
                username:"",
                password:"",
            }
        }
  },
  methods:{
    next(){
        this.$router.push("/homepage")
      }
    }

  }
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
