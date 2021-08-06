<template>
  <div>
        <div>
            <div>
                <label for="order">Order</label>
                <input type="number" v-model="form.order">
            </div>
            <div>
                <label for="date">Date</label>
                <input type="date" v-model="form.date">
            </div>

            <div>
                <label for="amount">Amount</label>
                <input type="number" v-model="form.amount">
            </div>

            <button @click="addExchange">Confirm</button>
        </div>
  </div>
</template>

<script>

import ExchangeApiStore from '@/store/ExchangeApi'
export default {

    data(){
        return{

            form:{
                order:"",
                date:"",
                amount:"",
                balance:""
            }
            
        }
    },
    methods:{
        clearForm(){
            this.form = {
                order:"",
                date:"",
                amount:"",
                balance:""
            }

        },
        async addExchange(){
            let payload = {
                order:this.form.order,
                date:this.form.date,
                amount:this.form.amount
            }
            let res = await ExchangeApiStore.dispatch("addExchange", payload)
            if(res.success){
               this.clearForm()
               this.$router.push("/exchange") 
            }else{
                this.$swal("Add Failed", res.message,"error")
            }
        }
    },
    
}
</script>

<style>

</style>