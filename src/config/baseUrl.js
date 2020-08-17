let BASE_URL = "";
switch (process.env.NODE_ENV) {
  case "development":
    BASE_URL = "http://121.40.163.19:8085";
    break;
  case "test":
    BASE_URL = "http://121.40.163.19:8085";
    break;
  case "production":
    BASE_URL = "";
    break;
}

export default BASE_URL;
