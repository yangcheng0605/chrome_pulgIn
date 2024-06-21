import dayjs from "dayjs";
// import Cookies from "js-cookie";
// import { useStore } from "vuex";
import { message } from "ant-design-vue";
let common = {};
common.getFormatDate = (date, pattern) => {
  if (!date) {
    date = dayjs();
  }
  if (!pattern) {
    pattern = "YYYY/MM/DD HH:mm:ss";
  }
  return dayjs(date).format(pattern);
};

/**
 * 时间格式转换
 * 今天的时间，显示为HH:mm;其它时间，显示为：currDateFormat-yyyy/MM/dd HH:mm;
 * @param {*} date 
 * @returns 
 */
common.converDate = (date, currDateFormat = "YYYY/MM/DD HH:mm", currTimeFormat = "HH:mm") => {
  const currDate = dayjs(date);
  const tDate = common.getFormatDate(dayjs(), "YYYY/MM/DD");  //当前凌晨时间(string)
  const tTime = dayjs(tDate).valueOf(); //当前凌晨时间(long)
  return currDate >= tTime ? common.getFormatDate(currDate, currTimeFormat) : common.getFormatDate(currDate, currDateFormat);
};
/**
 * 字典值value数字类型转label，“，”拼接
 * @param {*} dict 
 * @param {*} array 
 * @returns 
 */
common.getLabelByArray = (dict, array) => {
  let result = [];
  array.forEach(item => {
    result.push(common.getLabelByValue(dict, item));
  })
  return result.join("，");
};
/**
 * 字典值value转label
 * @param {*} dict 
 * @param {*} value 
 * @param labelField 
 * @returns 
 */
common.getLabelByValue = (dict, value, labelField = "label", valueField = "value") => {
  if (!(dict instanceof Array) || value === "") return "";
  let label = "";
  for (let item of dict) {
    if (item[valueField] === value) {
      label = item[labelField];
      break;
    }
  }
  return label;
};
common.format = (seconds) => {
  let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
  seconds -= 3600 * hour;
  let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
  seconds -= 60 * min;
  let sec = seconds >= 10 ? seconds : '0' + seconds;
  return hour + ':' + min + ':' + sec;
}

// 客户名称为合成显示字段，合成规则为：“First Name”+空格+“Last Name”> 手机号码 > WhatsApp > 邮箱
common.getCustomerName = (userInfo, needSpace = false) => {
  return userInfo.full_name || "--";
  // let customerName = "";
  // if (userInfo.first_name || userInfo.last_name) {
  //   customerName = (userInfo.first_name || "") + (needSpace ? " " : "") + (userInfo.last_name || "");
  // } else {
  //   const fileDatas = ["sms_phone", "customer_sms_phone", "whats_app_phone", "email",];
  //   for (let item of fileDatas) {
  //     if (userInfo[item]) {
  //       customerName = userInfo[item];
  //       break;
  //     }
  //   }
  // }
  // return customerName;
};
common.calculateAge = (birthDateString) => {
  if (!birthDateString || typeof(birthDateString) !== "string") {
    return;
  }
  const currentDate = new Date();
  const birthDate = new Date(birthDateString);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age + "";
}

//小数计算加法   
common.accAdd = (arg1, arg2) => {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  // 这里Math.max(r1, r2)取最长的小数位
  // Math.ceil(length / 3) * 3) 按照位数计算乘以的倍数.比如 2 => 1000, 4 => 1000000
  m = Math.pow(10, Math.ceil(Math.max(r1, r2) / 3) * 3);
  return (arg1 * m + arg2 * m) / m;
}
//小数计算减法
common.accAubtract = (arg1, arg2) => {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  // 这里Math.max(r1, r2)取最长的小数位
  // Math.ceil(length / 3) * 3) 按照位数计算乘以的倍数.比如 2 => 1000, 4 => 1000000
  m = Math.pow(10, Math.ceil(Math.max(r1, r2) / 3) * 3);
  return (arg1 * m - arg2 * m) / m;
}
//小数计算乘法
common.accMultiply = (arg1, arg2) => {
  try {
    const precision1 = `${arg1}`.split('.')[1] ? `${arg1}`.split('.')[1].length : 0;
    const precision2 = `${arg2}`.split('.')[1] ? `${arg2}`.split('.')[1].length : 0;
    const precisionTotal = precision1 + precision2;

    const num1 = Number(arg1.toString().replace('.', ''));
    const num2 = Number(arg2.toString().replace('.', ''));

    return num1 * num2 / Math.pow(10, precisionTotal);
  } catch (e) {
    return arg1 * arg2;
  }
}
// 遍历去空格
common.traverse = (obj) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === 'object') {
        if (Array.isArray(obj[prop])) {
          obj[prop].forEach(function (item) {
            if (typeof item === 'object') {
              common.traverse(item);
            }
            if (typeof item === 'string') {
              item = item.trim();
            }
          });
        } else {
          common.traverse(obj[prop]);
        }
      } else {
        if (typeof obj[prop] === 'string') {
          obj[prop] = obj[prop].trim();
        }
      }
    }
  }
}

