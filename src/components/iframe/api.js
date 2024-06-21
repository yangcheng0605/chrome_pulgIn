import axios from "./utils/https.js";
const {
    get,
    deleteReq,
    post_sass,
    put,
} = axios;
const baseURL = process.env.VUE_APP_BASE_PLAT
const baseURL_oss = process.env.VUE_APP_BASE_PLAT_OSS
const saas_plat = process.env.VUE_APP_BASE_PLAT_PREFIX;
const cc_api = process.env.VUE_APP_BASE_CC_PREFIX;
// 用户登录
export const login = data => put(`${baseURL}${saas_plat}/user/login`, data);
// 开启图形验证码
export const imageVerify = data => get(`${baseURL}${saas_plat}/captcha/start_image_verify`, data);
// 验证手机/邮箱接口是否已注册
export const contactVerification = data => post_sass(`${baseURL}${saas_plat}/user/contact_verification`, data);
// 谷歌登录判断企业域是否存在
export const getCompanyDomain = data => get(`${baseURL}${saas_plat}/sso_config/is_exist?company_domain=${data.company_domain}`);


// 切换坐席状态
export const changeSeatStatus = data => post_sass(`${baseURL}${cc_api}/fs/ccAgent/status/change`, data);
// 拨号盘获取外呼显号
export const getDidExternal = data => post_sass(`${baseURL}${cc_api}/api/ccDidNumber/v/myUsefulNumber`, data);
// 获取当前账号已开通国家
export const getOpenCountry = data => post_sass(`${baseURL}${cc_api}/api/ccCountry/v/allForMe`, data);
// 获取注册信息
export const getLogInfo = data => post_sass(`${baseURL}${cc_api}/fs/webCall/register`, data);
// 清除logout
export const exitLogin = data => put(`${baseURL}${saas_plat}/user/logout`, data);
// 切换语言
export const switchLanguage = data => post_sass(`${baseURL}${saas_plat}/user/switch_language`, data,{options: 'json'});
// 用户登录
export const loginCc = data => put(`${baseURL}${saas_plat}/user/login`, data);
// 获取信息
export const getSpeechTime = data => post_sass(`${baseURL}${cc_api}/api/ccConfig/v1/infoMap`, data);
// 通话记录
export const workbenchRecord = data => post_sass(`${baseURL}${cc_api}/api/ccCdr/v1/recent`, data);
// 校验token
export const checkToken = data => post_sass(`${baseURL}${cc_api}/fs/webCall/checkToken`, data);
// 提交话后整理开始结束时间
export const putAftCallTims = data => post_sass(`${baseURL}${cc_api}/api/ccACW/v1/save`, data);
// 用户登录通知
export const loginNotice = data => post_sass(`${baseURL}${cc_api}/api/ccAgent/v1/login/notice`, data);
// 用户登出通知
export const logoutNotice = data => post_sass(`${baseURL}${cc_api}/api/ccAgent/logout/notice`, data);
// 获取脱敏设置
export const getDesensitize = data => post_sass(`${baseURL}${cc_api}/api/ccConfig/v1/queryDesensitization`, data);
// 获取脱敏号码
export const getDesensitizeNumber = data => post_sass(`${baseURL}${cc_api}/api/ccConfig/v1/queryEncryptAndDesensitizeInfo`, data);