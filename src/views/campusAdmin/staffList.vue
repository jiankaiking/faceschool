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
          placeholder="请输入教师姓名或证件号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="searchData.phone"
          placeholder="请输入教师电话"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchLick">查询</el-button>
        <el-button type="primary" @click="headAdd">新增</el-button>
        <el-button type="warning" @click="downFile">下载模板</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          :headers="headers"
          :on-success="upSuccess"
          :on-progress="onProgress"
          :on-error="onError"
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
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="campusName" label="校区"></el-table-column>
        <el-table-column prop="certificateType" label="证件类型">
          <template slot-scope="scope">
            {{ scope.row.certificateType | getIdCard }}
          </template>
        </el-table-column>
        <el-table-column
          width="250"
          prop="certificateNo"
          label="证件号"
        ></el-table-column>
        <el-table-column prop="personNo" label="教师编号"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
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
    <staff-add-model ref="modelForm" @ok="loadData" />
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import BASE_URL from "../../config/baseUrl";
import staffAddModel from "./modules/staffAddModel";
import schlloSelect from "../../components/select/schlloSelect";
import campusSelect from "../../components/select/campusSelect";
import { deletePerson, changeStatus } from "../../api/api";
import { downloadFile } from "../../api/manage";

export default {
  name: "staffList",
  mixins: [myMixins],
  components: {
    schlloSelect,
    staffAddModel,
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
        queryField: "",
        phone: ""
      },
      url: {
        exportUrl: BASE_URL + "/person/importTeacher",
        list: "/person/teacherList"
      }
    };
  },
  methods: {
    onError() {
      this.loading = false;
    },
    onProgress() {
      this.loading = true;
    },
    upSuccess(e) {
      this.loading = false;
      if (e.code === 200) {
        this.$message.warning(`成功${e.data.success}条,失败${e.data.fail}条`);
        this.loadData();
      } else {
        this.$message.error(e.msg);
      }
    },
    deleteStaff(id) {
      deletePerson({ id }).then(res => {
        if (res.code === 200) {
          this.$refs[`popover-${id}`].doClose();
          this.loadData();
        }else{
          this.$message.error("删除失败")
        }
      });
    },
    downFile() {
      downloadFile("/person/teacherTemplate", "教职工信息表.xlsx");
    },
    statusChange(id, status) {
      changeStatus({ id, status }).then(res => {
        if (res.code === 200) {
          this.loadData();
        }
      });
    },
    changeStatus(row) {
      row.status == 1
        ? this.$confirm("账号关闭之后需要重新签约，是否确定关闭?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.statusChange(row.id, row.status == 0 ? 1 : 0);
            })
            .catch(()=> {

            })
        : this.statusChange(row.id, row.status == 0 ? 1 : 0);
    }
  }
};
</script>

<style scoped></style>
