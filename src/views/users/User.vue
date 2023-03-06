<template>
  <div>
    <el-tree
      :props="defaultProps"
      :data="menus"
      accordion
      show-checkbox
      node-key="id"
      ref="tree"
    ></el-tree>
    <el-button @click="getCheckedNodes">通过node获取</el-button>
    <el-button @click="getCheckedKeys">通过 key 获取</el-button>
    <el-button @click="resetChecked">清空</el-button>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, onMounted, reactive } from "vue";
const { proxy } = getCurrentInstance();

let menus: any[] = reactive([]);
const defaultProps = {
  label: "name",
  children: "children",
};
onBeforeMount(() => (menus = [...proxy.$router.options.routes!]));

const getCheckedNodes = () => {
  console.log((proxy.$refs.tree as any).getCheckedNodes());
};
const getCheckedKeys = () => {
  console.log((proxy.$refs.tree as any).getCheckedKeys());
};
const resetChecked = () => {
  (proxy.$refs.tree as any).setCheckedKeys([]);
};
</script>

<style scoped></style>
