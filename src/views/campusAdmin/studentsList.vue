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
          v-model="searchData.queryField"
          placeholder="请输入学生姓名或证件号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="searchData.classNo"
          placeholder="请输入班级编号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button type="primary" @click="headAdd">新增</el-button>
        <el-button type="warning" @click="downFile">导出模板</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          :headers="headers"
          :on-success="upSuccess"
          accept=".xlsx"
          action="http://192.168.0.166:8085/person/importStudent"
          :with-credentials="true"
          :show-file-list="false"
        >
          <el-button type="warning">导入</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
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
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="campusName" label="校区"></el-table-column>
        <el-table-column prop="classNo" label="班级编号"></el-table-column>
        <el-table-column
          prop="educationStage"
          label="教育阶段"
        ></el-table-column>
        <el-table-column prop="schoolSystem" label="学制"></el-table-column>
        <el-table-column
          prop="enrollmentTime"
          label="入学时间"
        ></el-table-column>
        <el-table-column prop="guardian" label="监护人"></el-table-column>
        <el-table-column
          prop="guardianPhone"
          label="监护人/本人手机号"
        ></el-table-column>
        <el-table-column prop="faceVerification" label="人脸核验">
          <template slot-scope="scope">
            {{ scope.row.faceVerification | getFaceStatus }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="账号状态">
          <template slot-scope="scope">
            <el-button type="text" @click="changeStatus(scope.row)">
              <el-switch
                :active-value="'1'"
                :inactive-value="'0'"
                :value="scope.row.status"
              >
              </el-switch>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="headEdit(scope.row.id)">编辑</el-button>
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
    <student-add-model ref="modelForm" @ok="loadData"/>
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import studentAddModel from "./modules/studentAddModel";
import schlloSelect from "../../components/select/schlloSelect";
import campusSelect from "../../components/select/campusSelect";
import { deletePerson, changeStatus } from "../../api/api";
import { downloadFile } from "../../api/manage";

export default {
  name: "studentsList",
  mixins: [myMixins],
  components: {
    studentAddModel,
    schlloSelect,
    campusSelect
  },
  data() {
    return {
      headers: {
        Authorization: "Bearer " + this.$store.state.token
      },
      searchData: {
        schoolId: "",
        campusId: "",
        classNo: "",
        queryField: ""
      },
      url: {
        list: "/person/studentList"
      }
    };
  },
  methods: {
    deleteStaff(id) {
      deletePerson({ id }).then(res => {
        if (res.code === 200) {
          this.loadData();
        }
      });
    },
    upSuccess(e) {
      if (e.code === 200) {
        this.loadData();
      }
    },
    downFile() {
      downloadFile("/person/studentTemplate", "学生信息表.xlsx");
    },
    changeStatus(row) {
      changeStatus({ id: row.id, status: row.status == 0 ? 1 : 0 }).then(
        res => {
          if (res.code === 200) {
            this.loadData();
          }
        }
      );
    }
  }
};
</script>

<style scoped></style>
