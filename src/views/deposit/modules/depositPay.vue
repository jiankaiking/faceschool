<template>
  <el-dialog
    title="教职工信息"
    :close-on-click-modal="false"
    center
    width="50%"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="payData" label-width="120px" ref="form" :rules="rules">
      <el-form-item label="姓名">
        <el-input v-model="form.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="学籍号/教师编号">
        <el-input v-model="form.personNo" readonly />
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="form.schoolName" readonly></el-input>
      </el-form-item>
      <el-form-item label="校区">
        <el-input v-model="form.campusName" readonly></el-input>
      </el-form-item>
      <el-form-item label="押金余额">
        <el-input v-model="form.amount" readonly />
      </el-form-item>
      <el-form-item label="充值金额" prop="amount">
        <el-input v-model="payData.amount" placeholder="请输入充值金额" />
      </el-form-item>
      <el-form-item label="支付类型" prop="source">
        <global-select type="payType" :select-v.sync="payData.source" />
      </el-form-item>
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="payData.orderNo" placeholder="请输入订单号" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import globalSelect from "../../../components/select/globalSelect";
import { rechargePay } from "../../../api/api";

export default {
  name: "depositPay",
  components: {
    globalSelect
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      rules: {
        amount: [
          { required: true, message: "请输入充值金额", trigger: "blur" }
        ],
        source: [
          { required: true, message: "请选择充值方式", trigger: "change" }
        ],
        orderNo: [{ required: true, message: "请输入订单号", trigger: "blur" }]
      },
      payData: {
        amount: "",
        source: ""
      }
    };
  },
  methods: {
    payInfo(row) {
      Object.keys(this.payData).forEach(key => {
        this.payData[key] = "";
      });
      this.dialogFormVisible = true;
      this.form = row;
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.payData.id = this.form.id;
          rechargePay(this.payData).then(res => {
            if (res.code === 200) {
              this.dialogFormVisible = false;
              this.$message.success(res.msg);
              this.$emit("ok");
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
