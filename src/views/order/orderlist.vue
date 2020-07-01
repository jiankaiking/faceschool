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
          v-model="value1"
          value-format="yyyy-MM-dd"
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
        <el-input
          v-model="searchData.deviceNo"
          placeholder="输入设备号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchLick">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column
          width="300"
          prop="orderNo"
          label="订单号"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="deviceNo"
          label="设备号"
        ></el-table-column>
        <el-table-column
          width="190"
          prop="createTime"
          label="收款时间"
        ></el-table-column>
        <el-table-column prop="amount" label="订单金额"></el-table-column>
        <el-table-column
          prop="discountsAmount"
          label="优惠金额"
        ></el-table-column>
        <el-table-column prop="realAmount" label="实收金额"></el-table-column>
        <el-table-column prop="refundAmount" label="退款金额"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="personNo"
          label="学籍编号/教师编号"
        ></el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            {{ scope.row.state | getOrderStatus }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="headEdit(scope.row.orderId)"
              >详情</el-button
            >
            <el-button
              v-if="scope.row.state == 2 || scope.row.state == 3"
              type="text"
              @click="refund(scope.row)"
              >退款</el-button
            >
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
    <order-info ref="modelForm" />
    <order-refund-model @ok="loadData" ref="orderRefund" />
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import selectData from "../../components/select/selectData";
import orderInfo from "./modules/orderInfo";
import orderRefundModel from "./modules/orderRefund";
export default {
  name: "orderlist",
  mixins: [myMixins],
  components: {
    orderInfo,
    orderRefundModel
  },
  data() {
    return {
      searchData: {
        status: "",
        startTime: "",
        endTime: "",
        orderNo: "",
        deviceNo: ""
      },
      statusArr: selectData.orderStatus,
      value1: "",
      url: {
        list: "/manage/order/list"
      }
    };
  },
  methods: {
    getTime(e) {
      if (e) {
        this.searchData.startTime = e[0];
        this.searchData.endTime = e[1];
      } else {
        this.searchData.startTime = "";
        this.searchData.endTime = "";
      }
    },
    refund(row) {
      console.log(row);
      this.$refs["orderRefund"].refund(row);
    }
  }
};
</script>

<style scoped></style>
