import i18n from './i18n_config.js'
export const patterns = { 
    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/, // 密码(8-20位数字和字母组合)
    number: /^[0-9]{6,20}$/, // 号码
    email: /^([A-Z0-9a-z._%+-]+)@([a-z0-9A-Z]+([-]+[a-z0-9A-Z]+)?\.)+[a-zA-Z]{1,}$/ // 邮箱
    // /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    // noSpace: /^[^\s]*$/, // 不要输入空格
};
// 校验密码
export const validePassword = (rule, value) => {
  if (!value) {
    return Promise.reject(`${i18n.global.t("verify.pw")}`);
  }
  if (value.length < 8) {
    return Promise.reject(`${i18n.global.t("verify.pw_length")}`)
  }
  if (value.length > 20) { 
    return Promise.reject(`${i18n.global.t("verify.pw_no_more")}`)
  }
  const reg = patterns.password;
  if (!reg.test(value)) {
    return Promise.reject(`${i18n.global.t("verify.pw_must")}`)
  }
  return Promise.resolve();
};
