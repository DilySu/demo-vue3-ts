<template>
  <div class="header">
    <el-header>
      <div class="title">后台管理系统</div>
      <div>{{ name }}</div>
    </el-header>
  </div>
</template>

<script lang="ts" setup>
import { getToken } from "@/utils/auth";
import { onMounted, ref } from "vue";

let name = ref("");
onMounted(() => (name.value = getToken("username")!));
</script>

<style scoped lang="scss">
.header {
  .el-header {
    background: #2578b5;
    color: #ffffff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .title {
      width: 200px;
      font-size: 24px;
    }
  }
}
</style>
