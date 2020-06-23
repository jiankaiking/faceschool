import { axios } from "./request";
import { Message } from "element-ui";

//post
export function postAction(url, parameter) {
  return axios({
    url: url,
    method: "post",
    dataType:'JSON',
    data: parameter
  });
}

//get
export function getAction(url, parameter) {
  return axios({
    url: url,
    method: "get",
    params: parameter
  });
}

//导出

export function downFile(url, parameter) {
  return axios({
    url: url,
    params: parameter,
    method: "get",
    responseType: "blob"
  });
}

//下载文件

export function downloadFile(url, fileName, parameter) {
  return downFile(url, parameter).then(data => {
    if (!data || data.size === 0) {
      Message.warning("文件下载失败");
      return;
    }
    if (typeof window.navigator.msSaveBlob !== "undefined") {
      window.navigator.msSaveBlob(new Blob([data]), fileName);
    } else {
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
    }
  });
}
