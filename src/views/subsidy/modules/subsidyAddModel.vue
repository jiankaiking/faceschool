<template>
  <el-dialog
    title="补贴信息"
    :close-on-click-modal="false"
    center
    v-if="dialogFormVisible"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :validate-on-rule-change="false"
      :model="form"
      label-width="150px"
      :rules="rules"
      ref="form"
    >
      <el-row>
        <el-col :span="10">
          <el-form-item label="补贴名称" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item label="补贴时间" label-width="80px" prop="endTime">
            <el-date-picker
              v-model="startEndTime"
              @input="testClick"
              value-format="yyyy-MM-dd"
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
        <el-form-item label="补贴门槛" label-width="100px" prop="fullMoney">
          <el-input v-model="form.fullMoney" type="number">
            <template slot="prepend">满</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="补贴金额"
          label-width="80px"
          v-if="form.type == 1"
          prop="subsidyAmount"
        >
          <el-input v-model="form.subsidyAmount" type="number">
            <template slot="prepend">订单减</template>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="补贴比例"
          prop="subsidyProportion"
          label-width="100px"
          v-if="form.type == 2"
        >
          <el-input v-model="form.subsidyProportion" type="number">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </div>
      <el-form-item label="补贴上限" label-width="140px" class="padding-none">
        <el-row
          v-for="(item, index) in form.subsidyUpper"
          style="margin-bottom: 20px"
          :key="index"
        >
          <el-col :span="6" :offset="1">
            <el-form-item
              label-width="20px"
              label="  "
              :prop="'subsidyUpper.' + index + '.upperType'"
              :rules="[
                { required: true, message: '请选择补贴上限', trigger: 'change' }
              ]"
            >
              <el-select v-model="item.upperType" @change="changeLimit">
                <el-option
                  v-for="(_item, _index) in limitDate"
                  :key="_index"
                  :label="_item.lable"
                  :disabled="_item.isExist"
                  :value="_item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="10"
            :offset="1"
            v-if="form.subsidyUpper[0].upperType != '无'"
          >
            <el-form-item
              label-width="20px"
              label="  "
              :rules="[
                { required: true, message: '请输入满减金额', trigger: 'blur' }
              ]"
              :prop="'subsidyUpper.' + index + '.upperMoney'"
            >
              <el-input v-model="item.upperMoney">
                <template slot="prepend">满</template>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="2"
            :offset="1"
            v-if="form.subsidyUpper[0].upperType != '无'"
          >
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
        <el-radio-group v-model="form.object">
          <el-radio label="1">全部</el-radio>
          <el-radio label="2">教职工</el-radio>
          <el-radio label="3">学生</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="补贴时段" label-width="140px">
        <el-row
          style="margin-bottom: 20px"
          v-for="(item, index) in form.subsidyTime"
          :key="index"
        >
          <el-col :span="4">
            <el-form-item
              label-width="20px"
              label="  "
              :rules="[
                { required: true, message: '请选择补贴周期', trigger: 'change' }
              ]"
              :prop="'subsidyTime.' + index + '.week'"
            >
              <el-select v-model="item.week" @change="changeSubsidies">
                <el-option
                  v-for="(seItem, sIndex) in SubsidiesDate"
                  :key="sIndex"
                  :label="seItem.lable"
                  :value="seItem.value"
                  :disabled="seItem.isExist"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item
              label-width="20px"
              label="  "
              :rules="[
                {
                  required: true,
                  message: '选择补贴时段类型',
                  trigger: 'change'
                }
              ]"
              :prop="'subsidyTime.' + index + '.timeType'"
            >
              <el-select v-model="item.timeType">
                <el-option label="全天" value="1"></el-option>
                <el-option label="时间段" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" v-if="item.timeType == 2">
            <el-form-item
              label-width="20px"
              label="  "
              :rules="[
                { required: true, message: '请选择补贴时间', trigger: 'change' }
              ]"
              :prop="'subsidyTime.' + index + '.startEndTime'"
            >
              <el-time-picker
                is-range
                v-model="item.startEndTime"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="HH:mm:ss"
                placeholder="选择时间范围"
              >
              </el-time-picker>
            </el-form-item>
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
        <el-radio-group v-model="form.isShared">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="ok('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubsidy, subsidyInfo, updateSubsidy } from "../../../api/api";

