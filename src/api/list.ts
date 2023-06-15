import { http } from "@/utils/http"; //? 引入 http 对象，自带 request 方法

//! 定义接口返回数据类型
type Result = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
  };
};

/** 卡片列表 */
export const getCardList = (data?: object) => {
  return http.request<Result>("post", "/getCardList", { data });
};

/** 版本日志 */
export const getReleases = () => {
  return http.request<Result>("get", "/releases");
};
