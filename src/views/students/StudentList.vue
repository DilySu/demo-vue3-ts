<template>
  <div class="studentList">
    <el-form
      :inline="true"
      v-model="selectData"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="selectData.name"
          placeholder="请输入姓名查询"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="currentTableData" border>
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="age" label="年龄" align="center" />
      <el-table-column prop="sex" label="性别" align="center" />
      <el-table-column prop="number" label="学号" align="center" />
      <el-table-column prop="class" label="班级" align="center" />
      <el-table-column prop="phone" label="电话" align="center" />
      <el-table-column prop="address" label="地址" align="center" />
      <el-table-column prop="state" label="状态" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="del(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { deleteStudent, getStudentList } from "@/api/student";
import { computed, getCurrentInstance, onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

const { proxy } = getCurrentInstance()!;

let selectData: any = reactive({
  name: "",
});
let tableData = ref([]);
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
const currentTableData = computed(() =>
  tableData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
);
const find = () => {
  getData(selectData);
  currentPage.value = 1;
};
const del = (row: any) => {
  deleteStudent(row.id).then((res) => {
    if (res.data.status === 200) {
      getData();
      ElMessage.success("删除成功");
    }
  });
};
const getData = (params?: any) => {
  getStudentList(params).then((res) => {
    if (res.status === 200) {
      tableData.value = res.data.data;
      tableData.value.forEach((e: any) => {
        e.sex === 1 ? (e.sex = "男") : (e.sex = "女");
        e.state === "1"
          ? (e.state = "已入学")
          : e.state === "2"
          ? (e.state = "未入学")
          : (e.state = "休学中");
      });
      total.value = res.data.total;
    }
  });
};
const handleSizeChange = (val: number) => {
  pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
onMounted(() => getData());
</script>

<style scoped lang="scss">
.studentList {
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
