<template>
  <div class="padding-view">
    <el-form
      class="search-form"
      ref="searchForm"
      :inline="true"
      :model="searchData"
    >
      <el-form-item>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="searchData.classNo"
          @change="inputChange"
          placeholder="输入班级编号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button type="primary" @click="headAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="schoolName" label="学校名称"></el-table-column>
        <el-table-column prop="campusName" label="校区"></el-table-column>
        <el-table-column
          prop="educationStage"
          label="教育阶段"
        ></el-table-column>
        <el-table-column prop="schoolSystem" label="学制"></el-table-column>
        <el-table-column prop="classNo" label="班级编号"></el-table-column>
        <el-table-column prop="className" label="班级名称"></el-table-column>
        <el-table-column prop="openingTime" label="开班时间"></el-table-column>
        <el-table-column prop="classSize" label="班级人数"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">详情</el-button>
            <el-button type="text">编辑</el-button>
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
  name: "classList",
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        classNo: null,
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: "",
      url: {
        list: "/class/list"
      }
    };
  },
  methods: {
    inputChange(e) {
      this.searchData.classNo = e === "" ? null : e;
    }
  }
};
</script>

<style scoped></style>
