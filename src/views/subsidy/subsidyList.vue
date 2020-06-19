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
          v-model="searchDate"
          type="daterange"
          @change="changeDate"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <global-select :select-v.sync="searchData.status" type="subsidyStatus" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.name" placeholder="补贴名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button type="primary" @click="headAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | getSubsidyStatus }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            {{ scope.row.type | getSubsidyType }}
          </template>
        </el-table-column>
        <el-table-column prop="object" label="补贴对象">
          <template slot-scope="scope">
            {{ scope.row.object | getSubsidyObject }}
          </template>
        </el-table-column>
        <el-table-column prop="subsidyAmount" label="补贴金额/比例"
          >s
          <template slot-scope="scope">
            <span>{{
              scope.row.type == 1
                ? scope.row.subsidyAmount + "元"
                : scope.row.subsidyProportion + "%"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始日期"></el-table-column>
        <el-table-column prop="endTime" label="结束日期"></el-table-column>
        <el-table-column prop="createTime" label="创建日期"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text" @click="go">详情</el-button>
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
import globalSelect from "../../components/select/globalSelect";

export default {
  name: "subsidyList",
  components: { subsidyAddModel,globalSelect },
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        startTime: "",
        endTime:'',
        status:'',
        name: ""
      },
      searchDate: "",
      url: {
        list: "/subsidy/list"
      }
    };
  },
  methods: {
    changeDate(e){
      this.searchData.startTime = e[0]
      this.searchData.endTime = e[1]
    },
    go() {
      this.$router.push("/subsidy/info");
    }
  }
};
</script>

<style scoped></style>
