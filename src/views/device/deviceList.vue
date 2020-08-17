<template>
  <div class="padding-view">
    <el-form
      class="search-form"
      ref="searchForm"
      :inline="true"
      :model="searchData"
    >
      <el-form-item label="设备SN:">
        <el-input
          v-model="searchData.device_sn"
          @change="inputChange"
          placeholder="设备SN"
        ></el-input>
      </el-form-item> 
      <el-form-item>
        <el-button type="primary" @click="searchLick">查询</el-button>
        <el-button type="primary" @click="headAdd">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="biz_tid" label="设备id"></el-table-column>
        <el-table-column prop="biz_type" label="设备使用业务场景"></el-table-column>
        <el-table-column prop="merchant_pid" label="所属学校"></el-table-column>
        <el-table-column prop="shop_id" label="所属门店"></el-table-column>
        <el-table-column prop="isv_pid" label="所属ISV"></el-table-column>
        <el-table-column prop="status" label="机具状态">
          <template slot-scope="scope">
            {{scope.row.status=='UNREGISTER'?'未注册':scope.row.status=='ACTIVED'?'已激活':scope.row.status=='UNACTIVED'?'未激活':'--'}}
          </template>
        </el-table-column>
         <el-table-column
          prop="bind_status"
          label="机具绑定状态"
        >
        <template slot-scope="scope">
            {{scope.row.bind_status=='BIND'?'已绑定':scope.row.bind_status=='UNBIND'?'未绑定':'--'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="headAdd" v-if="scope.row.status=='UNREGISTER'">注册</el-button>
            <!-- <el-button type="text" @click="go(scope.row.id, scope.row.classNo)" v-if="scope.row.bind_status=='UNBIND'">绑定</el-button> -->
            <el-button type="text" @click="toBindModel(scope.row.id)">绑定</el-button>

            <el-button type="text" v-if="scope.row.bind_status=='BIND'">解绑</el-button>
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
    <device-add-model ref="modelForm" @ok="loadData" />
    <bind-model ref="bindModel"/>
  </div>
</template>

<script>
import deviceAddModel from "./modules/deviceAddModel";
import bindModel from "./modules/bindModel";
import myMixins from "../../config/mixins";
export default {
  name: "deviceList",
  mixins: [myMixins],
  components: {
    deviceAddModel,
    bindModel
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
    toBindModel(device_sn) {
      this.$refs["bindModel"].add(device_sn);
    },

   
    inputChange(e) {
      this.searchData.device_sn = e === "" ? null : e;
    }
  }
};
</script>

<style scoped></style>
