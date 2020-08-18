<template>
  <el-dialog
    title="设备绑定"
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
      <el-form-item label="设备SN" prop="deviceId">
        <el-input
          v-model="form.deviceId"
          placeholder="请输入设备SN"
          :readonly="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="shoolId">
        <schllo-select ref="school" :schoolName.sync="form.shoolId" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="success" @click="ok('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deviceBind } from "../../../api/api";
import schlloSelect from "../../../components/select/schlloSelect";
export default {
  name: "bindModels",
  components: {
    schlloSelect
  },
  data() {
    return {
      dialogFormVisible: false,
      pIdReady: false,
      form: {
        deviceId: "",
        shoolId: ""
      },
      typeList: [
        { value: "COMMON_ISV", label: "ISV" },
        { value: "COMMON_MERCHANT", label: "商户" },
        { value: "COMMON_SHOP", label: "门店" },
        { value: "PARKING", label: "停车场" },
        { value: "AFFAIRS", label: "政务" },
        { value: "COMMON_PRODUCT", label: "供应商ID" },
        { value: "COMMON_PRODUCT_PID", label: "供应商PID" },
        { value: "COMMON_ASSOCIATE", label: "合作伙伴" },
        { value: "COMMON_APPLICANT", label: "申请人" },
        { value: "ALIPAY_USERID", label: "用户" },
        { value: "SEPERATE_MERCHANT", label: "间联商户" }
      ],
      rules: {
        deviceId: [
          { required: true, message: "请输入设备SN", trigger: "change" }
        ],
        shoolId: [{ required: true, message: "请选择学校", trigger: "change" }]
      }
    };
  },
  methods: {
    add(deviceNo) {
      Object.keys(this.form).forEach(key => (this.form[key] = ""));
      this.form.deviceId = deviceNo;
      this.dialogFormVisible = true;
    },

    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          deviceBind(this.form).then(res => {
            if (res.code === 200) {
              this.dialogFormVisible = false;
              this.$emit("ok");
              this.$message.success(res.msg);
            }else{
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // changeType(e) {
    //   if (e == "COMMON_ISV") {
    //     this.form.id = "2088431997685080";
    //     this.pIdReady = true;
    //   } else {
    //     this.form.id = "";
    //     this.pIdReady = false;
    //   }
    // }
  }
};
</script>

<style scoped></style>
