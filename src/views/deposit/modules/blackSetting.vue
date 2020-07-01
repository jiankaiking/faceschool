<template>
  <el-dialog
    title="设置最小金额"
    :close-on-click-modal="false"
    center
    width="25%"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" label-width="120px" ref="form" :rules="rules">
      <el-form-item label="学校" prop="schoolId">
        <schllo-select ref="school" :schoolName.sync="form.schoolId" />
      </el-form-item>
      <el-form-item label="校区" prop="campusId">
        <el-select v-model="form.campusId" placeholder="选择学区">
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :value="item.id"
            :label="item.schoolName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额设置" prop="amount">
        <el-input style="width: 220px" v-model="form.amount"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok('form')">确 定</el-button>
      <div class="showBotext">
        备注:押金余额低于设置金额的学生或教职工将被移入黑名单
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { settingBlack, getSchoolDownList } from "../../../api/api";
import schlloSelect from "../../../components/select/schlloSelect";
export default {
  name: "blackSetting",
  components: {
    schlloSelect
  },
  data() {
    return {
      dialogFormVisible: false,
      selectList: [],
      rules: {
        schoolId: [
          { required: true, message: "请选择学校", trigger: "change" }
        ],
        campusId: [
          { required: true, message: "请选择校区", trigger: "change" }
        ],
        amount: [{ required: true, message: "请输入设置金额", trigger: "blur" }]
      },
      form: {
        schoolId: "",
        campusId: "",
        amount: ""
      }
    };
  },
  methods: {
    getSelectList(id) {
      getSchoolDownList({ parentId: id }).then(res => {
        this.selectList = res.data;
      });
    },
    add() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = "";
      });
      this.dialogFormVisible = true;
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          settingBlack(this.form).then(res => {
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
  },
  watch: {
    "form.schoolId": {
      handler(newVal) {
        this.form.campusId = "";
        newVal && this.getSelectList(newVal);
      }
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
