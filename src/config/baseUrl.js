let BASE_URL = "";
switch (process.env.NODE_ENV) {
  case "development":
    // BASE_URL = "http://192.168.0.129:9041";
    BASE_URL = "https://jinzhouschool.xiaozhusk.com";
    break;
  case "test":
    BASE_URL = "http://121.40.163.19:8085";
    break;
  case "production":
    BASE_URL = "";
    break;
}

export default BASE_URL;
