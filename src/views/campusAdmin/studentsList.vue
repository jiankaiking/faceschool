<template>
  <div class="padding-view">
    <el-form
      class="search-form"
      ref="searchForm"
      :inline="true"
      :model="searchData"
    >
      <el-form-item label="审批人">
        <el-input v-model="searchData.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button type="primary" @click="headAdd">新增</el-button>
        <el-button type="warning" @click="loadData">导入</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="certificateType" label="证件类型"></el-table-column>
        <el-table-column prop="certificateNo" label="证件号"></el-table-column>
        <el-table-column prop="studentNo" label="学籍号"></el-table-column>
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="campusName" label="校区"></el-table-column>
        <el-table-column prop="classNo" label="班级编号"></el-table-column>
        <el-table-column prop="educationStage" label="教育阶段"></el-table-column>
        <el-table-column prop="schoolSystem" label="学制"></el-table-column>
        <el-table-column prop="enrollmentTime" label="入学时间"></el-table-column>
        <el-table-column prop="guardian" label="监护人"></el-table-column>
        <el-table-column prop="guardianPhone" label="监护人/本人手机号"></el-table-column>
        <el-table-column prop="faceVerification" label="人脸核验"></el-table-column>
        <el-table-column prop="status" label="账号状态"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">补参</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              style="margin-top: 20px"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="laypageParam"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
      >
      </el-pagination>
    </div>
    <schllo-add-model ref="modelForm" />
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import schlloAddModel from "./modules/schlloAddModel";

export default {
  name: "studentsList",
  mixins: [myMixins],
  components: {
    schlloAddModel
  },
  data() {
    return {
      searchData: {
        user: "",
        region: ""
      },
      url: {
        list:'/person/studentList',
      }
    };
  },
  methods: {}
};
</script>

<style scoped></style>
