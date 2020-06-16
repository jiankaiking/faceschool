import { getAction } from "../api/manage";

const myMixins = {
  data() {
    return {
      loading: false,
      tableData: [],
      laypageParam:[10, 20, 50, 100],
      total:0,
      page: 1,
      size: 10
    };
  },
  created() {},
  mounted() {
    this.loadData();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getParame() {
      let searchParame = {};
      searchParame["size"] = this.size;
      searchParame["page"] = this.page;
      searchParame = { ...searchParame, ...this.searchData };
      return searchParame;
    },
    headAdd() {
      this.$refs['modelForm'].dialogFormVisible = true;
    },
    loadData() {
      let parames = this.getParame();
      if (!this.url.list) {
        console.log(parames);
        this.$message.error("请设置url.list属性!");
        return;
      }
      getAction(this.url.list, parames).then(res => {
        console.log(res);
      });
    }
  }
};

export default myMixins;
