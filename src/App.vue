<template>
  <!--! element plus 的组件，支持全局配置内部的组件的样式等信息 -->
  <el-config-provider :locale="currentLocale">
    <router-view />
    <!--? 全局弹窗组件 -->
    <ReDialog />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { checkVersion } from "version-rocket"; //! 检测更新组件
import { ElConfigProvider } from "element-plus";
import en from "element-plus/lib/locale/lang/en";
import { ReDialog } from "@/components/ReDialog";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog
  },
  computed: {
    currentLocale() {
      return this.$storage.locale?.locale === "zh" ? zhCn : en;
    }
  },
  beforeCreate() {
    const { version, name: title } = __APP_INFO__.pkg; //? __APP_INFO__ 变量是 vite 定义的全局变量，可以直接使用
    const { VITE_PUBLIC_PATH, MODE } = import.meta.env;
    // https://github.com/guMcrey/version-rocket/blob/main/README.zh-CN.md#api
    if (MODE === "production") {
      // 版本实时更新检测，只作用于线上环境
      checkVersion(
        // config
        {
          // 5分钟检测一次版本
          pollingTime: 300000,
          localPackageVersion: version,
          originVersionFileUrl: `${location.origin}${VITE_PUBLIC_PATH}version.json`
        },
        // options
        {
          title,
          description: "检测到新版本",
          buttonText: "立即更新"
        }
      );
    }
  }
});
</script>
