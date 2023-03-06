<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :url="url"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from "vue";
const { proxy } = getCurrentInstance()!;

// eslint-disable-next-line no-undef
const props = defineProps<{
  total: string;
  url: number;
}>();
let page = ref(1); // 当前页数
let size = ref(10); // 每页显示条数
onMounted(() => getData());
const getData = () => {
  // props.total = 0;
  // getTableData(proxy.$parent, props.url, { page: page, size: size }, [
  //   "completed",
  // ])
};
const handleSizeChange = (val: number) => {
  size.value = val;
  page.value = 1;
  getData();
};
const handleCurrentChange = (val: number) => {
  page.value = val;
  getData();
};
</script>

<style scoped>
.el-pagination {
  text-align: left;
  margin-top: 20px;
}
</style>
