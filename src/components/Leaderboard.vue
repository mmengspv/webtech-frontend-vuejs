<template>
    <div>
      <h1>Leaderboard</h1>
    <div>
    <div>
      <button @click="sortByUsed">Sort by points used</button>
      <button @click="sortByEarn">Sort by points earned</button>
    </div>
    <div>
      <label for="start">date</label>
      <input type="date" v-model="date.start"> -
      <input type="date" v-model="date.end">
    </div>
    </div>
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th></th>
            <th>Username</th>
            <th>Email</th>
            <th>Points Earned</th>
            <th>Points Used</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ transaction(user, "earn") }}</td>
            <td>{{ transaction(user, "use") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import UserApi from '@/store/UserApi'
export default {
    data(){
        return{
            users:[],
            date:{
              start:'',
              end:''
            }
        }
    },
    created(){
        this.fetchUser()
    },
    methods:{
        async fetchUser(){
            await UserApi.dispatch('fetchUser')
            this.users = UserApi.getters.users
            // console.log(this.users);
        },
        transaction(user ,type){
          // console.log("run");
          let start
          if(this.date.start == ''){
            start = 0
          }else{
            start = Date.parse(this.date.start)
          }
          let sum =0
          const tmp = user.exchanges.map(u => {
            if(u.type === type && Date.parse(u.date)>= start  && (this.date.end == '' || ( this.date.end != '' &&  Date.parse(this.date.end)>= Date.parse(u.date) ))){
              console.log(Date.parse(u.date));
              console.log(start);
              return u.point;
            }
            return 0
          });
          sum = tmp.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          return sum
        },
        sortByUsed(){
          console.log(this.date.start);
          this.users.sort((a, b) => this.transaction(b,"use") - this.transaction(a,"use"))
        },
        sortByEarn(){
          this.users.sort((a, b) => this.transaction(b,"earn") - this.transaction(a,"earn"))
        }
    }
}
</script>

<style scoped>
  .leaderboard-table{
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    width: 70%;
    margin-top: 50px;
  }
  thead th,tbody td{
    border: 1px solid #ddd;
    padding: 2px;
  }
  tbody tr:nth-child(even){
    background-color: #f2f2f2;
  }
  tbody tr:hover {
    background-color: #ddd;
  }
  thead th{
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #28242c;
    color: white;
  }
</style>