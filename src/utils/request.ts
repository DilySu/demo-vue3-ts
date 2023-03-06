// axios 二次封装
import axios from "axios";
import { getToken } from "@/utils/auth";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "/api", // baseURL 会自动加在请求地址上
  timeout: 3000, // 请求超时时间
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 获取并设置 token
    config.headers["token"] = getToken("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const { status, message } = response.data;
    if (status !== 200) {
      ElMessage.warning(message || "error");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
