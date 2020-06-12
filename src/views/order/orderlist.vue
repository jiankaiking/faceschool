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
        <el-select>
          <el-option>

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.user" placeholder="输入订单号/支付单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.user" placeholder="输入设备号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="订单号"></el-table-column>
        <el-table-column prop="name" label="支付单号"></el-table-column>
        <el-table-column prop="address" label="设备号"></el-table-column>
        <el-table-column prop="date" label="收款时间"></el-table-column>
        <el-table-column prop="name" label="订单金额"></el-table-column>
        <el-table-column prop="address" label="优惠金额"></el-table-column>
        <el-table-column prop="date" label="实收金额"></el-table-column>
        <el-table-column prop="date" label="退款金额"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="address"
          label="学籍编号/教师编号"
        ></el-table-column>
        <el-table-column prop="date" label="状态"></el-table-column>
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
  name: "orderlist",
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        user: "",
        region: ""
      },
      value1:'',
      url: {}
    };
  },
  methods: {}
};
</script>

<style scoped></style>
