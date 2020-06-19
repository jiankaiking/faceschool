<template>
  <el-dialog
    title="班级信息"
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
      label-width="100px"
    >
      <el-form-item label="学校" prop="schoolId">
        <schllo-select ref="school" :schoolName.sync="form.schoolId" />
      </el-form-item>
      <el-form-item label="校区" prop="campusId">
        <el-select
          v-model="form.campusId"
          placeholder="选择学区"
          @change="selectChange"
        >
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :value="item.id"
            :label="item.schoolName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教育阶段">
        <el-input
          style="width: 220px"
          v-model="optionsObj[0].educationStage"
          placeholder="教育阶段"
          readonly
        />
      </el-form-item>
      <el-form-item label="学制">
        <el-input
          style="width: 220px"
          v-model="optionsObj[0].schoolSystem"
          placeholder="学制"
          readonly
        />
      </el-form-item>
      <el-form-item label="开学时间" prop="openingTime">
        <el-date-picker
          v-model="form.openingTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班级名称" prop="className">
        <el-input
          style="width: 220px"
          placeholder="请输入班级名称"
          v-model="form.className"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import schlloSelect from "../../../components/select/schlloSelect";
import { getSchoolDownList, addClass, classInfo } from "../../../api/api";

export default {
  name: "classAddModel",
  components: {
    schlloSelect
  },
  data() {
    return {
      dialogFormVisible: false,
      selectList: [],
      optionsObj: [{}],
      rules: {
        schoolId: [
          { required: true, message: "请选择学校", trigger: "change" }
        ],
        campusId: [
          { required: true, message: "请选择校区", trigger: "change" }
        ],
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        openingTime: [
          { required: true, message: "请选择开班时间", trigger: "change" }
        ]
      },
      form: {
        schoolId: "",
        campusId: "",
        openingTime: "",
        className: ""
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
    edit(id) {
      this.dialogFormVisible = true;
      classInfo({ id }).then(res => {
        this.form = Object.assign(this.form, res.data);
        this.$refs["school"].selectValue = res.data.schoolId;
        this.optionsObj = [{educationStage:res.data.educationStage,schoolSystem:res.data.schoolSystem}]
      });
    },
    getSelectList(id) {
      getSchoolDownList({ parentId: id }).then(res => {
        this.selectList = res.data;
      });
    },
    selectChange(e) {
      this.optionsObj = this.selectList.filter(item => {
        return item.id == e;
      });
      console.log(this.optionsObj);
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addClass(this.form).then(res => {
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
  },
  watch: {
    "form.schoolId": {
      // immediate: true,
      handler(newVal) {
        this.form.campusId = ''
        this.optionsObj = [{}]
        newVal && this.getSelectList(newVal);
      }
    }
  }
};
</script>

<style scoped></style>
