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
          @change="getTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchData.status">
          <el-option
            v-for="item in statusArr"
            :label="item.value"
            :value="item.code"
            :key="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="searchData.orderNo"
          placeholder="输入订单号/支付单号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.deviceNo" placeholder="输入设备号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="name" label="支付单号"></el-table-column>
        <el-table-column prop="deviceNo" label="设备号"></el-table-column>
        <el-table-column prop="createTime" label="收款时间"></el-table-column>
        <el-table-column prop="amount" label="订单金额"></el-table-column>
        <el-table-column prop="discountsAmount" label="优惠金额"></el-table-column>
        <el-table-column prop="realAmount" label="实收金额"></el-table-column>
        <el-table-column prop="refundAmount" label="退款金额"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="personNo" label="学籍编号/教师编号"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">详情</el-button>
            <el-button type="text">退款</el-button>
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
import selectData from "../../components/select/selectData";
export default {
  name: "orderlist",
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        status: "",
        startTime:'',
        endTime:'',
        orderNo: "",
        deviceNo:'',
      },
      statusArr:selectData.orderStatus,
      value1: "",
      url: {
        list:'/manage/order/list',
      }
    };
  },
  methods: {
    getTime(e){
      this.searchData.startTime = e[0]
      this.searchData.endTime = e[1]
    },
  }
};
</script>

<style scoped></style>
