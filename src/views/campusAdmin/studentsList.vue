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
        <el-button type="primary" @click="loadData">新增</el-button>
        <el-button type="warning" @click="loadData">导入</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="姓名"></el-table-column>
        <el-table-column prop="name" label="证件类型"></el-table-column>
        <el-table-column prop="address" label="证件号"></el-table-column>
        <el-table-column prop="date" label="学籍号"></el-table-column>
        <el-table-column prop="name" label="学校"></el-table-column>
        <el-table-column prop="address" label="校区"></el-table-column>
        <el-table-column prop="date" label="班级编号"></el-table-column>
        <el-table-column prop="date" label="教育阶段"></el-table-column>
        <el-table-column prop="name" label="学制"></el-table-column>
        <el-table-column prop="address" label="入学时间"></el-table-column>
        <el-table-column prop="date" label="监护人"></el-table-column>
        <el-table-column
          prop="name"
          label="监护人/本人手机号"
        ></el-table-column>
        <el-table-column prop="address" label="人脸核验"></el-table-column>
        <el-table-column prop="date" label="账号状态"></el-table-column>
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import myMixins from "../../config/mixins";

export default {
  name: "studentsList",
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        user: "",
        region: ""
      },
      url: {}
    };
  },
  methods: {}
};
</script>

<style scoped></style>
