import request from "@/utils/request";

/**
 * 获取信息列表
 * @param params
 * @returns {*}
 */
export function getInfoList(params: any) {
  return request({
    url: "/info",
    method: "GET",
    params,
  });
}

/**
 * 新增 post
 * 修改 put
 * @param type
 * @param data
 * @returns {*}
 */
export function addOrUpdateInfo(type: string, data: any) {
  return request({
    url: "/info",
    method: type,
    data,
  });
}

/**
 * 删除
 * @param id
 * @returns {*}
 */
export function deleteInfo(id: number) {
  console.log(id);
  return request({
    url: "/info/" + id,
    method: "DELETE",
  });
}
