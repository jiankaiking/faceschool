export const data = {};

//补贴状态
data.subsidyStatus = [
  { code: "0", name: "未生效" },
  { code: "1", name: "生效中" },
  { code: "2", name: "已过期" }
];
//补贴类型
data.subsidyType = [
  { code: "1", name: "固定补贴" },
  { code: "2", name: "按比例补贴" }
];
//补贴对象
data.subsidyObject = [
  { code: "1", name: "全部" },
  { code: "2", name: "教职工" },
  { code: "3", name: "学生" }
];
//证件类型
 data.idCard = [
  { code: "1", name: "居民身份证" },
  { code: "2", name: "港澳通行证 " },
  { code: "3", name: "台湾通行证" }
];
//人脸核验
data.faceVerification = [
  { code: "0", name: "未核验" },
  { code: "1", name: "已核验 " }
];

export function getFaceStatus(val) {
  for (let i = 0; i < data.faceVerification.length; i++) {
    if (val === data.faceVerification[i].code) {
      return data.faceVerification[i].name;
    }
  }
}

export function getIdCard(val) {
  for (let i = 0; i < data.idCard.length; i++) {
    if (val === data.idCard[i].code) {
      return data.idCard[i].name;
    }
  }
}

export function getSubsidyStatus(val) {
  for (let i = 0; i < data.subsidyStatus.length; i++) {
    if (val === data.subsidyStatus[i].code) {
      return data.subsidyStatus[i].name;
    }
  }
}

export function getSubsidyType(val) {
  for (let i = 0; i < data.subsidyType.length; i++) {
    if (val === data.subsidyType[i].code) {
      return data.subsidyType[i].name;
    }
  }
}

export function getSubsidyObject(val) {
  for (let i = 0; i < data.subsidyObject.length; i++) {
    if (val === data.subsidyObject[i].code) {
      return data.subsidyObject[i].name;
    }
  }
}
export function getIdCardArr() {
    return data.idCard
}

