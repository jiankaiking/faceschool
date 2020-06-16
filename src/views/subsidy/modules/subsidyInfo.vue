<template>
  <div class="subsidy-info-view">
    <div class="info-header">
      <span>补贴名称:教室餐补</span>
      <span class="line">|</span>
      <span>补贴有效期:2020-05-05 00:00:00 至 2020-05-05 00:00:00</span>
      <span class="line">|</span>
      <span>共补贴:0笔</span>
      <span class="line">|</span>
      <span>共补贴:0笔</span>
      <span class="line"></span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <span class="line"></span>
      <el-button plain type="primary">搜索</el-button>
      <el-button type="success">补贴金额</el-button>
      <el-button plain type="success">补贴笔数</el-button>
    </div>
    <div class="center-chart"></div>
    <div class="info-header">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <span class="line"></span>
      <el-button plain type="primary">搜索</el-button>
      <el-button type="warning">导出</el-button>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="姓名"></el-table-column>
        <el-table-column prop="name" label="证件类型"></el-table-column>
        <el-table-column prop="address" label="证件号"></el-table-column>
        <el-table-column prop="date" label="学籍号"></el-table-column>
        <el-table-column prop="name" label="入学时间"></el-table-column>
        <el-table-column prop="address" label="监护人"></el-table-column>
        <el-table-column prop="date" label="监护人/本人手机号"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">编辑</el-button>
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
  </div>
</template>

<script>
import myMixins from "../../../config/mixins";
export default {
  name: "subsidyInfo",
  mixins: [myMixins],
  data() {
    return {
      value1: ""
    };
  }
};
</script>

<style scoped>
.info-header {
  background: #ffffff;
  padding: 10px 30px;
  color: #000;
  font-size: 14px;
  margin-bottom: 20px;
}
.line {
  color: #4ebd73;
  font-size: 18px;
  margin: 0 8px;
}
.center-chart {
  background: #ffffff;
  margin-bottom: 20px;
  height: 400px;
}
</style>
