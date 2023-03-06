// 获取表格数据
import request from "@/utils/request";

/**
 * 查询List数据
 * @param root
 * @param url 请求地址
 * @param params 参数
 */
export function getData(root: any, url: string, params: any) {
  request
    .get(url, { params: params || {} })
    .then((res: any) => {
      if (res.status === 200) {
        root.tableData.value = res.data.data;
        root.total = res.data.total;
      }
    })
    .catch((error: any) => {
      throw error;
    });
}

/**
 * 查询List数据
 * @param root
 * @param url 请求地址
 * @param params 参数
 * @param array 重写的字段 // 后续可通过遍历字典来进行替换
 */
export function getTableData(
  root: any,
  url: string,
  params: any,
  array: Array<string>
) {
  request
    .get(url, { params: params || {} })
    .then((res: any) => {
      if (res.status === 200) {
        root.tableData.value = res.data.data;
        root.total = res.data.total;
        root.tableData.value.map((item: any) => {
          array.map((key) => [
            item[key]
              ? (item[key + "_text"] = "是")
              : (item[key + "_text"] = "否"),
          ]);
        });
        root.loading = false;
      }
    })
    .catch((error: any) => {
      throw error;
    });
}

/**
 * 新增或更新
 * @param root
 * @param method post | put
 * @param url 请求地址
 * @param data 数据
 * @param form 表单ref
 * @param callback 回调函数
 */
export function saveOrUpdateData(
  root: any,
  method: "put" | "post",
  url: string,
  data: any,
  form: string,
  callback: any
) {
  request[method](url, data)
    .then((res: any) => {
      if (res.data.status === 200) {
        callback(root, url);
        root.dialogFormVisible = false;
        root.$refs[form].resetFields();
        root.$message.success(res.data.message);
      }
    })
    .catch((error: any) => {
      throw error;
    });
}

/**
 * 删除数据
 * @param root
 * @param url 请求地址
 * @param id 删除对象ID
 * @param callback 回调函数
 */
export function deleteData(
  root: any,
  url: string,
  id: number | string,
  callback: any
) {
  root.$alert("你确定要删除嘛？", "提示", {
    confirmButtonText: "确定",
    callback: () => {
      request
        .delete(url + "/" + id)
        .then((res: any) => {
          if (res.data.status === 200) {
            callback(root, url);
            root.dialogFormVisible = false;
            root.$message.success(res.data.message);
          }
        })
        .catch((error: any) => {
          throw error;
        });
    },
  });
}
