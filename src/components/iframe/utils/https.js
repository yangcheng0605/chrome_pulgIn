import axios from "axios";
import qs from "qs";
import { getUtc } from "./timeZone.js";
import { state } from "./state.js";
const axios_sceond = axios.create()
// axios_sceond.defaults.baseURL = '/'; //测试
// axios_sceond.defaults.baseURL = 'https://testnxlink.nxcloud.com/';

//post请求头
// axios_sceond.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// 全局请求头设置
// axios_sceond.defaults.headers = {
//   'Content-Type': 'application/json'
// }
//设置超时
axios_sceond.defaults.timeout = 60000;
axios_sceond.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("iframe_token");
    const ts = new Date().getTime().toString();
    config.headers["system_id"] = 5; // todo
    config.headers.createTs = ts;
    const iframe_lang = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en-US'
    config.headers.lang = iframe_lang.replace("-", "_"); // 语言
    config.headers["time_zone"] = getUtc(); // 时区
    if (config.url.indexOf('cc/fs') != -1 || config.url.indexOf('cc/api') != -1) {
      config.headers.usertoken = token || "";
    } else{
      config.headers.authorization = token || "";
    }
    if (config.config && config.config.signs) {
      config.responseType = config.config.signs.responseType
      if (config.config.options == 'json') {
        config.headers['Content-Type'] = 'application/json';
      } else {
        config.headers['Content-Type'] = axios_sceond.defaults.headers.post['Content-Type'];
      }
      config.headers = Object.assign(config.headers, config.config.signs||{})
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios_sceond.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 0) {
      if (response.data.code === 'to_user_login' || response.data.msg === 'token无效' || response.data.code === 401)  {
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (err) => {
  //   if (err && err.response) {
  //     // switch (err.response.status) {
  //     //   case 400: err.message = '请求错误(400)'; break
  //     //   case 401: err.message = '未授权，请重新登录(401)'; break
  //     //   case 403: err.message = '拒绝访问(403)'; break
  //     //   case 404: err.message = '请求出错(404)'; break
  //     //   case 408: err.message = '请求超时(408)'; break
  //     //   case 500: err.message = '服务器错误(500)'; break
  //     //   case 501: err.message = '服务未实现(501)'; break
  //     //   case 502: err.message = '网络错误(502)'; break
  //     //   case 503: err.message = '服务不可用(503)'; break
  //     //   case 504: err.message = '网络超时(504)'; break
  //     //   case 505: err.message = 'HTTP版本不受支持(505)'; break
  //     //   default: err.message = `连接出错(${err.response.status})!`
  //     // }
  // } else {
  //   err.message = '网络错误，请稍后重试!'
  // }
    if(err.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
      // err.response.statusText = "请求超时，请稍后再试";
      return Promise.reject(err);          // reject这个错误信息
    }
    // err.response.statusText = "网络错误，请稍后重试";
    return Promise.reject(err);
  }
);
export default {
  // 导出post请求-----RequestPayload格式
  post_sass(url, data, config) {
    return new Promise((resolve, reject) => {
      axios_sceond({
          method: "post",
          url,
          data,
          config
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          const { status = 400 } = err.response || err;
          const response = { 
            data: {
              code: status
            }
          };
          resolve(response);
          // reject(err);
        });
    });
  },
  // 导出post请求---Form Data格式
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios_sceond({
          method: "post",
          url,
          data: qs.stringify(data),
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          const { status = 400 } = err.response || err;
          const response = { 
            data: {
              code: status
            }
          };
          resolve(response);
          // reject(err);
        });
    });
  },
  //导出get请求
  get(url, data) {
    return new Promise((resolve, reject) => {
      axios_sceond({
          method: "get",
          url,
          params: data,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          const { status = 400 } = err.response || err;
          const response = { 
            data: {
              code: status
            }
          };
          resolve(response);
          // reject(err);
        });
    });
  },
  // 导出put请求
  put(url, data) {
    return new Promise((resolve, reject) => {
      axios_sceond({
          method: "put",
          url,
          data,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          const { status = 400 } = err.response || err;
          const response = { 
            data: {
              code: status
            }
          };
          resolve(response);
          // reject(err);
        });
    });
  },
  // 导出delete请求
  deleteReq(url, data) {
    return new Promise((resolve, reject) => {
      axios_sceond({
          method: "delete",
          url,
          data: data,
          params: data,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          const { status = 400 } = err.response || err;
          const response = { 
            data: {
              code: status
            }
          };
          resolve(response);
          // reject(err);
        });
    });
  },
};