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
          <button @click="editReward">OK</button>
        </div>
    </div>
</template>

<script>
import RewardApiStore from '@/store/RewardApi'
import RewardService from '@/services/RewardService'
export default {
    data() {
        return {
            id:'',
            form:{
                reward_id:'',
                reward_name:'',
                exchange_point:''
            }
        }
    },
    async created() {
        this.id = this.$route.params.id
        let reward = await RewardService.getRewardById(this.id)
        this.form.reward_id = reward.reward_id
        this.form.reward_name = reward.reward_name
        this.form.exchange_point = reward.exchange_point
    },
    methods:{
        async editReward(){
            let payload = {
                index:this.id,
                reward_id:this.form.reward_id,
                reward_name:this.form.reward_name,
                exchange_point:this.form.exchange_point
            }
            let res = await RewardApiStore.dispatch("editReward", payload)
            if(res.success){
               this.$router.push("/reward") 
            }else{
                this.$swal("Add Failed", res.message,"error")
            }
        }
    }
}
</script>

<style>

</style>