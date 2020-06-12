let baseUrl = null;

if (process.env.NODE_ENV === "production") {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === "pro") {
    //production 生产环境
    baseUrl = "http://api.xinggeyun.com";
  } else {
    //test 测试环境
    baseUrl = "http://192.168.0.152:8102";
  }
} else {
  // console.log(process.env)
  //dev 开发环境
  baseUrl = "http://192.168.0.152:8102";
}
console.log(process.env);
export default baseUrl;
