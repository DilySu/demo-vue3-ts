<template>
  <div class="workList">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" align="center" />
      <el-table-column prop="userId" label="所属班级" align="center" />
      <el-table-column prop="title" label="作业名称" align="center" />
      <el-table-column
        prop="completed_text"
        label="完成情况"
        align="center"
      ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { getTableData } from "@/utils/table";
import { onMounted, reactive, ref } from "vue";

let tableData: any = reactive([]);
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
let loading = ref(true);
const getData = () => {
  const params = { page: currentPage.value, size: pageSize.value };
  getTableData(this, "/works", params, ["completed"]);
};
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
  getData();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getData();
};
onMounted(() => getData());
</script>

<style scoped lang="scss">
.workList {
  .el-form,
  el-form-item {
    text-align: left;
  }

  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>
