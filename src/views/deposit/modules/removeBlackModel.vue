<template>
  <el-dialog
    title="移除黑名单"
    :close-on-click-modal="false"
    center
    width="30%"
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
      <el-form-item label="充值余额" prop="amount">
        <el-input v-model="payData.amount" />
      </el-form-item>
      <el-form-item label="支付类型" prop="payType">
        <global-select type="payType" :select-v.sync="payData.payType" />
      </el-form-item>
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="payData.orderNo" placeholder="请输入订单号" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok('form')">确 定</el-button>
      <div class="showBotext">备注:押金余额大于等于{{form.settingAmount}}元方可从黑名单移除</div>
    </div>
  </el-dialog>
</template>

<script>
import globalSelect from "../../../components/select/globalSelect";
import { removeblack } from "../../../api/api";

export default {
  name: "removeBlackModel",
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
        payType: [
          { required: true, message: "请选择充值方式", trigger: "change" }
        ],
        orderNo: [
          { required: true, message: "请输入订单号", trigger: "blur" }
        ]
      },
      payData: {
        amount: "",
        payType: "",
        orderNo:'',
      }
    };
  },
  methods: {
    blackInfo(row) {
      Object.keys(this.payData).forEach(key => {
        this.payData[key] = "";
      });
      this.dialogFormVisible = true;
      this.form = row;
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.payData.personId = this.form.personId;
          this.payData.campusId = this.form.campusId;
          removeblack(this.payData).then(res => {
            if (res.code === 200) {
              this.dialogFormVisible = false;
              this.$message.success(res.msg);
              this.$emit("ok");
            } else {
              this.$message.error(res.msg);
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

<style scoped>
.showBotext {
  font-size: 14px;
  text-align: left;
  padding-top: 15px;
  color: #999;
  padding-left: 60px;
}
</style>
