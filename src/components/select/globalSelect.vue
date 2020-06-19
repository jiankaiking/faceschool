<template>
  <el-select @change="changeValue" v-model="selectValue">
    <el-option
      v-for="(item, index) in selectList"
      :key="index"
      :value="item.code"
      :label="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import selectData from "./selectData";
export default {
  name: "globalSelect",
  props: {
    type: {
      type: String
    },
    selectV: {
      type: String
    }
  },
  data() {
    return {
      selectValue: "",
      selectList: []
    };
  },
  mounted() {
    this.selectValue = this.selectV;
    this.selectList = selectData[this.type];
  },
  methods: {
    changeValue(e) {
      this.$emit("update:selectV", e);
    }
  },
  watch: {
    'selectV':{
      immediate: true,
      handler(newVal) {
        this.selectValue = newVal;
      }
    }
  }
};
</script>

<style scoped></style>
