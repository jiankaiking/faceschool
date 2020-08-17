<template>
  <div class="header-view">
    <div class="header-login">
      <i
        @click="changeMenuFold"
        :class="[menuIsfold ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
      ></i>
    </div>
    <div class="header-right">
      <span>管理员</span>
      <el-button type="text" class="login-out" @click="loginOut"
        >退出登录</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "globalHeader",
  methods: {
    ...mapMutations({ changeMenuFold: "CHANGE_MENU_FOLD" }),
    ...mapActions({ Logout: "Logout" }),
    loginOut() {
      this.Logout().then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  },

  computed: {
    ...mapState(["menuIsfold"])
  }
};
</script>

<style scoped>
.header-view {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
}

.header-login img {
  width: 160px;
  height: 70px;
}
.login-out {
  margin-left: 50px;
}
.header-login i {
  font-size: 25px;
}
</style>
