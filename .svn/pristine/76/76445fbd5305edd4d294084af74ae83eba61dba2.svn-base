<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    provide() {
      return {
        reload: this.reload
      };
    },
    data() {
      return {
        isRouterAlive: true
      };
    },
    computed: {
      isLogin() {
        if (sessionStorage.getItem("token")) {
          this.$store.commit("userStatus", sessionStorage.getItem("token"));
        } else {
          this.$store.commit("userStatus", null);
        }
        return this.$store.getters.isLogin;
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      }
    }
  };
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: "微软雅黑";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }
</style>