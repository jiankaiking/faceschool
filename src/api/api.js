import { postAction, getAction } from "./manage";

//学校下拉 校区下拉
export const getSchoolDownList = params =>
  getAction("/school/schoolDownList", params);

//学校新增修改 校区新增修改
export const addSchool = params => postAction("/school/edit", params);

//学校详情
export const getSchoolInfo = params => getAction("/school/info", params);

//学校补参
export const schoolSupplement = params =>
  postAction("/school/supplement", params);

//班级新增修改
export const addClass = params => postAction("/class/edit", params);

//班级详情
export const classInfo = params => getAction("/class/info", params);

//班级下拉
export const classDown = params => getAction("/class/classDown", params);

//删除教职工 删除学生
export const deletePerson = params => getAction("/person/deletePerson", params);

//教职工 学生 账号状态
export const changeStatus = params => getAction("/person/changeStatus", params);

//教职工新增编辑
export const editTeacher = params => postAction("/person/editTeacher", params);

//教职工详情
export const teacherInfo = params => getAction("/person/teacherInfo", params);

//学生新增编辑
export const editStudent = params => postAction("/person/editStudent", params);

// 学生详情
export const studentInfo = params => getAction("/person/studentInfo", params);

// 模板下载 老师
export const teacherTemplate = () => getAction("/person/teacherTemplate");

//新增补贴
export const addSubsidy = params => postAction("/subsidy/saveSubsidy", params);

export const subsidyInfo = params => getAction("/subsidy/info", params);


//押金数据详情
export const subsidyInfoData = params => getAction("/manage/subsidy/data/detail", params);

export const getCityCode = params => getAction("/sysRegion/getRegionByCode", params);

//押金详情
export const depositInfo = params => getAction("/deposit/depositInfo", params);

//订单详情
export const orderInfo = params => getAction("/manage/order/info", params);

//订单退款
export const orderRefund= params => getAction("/manage/order/pay/refund", params);


//押金充值
export const rechargePay = params => postAction("/deposit/recharge", params);

//补贴金chart数据
export const subchart = params => getAction("/manage/subsidy/data/bar/chart", params);


