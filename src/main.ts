import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/store"; //? 引入全局存储
import ElementPlus from "element-plus";
import { useI18n } from "@/plugins/i18n";
import { getServerConfig } from "./config"; //? 获取服务配置，端口之类的信息
import { createApp, Directive } from "vue";
import { MotionPlugin } from "@vueuse/motion"; //! vue 动画库
import { useEcharts } from "@/plugins/echarts"; //? echarts 引入
import { injectResponsiveStorage } from "@/utils/responsive"; //? 响应式存储注入

import Table from "@pureadmin/table";
import PureDescriptions from "@pureadmin/descriptions"; //? 引入描述信息

// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css";
import "element-plus/dist/index.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

// 自定义指令
import * as directives from "@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth"; //? Auth 组件怎么用
app.component("Auth", Auth);

getServerConfig(app).then(async config => { //? 获取完配置后才能注册组件及功能
  app.use(router); 
  await router.isReady(); //? 路由注册还提供了 isReady 方法判断是否注册完毕
  injectResponsiveStorage(app, config); //? 把配置注入响应式存储
  setupStore(app); //? 注册全局存储
  app
    .use(MotionPlugin) //! 全局注册动画组件
    .use(useI18n) 
    .use(ElementPlus)
    .use(Table)
    .use(PureDescriptions) //? 全局注册描述信息
    .use(useEcharts); //? 全局注册echarts ，具体用法未知
  app.mount("#app");
});
