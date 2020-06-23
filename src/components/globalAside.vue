<template>
  <div>
    <div class="header-login">
      <img src="../assets/img/logo.png" />
    </div>
    <el-menu
      @select="selectMenu"
      :collapse="menuIsfold"
      router
      :default-active="activeMenu"
      background-color="#001529"
      text-color="hsla(0,0%,100%,.65)"
      active-text-color="#fff"
    >
<!--      <el-menu-item index="/home">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">首页</span>-->
<!--      </el-menu-item>-->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-school"></i>
          <span>校园管理</span>
        </template>
        <el-menu-item index="/schlloinfo">学校信息</el-menu-item>
        <el-menu-item index="/campuslist">学校校区</el-menu-item>
        <el-menu-item index="/classlist">班级信息</el-menu-item>
        <el-menu-item index="/stafflist">教职工信息</el-menu-item>
        <el-menu-item index="/studentslist">学生信息</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="/orderlist">消费订单</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-money"></i>
          <span>补贴金管理</span>
        </template>
        <el-menu-item index="/subsidylist">补贴金列表</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-money"></i>
          <span>押金管理</span>
        </template>
        <el-menu-item index="/depositlist">押金列表</el-menu-item>
        <el-menu-item index="/blacklist">黑名单管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: "globalAside",
  data() {
    return {
      pIndex: 0
    };
  },
  methods: {
    selectMenu(index, indexPath) {
      this.pIndex = indexPath[0];
    }
  },
  computed:{
    ...mapState(['menuIsfold']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
};
</script>
<style>
.el-submenu.is-active .el-submenu__title {
  color: #ffffff !important;
}
.el-submenu.is-active i {
  color: #ffffff !important;
}
.el-submenu__title:hover {
  color: #ffffff !important;
  background: #001529 !important;
}
.el-menu-item:hover {
  color: #ffffff !important;
  background: #1f2d3d !important;
}
.el-menu-item.is-active {
  background: #1890ff !important;
}
.el-menu {
  border-right-width: 0 !important;
}
</style>
<style scoped>
.el-menu {
  height: 100%;
  background-color: #001529;
}
.el-menu-item {
  background-color: #001529;
}
.header-login {
  width: 200px;
  height: 70px;
}
.header-login img {
  width: 200px;
  height: 70px;
}
</style>
