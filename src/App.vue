<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log(process.env.VUE_APP_APIPATH)
  },
};
</script>

<style lang="scss">
@import "./assets/all";
</style>