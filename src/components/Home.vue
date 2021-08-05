<template>
  <div>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">

      <b-navbar-nav class="nav-item">
        <b-icon icon="person-fill" class="person-icon middle" ></b-icon>
        <b-navbar-brand class="username"></b-navbar-brand>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        
        
        
      <b-button variant="dark" >
        <b-icon icon="power" aria-hidden="true"></b-icon> Logout
      </b-button>

      </b-navbar-nav>
  
    </b-navbar>
    
  </div>
  <h1>WELCOME!</h1>
  <div class="history">
    <h3>history</h3>
    <table class="history-table">
      <thead>
        <tr>
          <th></th>
          <th>date</th>
          <th>Point</th>
          <th>Reward</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>ไม่ระบุ</td>
          <td>ไม่ระบุ</td>
          <td>ไม่ระบุ</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      controls
      indicators
    >
      <b-carousel-slide img-src="@/assets/logo.png"
        
      ></b-carousel-slide>
      <b-carousel-slide
        caption="Second Slide"
        img-src="https://picsum.photos/1024/480/?image=12"
      ></b-carousel-slide>
      <b-carousel-slide
        caption="Third Slide"
        img-src="https://picsum.photos/1024/480/?image=22"
      ></b-carousel-slide>
    </b-carousel>

  </div>
  <div class="point">
    <h3>1</h3>
    <h3>Point</h3>
  </div>
</div>

</template>

<script>

export default {
  data() {
      return {
        currentUser: this.$route.params.index
      }
    },
    props: {
      
      index:Number
    },
    
    methods: {
     

    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .ml-auto{
    margin-left: auto;
  }
  .item{
    width:100px;
  }
  .slide{
    margin-top: 250px;
    margin-right:50px;
    width:500px;
    height:235px;
    float: right;
  }
  .person-icon{
    height:25px;
    width:100%;
    margin-left: 10px;
  }
  .middle{
    margin-top: auto;
    margin-bottom: auto;
  }
  .username{
    padding-left: 10px;
    position:relative;
    top:1px
  }
  .history{
    position:relative;
    margin-left: 50px;
    top:100px;
    width:600px;
  }
  
  .history-table{
    
    border-collapse: collapse;
    width: 100%;
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
  .point{
    left: 800px;
    position: relative;
    h3{
      padding:5px;
      display:inline;
    }
  }
</style>