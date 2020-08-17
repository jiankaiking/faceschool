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
    echoData: {
      type: Array
    }
  },
  data() {
    return {
      provinceArr: [],
      province: {},
      city: {},
      region: {},
      cityArr: [],
      regionArr: [],
      rId: 1 // 查询id
    };
  },
  mounted() {
    getCityCode().then(res => {
      this.provinceArr = res.data;
      this.province = "";
      this.city = "";
      this.region = "";
    });
  },
  methods: {
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
  }
};
</script>

<style scoped></style>
