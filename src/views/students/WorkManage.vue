<template>
  <div class="workManage">
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
    <Paging :total="total" url="/works" />
  </div>
</template>

<script lang="ts" setup>
import { getTableData } from "@/utils/table";
import Paging from "@/components/pagination/Paging.vue";
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
onMounted(() => getData());
</script>

<style scoped lang="scss">
.workManage {
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
