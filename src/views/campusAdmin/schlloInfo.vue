<template>
  <div class="padding-view">
    <el-form
      class="search-form"
      ref="searchForm"
      :inline="true"
      :model="searchData"
    >
      <el-form-item >
        <el-input v-model="searchData.user" placeholder="输入学校名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button type="primary" @click="loadData">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="学校名称"></el-table-column>
        <el-table-column prop="name" label="教育阶段"></el-table-column>
        <el-table-column prop="address" label="学制"></el-table-column>
        <el-table-column prop="date" label="地址"></el-table-column>
        <el-table-column prop="name" label="联系人"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column>
        <el-table-column prop="date" label="介绍"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">补参</el-button>
            <el-button type="text">编辑</el-button>
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
    <schlloAddModel></schlloAddModel>
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import schlloAddModel from "./modules/schlloAddModel";

export default {
  name: "schlloInfo",
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
        list:'get/data/list'
      }
    };
  },
  methods: {}
};
</script>

<style scoped></style>
