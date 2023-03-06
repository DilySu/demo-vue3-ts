import request from "@/utils/request";

/**
 * 学生列表查询接口
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getStudentList(params: any) {
  return request({
    url: "/students",
    method: "GET",
    params,
  });
}

export function deleteStudent(id: number) {
  return request.delete("/students/" + id);
}
