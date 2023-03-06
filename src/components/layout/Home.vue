<template>
  <div class="home">
    <Header />
    <el-container class="context">
      <Menu />
      <el-container>
        <el-main>
          <Breadcrumb />
          <div class="cont">
            <router-view />
          </div>
        </el-main>
        <el-footer><Footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Breadcrumb from "@/components/layout/Breadcrumb.vue";
import Footer from "@/components/layout/Footer.vue";
import Menu from "@/components/layout/Menu.vue";
import Header from "@/components/layout/Header.vue";
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  .context {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
    .cont {
      margin: 20px;
    }
  }
}
</style>
