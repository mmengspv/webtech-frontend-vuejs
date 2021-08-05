<template>
  <div>
    
      <div>
          <label for="reward_id">Reward ID</label>
          <input type="text" v-model="form.reward_id">
      </div>
      <div>
          <label for="reward_name">Reward Name</label>
          <input type="text" v-model="form.reward_name">
      </div>
      <div>
          <label for="exchange_point">Exchange Point</label>
          <input type="text" v-model="form.exchange_point">
      </div>
      <div>
          <button @click="addReward">Add</button>
      </div>
  </div>
</template>

<script>
import RewardApiStore from '@/store/RewardApi'
export default {
    data(){
        return{
            form:{
                reward_id:"",
                reward_name:"",
                exchange_point:""
            }
        }
    },
    
    methods:{
        clearForm(){
            this.form={
                reward_id:"",
                reward_name:"",
                exchange_point:""
            }
        },
        async addReward(){
            let payload = {
                reward_id:this.form.reward_id,
                reward_name:this.form.reward_name,
                exchange_point:this.form.exchange_point
            }
            let res = await RewardApiStore.dispatch("addReward", payload)
            if(res.success){
               this.clearForm()
               this.$router.push("/reward/view") 
            }else{
                this.$swal("Add Failed", res.message,"error")
            }
        }
    }
}
</script>

<style>

</style>