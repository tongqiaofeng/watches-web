<template>
  <div>
    <h1>结算</h1>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userList: [],
        userid: 0, // 采购员id
        watchList: [],

      }
    },
    created() {
      this.handleUserList();
    },
    methods: {
      // 获取用户列表
      handleUserList() {
        this.$axios.post(this.$store.state.baseUrl + '/UserList?java', {
          role: 2
        }).then(res => {
          console.log('用户列表');
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取可结算手表列表
      handleAdminSettleWatchList() {
        this.$axios.post(this.$store.state.baseUrl + '/AdminSettleWatchList?java', {
          userid: this.userid
        }).then(res => {
          console.log('可结算手表列表');
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      },
    },
  }
</script>
<style lang="scss" scoped>

</style>