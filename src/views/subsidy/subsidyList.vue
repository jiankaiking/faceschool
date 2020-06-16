<template>
  <div class="padding-view">
    <el-form
      class="search-form"
      ref="searchForm"
      :inline="true"
      :model="searchData"
    >
      <el-form-item>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="value1">
          <el-option lable="123" value="1">

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.user" placeholder="补贴名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button type="primary" @click="headAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="编号"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
        <el-table-column prop="address" label="名称"></el-table-column>
        <el-table-column prop="date" label="类型"></el-table-column>
        <el-table-column prop="name" label="补贴对象"></el-table-column>
        <el-table-column prop="address" label="补贴金额/比例"></el-table-column>
        <el-table-column prop="date" label="开始日期"></el-table-column>
        <el-table-column prop="date" label="结束日期"></el-table-column>
        <el-table-column prop="name" label="创建日期"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">详情</el-button>
            <el-button type="text">查看数据</el-button>
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
    <subsidy-add-model ref="modelForm" />
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import subsidyAddModel from "./modules/subsidyAddModel";

export default {
  name: "subsidyList",
  components:{subsidyAddModel},
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        user: "",
        region: ""
      },
      value1: "",
      url: {}
    };
  },
  methods: {}
};
</script>

<style scoped></style>
