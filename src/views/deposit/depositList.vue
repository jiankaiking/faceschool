<template>
  <div class="padding-view">
    <div class="role-nav">
      <span :class="{ active: role == 0 }" @click="changeRole(0)">学生</span
      ><span>|</span
      ><span :class="{ active: role == 1 }" @click="changeRole(1)">教师</span>
    </div>
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
      <el-form-item v-if="role == 0">
        <el-input
          v-model="searchData.classNo"
          placeholder="请输入班级编号"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="role == 0">
        <el-input
          v-model="searchData.name"
          placeholder="请输入学生姓名"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="role == 1">
        <el-input
          v-model="searchData.queryfield"
          placeholder="请输入教师编号"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="role == 1">
        <el-input
          v-model="searchData.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchLick">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          :headers="headers"
          :on-success="upSuccess"
          accept=".xlsx"
          :action="url.exportUrl"
          :with-credentials="true"
          :show-file-list="false"
        >
          <el-button type="warning">导入</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

    <div class="table-box">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-if="role == 0"
        v-loading="loading"
      >
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="personNo" label="学籍号"></el-table-column>
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="campusName" label="校区"></el-table-column>
        <el-table-column prop="classNo" label="班级编号"></el-table-column>
        <el-table-column prop="amount" label="押金余额"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="rechargePay(scope.row)"
              >充值</el-button
            >
            <el-button
              type="text"
              @click="headEdit({ id: scope.row.id, role: role })"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-if="role == 1"
        v-loading="loading"
      >
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="campusName" label="校区"></el-table-column>
        <el-table-column prop="personNo" label="教师编号"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="amount" label="押金余额"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="rechargePay(scope.row)"
              >充值</el-button
            >
            <el-button
              type="text"
              @click="headEdit({ id: scope.row.id, role: role })"
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
    <depositInfo ref="modelForm" />
    <depositPay ref="payForm" @ok="loadData" />
  </div>
</template>

<script>
import BASE_URL from "../../config/baseUrl";
import myMixins from "../../config/mixins";
import depositInfo from "./modules/depositInfo";
import depositPay from "./modules/depositPay";
import schlloSelect from "../../components/select/schlloSelect";
import campusSelect from "../../components/select/campusSelect";
export default {
  name: "blackList",
  components: {
    schlloSelect,
    depositPay,
    campusSelect,
    depositInfo
  },
  mixins: [myMixins],
  data() {
    return {
      searchData: {
        schoolId: "",
        campusId: "",
        classNo: null,
        name: null,
        queryfield: null,
        phone: null
      },
      headers: {
        Authorization: "Bearer " + this.$store.state.token
      },
      role: 0,
      value1: "",
      url: {
        exportUrl: BASE_URL + "/deposit/import",
        list: "/deposit/studentDepositList" ///deposit/teacherDepositList
      }
    };
  },
  methods: {
    rechargePay(row) {
      this.$refs["payForm"].payInfo(row);
    },
    changeRole(e) {
      this.role = e;
      this.url.list =
        e == 0 ? "/deposit/studentDepositList" : "/deposit/teacherDepositList";
      Object.keys(this.searchData).forEach(key => {
        this.searchData[key] = "";
      });
      this.loadData();
    },
    upSuccess(e) {
      if (e.code === 200) {
        this.$message.success("导入成功");
      }else{
        this.$message.error("导入失败");
      }
    }
  }
};
</script>

<style scoped>
.role-nav {
  background: #ffffff;
  padding: 15px 0;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.role-nav span {
  color: #828282;
  padding: 15px;
  cursor: pointer;
  font-size: 14px;
}
.role-nav span.active {
  color: #000;
}
.role-nav span:nth-child(2) {
  color: #7ecf99;
  padding: 0;
  font-size: 16px;
  cursor: default;
}
</style>
