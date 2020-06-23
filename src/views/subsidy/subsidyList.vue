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
        <el-select v-model="searchData.status">
            <el-option
                    v-for="(item, index) in selectList"
                    :key="index"
                    :value="item.code"
                    :label="item.value"
            ></el-option>
        </el-select>

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
          <template slot-scope="scope">
            <el-button type="text" @click="headEdit(scope.row.id)">详情</el-button>
            <el-button type="text" @click="go">查看数据</el-button>
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
    <subsidy-add-model @ok="loadData" ref="modelForm" />
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import subsidyAddModel from "./modules/subsidyAddModel";

export default {
  name: "subsidyList",
  components: { subsidyAddModel },
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        startTime: "",
        endTime:'',
        status:'',
        name: ""
      },
      selectList: [
        { code: "0", value: "未生效" },
        { code: "1", value: "生效中" },
        { code: "2", value: "已过期" },
      ],
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
