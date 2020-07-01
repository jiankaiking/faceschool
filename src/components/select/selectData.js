const teaching = [
  { code: "1", value: "小学" },
  { code: "2", value: "初中" },
  { code: "3", value: "高中" },
  { code: "4", value: "高等教育" }
];

const educationalType = [
  //学制
  { code: "1", value: "三年制" },
  { code: "2", value: "四年制" },
  { code: "3", value: "五年制" },
  { code: "4", value: "六年制" }
];

const className = [
  { code: "1", value: "一班" },
  { code: "2", value: "二班" },
  { code: "3", value: "三班" },
  { code: "4", value: "四班" },
  { code: "5", value: "五班" }
];

const subsidyStatus = [
  { code: "", value: "全部" },
  { code: "0", value: "未生效" },
  { code: "1", value: "生效中" },
  { code: "2", value: "已过期" },
];

const orderStatus = [
  { code: "", value: "全部" },
  { code: "1", value: "未支付" },
  { code: "2", value: "通道支付" },
  { code: "3", value: "保证金支付" },
  { code: "4", value: "已撤销" },
  { code: "5", value: "已关闭" },
]

const payType = [
  { code: "1", value: "支付宝" },
  { code: "2", value: "微信" },
  { code: "3", value: "现金" },
  { code: "4", value: "刷卡" },
]

export default {
  payType,
  teaching,
  educationalType,
  orderStatus,
  subsidyStatus,
  className
};
