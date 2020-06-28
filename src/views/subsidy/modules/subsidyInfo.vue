<template>
  <div class="subsidy-info-view">
    <div class="info-header">
      <span>补贴名称:{{ topInfo.name }}</span>
      <span class="line">|</span>
      <span>补贴有效期:{{ topInfo.startTime }} 至 {{ topInfo.endTime }}</span>
      <span class="line">|</span>
      <span>共补贴:{{ topInfo.totalCount }}笔</span>
      <span class="line">|</span>
      <span>总金额:{{ topInfo.totalAmount }}笔</span>
      <span class="line"></span>
      <el-date-picker
        v-model="chartTime"
        @change="changeChartTime"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <span class="line"></span>
      <el-button plain type="primary" @click="getSubChart">搜索</el-button>
      <el-button type="success" @click="changeType(0)">补贴金额</el-button>
      <el-button plain type="success" @click="changeType(1)">补贴笔数</el-button>
    </div>
    <div class="center-chart">
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </div>
    <div class="info-header">
      <el-date-picker
        @change="changeTime"
        v-model="tableTime"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <span class="line"></span>
      <el-button plain type="primary" @click="loadData">搜索</el-button>
      <el-button type="warning" @click="dowm">导出</el-button>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column width="60" type="index" label="序号"></el-table-column>
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
import { downloadFile } from "../../../api/manage";
import { subsidyInfoData ,subchart} from "../../../api/api";

export default {
  name: "subsidyInfo",
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        startTime: "",
        endTime: ""
      },
      chartData:{
        subsidyId:this.$route.query.subsidyId,
        startTime:'',
        endTime:'',
        type:0
      },
      chartTime: "",
      topInfo: {},
      totalArr:[0],
      mouthArr:[0],
      tableTime: "",
      url: {
        list: `/manage/subsidy/data/list?subsidyId=${this.$route.query.subsidyId}`
      }
    };
  },
  mounted() {
    this.subsidyInfoData();
    this.getSubChart()
  },
  methods: {
    getSubChart(){
      subchart(this.chartData).then(res=>{
        if(res.code == 200 && res.data.length > 0){
          this.totalArr = res.data.map(i => i.total)
          this.mouthArr = res.data.map(i => i.date)

        }
        this.drawLine()
      })
    },
    changeType(e){
      this.chartData.type = e;
      this.getSubChart()
    },
    dowm() {
      let data = {
        subsidyId: this.$route.query.subsidyId,
        startTime: this.searchData.startTime,
        endTime: this.searchData.endTime
      };
      if (data.startTime == "" || data.endTime == "") {
        this.$message.error("开始时间或结束时间不能空");
        return;
      }
      downloadFile("/manage/subsidy/data/export", "补贴金数据.xlsx", data);
    },
    subsidyInfoData() {
      subsidyInfoData({ subsidyId: this.$route.query.subsidyId }).then(res => {
        if (res.code === 200) {
          this.topInfo = res.data;
        }
      });
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        animationDuration: 100,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.mouthArr
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.chartData.type == 0?'补贴金额':'补贴笔数',
            type: 'line',
            stack: '总量',
            itemStyle:{
              color: '#3495FD'
            },
            areaStyle: {
              color: '#3495FD'
            },
            data: this.totalArr
          },

        ]
      });
    },
    changeChartTime(e){
      if (e == null) {
        this.chartTime = "";
        this.chartData.startTime = "";
        this.chartData.endTime = "";
      } else {
        this.chartData.startTime = e[0];
        this.chartData.endTime = e[1];
      }
    },
    changeTime(e) {
      if (e == null) {
        this.value1 = "";
        this.searchData.startTime = "";
        this.searchData.endTime = "";
      } else {
        this.searchData.startTime = e[0];
        this.searchData.endTime = e[1];
      }
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
