/**
 * 国际化 入口
 * @author 
 */

import { createI18n } from "vue-i18n/dist/vue-i18n.cjs.js";
import zh from '../locales/zh-CN';
import en from '../locales/en-US';
import es from '../locales/es-MX';

/**
 * antd 多语言 配置
 */
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import enES from 'ant-design-vue/es/locale/es_ES';
import idID from 'ant-design-vue/es/locale/id_ID';
export const antdMessages = {
    'zh-CN': zhCN,
    'en-US': enUS,
    'es-MX': enES,
    'id-ID': idID,
}

/**
 * 框架 多语言 配置
 */
export const messages = {
    'zh-CN': zh,
    'en-US': en,
    'es-MX': es,
};
const sysLocale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en-US';
const i18n2 = createI18n({
    legacy: false,
    globalInjection: true,
    locale: antdMessages[sysLocale] ? sysLocale : 'en-US',
    messages,
});

export default i18n2;

