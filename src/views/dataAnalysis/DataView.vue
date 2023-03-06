<template>
  <div class="dataView">
    <el-card>
      <div id="main1"></div>
    </el-card>
    <el-card>
      <div id="main2"></div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { dataView } from "@/api/dataView";
import { getCurrentInstance, onMounted } from "vue";
const { proxy } = getCurrentInstance()!;
onMounted(() => {
  getData();
  main1Draw();
});
const main1Draw = () => {
  let myChart = proxy.$echarts.init(document.getElementById("main1"));
  myChart.setOption({
    title: {
      text: "人数统计",
    },
    tooltip: {},
    xAxis: {
      data: [1, 2, 3, 4, 5, 6],
    },
    yAxis: {},
    series: [
      {
        name: "人数",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
};
const getData = () =>
  dataView()
    .then((res) => {
      if (res.data.status === 200) {
        let { legend, xAxis, series } = res.data.data;
        draw(legend, xAxis, series, "main2");
      }
    })
    .catch((error) => {
      throw error;
    });
const draw = (legend: any[], xAxis: any[], series: any[], id: string) => {
  let myChart = proxy.$echarts.init(document.getElementById(id));
  let option = {
    title: {
      text: "会话量",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: legend,
    },
    xAxis: {
      type: "category",
      data: xAxis,
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };
  myChart.setOption(option);
};
</script>

<style scoped lang="scss">
.dataView {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 50%;

    #main1,
    #main2 {
      height: 500px;
    }
  }
}
</style>
