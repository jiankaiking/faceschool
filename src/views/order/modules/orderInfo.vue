<template>
  <el-dialog
    :close-on-click-modal="false"
    center
    :visible.sync="dialogFormVisible"
  >
    <div class="info-title">订单详情</div>
    <div class="info-messages">
      <span>订单号:{{ orderInfo.orderNo }}</span>
      <span>设备sn:{{ orderInfo.deviceNo }}</span>
      <span>实收金额:{{ orderInfo.realAmount }}</span>
      <span>订单金额:{{ orderInfo.amount }}</span>
      <span>优惠金额:{{ orderInfo.discountsAmount }}</span>
    </div>
    <div class="info-title">客户详情</div>
      <div class="info-messages">
          <span>姓名:{{ orderInfo.name }}</span>
          <span>学籍编号/教师编号:{{ orderInfo.personNo }}</span>
      </div>
      <div class="info-title">退款详情</div>
      <div class="info-messages">
          <span>退款金额:{{ orderInfo.refundAmount }}</span>
          <span>退款时间:{{ orderInfo.refundTime }}</span>
      </div>
  </el-dialog>
</template>

<script>
import { orderInfo } from "../../../api/api";

export default {
  name: "depositInfo",
  data() {
    return {
      dialogFormVisible: false,
      orderInfo: {},
      role: 0
    };
  },
  methods: {
    edit(id) {
      this.dialogFormVisible = true;
        orderInfo({orderId:id}).then(res => {
        if (res.code === 200) {
          this.orderInfo = res.data;
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
