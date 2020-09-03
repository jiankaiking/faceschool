<template>
  <el-dialog
    title="学生信息"
    :close-on-click-modal="false"
    center
    width="50%"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" label-width="110px" :rules="rules" ref="form">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificateType">
        <el-select v-model="form.certificateType">
          <el-option
            v-for="(item, index) in selectArr"
            :key="index"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号" prop="certificateNo">
        <el-input v-model="form.certificateNo" placeholder="请输入证件号" />
      </el-form-item>
      <el-form-item label="学籍号" prop="personNo">
        <el-input v-model="form.personNo" placeholder="请输入学籍号"></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="schoolId">
        <schllo-select
          :schoolName.sync="form.schoolId"
          @changeSchool="changeSchool"
          ref="school"
        />
      </el-form-item>
      <el-form-item label="校区" prop="campusId">
        <!--        <campus-select-->
        <!--          :schoolName.sync="form.schoolId"-->
        <!--          ref="campus"-->
        <!--          :campusId.sync="form.campusId"-->
        <!--        />-->
        <el-select v-model="form.campusId" placeholder="选择学区">
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :value="item.id"
            :label="item.schoolName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学时间" prop="enrollmentTime">
        <el-date-picker
          v-model="form.enrollmentTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班级编号" prop="classNo">
        <el-select v-model="form.classNo" placeholder="选择班级编号">
          <el-option
            v-for="(item, index) in classArr"
            :key="index"
            :value="item.classNo"
            :label="item.className"
          ></el-option>
        </el-select>
        <!--        <el-input v-model="form.classNo"></el-input>-->
      </el-form-item>
      <el-form-item label="监护人" prop="guardian">
        <el-input v-model="form.guardian"></el-input>
      </el-form-item>
      <el-form-item label="监护人手机号" prop="guardianPhone">
        <el-input v-model="form.guardianPhone"></el-input>
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
// import testSelect from "../test/testSelect";
// import campusSelect from "../../../components/select/campusSelect";
import {
  editStudent,
  classDown,
  studentInfo,
  getSchoolDownList
} from "../../../api/api";

export default {
  name: "studentAddModel",
  components: {
    schlloSelect
    // campusSelect
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][9][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      classArr: [],
      selectList: [],
      selectArr: [
        { code: "1", name: "居民身份证" },
        { code: "2", name: "港澳通行证 " },
        { code: "3", name: "台湾通行证" }
      ],
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        certificateType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        certificateNo: [
          { required: true, message: "请输入证件号", trigger: "blur" },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "你的身份证格式不正确"
          }
        ],
        personNo: [
          { required: true, message: "请输入学籍号", trigger: "blur" }
        ],
        schoolId: [
          { required: true, message: "请选择学校", trigger: "change" }
        ],
        campusId: [
          { required: true, message: "请选择校区", trigger: "change" }
        ],
        enrollmentTime: [
          { required: true, message: "请选择入学时间", trigger: "change" }
        ],
        classNo: [
          { required: true, message: "请选择班级编号", trigger: "change" }
        ],
        guardian: [
          { required: true, message: "请输入监护人", trigger: "blur" }
        ],
        guardianPhone: [
          { required: true, validator: checkPhone, trigger: "blur" }
        ]
      },
      form: {
        name: "",
        certificateType: "",
        certificateNo: "",
        personNo: "",
        schoolId: "",
        campusId: "",
        enrollmentTime: "",
        classNo: "",
        guardian: "",
        guardianPhone: ""
      }
    };
  },
  methods: {
    add() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = "";
      });
      this.dialogFormVisible = true;
    },
    edit(id) {
      this.dialogFormVisible = true;
      studentInfo({ id }).then(res => {
        if (res.code === 200) {
          this.getClass(res.data.campusId);

          Object.assign(this.form, res.data);
          // console.log(this.form,res.data)
          this.$refs["school"].selectValue = res.data.schoolId;

          // this.$refs["campus"].selectChange(res.data.campusId);
        }
      });
    },
    changeSchool(e) {
      this.form.campusId = "";
      this.form.classNo = "";
      this.getSelectList(e);
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editStudent(this.form).then(res => {
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
    },
    getSelectList(id) {
      getSchoolDownList({ parentId: id }).then(res => {
        this.selectList = res.data;
      });
    },
    getClass(id) {
      classDown({ campusId: id }).then(res => {
        if (res.code === 200) {
          this.classArr = res.data;
        }
      });
    }
  },
  watch: {
    "form.schoolId": {
      immediate: true,
      handler(newVal) {
        newVal && this.getSelectList(newVal);
      }
    },
    "form.campusId": {
      immediate: true,
      handler(newVal) {
        newVal && this.getClass(newVal);
      }
    }
  }
};
</script>

<style scoped></style>
