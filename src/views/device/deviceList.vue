<template>
  <div class="padding-view">
    <el-form
      class="search-form"
      ref="searchForm"
      :inline="true"
      :model="searchData"
    >
      <el-form-item label="设备SN:">
        <el-input v-model="searchData.deviceNo" placeholder="设备SN"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchLick">查询</el-button>
        <el-button type="primary" @click="headAdd">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        empty-text
        style="width: 100%"
      >
        <el-table-column prop="deviceNo" label="设备SN"></el-table-column>
        <el-table-column
          prop="deviceRange"
          label="设备使用业务场景"
        ></el-table-column>
        <el-table-column prop="schoolName" label="所属学校">
          <template slot-scope="scope">
            {{scope.row.bindStatus == 1?scope.row.schoolName:''}}
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="所属门店">
          <template slot-scope="scope">
            {{scope.row.bindStatus == 1?scope.row.storeName:''}}
          </template>
        </el-table-column>
        <el-table-column prop="aliIsvName" label="所属ISV"></el-table-column>
        <el-table-column prop="deviceStatus" label="机具状态">
          <template slot-scope="scope">
            {{ scope.row.deviceStatus | getDeviceStatus }}
          </template>
        </el-table-column>
        <el-table-column prop="bindStatus" label="机具绑定状态">
          <template slot-scope="scope">
            {{ scope.row.bindStatus == "1" ? "已绑定" : "未绑定" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="againAdd(scope.row)"
              v-if="scope.row.deviceStatus != '3'"
              >注册</el-button
            >
            <el-button
              type="text"
              @click="toBindModel(scope.row)"
              v-if="
                scope.row.deviceStatus == '3' && scope.row.bindStatus == '0'
              "
              >绑定</el-button
            >
            <el-button
              type="text"
              @click="unbind(scope.row.id)"
              v-if="
                scope.row.deviceStatus == '3' && scope.row.bindStatus == '1'
              "
              >解绑</el-button
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
    <device-add-model ref="modelForm" @ok="addOk" @no="loadData" />
    <bind-model ref="bindModel" @ok="loadData" />
  </div>
</template>

<script>
import deviceAddModel from "./modules/deviceAddModel";
import { deviceUnbind } from "../../api/api";
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
        deviceNo: ""
      },
      url: {
        list: "/manage/device/selectDeviceList"
      }
    };
  },
  methods: {
    toBindModel(device) {
      this.$refs["bindModel"].add({
        deviceId: device.id,
        deviceNo: device.deviceNo
      });
    },

    unbind(deviceId) {
      deviceUnbind({ deviceId }).then(res => {
        if (res.code === 200) {
          this.loadData();
          this.$message.success("已解绑");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    againAdd(row) {
      this.$refs["modelForm"].register(row);
    },
    addOk(data) {
      this.loadData();
      console.log(data)
      this.toBindModel({id:data.deviceId,deviceNo:data.deviceNo});
    }
  }
};
</script>

<style scoped></style>
