// 旅游地图
import request from "@/utils/request";

export function travelMap() {
  return request({
    url: "/travel",
    method: "get",
  });
}
