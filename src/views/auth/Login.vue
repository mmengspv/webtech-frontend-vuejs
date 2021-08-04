<template>
  <div class="home">
    <div class="hello">
      <h1>Welcome</h1>
      <div>
        <label>Email</label>
        <input type="email" placeholder="email" autocomplete="off" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" />
      </div>
      <div>
        <button @click="next">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    next() {
      this.$router.push("/");
    },
  },
};
</script>
