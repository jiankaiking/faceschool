<template>
  <el-dialog
    title="设备绑定"
    :close-on-click-modal="false"
    center
    width="30%"
    :visible.sync="dialogFormVisible"
  >
    <el-form label-position="left" :model="form" ref="form" :rules="rules" label-width="100px">
      <!-- <el-form-item label="组织机构代码" prop="school_stdcode">
        <el-input  v-model="form.school_stdcode" placeholder="组织机构代码" />
      </el-form-item> -->
       <el-form-item label="设备SN" prop="device_sn">
        <el-input v-model="form.device_sn" placeholder="请输入设备SN" :readonly="true"></el-input>
      </el-form-item>
      <!-- <el-form-item label="绑定关系类型" prop="type">
        <el-select v-model="form.type" placeholder="绑定关系类型" @change="changeType">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="绑定关系id" prop="id">
        <el-input v-model="form.id" placeholder="请输入绑定关系id" :readonly="pIdReady"></el-input>
      </el-form-item> -->
      <el-form-item label="学校" prop="schoolId">
        <schllo-select ref="school" :schoolName.sync="form.schoolId" />
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

        device_sn: "",
        schoolId: ""
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
     
        device_sn: [
          { required: true, message: "请输入设备SN", trigger: "change" }
        ],
        schoolId: [{ required: true, message: "请选择学校", trigger: "change" }]
      }
    };
  },
  methods: {
    add(device_sn) {
      Object.keys(this.form).forEach(key => (this.form[key] = ""));
      this.form.device_sn = device_sn;
      this.dialogFormVisible = true;
    },

    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 设备绑定
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
    },

    changeType(e){
      if(e == 'COMMON_ISV'){
        this.form.id = '2088431997685080'
        this.pIdReady = true
      }else{
        this.form.id = ''
        this.pIdReady = false
      }
    },
  }
};
</script>

<style scoped></style>
