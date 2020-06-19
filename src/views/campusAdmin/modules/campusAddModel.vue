<template>
  <el-dialog
    title="学校"
    :close-on-click-modal="false"
    center
    width="30%"
    :visible.sync="dialogFormVisible"
  >
    <el-form label-position="left" :model="form" label-width="100px">
      <el-form-item label="学校">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="校区">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-row>
          <el-col :span="7">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-input placeholder="请输入详细地址" style="margin-top: 10px" />
      </el-form-item>
      <el-form-item label="教育阶段">
        <global-select :selectV.sync="form.name" type="teaching" />
      </el-form-item>
      <el-form-item label="学制">
        <global-select :selectV.sync="form.region" type="educationalType" />
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学校介绍">
        <el-input
          v-model="form.name"
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
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import globalSelect from "../../../components/select/globalSelect";
export default {
  name: "campisAddModel",
  components: {
    globalSelect
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        region: "3",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  }
};
</script>

<style scoped></style>
