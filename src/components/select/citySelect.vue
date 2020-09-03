<template>
  <el-row :gutter="24">
    <el-col :span="8" style="padding-left: 0">
      <el-select v-model="province" @change="provinceSelect">
        <el-option
          v-for="(item, index) in provinceArr"
          :label="item.regionName"
          :key="index"
          :value="item.regionLongCode"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select v-model="city" @change="citySelect">
        <el-option
          v-for="(item, index) in cityArr"
          :label="item.regionName"
          :key="index"
          :value="item.regionLongCode"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="7" v-if="type != 'city'">
      <el-select v-model="region" @change="selectCode">
        <el-option
          v-for="(item, index) in regionArr"
          :label="item.regionName"
          :key="index"
          :value="item.regionLongCode"
        ></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
//省市区 选择   type: 'city' 直选到市级
import { getCityCode } from "../../api/api";

export default {
  name: "CitySelect",
  props: {
    type: {
      type: String,
      default() {
        return "region";
      }
    },
    cityCode: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      provinceArr: [],
      province: {},
      city: {},
      code: this.cityCode,
      region: {},
      cityArr: [],
      regionArr: [],
      rId: 0  // 查询id
    };
  },
  methods: {
    showCode() {
      // console.log(this.code)
      this.province = this.code.substring(0, 2);
      this.city = this.code.substring(0, 4);
      this.region = this.code;
      getCityCode({ regionLongCode: this.province })
        // .then(res => {
        //   this.provinceArr = res.data;
        //   return getCityCode({ regionLongCode: this.province });
        // })
        .then(res => {
          this.cityArr = res.data;
          return getCityCode({ regionLongCode: this.city });
        })
        .then(res => {
          this.regionArr = res.data;
        });
    },
    initial() {
      getCityCode({ regionLongCode: this.rId }).then(res => {
        this.provinceArr = res.data;
        this.province = "";
        this.city = "";
        this.region = "";
      });
    },
    provinceSelect(e) {
      getCityCode({ regionLongCode: e }).then(res => {
        this.cityArr = res.data;
        this.city = "";
        this.region = "";
      });
    },
    citySelect(e) {
      getCityCode({ regionLongCode: e }).then(res => {
        if (this.type == "city") {
          this.$emit("selectCode", e);
        } else {
          this.regionArr = res.data;
        }
        this.region = "";
      });
    },
    selectCode(e) {
      this.$emit("selectCode", e);
    }
  },
  watch: {
    cityCode: {
      immediate: true,
      handler(val) {
        // console.log(val)
        this.code = val
        val.length === 7?this.showCode(): this.initial()
      }
    },
  }
};
</script>

<style scoped></style>
