import { ref } from "vue";
import { ElMessage } from "element-plus";

export function useAPI(api: any, params?: any, data?: any) {
  const loading = ref(false);
  const result = ref(null as any);
  const refreshData = (params?: any, data?: any) => {
    loading.value = true;
    return api(params, data)
      .then((res: any) => {
        result.value = res.data.data;
        ElMessage.success(res.data.message);
      })
      .catch((e: any) => {
        throw e;
      })
      .finally(() => (loading.value = false));
  };
  return {
    loading,
    result,
    refreshData,
  };
}
