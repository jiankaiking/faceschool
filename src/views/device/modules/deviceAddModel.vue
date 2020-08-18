<template>
  <div>
    <el-dialog
      title="设备注册激活"
      :close-on-click-modal="false"
      width="30%"
      center
      :visible.sync="dialogFormVisible"
    >
      <el-form :rules="rules" ref="form" :model="form" label-width="150px">
        <el-form-item label="设备SN" prop="deviceNo">
          <el-input v-model="form.deviceNo" placeholder="设备sn" />
        </el-form-item>
        <el-form-item label="设备无线网络类型" prop="netType">
          <el-select
            v-model="form.netType"
            clearable
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
        <el-form-item
          label="mac地址/网卡地址"
          v-if="wiredFlag == 1"
          prop="deviceMac"
        >
          <el-input
            v-model="form.deviceMac"
            placeholder="mac地址，网络设备网卡地址"
          />
        </el-form-item>
        <el-form-item
          label="IMEI移动设备识别码"
          v-if="wiredFlag == 2"
          prop="deviceImei"
        >
          <el-input
            v-model="form.deviceImei"
            placeholder="IMEI移动设备识别码"
          />
        </el-form-item>
        <el-form-item label="软件版本" prop="osVersion">
          <el-input
            style="width: 220px"
            v-model="form.osVersion"
            placeholder="软件版本"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deviceInitialize, againInitialize } from "../../../api/api";
export default {
  name: "deviceAddModel",
  data() {
    return {
      dialogFormVisible: false,
      snWifi: [
        { value: "2G", label: "2G移动网络", wiredFlag: 2 },
        { value: "3G", label: "3G移动网络", wiredFlag: 2 },
        { value: "4G", label: "4G移动网络", wiredFlag: 2 },
        { value: "WIRED", label: "有线网络", wiredFlag: 1 },
        { value: "WIFI", label: "无线网络", wiredFlag: 1 },
        { value: "BT", label: "蓝牙", wiredFlag: 1 },
        // { value: "OTHER", label: "其他网络类型", wiredFlag: 1 },
        // { value: "NONE", label: "无联网功能", wiredFlag: 1 }
      ],
      rules: {
        deviceNo: [
          { required: true, message: "请填写设备SN", trigger: "change" }
        ],
        deviceMac: [
          {
            required: true,
            message: "请填写网络设备网卡地址",
            trigger: "blur"
          }
        ],
        deviceImei: [
          { required: true, message: "请填写移动设备识别码", trigger: "blur" }
        ],
        netType: [
          {
            required: true,
            message: "请选择设备无线网络类型",
            trigger: "change"
          }
        ],
        osVersion: [
          { required: false, message: "请填写软件版本", trigger: "blur" }
        ]
      },
      form: {
        deviceNo: "",
        deviceMac: "",
        deviceImei: "",
        netType: "",
        osVersion: ""
      },
      wiredFlag: 3
    };
  },

  methods: {
    add() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = "";
      });
      this.dialogFormVisible = true;
    },
    register(row) {
      Object.keys(this.form).forEach(key => {
        Object.keys(row).forEach(row_key => {
          if (key === row_key) {
            this.form[key] = row[row_key];
          }
        });
      });
      this.form.deviceId = row.id;
      this.dialogFormVisible = true;
      // console.log(this.form);
    },
    trueForm() {
      return new Promise(resolve => {
        if (this.form.deviceId) {
          againInitialize(this.form).then(res => {
            resolve(res);
          });
        } else {
          deviceInitialize(this.form).then(res => {
            resolve(res);
          });
        }
      });
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.trueForm().then(res => {
            if (res.code === 200) {
              this.dialogFormVisible = false;
              this.$message.success(res.msg);
              this.$emit("ok", res.data.deviceId);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    "form.netType": {
      immediate: true,
      handler(val) {
        // console.log(val, this.form.netType);
        if (val != "") {
          let item = this.snWifi.filter(item => item.value == val);
          this.wiredFlag = item.length > 0 ? item[0].wiredFlag : 3;
        } else {
          this.wiredFlag = 3;
        }
      }
    }
  }
};
</script>

<style scoped></style>
