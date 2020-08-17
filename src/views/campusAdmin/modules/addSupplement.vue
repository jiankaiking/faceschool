<template>
  <el-dialog
    title="补参"
    :close-on-click-modal="false"
    center
    width="30%"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      label-position="left"
      :model="form"
      ref="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="商户号" prop="merchantNo">
        <el-input
          v-model="form.merchantNo"
          placeholder="请输入商户号"
        ></el-input>
      </el-form-item>
      <el-form-item label="token" prop="token">
        <el-input v-model="form.token" placeholder="请输入token"></el-input>
      </el-form-item>
      <el-form-item label="门店ID" prop="shopId">
        <el-input v-model="form.shopId" placeholder="请输入门店ID"></el-input>
      </el-form-item>
      <el-form-item label="门店名称" prop="shopName">
        <el-input v-model="form.shopName" placeholder="请输入门店名称"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="success" @click="ok('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { schoolSupplement } from "../../../api/api";
export default {
  name: "campisAddModel",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        merchantNo: "",
        id: "",
        token: "",
        shopId: "",
        shopName: ""
      },
      rules: {
        merchantNo: [
          { required: true, message: "请输入商户号", trigger: "blur" }
        ],
        token: [{ required: true, message: "请输入token", trigger: "blur" }],
        shopId: [{ required: true, message: "请输入门店ID", trigger: "blur" }],
        shopName: [{ required: true, message: "请输入门店名称", trigger: "blur" }],

      }
    };
  },
  methods: {
    add(id) {
      Object.keys(this.form).forEach(key => (this.form[key] = ""));
      this.form.id = id;
      this.dialogFormVisible = true;
    },

    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          schoolSupplement(this.form).then(res => {
            if (res.code === 200) {
              this.dialogFormVisible = false;
              this.$message.success(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped></style>
