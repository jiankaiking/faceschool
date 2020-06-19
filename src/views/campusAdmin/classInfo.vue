<template>
  <div class="subsidy-info-view">
    <div class="info-header">
      <span>学校：{{ classInfo.schoolName }}</span>
      <span class="line">|</span>
      <span>校区：{{ classInfo.campusName }}</span>
      <span class="line">|</span>
      <span>教育阶段：{{ classInfo.educationStage }}</span>
      <span class="line">|</span>
      <span>学制：{{ classInfo.schoolSystem }}</span>
      <span class="line"></span>
      <span>班级编号：{{ classInfo.classNo }}</span>
      <span class="line">|</span>
      <span>班级名称：{{ classInfo.className }}</span>
      <span class="line">|</span>
      <span>开班时间：{{ classInfo.openingTime }}</span>
      <span class="line">|</span>
      <span>学生人数：{{ classInfo.studentCount }}</span>
      <span class="line"></span>
      <el-button type="success">学生信息</el-button>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="certificateType" label="证件类型">
          <template slot-scope="scope">
            {{ scope.row.certificateType | getIdCard }}
          </template>
        </el-table-column>
        <el-table-column prop="certificateNo" label="证件号"></el-table-column>
        <el-table-column prop="personNo" label="学籍号"></el-table-column>
        <el-table-column
          prop="enrollmentTime"
          label="入学时间"
        ></el-table-column>
        <el-table-column prop="guardian" label="监护人"></el-table-column>
        <el-table-column
          prop="guardianPhone"
          label="监护人/本人手机号"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="headEdit(scope.row.id)"
              >编辑</el-button
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
                  @click="deleteStaff(scope.row.id)"
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
    <student-add-model ref="modelForm" @ok="loadData" />
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import { classInfo, deletePerson } from "../../api/api";
import studentAddModel from "./modules/studentAddModel";

export default {
  name: "classInfo",
  mixins: [myMixins],
  components: { studentAddModel },
  data() {
    return {
      classInfo: {},
      url: {
        list: "/person/studentList?classNo=" + this.$route.query.id
      }
    };
  },
  mounted() {
    classInfo({ id: this.$route.query.id }).then(res => {
      if (res.code === 200) this.classInfo = res.data;
    });
  },
  methods: {
    deleteStaff(id) {
      deletePerson({ id }).then(res => {
        if (res.code === 200) {
          this.loadData();
        }
      });
    }
  }
};
</script>

<style scoped>
.info-header {
  background: #ffffff;
  padding: 10px 30px;
  color: #000;
  font-size: 14px;
  margin-bottom: 20px;
}
.line {
  color: #4ebd73;
  font-size: 18px;
  margin: 0 8px;
}
</style>
