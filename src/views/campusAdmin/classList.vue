<template>
  <div class="padding-view">
    <el-form
      class="search-form"
      ref="searchForm"
      :inline="true"
      :model="searchData"
    >
      <el-form-item>
        <schllo-select :schoolName.sync="searchData.schoolId" />
      </el-form-item>
      <el-form-item>
        <campus-select
          :schoolName.sync="searchData.schoolId"
          :campusId.sync="searchData.campusId"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="searchData.classNo"
          @change="inputChange"
          placeholder="输入班级编号"
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
        <el-table-column
          prop="educationStage"
          label="教育阶段"
        ></el-table-column>
        <el-table-column prop="schoolSystem" label="学制"></el-table-column>
        <el-table-column prop="classNo" label="班级编号"></el-table-column>
        <el-table-column prop="className" label="班级名称"></el-table-column>
        <el-table-column prop="openingTime" label="开班时间"></el-table-column>
        <el-table-column prop="studentCount" label="班级人数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="headEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="go(scope.row.id, scope.row.classNo)"
              >详情</el-button
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
    <class-add-model ref="modelForm" @ok="loadData" />
  </div>
</template>

<script>
import classAddModel from "./modules/classAddModel";
import myMixins from "../../config/mixins";
import schlloSelect from "../../components/select/schlloSelect";
import campusSelect from "../../components/select/campusSelect";
export default {
  name: "classList",
  mixins: [myMixins],
  components: {
    classAddModel,
    schlloSelect,
    campusSelect
  },
  data() {
    return {
      searchData: {
        classNo: null,
        schoolId: "",
        campusId: ""
      },
      url: {
        list: "/class/list"
      }
    };
  },
  methods: {
    go(id, classNo) {
      this.$router.push(`/class/info?id=${id}&classNo=${classNo}`);
    },
    inputChange(e) {
      this.searchData.classNo = e === "" ? null : e;
    }
  }
};
</script>

<style scoped></style>
