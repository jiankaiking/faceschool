<template>
  <el-dialog
    title="校区"
    :close-on-click-modal="false"
    center
    width="30%"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="学校" prop="parentId" v-if="!form.id">
        <schllo-select ref="school" :schoolName.sync="form.parentId" />
      </el-form-item>
      <el-form-item label="学校" prop="parentId" v-if="form.id">
        <schllo-select
          ref="school"
          :schoolName.sync="form.parentId == 0 ? form.id : form.parentId"
        />
      </el-form-item>
      <el-form-item label="校区" prop="campusName">
        <el-input v-model="form.campusName" autocomplete="off"></el-input>
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
import schlloSelect from "../../../components/select/schlloSelect";
export default {
  name: "campusAddModel",
  components: {
    globalSelect,
    schlloSelect,
    citySelect
  },
  data() {
    return {
      dialogFormVisible: false,
      cityShow: false,
      rules: {
        parentId: [
          { required: true, message: "请选择学校名称", trigger: "change" }
        ],
        campusName: [
          { required: true, message: "请输入校区名称", trigger: "blur" }
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
        parentId: "",
        campusName: "",
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
      Object.keys(this.form).forEach(key => {
        this.form[key] = "";
      });
      this.cityShow = true;
      this.dialogFormVisible = true;
      getSchoolInfo({ id }).then(res => {
        if (res.code === 200) {
          this.form = res.data;
          this.$refs["school"].selectValue = res.data.parentId;
        }
      });
    },
    getCity(e) {
      this.form.regionLongCode = e;
    },
    ok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.schoolName = this.form.campusName;
          addSchool(this.form).then(res => {
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
