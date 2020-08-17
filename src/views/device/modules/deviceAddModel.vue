<template>
<div>
  <el-dialog
    title="设备注册激活"
    :close-on-click-modal="false"
    center
    width="30%"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      align="center"
      :rules="rules"
      ref="form"
      :model="form"
      label-width="140px"
    >
    <el-form-item label="设备SN" prop="device_sn">
        <el-input
      
          v-model="form.device_sn"
          placeholder="设备sn"
        />
      </el-form-item>
    <el-form-item label="mac" prop="mac">
        <el-input
         
          v-model="form.mac"
          placeholder="mac地址，网络设备网卡地址"
        />
      </el-form-item>
    <el-form-item label="imei" prop="imei">
        <el-input
    
          v-model="form.imei"
          placeholder="IMEI移动设备识别码"
        />
      </el-form-item>

       <el-form-item label="设备无线网络类型" prop="net_type">
        <el-select
          v-model="form.net_type"
          placeholder="设备无线网络类型"
        >
          <el-option
            v-for="(item, index) in snWifi"
            :key="index"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="os_version" prop="os_version">
        <el-input
          style="width: 220px"
          v-model="form.os_version"
          placeholder="软件版本"
        />
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok('form')">确 定</el-button>
    </div>
  </el-dialog>
  <bind-model ref="bindModel"/>
  </div>
</template>

<script>
import { addDeviceSn } from "../../../api/api";
import bindModel from "./bindModel.vue";

export default {
  name: "deviceAddModel",
  components: { 
    bindModel
  },
  data() {
    return {
      dialogFormVisible: false,
      selectList: [],
      snWifi:[
        {value:'2G',label:'2G移动网络'},
        {value:'3G',label:'3G移动网络'},
        {value:'4G',label:'4G移动网络'},
        {value:'WIRED',label:'有线网络'},
        {value:'WIFI',label:'无线网络'},
        {value:'BT',label:'蓝牙'},
        {value:'OTHER',label:'其他网络类型'},
        {value:'NONE',label:'无联网功能'}
      ],
      optionsObj: [{}],
      rules: {
        device_sn: [
          { required: true, message: "请填写设备SN", trigger: "change" }
        ],
        mac: [
          { required: false, message: "请填写网络设备网卡地址", trigger: "blur" }
        ],
        imei: [
          { required: false, message: "请填写移动设备识别码", trigger: "blur" }
        ],

        net_type: [
          { required: false, message: "请选择设备无线网络类型", trigger: "change" }
        ],
        os_version: [
          { required: false, message: "请填写软件版本", trigger: "blur" }
        ]
      },
      form: {
        device_sn: "",
        mac: "",
        imei: "",
        net_type: "",
        os_version: ""
      }
    };
  },
  methods: {
    add() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = "";
      });
      this.optionsObj = [{}];

      this.dialogFormVisible = true;
    },

    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          
          addDeviceSn(this.form).then(res => {
            if (res.code === 200) {
              this.dialogFormVisible = false;
              this.$message.success(res.msg);
              this.$emit("ok");
              console.log('*************************')
              // 注册成功直接绑定
              this.$refs["bindModel"].add(this.form.device_sn);
            } else {
              console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  
};
</script>

<style scoped></style>
