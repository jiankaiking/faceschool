<template>
  <div class="padding-view">
    <div class="role-nav">
      <span :class="{ active: role == 0 }" @click="changeRole(0)"
        >黑名单列表</span
      ><span>|</span
      ><span :class="{ active: role == 1 }" @click="changeRole(1)"
        >黑名单金额设置</span
      >
    </div>
    <el-form
      v-if="role == 0"
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
        <el-select v-model="searchData.type" placeholder="选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="学生" value="2"></el-option>
          <el-option label="教师" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="searchData.personNo"
          placeholder="教师/学生编号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchLick" plain>搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="set-btn" v-if="role == 1">
      <el-button type="success" plain @click="headAdd">设置</el-button>
    </div>
    <div class="table-box">
      <el-table
        v-if="role == 0"
        :key="1"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            {{ scope.row.type == 1 ? "教职工" : "学生" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="personNo"
          label="学籍号/教师编号"
        ></el-table-column>
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="campusName" label="校区"></el-table-column>
        <el-table-column prop="amount" label="押金余额"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="removeBalck(scope.row)"
              >移除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="role == 1"
        :key="2"
        :data="blackSetTable"
        border
        style="width: 100%"
      >
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="campusName" label="校区">
          <template slot-scope="scope">
            {{ scope.row.campusName }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="黑名单金额设置"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="setMoney(scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="setData.page"
        :page-sizes="laypageParam"
        :page-size="setData.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="role == 0 ? total : setTotal"
      >
      </el-pagination>
    </div>
    <remove-black-model @ok="loadData" ref="removeModel" />
    <black-setting @ok="getSetingList" ref="modelForm" />
  </div>
</template>

<script>
import myMixins from "../../config/mixins";
import { settingList, settingBlack } from "../../api/api";
import schlloSelect from "../../components/select/schlloSelect";
import campusSelect from "../../components/select/campusSelect";
import removeBlackModel from "./modules/removeBlackModel";
import blackSetting from "./modules/blackSetting";

export default {
  name: "blackList",
  mixins: [myMixins],
  components: {
    schlloSelect,
    removeBlackModel,
    blackSetting,
    campusSelect
  },
  data() {
    return {
      searchData: {
        schoolId: "",
        type: "",
        personNo: "",
        campusId: ""
      },
      role: 0,
      setTotal: 0,
      setData: {
        size: 10,
        page: 1
      },
      blackSetTable: [],
      url: {
        list: "/black/list"
      }
    };
  },
  methods: {
    changeRole(e) {
      this.role = e;
      e == 0 && this.loadData();
      e == 1 && this.getSetingList();
    },
    getSetingList() {
      settingList(this.setData).then(res => {
        if (res.code === 200) {
          this.blackSetTable = res.data.records;
          this.setTotal = res.data.total;
        }
      });
    },
    setMoney(row) {
      this.$prompt("请输入金额", "", {
        confirmButtonText: "确定",
        inputValue: row.amount,
        inputType: "number",
        inputValidator: function(val) {
          if (val < 0) {
            return "输入正确的金额";
          }
        },
        inputErrorMessage: "输入正确的金额",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          settingBlack({ campusId: row.campusId, amount: value }).then(res => {
            if (res.code === 200) {
              this.getSetingList();
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(e) {
      if (this.role == 0) {
        this.size = e;
        this.loadData();
      } else {
        this.setData.size = e;
        this.getSetingList();
      }
    },
    handleCurrentChange(e) {
      if (this.role == 0) {
        this.page = e;
        this.loadData();
      } else {
        this.setData.page = e;
        this.getSetingList();
      }
    },
    removeBalck(row) {
      this.$refs["removeModel"].blackInfo(row);
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
.set-btn {
  background: #ffffff;
  padding: 10px 30px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.role-nav span:nth-child(2) {
  color: #7ecf99;
  padding: 0;
  font-size: 16px;
  cursor: default;
}
</style>
