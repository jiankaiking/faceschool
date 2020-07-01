<template>
  <el-dialog
    :close-on-click-modal="false"
    center
    :visible.sync="dialogFormVisible"
  >
    <div class="info-title">{{ role == 1 ? "教师信息" : "学生信息" }}</div>
    <div class="info-messages">
      <span>姓名：{{ depositInfo.name }}</span>
      <span v-if="role == 1">教师编号：{{ depositInfo.personNo }}</span>
      <span v-if="role == 0">学籍号:{{ depositInfo.personNo }}</span>
      <span>学校：{{ depositInfo.schoolName }}</span>
      <span>校区：{{ depositInfo.campusName }}</span>
      <span v-if="role == 0">班级编号：{{ depositInfo.classNo }}</span>
      <span>押金余额：{{ depositInfo.amount }}</span>
    </div>
    <div class="info-title">押金详情</div>
    <div style="margin-top: 30px;">
      <el-table
        :data="depositInfo.depositIog"
        border
        height="400"
        style="width: 100%;"
      >
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="createTime" label="时间"></el-table-column>
        <el-table-column prop="scene" label="类型">
          <template slot-scope="scope">
            {{ scope.row.scene | getScene }}
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源"></el-table-column>
        <el-table-column prop="amount" label="金额"></el-table-column>
      </el-table>
    </div>
    <!--    <div slot="footer" class="dialog-footer">-->
    <!--      <el-button @click="dialogFormVisible = false">取 消</el-button>-->
    <!--    </div>-->
  </el-dialog>
</template>

<script>
import { depositInfo } from "../../../api/api";

export default {
  name: "depositInfo",
  data() {
    return {
      dialogFormVisible: false,
      depositInfo: {},
      role: 0
    };
  },
  methods: {
    edit(data) {
      this.role = data.role;
      this.dialogFormVisible = true;
      depositInfo({ id: data.id }).then(res => {
        if (res.code === 200) {
          this.depositInfo = res.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.info-title {
  font-size: 22px;
  color: #333333;
  position: relative;
  padding-left: 30px;
}

.info-title::before {
  position: absolute;
  content: "";
  height: 22px;
  width: 6px;
  border-radius: 3px;
  background: #4ad779;
  left: 0;
  top: 50%;
  margin-top: -10px;
}
.info-messages {
  padding: 20px 50px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: 100;
}
.info-messages span {
  width: 50%;
  margin-bottom: 30px;
  font-size: 16px;
}
</style>
