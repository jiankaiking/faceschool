<template>
  <el-dialog
    title="学校"
    :close-on-click-modal="false"
    center
    width="30%"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="学校" prop="schoolName">
        <el-input v-model="form.schoolName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="组织机构代码" prop="school_stdcode">
        <el-input v-model="form.school_stdcode" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="regionLongCode">
        <el-input v-model="form.area" @focus="clickCity" v-if="cityShow" />
        <citySelect @selectCode="getCity" v-if="!cityShow"></citySelect>
      </el-form-item>
      <el-form-item prop="address">
        <el-input placeholder="请输入详细地址" v-model="form.address" />
      </el-form-item>
      <el-form-item label="教育阶段" prop="educationStage">
        <global-select type="teaching" :select-v.sync="form.educationStage" />
      </el-form-item>
      <el-form-item label="学制" prop="schoolSystem">
        <global-select
          type="educationalType"
          :select-v.sync="form.schoolSystem"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input v-model="form.contacts" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactNumber">
        <el-input v-model="form.contactNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学校介绍" prop="schoolIntroduction">
        <el-input
          v-model="form.schoolIntroduction"
          type="textarea"
          :autosize="{ minRows: 4 }"
          maxlength="100"
          show-word-limit
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSchool, getSchoolInfo } from "../../../api/api";
import globalSelect from "../../../components/select/globalSelect";
import citySelect from "../../../components/select/citySelect";
export default {
  name: "schlloAddModel",
  components: {
    globalSelect,
    citySelect
  },
  data() {
    return {
      cityShow: false,
      dialogFormVisible: false,
      rules: {
        schoolName: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
        school_stdcode: [
          { required: true, message: "请输入组织机构代码", trigger: "blur" }
        ],
        regionLongCode: [
          { required: true, message: "请选择地址", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        educationStage: [
          { required: true, message: "请选择教育阶段", trigger: "change" }
        ],
        schoolSystem: [
          { required: true, message: "请选择学制", trigger: "change" }
        ],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        contactNumber: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        schoolIntroduction: [
          { required: true, message: "请输入学校介绍", trigger: "blur" }
        ]
      },
      form: {
        schoolName: "",
        regionLongCode: "",
        address: "",
        educationStage: "",
        schoolSystem: "",
        contacts: "",
        contactNumber: "",
        schoolIntroduction: ""
      }
    };
  },
  methods: {
    clickCity() {
      this.cityShow = false;
    },
    add() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = "";
      });
      this.cityShow = false;
      this.dialogFormVisible = true;
    },
    edit(id) {
      this.dialogFormVisible = true;
      this.cityShow = true;
      getSchoolInfo({ id }).then(res => {
        if (res.code === 200) {
          this.form = res.data;
        }
      });
    },
    getCity(e) {
      this.form.regionLongCode = e;
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addSchool(this.form).then(res => {
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

<style scoped></style>
