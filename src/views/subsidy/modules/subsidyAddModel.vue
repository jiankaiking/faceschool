<template>
  <el-dialog
    title="新增补贴"
    :close-on-click-modal="false"
    center
    :visible.sync="dialogFormVisible"
  >
    <el-form label-position="left" :model="form" label-width="150px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="补贴名称">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item label="补贴时间">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="补贴类型">
        <el-select v-model="form.type">
          <el-option label="固定补贴" value="1"></el-option>
          <el-option label="按比例补贴" value="2"></el-option>
        </el-select>
      </el-form-item>
      <div class="center-box">
        <el-form-item label="补贴门槛" label-width="100px">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="prepend">满</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="补贴金额" v-if="form.type == 1">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="prepend">订单减</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="补贴比例" label-width="100px" v-if="form.type == 2">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </div>
      <el-form-item label="补贴上限" label-width="100px">
        <el-row
          v-for="(item, index) in form.topLoad"
          :key="index"
          style="margin-bottom: 10px"
        >
          <el-col :span="4">
            <el-select v-model="item.value" @change="changeLimit">
              <el-option
                v-for="(_item, _index) in limitDate"
                :key="_index"
                :label="_item.lable"
                :disabled="_item.isExist"
                :value="_item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1" v-if="form.topLoad[0].value != 0">
            <el-input v-model="item.money" autocomplete="off">
              <template slot="prepend">满</template>
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="2" :offset="1" v-if="form.topLoad[0].value != 0">
            <div class="add-icon" @click="addLimit" v-if="index == 0">
              <i class="el-icon-circle-plus"></i>
            </div>
            <div class="add-icon" v-if="index != 0" @click="deleteLimit(index)">
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="补贴对象" label-width="140px">
        <el-radio-group>
          <el-radio label="1">全部</el-radio>
          <el-radio label="0">教职工</el-radio>
          <el-radio label="0">学生</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="补贴时段" label-width="140px">
        <el-row
          v-for="(item, index) in form.dateArr"
          :key="index"
          style="margin-bottom: 10px"
        >
          <el-col :span="3">
            <el-select v-model="item.value" @change="changeSubsidies">
              <el-option
                v-for="(seItem, sIndex) in SubsidiesDate"
                :key="sIndex"
                :label="seItem.lable"
                :value="seItem.value"
                :disabled="seItem.isExist"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="item.date">
              <el-option label="全天" value="0"></el-option>
              <el-option label="时间段" value="1"></el-option>
            </el-select>
          </el-col>
          <el-col :span="11" :offset="1" v-if="item.date == 1">
            <el-time-picker
              is-range
              v-model="item.time"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="HH:mm:ss"
              @change="abc"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-col>
          <el-col :span="2" :offset="1">
            <div class="add-icon" v-if="index == 0" @click="addTime">
              <i class="el-icon-circle-plus"></i>
            </div>
            <div class="add-icon" v-if="index != 0" @click="deleteTime(index)">
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="是否与其他补贴共用" label-width="140px">
        <el-radio-group>
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "subsidyAddModel",
  data() {
    return {
      dialogFormVisible: false,
      limitDate: [
        { lable: "无", value: "0", isExist: false },
        { lable: "日", value: "1", isExist: false },
        { lable: "周", value: "2", isExist: false },
        { lable: "月", value: "3", isExist: false }
      ],
      SubsidiesDate: [
        { lable: "全部", value: "0", isExist: false },
        { lable: "周一", value: "1", isExist: false },
        { lable: "周二", value: "2", isExist: false },
        { lable: "周三", value: "3", isExist: false },
        { lable: "周四", value: "4", isExist: false },
        { lable: "周五", value: "5", isExist: false },
        { lable: "周六", value: "6", isExist: false },
        { lable: "周日", value: "7", isExist: false }
      ],
      value1: "",
      form: {
        topLoad: [{ value: "0", money: "" }],
        name: "",
        dateArr: [{ value: "", date: "0", time: "" }],
        region: "",
        typea: "0",
        date1: "",
        date2: "",
        delivery: false,
        type: "1",
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    changeLimit(){
      this.limitDate.forEach((item) => {
        item.isExist = false;
        this.form.topLoad.forEach(_item => {
          if (item.value === _item.value) {
            item.isExist = true;
          }
        });
      });
    },
    changeSubsidies() {
      this.SubsidiesDate.forEach((item, index) => {
        this.SubsidiesDate[index].isExist = false;
        this.form.dateArr.forEach(_item => {
          if (item.value === _item.value) {
            this.SubsidiesDate[index].isExist = true;
          }
        });
      });
    },
    //添加上限
    addLimit() {
      this.form.topLoad.length == 3 && this.$message.error("不能增加了");
      this.form.topLoad.length < 3 &&
        this.form.topLoad.push({ value: "", money: "" });
    },
    //删除上限
    deleteLimit(index) {
      this.form.topLoad.splice(index, 1);
      this.changeLimit()
    },
    addTime() {
      this.form.dateArr[0].value == 0 && this.$message.error("选择全部了");
      this.form.dateArr[0].value != 0 &&
        this.form.dateArr.push({ value: "", date: "0", time: "" });
    },
    deleteTime(index) {
      this.form.dateArr.splice(index, 1);
      this.changeSubsidies();
    },
  }
};
</script>
<style>
.el-input-group__append,
.el-input-group__prepend {
  background: none !important;
  border: none !important;
}
</style>
<style scoped>
.center-box {
  border: 1px solid #ccc;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: space-between;
}
.add-icon {
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.add-icon i {
  color: #4ebd73;
  font-size: 30px;
}
</style>
