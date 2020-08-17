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
          type="daterange"
          v-model="searchTime"
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
        <el-button type="primary" @click="searchLick">查询</el-button>
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
        <el-table-column prop="subsidyAmount" label="补贴金额/比例">
          <template slot-scope="scope">
            <span>{{
              scope.row.type == 1
                ? scope.row.subsidyAmount + "元"
                : scope.row.subsidyProportion + "%"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始日期">
          <template slot-scope="scope">
            {{ scope.row.startTime | getTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束日期">
          <template slot-scope="scope">
            {{ scope.row.endTime | getTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="headEdit(scope.row.id)"
              >详情</el-button
            >
            <el-button type="text" @click="go(scope.row.id)"
              >查看数据</el-button
            >
            <el-popover
              width="160"
              :ref="`popover-${scope.row.id}`"
              style="text-align: right; margin-left: 10px;"
            >
              <p>确认删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  type="text"
                  size="mini"
                  @click="
                    scope._self.$refs[`popover-${scope.row.id}`].doClose()
                  "
                >
                  取消
                </el-button>
                <el-button
                  type="success"
                  size="mini"
                  @click="deleteSubsidy(scope.row.id)"
                  >确定</el-button
                >
              </div>
              <el-button type="text" slot="reference">删除</el-button>
            </el-popover>
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
import selectData from "../../components/select/selectData";
import { delSubsidy } from "../../api/api";

export default {
  name: "subsidyList",
  components: { subsidyAddModel },
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        startTime: "",
        endTime: "",
        status: "",
        name: ""
      },
      searchTime: "",
      selectList: selectData.subsidyStatus,
      searchDate: "",
      url: {
        list: "/subsidy/list"
      }
    };
  },
  methods: {
    //删除
    deleteSubsidy(id) {
      delSubsidy({ id }).then(res => {
        if (res.code === 200) {
          this.$refs[`popover-${id}`].doClose();
          this.$message.success(res.msg);
          this.loadData();
        }
      });
    },
    changeDate(e) {
      if (e) {
        this.searchData.startTime = e[0];
        this.searchData.endTime = e[1];
      } else {
        this.searchData.startTime = "";
        this.searchData.endTime = "";
      }
    },
    go(id) {
      this.$router.push(`/subsidy/info?subsidyId=${id}`);
    }
  }
};
</script>

<style scoped></style>
