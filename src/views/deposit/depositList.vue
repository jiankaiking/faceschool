<template>
  <div class="padding-view">
    <div class="role-nav">
      <span :class="{ active: role == 0 }" @click="role = 0">学生</span><span>|</span
      ><span :class="{ active: role == 1 }" @click="role = 1">教师</span>
    </div>
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
          <el-option lable="123" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.user" placeholder="补贴名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button type="primary" @click="headAdd">导入</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="姓名"></el-table-column>
        <el-table-column prop="name" label="学籍号"></el-table-column>
        <el-table-column prop="address" label="学校"></el-table-column>
        <el-table-column prop="date" label="校区"></el-table-column>
        <el-table-column prop="name" label="班级编号"></el-table-column>
        <el-table-column prop="address" label="押金余额"></el-table-column>
        <el-table-column prop="date" label="开始日期"></el-table-column>
        <el-table-column prop="date" label="结束日期"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">充值</el-button>
            <el-button type="text">详情</el-button>
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
  </div>
</template>

<script>
import myMixins from "../../config/mixins";

export default {
  name: "blackList",
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        user: "",
        region: ""
      },
      role: 0,
      value1: "",
      url: {
        list: ""
      }
    };
  }
};
</script>

<style scoped>
.role-nav {
  background: #ffffff;
  padding: 15px 0;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.role-nav span {
  color: #828282;
  padding: 15px;
  cursor: pointer;
  font-size: 14px;
}
.role-nav span.active{
    color: #000;
}
.role-nav span:nth-child(2) {
  color: #7ecf99;
  padding: 0;
  font-size: 16px;
  cursor: default;
}
</style>
