import Cookies from "js-cookie";
const domain = location.host.split(".").slice(-2).join("."); // 存储在后两级域名
// 设置cookie
export const setCookies = (name, value) => {
  if (process.env.NODE_ENV === 'production') {
      Cookies.set(name, value, { domain: domain })
  } else {
      Cookies.set(name, value);
  }
};
// 清除cookie
export const clearCookies = (name) => {
  if (process.env.NODE_ENV === 'production') {
      Cookies.remove(name, { domain: domain })
  } else {
      Cookies.remove(name);
  }
};
// 获取系统跳转domainName
export const getJumpDomain = (domainName) => {
  const name = domainName.split("/").slice(3).join("/");
  return `${location.origin}/${name}`;
};

export const CacheManager = {
  setCache: (key, data) => {
    chrome.storage.local.set({ [key]: data });
  },
  getCache: (key, callback) => {
    chrome.storage.local.get(key, (result) => {
      callback(result[key]);
    });
  },
  deleteCache: (key) => {
    chrome.storage.local.remove(key);
  },
};
