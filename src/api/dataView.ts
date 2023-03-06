// 数据概览
import request from "@/utils/request";

export function dataView() {
  return request({
    url: "/dataview",
    method: "get",
  });
}
