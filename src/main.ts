import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "./store";

// 引入图标库
import "font-awesome/css/font-awesome.min.css";

// 引入ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/es/locale/lang/zh-cn";

// 引入echarts
import echarts from "echarts";

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.use(ElementPlus, { locale }).use(store).use(router).mount("#app");
