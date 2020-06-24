<template>
  <div class="subsidy-info-view">
    <div class="info-header">
      <span>补贴名称:{{topInfo.name}}</span>
      <span class="line">|</span>
      <span>补贴有效期:{{topInfo.startTime}} 至 {{topInfo.endTime}}</span>
      <span class="line">|</span>
      <span>共补贴:{{topInfo.totalCount}}笔</span>
      <span class="line">|</span>
      <span>总金额:{{topInfo.totalAmount}}笔</span>
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
        @change="changeTime"
        v-model="value"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <span class="line"></span>
      <el-button plain type="primary" @click="loadData">搜索</el-button>
      <el-button type="warning">导出</el-button>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="personNo"
          label="学籍编号/教师编号"
        ></el-table-column>
        <el-table-column prop="amount" label="订单金额"></el-table-column>
        <el-table-column prop="orderAmount" label="补贴金额"></el-table-column>
        <el-table-column prop="createTime" label="补贴时间"></el-table-column>
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
import {subsidyInfoData} from "../../../api/api";

export default {
  name: "subsidyInfo",
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        startTime: "",
        endTime: ""
      },
      topInfo:{},
      value: "",
      url: {
        list: `/manage/subsidy/data/list?subsidyId=${this.$route.query.subsidyId}`
      }
    };
  },
  mounted(){
    this.subsidyInfoData()
  },
  methods: {
    subsidyInfoData(){
      subsidyInfoData({subsidyId:this.$route.query.subsidyId}).then(res=>{
        if(res.code === 200){
          this.topInfo = res.data;
        }
      })
    },
    changeTime(e) {
      this.searchData.startTime = e[0];
      this.searchData.endTime = e[1];
    }
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
