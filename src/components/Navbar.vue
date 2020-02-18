<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-info flex-md-nowrap p-0 shadow">
        <router-link class="navbar-brand logo mr-0" to="/">
          <img src="../assets/logo.png" alt width="120" />
        </router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_APIPATH}logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        if (response.data.success) {
            console.log(response.data)
            vm.$router.push("/");
        }
      });
    }
  }
};
</script>