<template>
  <div class="login-view">
    <div class="login-bg"></div>
    <div class="login-form">
      <el-form
        :model="ruleForm"
        align="center"
        :rules="rules"
        ref="ruleForm"
        size="small"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { postAction } from "../api/manage";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, message: "至少是3位数", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions({ loginIn: "LOGIN" }),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginIn(this.ruleForm)
            .then(() => {
              this.$router.push("/");
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login-view {
  width: 100%;
  height: 100vh;
}

.login-bg {
  background: url("http://chuantu.xyz/t6/739/1593570505x-1404755695.jpg") 50%
    50% / cover;
  height: 100%;
  position: relative;
}

.login-form {
  position: fixed;
  border-radius: 10px;
  top: 50%;
  width: 340px;
  padding: 30px 50px 30px 10px;
  margin-left: -170px;
  box-sizing: border-box;
  left: 50%;
  height: 300px;
  margin-top: -150px;
}
.login-bg::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
</style>
