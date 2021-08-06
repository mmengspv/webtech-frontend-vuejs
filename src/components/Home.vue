<template>
  <div>
    <navbar></navbar>
    <router-link to="reward">Reward</router-link> |
    <router-link to="exchange">Deposit withdraw</router-link>
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
        <b-carousel-slide img-src="@/assets/logo.png"></b-carousel-slide>
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
import Navbar from "./Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      currentUser: this.$route.params.index,
    };
  },
  props: {
    index: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.slide {
  margin-top: 250px;
  margin-right: 50px;
  width: 500px;
  height: 235px;
  float: right;
}
.history {
  position: relative;
  margin-left: 50px;
  top: 100px;
  width: 600px;
}

.history-table {
  border-collapse: collapse;
  width: 100%;
}
thead th,
tbody td {
  border: 1px solid #ddd;
  padding: 2px;
}
tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
tbody tr:hover {
  background-color: #ddd;
}
thead th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #28242c;
  color: white;
}
.point {
  left: 800px;
  position: relative;
  h3 {
    padding: 5px;
    display: inline;
  }
}
</style>