common.getBaseDomain = (url) => {
  let hostname = new URL(url).hostname;
  let parts = hostname.split('.').reverse();
  return parts[1] + '.' + parts[0];
}
common.getBrowse = () => {
  var browser = {};
  var userAgent = navigator.userAgent.toLowerCase();
  var s;
  (s = userAgent.match(/msie ([\d.]+)/))
    ? (browser.ie = s[1])
    : (s = userAgent.match(/firefox\/([\d.]+)/))
      ? (browser.firefox = s[1])
      : (s = userAgent.match(/chrome\/([\d.]+)/))
        ? (browser.chrome = s[1])
        : (s = userAgent.match(/opera.([\d.]+)/))
          ? (browser.opera = s[1])
          : (s = userAgent.match(/version\/([\d.]+).*safari/))
            ? (browser.safari = s[1])
            : 0;
  var version = "";
  if (browser.ie) {
    version = "IE " + browser.ie;
  } else {
    if (browser.firefox) {
      version = "firefox " + browser.firefox;
    } else {
      if (browser.chrome) {
        version = "chrome " + browser.chrome;
      } else {
        if (browser.opera) {
          version = "opera " + browser.opera;
        } else {
          if (browser.safari) {
            version = "safari " + browser.safari;
          } else {
            version = "未知浏览器";
          }
        }
      }
    }
  }
  return version;
}
common.browserRedirect = () => {
  var sUserAgent = navigator.userAgent;
  var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
  var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
  if (isMac) return "Mac";
  var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
  if (isUnix) return "Unix";
  var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
  if (isLinux) return "Linux";
  if (isWin) {
    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Window2000";
    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WindowXP";
    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Window2003";
    var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "WinVista";
    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Window7";
    var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
    if (isWin10) return "Window";
  }
  return "other";
}
common.exportFile = (response) => {
  let data = response.data;
  let fileReader = new FileReader();
  fileReader.onload = function () {
    try {
      let jsonData = JSON.parse(data);
      if (jsonData.code) {
        // 说明是普通对象数据，后台转换失败
        message.error(jsonData.msg);
      }
    } catch (err) {
      let url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      ); // 处理文档流
      let link = document.createElement("a");
      let xx = response.headers["content-disposition"].split("filename=");
      let z = "";
      if ([...xx].pop()) {
        z = [...xx].pop().split(";").shift();
      }
      link.download = decodeURI(z);
      link.style.display = "none";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  fileReader.readAsText(data);
}

/**
 * 2个对象对比
 * @param p 目标对象
 * @param q 源对象
 * @param z 不对比的，过滤的字段
 * @returns {*}
 */
 common.objectCompare = (p, q, z) => {
  if (!p) {
      return false
  }
  let a = function (m) {
      if (typeof Array.isArray === 'function') {
          return Array.isArray(m)
      } else {
          return Object.prototype.toString.call(m) === '[object Array]'
      }
  }
  let b = function (m, n) { // 对比number和string
      if (n === undefined) {
          return false
      }
      m = m === null ? '' : m.toString()
      n = n === null ? '' : n.toString()
      return m === n
  }
  let c = function (m, n) { // 对比array
      if (n === undefined) {
          return false
      }
      n = n === null ? [] : n
      if (!a(n)) {
          return false
      }
      if (m.length !== n.length) {
          return false
      }
      for (let i = 0; i < m.length; i++) {
          let r = true
          if (a(m[i])) {
              r = c(m[i], n[i])
          } else if (typeof m[i] === 'object') {
              r = d(m[i], n[i])
          } else {
              r = b(m[i], n[i])
          }
          if (!r) {
              return r
          }
      }
      return true
  }
  let d = function (m, n) { // 对比object
      if (n === undefined) {
          return false
      }
      if (m === null) {
          return (n === null || n === '' || n === [] || n === {})
      }
      n = n === null ? {} : n
      if (typeof n !== 'object') {
          return false
      }
      for (let key in m) {
          let r = true
          let item = m[key]
          if (z && z.indexOf(key) !== -1) {
              continue
          }
          if (a(item)) {
              r = c(item, n[key])
          } else if (typeof item === 'object') {
              r = d(item, n[key])
          } else {
              r = b(item, n[key])
          }
          if (!r) {
              return false
          }
      }
      return true
  }
  if (a(p)) {
      return c(p, q)
  }
  if (typeof p === 'object') {
      return d(p, q)
  }
  return b(p, q)
}
export default common