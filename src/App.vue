<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
body,
html,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
form,
fieldset,
input,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}

.login-form .el-form-item__label {
  color: #ffffff;
}

.el-header {
  padding: 0 !important;
  height: 70px !important;
}

.el-main {
  padding: 10px !important;
}

.search-form {
  background: #ffffff;
  padding: 10px;
  box-sizing: border-box;

  margin-bottom: 10px;
}

.search-form .el-form-item {
  margin-bottom: 0;
}

.table-box {
  padding: 15px;
  box-sizing: border-box;
  background: #ffffff;
}
</style>
