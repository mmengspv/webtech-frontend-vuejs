<template>
  <div>
        <form @submit.prevent="addExchange">
            <div>
                <label for="date">Date</label>
                <input 
                type="date" 
                v-model="form.date"
                name="date"
                autocomplete="off"/>
            </div>

            <div>
                <label for="amount">Amount</label>
                <input 
                type="number" 
                v-model="form.amount"
                name="amount"
                autocomplete="off"/>
            </div>

            <button>Confirm</button>
        </form>
  </div>
</template>

<script>
import ExchangeApiStore from '@/store/ExchangeApi'
export default {
    data(){
        return{
            form:{
                date:"",
                amount:"",
                balance:"",
                point:"",
            }   
        }
    },
    methods:{
        clearForm(){
            this.form = {
                date:"",
                amount:"",
                balance:"",
                point:"",
            }
        },
        async addExchange() {

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
        let res = await ExchangeApiStore.dispatch("addExchange", formData);
        if (res.success) {
            this.$swal("Success!", res.data.amount, "success");
            this.$router.push("/exchange");
        } else {
            this.$swal("Add Failed", res.message, "error");
        }
        }
    },
}
</script>

<style>
</style>