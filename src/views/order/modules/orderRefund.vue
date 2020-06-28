<template>
  <el-dialog
    title="退款"
    :close-on-click-modal="false"
    center
    width="30%"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <el-form-item label="退款金额">
        <el-input v-model="form.amount" readonly></el-input>
      </el-form-item>
      <el-form-item label="退款密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { orderRefund } from "../../../api/api";
export default {
  name: "orderRefund",
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 5 到 16 个字符", trigger: "blur" }
        ]
      },
      form: {
        amount: "",
        password: "",
        orderId: ""
      }
    };
  },
  methods: {
    refund(row) {
        console.log(row)
      this.dialogFormVisible = true;
      this.form.orderId = row.orderId;
      this.form.amount = row.amount;
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          orderRefund(this.form).then(res => {
            if (res.code === 200) {
              this.dialogFormVisible = false;
              this.$message.success("退款成功");
            }else{
                this.$message.error(res.msg)
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
