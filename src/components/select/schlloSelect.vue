<template>
  <el-select v-model="selectValue" placeholder="选择学校" @change="selectChange">
    <el-option
      v-for="(item, index) in selectList"
      :key="index"
      :value="item.id"
      :label="item.schoolName"
    ></el-option>
  </el-select>
</template>

<script>
import { getAction } from "../../api/manage";

export default {
  name: "schlloSelect",
  props: {
    schoolName: {}
  },
  data() {
    return {
      selectList: [],
      selectValue: ""
    };
  },
  mounted() {
    this.getSelectList();
  },
  methods: {
    getSelectList() {
      getAction("/school/schoolDownList").then(res => {
        this.selectList = res.data;
        this.selectValue = this.schoolName;
        console.log(this.selectValue)
      });
    },
    selectChange(e) {
      console.log(e);
      this.$emit("update:schoolName", e);
    }
  },
  schoolName: {
    immediate: true,
    handler(newVal) {
      this.selectValue = newVal;
    }
  }
};
</script>

<style scoped></style>