export default {
  name: "subsidyAddModel",
  data() {
    var intNum = (rule, value, callback) => {
      if (value < 0) {
        return callback(new Error("请输入正确的数值"));
      } else if (!value) {
        return callback(new Error("请输入补贴金额"));
      } else {
        callback();
      }
    };
    var maxMoney = (rule, value, callback) => {
      if (value < 0) {
        return callback(new Error("请输入正确的数值"));
      } else if (!value) {
        return callback(new Error("请输入补贴金额"));
      } else if (+value >= +this.form.fullMoney) {
        return callback(new Error("补贴金额要小于门槛金额"));
      } else {
        callback();
      }
    };
    var maxSubsidyProportion = (rule, value, callback) => {
      if (value < 0) {
        return callback(new Error("请输入正确的数值"));
      } else if (!value) {
        return callback(new Error("请输入补贴比例"));
      }else if(value >= 100){
        return callback(new Error("补贴比例不能大于100%"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      limitDate: [
        { lable: "无", value: "无", isExist: false },
        { lable: "日", value: "日", isExist: false },
        { lable: "周", value: "周", isExist: false },
        { lable: "月", value: "月", isExist: false }
      ],
      SubsidiesDate: [
        { lable: "全部", value: "全部", isExist: false },
        { lable: "周一", value: "周一", isExist: false },
        { lable: "周二", value: "周二", isExist: false },
        { lable: "周三", value: "周三", isExist: false },
        { lable: "周四", value: "周四", isExist: false },
        { lable: "周五", value: "周五", isExist: false },
        { lable: "周六", value: "周六", isExist: false },
        { lable: "周日", value: "周日", isExist: false }
      ],
      startEndTime: "",
      rules: {
        name: [{ required: true, message: "请输入补贴名称", target: "blur" }],
        startEndTime: [
          { required: true, message: "请输入补贴名称", target: "blur" }
        ],
        fullMoney: [{ required: true, validator: intNum, target: "blur" }],
        subsidyAmount: [
          { required: true, validator: maxMoney, target: "blur" }
        ],
        subsidyProportion: [
          { required: true, validator: maxSubsidyProportion, target: "blur" }
        ],
        endTime: [{ required: true, message: "请选择时间", target: "blur" }],
        subsidyUpper: {},
        subsidyTime: {}
      },
      form: {
        name: "",
        startTime: "",
        endTime: "",
        type: "1",
        deadTime: "",
        fullMoney: "",
        subsidyAmount: "",
        subsidyProportion: "",
        object: "1",
        isShared: 0,
        subsidyUpper: [{ upperType: "无", upperMoney: "" }],
        subsidyTime: [{ week: "", timeType: "", startEndTime: "" }]
      }
    };
  },
  methods: {
    intNum(rule, value, callback) {
      if (value < 0) {
        return callback(new Error("请输入正确的数值"));
      }
    },
    changeLimit(e) {
      if (e == "无") {
        this.form.subsidyUpper = [{ upperType: "无", upperMoney: "" }];
      }
      this.limitDate.forEach(item => {
        item.isExist = false;
        this.form.subsidyUpper.forEach(_item => {
          if (item.value === _item.upperType) {
            item.isExist = true;
          }
        });
      });
    },
    changeSubsidies() {
      // this.SubsidiesDate.forEach((item, index) => {
      //   this.SubsidiesDate[index].isExist = false;
      //   this.form.subsidyTime.forEach(_item => {
      //     console.log(_item);
      //     if (item.value === _item.week && _item.timeType === "1") {
      //       console.log(_item.timeType);
      //       this.SubsidiesDate[index].isExist = true;
      //     }
      //   });
      // });
      // this.SubsidiesDate.forEach((item, index) => {
      //   this.SubsidiesDate[index].isExist = false;
      //   this.form.subsidyTime.forEach(_item => {
      //     if (item.value === _item.week) {
      //       this.SubsidiesDate[index].isExist = true;
      //     }
      //   });
      // });
    },
    add() {
      this.dialogFormVisible = true;
      this.startEndTime = "";
      this.form = {
        name: "",
        startTime: "",
        endTime: "0",
        type: "1",
        deadTime: "",
        fullMoney: "",
        subsidyAmount: "",
        subsidyProportion: "",
        object: "1",
        isShared: 0,
        subsidyUpper: [{ upperType: "无", upperMoney: "" }],
        subsidyTime: [{ week: "", timeType: "", startEndTime: "" }]
      };
      this.changeLimit('无')
    },
    edit(id) {
      this.dialogFormVisible = true;

      subsidyInfo({ id }).then(res => {
        this.startEndTime = [res.data.startTime, res.data.endTime];
        res.data.subsidyTime.forEach(item => {
          if(!item.startTime){
            item.startEndTime = ['', ''];
          }else{
            item.startEndTime = [item.startTime, item.endTime];
          }

        });
        this.form = res.data;
        console.log(this.form)
      });
    },
    testClick(e) {
      this.form.startTime = e[0];
      this.form.endTime = e[1];
    },
    //添加上限
    addLimit() {
      this.form.subsidyUpper.length == 3 && this.$message.error("不能增加了");
      this.form.subsidyUpper.length < 3 &&
        this.form.subsidyUpper.push({ upperType: "", upperMoney: "" });
    },
    //删除上限
    deleteLimit(index) {
      this.form.subsidyUpper.splice(index, 1);
      this.changeLimit();
    },
    addTime() {
      // this.SubsidiesDate.forEach((item, index) => {
      //   this.SubsidiesDate[index].isExist = false;
      //   this.form.subsidyTime.forEach(_item => {
      //     console.log(_item);
      //     if (item.value === _item.week && _item.timeType === "1") {
      //       console.log(_item.timeType);
      //       this.SubsidiesDate[index].isExist = true;
      //     }
      //   });
      // });
      if (
        this.form.subsidyTime[0].week == "全部" &&
        this.form.subsidyTime[0].timeType == 1
      ) {
        this.SubsidiesDate.forEach((item, index) => {
          item.isExist = true;
          if (item.value == "全部") {
            this.SubsidiesDate[index].isExist = false;
          }
        });
        this.$message.error("选择全部了");
        return;
      } else {
        this.form.subsidyTime.forEach(item => {
          if (item.week == "" || item.timeType == "") {
            this.$message.error("请输入完整数据在添加");
          }
        });
      }
      this.form.subsidyTime.push({
        week: "",
        timeType: "1",
        startEndTime: ""
      });
    },
    deleteTime(index) {
      this.form.subsidyTime.splice(index, 1);
      this.changeSubsidies();
    },
    addSubsidy() {
      addSubsidy(this.form).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.dialogFormVisible = false;
          this.$emit("ok");
        }
      });
    },
    updateSubsidy() {
      updateSubsidy(this.form).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.dialogFormVisible = false;
          this.$emit("ok");
        }
      });
    },
    ok(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.subsidyTime.forEach(item => {
            if(item.timeType == 1){
              item.startTime = null;
              item.endTime = null;
            }else{
              item.startTime = item.startEndTime[0];
              item.endTime = item.startEndTime[1];
            }
          });
          if (this.form.startTime == "" || this.form.endTime == "") {
            this.$message.error("请选择时间");
            return;
          }
          this.form.subsidyProportion = +this.form.subsidyProportion;
          this.form.id ? this.updateSubsidy() : this.addSubsidy();
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style>
.el-input-group__append,
.el-input-group__prepend {
  background: none !important;
  padding: 0 4px !important;
  border: none !important;
}
  /*.padding-none .el-input__inner{*/
  /*  padding:0 3px !important;*/
  /*}*/
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
