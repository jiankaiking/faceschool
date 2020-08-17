<template>
  <div class="padding-view">
    <el-form
      class="search-form"
      ref="searchForm"
      :inline="true"
      :model="searchData"
    >
      <el-form-item>
        <el-input
          v-model="searchData.campusName"
          placeholder="输入学区名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchLick">查询</el-button>
        <el-button type="primary" @click="headAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="schoolName" label="学校名称"></el-table-column>
        <el-table-column prop="campusName" label="校区"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column
          prop="educationStage"
          label="教育阶段"
        ></el-table-column>
        <el-table-column prop="schoolSystem" label="学制"></el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column
          prop="contactNumber"
          label="联系方式"
        ></el-table-column>
        <el-table-column prop="schoolIntroduction" label="介绍">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.schoolIntroduction"
              placement="top"
            >
              <div class="no-warp">{{ scope.row.schoolIntroduction }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="headEdit(scope.row.id)"
              >编辑</el-button
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
    <campus-add-model @ok="loadData" ref="modelForm" />
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import campusAddModel from "./modules/campusAddModel";

export default {
  name: "campusList",
  mixins: [myMixins],
  components: {
    campusAddModel
  },
  data() {
    return {
      searchData: {
        campusName: ""
      },
      url: {
        list: "/school/campusList"
      }
    };
  },
  methods: {}
};
</script>

<style scoped></style>
