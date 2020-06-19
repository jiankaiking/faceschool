<template>
  <el-select
    v-model="selectValue"
    placeholder="选择学区"
    @change="selectChange"
  >
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
    schoolName: {},
    campusId: {}
  },
  data() {
    return {
      selectList: [],
      selectValue: ""
    };
  },
  methods: {
    getSelectList(id) {
      getAction("/school/schoolDownList", { parentId: id }).then(res => {
        this.selectList = res.data;

          this.selectValue = this.campusId;

      });
    },
    selectChange(e) {
      this.$emit("update:campusId", e);
    }
  },
  watch: {
    schoolName: {
      immediate: true,
      handler(newVal) {
        this.$emit("update:campusId", "");
        this.selectValue = "";
        newVal && this.getSelectList(newVal);
      }
    }
  }
};
</script>

<style scoped></style>
