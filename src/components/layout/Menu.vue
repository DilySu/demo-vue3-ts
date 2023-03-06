<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#2578b5"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <template v-for="(item, index) in menus">
          <el-sub-menu
            v-if="!item.meta.hidden"
            :index="index + ''"
            :key="index"
          >
            <template #title>
              <i :class="item.meta.iconClass"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group
              v-for="(child, index) in item.children"
              :key="index"
            >
              <el-menu-item :index="child.path">
                <i :class="child.meta.iconClass"></i>
                {{ child.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

// let menus = ref([]);
const router = useRouter();

let menus = computed(() => router.options.routes);
</script>

<style scoped lang="scss">
.menu {
  .el-aside {
    height: 100%;

    .el-menu {
      height: 100%;
    }

    .el-submenu .el-menu-item {
      min-width: 0;
    }
  }
}
</style>
