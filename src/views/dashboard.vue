<template>
  <el-container class="view-layout">
    <el-aside class="side" width="200px" :style="{width:[menuIsfold?'70px':'200px']}"><global-aside /></el-aside>

    <el-container style="height: 100%">
      <el-header><global-header /></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>
<script>
import globalAside from "../components/globalAside";
import globalHeader from "../components/globalHeader";
import {mapState} from 'vuex'
export default {
  name: "dashboard",
  components: {
    globalAside,
    globalHeader
  },
  computed:{
    ...mapState(['menuIsfold'])
  }
};
</script>
<style scoped>
.view-layout {
  height: 100vh !important;
  overflow-x: hidden;
}
.el-main {
  background: #f0f2f5;
}
.side {
  /*box-shadow: 2px 116px 6px 0 rgba(0,21,41,.35);*/
  position: relative;
  background: #001529;
  transition: width .3s;
  z-index: 10;
}
</style>
