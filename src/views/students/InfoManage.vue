<template>
  <div class="infoList">
    <el-form
      :inline="true"
      :model="selectData"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item>
        <el-button type="primary" @click="addData">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="currentTableData" border>
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="age" label="年龄" align="center" />
      <el-table-column prop="sex" label="性别" align="center" />
      <el-table-column prop="father" label="父亲姓名" align="center" />
      <el-table-column prop="mather" label="母亲姓名" align="center" />
      <el-table-column prop="phone" label="联系电话" align="center" />
      <el-table-column prop="address" label="家庭住址" align="center" />
      <el-table-column prop="time" label="入校时间" align="center" />
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
          <el-button
            type="danger"
            size="small"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          >
            修改
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
    <el-dialog
      :title="editFlag ? '修改学生信息' : '添加学生信息'"
      v-model="dialogFormVisible"
      width="500px"
      destroy-on-close
    >
      <el-form
        inline
        :model="state.formData"
        :rules="formRules"
        ref="sizeForm"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="state.formData.name"
            autocomplete="off"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="state.formData.age"
            autocomplete="off"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="state.formData.sex" label="1">男</el-radio>
          <el-radio v-model="state.formData.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input
            v-model="state.formData.class"
            autocomplete="off"
            placeholder="请输入班级"
          ></el-input>
        </el-form-item>
        <el-form-item label="父亲姓名" prop="father">
          <el-input
            v-model="state.formData.father"
            autocomplete="off"
            placeholder="请输入父亲姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="母亲姓名" prop="mather">
          <el-input
            v-model="state.formData.mather"
            autocomplete="off"
            placeholder="请输入母亲姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            v-model="state.formData.phone"
            autocomplete="off"
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
          <el-input
            v-model="state.formData.address"
            autocomplete="off"
            placeholder="请输入家庭住址"
          ></el-input>
        </el-form-item>
        <el-form-item label="入学时间" prop="time">
          <el-date-picker
            v-model="state.formData.time"
            type="date"
            format="YYYY年MM月DD日"
            value-format="YYYY-MM-DD"
            placeholder="请选择入学时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeInfo">取消</el-button>
        <el-button type="primary" @click="sure(sizeForm)">确认</el-button>
        <el-button type="primary" @click="resetForm">RESET</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { deleteData } from "@/utils/table";
import { computed, getCurrentInstance, onMounted, reactive, ref } from "vue";
import { addOrUpdateInfo, getInfoList } from "@/api/Info";
import { useAPI } from "@/utils/data";
import type { FormInstance } from "element-plus";

const { proxy } = getCurrentInstance()!;

let selectData = reactive({});
let tableData = ref([] as any[]);
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
let dialogFormVisible = ref(false);
let editFlag = ref(false);
let state = reactive({
  formData: {
    name: "",
    age: "",
    sex: "1",
    class: "",
    father: "",
    mather: "",
    address: "",
    time: "",
    phone: "",
  },
});
const formRules = {
  name: [{ required: true, message: "请输入字段" }],
  age: [{ required: true, message: "请输入字段" }],
  sex: [{ required: true, message: "请输入字段" }],
  class: [{ required: true, message: "请输入字段" }],
  father: [{ required: true, message: "请输入字段" }],
  mather: [{ required: true, message: "请输入字段" }],
  address: [{ required: true, message: "请输入字段" }],
  time: [{ required: true, message: "请输入字段" }],
  phone: [{ required: true, message: "请输入字段" }],
};
const sizeForm = ref<FormInstance>();

let currentTableData = computed(() =>
  tableData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
);

const edit = (row: any) => {
  editFlag.value = true;
  state.formData = { ...row };
  dialogFormVisible.value = true;
  sizeForm.value?.resetFields();
};
const del = (row: any) => deleteData(this, "/info", row.id, getTable);

const addData = () => {
  editFlag.value = false;
  dialogFormVisible.value = true;
};

const resetForm = () => {
  sizeForm.value!.resetFields();
  console.log(state.formData);
};

const closeInfo = () => {
  dialogFormVisible.value = false;
};

const sure = (form: FormInstance) =>
  form.validate((valid: any) => {
    console.log(state.formData);
    if (valid) {
      const { refreshData } = useAPI(addOrUpdateInfo, null, state.formData);
      refreshData(null, state.formData);
      dialogFormVisible.value = false;
    }
  });

const getTable = (params?: any) => {
  // TODO 还要改
  const { result, refreshData } = useAPI(getInfoList, params);
  refreshData().then(() => (tableData.value = result.value));
  tableData.value.forEach((e: any) =>
    e.sex === "1" ? (e.sex = "男") : (e.sex = "女")
  );
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

onMounted(() => getTable());
</script>

<style scoped lang="scss">
.infoList {
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
