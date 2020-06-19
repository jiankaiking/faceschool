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
          v-model="searchData.schoolName"
          placeholder="输入学校名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button type="primary" @click="headAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table v-loading="loading" element-loading-text="正在加载中"  :data="tableData" border style="width: 100%">
        <el-table-column prop="schoolName" label="学校名称"></el-table-column>
        <el-table-column prop="educationStage" label="教育阶段"></el-table-column>
        <el-table-column prop="schoolSystem" label="学制"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column prop="contactNumber" label="联系电话"></el-table-column>
        <el-table-column prop="schoolIntroduction" label="介绍"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="fillAnd(scope.row.id)">补参</el-button>
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
    <schlloAddModel ref="modelForm"></schlloAddModel>
    <add-supplement ref="suppment" />
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import schlloAddModel from "./modules/schlloAddModel";
import addSupplement from "./modules/addSupplement";

export default {
  name: "schlloInfo",
  mixins: [myMixins],
  components: {
    schlloAddModel,
    addSupplement
  },
  data() {
    return {
      searchData: {
        schoolName: "",
      },
      a: "teaching",
      url: {
        list: "/school/list"
      }
    };
  },
  methods: {
    fillAnd(id){
      this.$refs['suppment'].add(id)
    },
  }
};
</script>

<style scoped></style>
