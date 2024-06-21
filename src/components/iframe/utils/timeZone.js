/**
 * 时区 utils
 * @author 
 */
import Cookies from "js-cookie";
import { setCookies } from "./domain.js";
export const localeKey = 'nx-zone';
export const localeUtc = 'nx-utc';
// 默认时区
export const defaultZone = 105; // UTC+08:00
export const defaultUtc = "UTC+08:00"; // UTC+08:00
 /**
  * 获取选择的时区id
  * @returns Number
  * @author 
  */
export const getZone = () => { 
  let zone = Cookies.get(localeKey) || '';
  return zone || defaultZone;
};
 
/**
 * 设置时区
 * @param zone 时区的 key
 * @author 
 */
export const setZone = (zone) => {
  if (zone) {
    setCookies(localeKey, zone);
  }
};
/**
* 获取选择的时区UTC
* @returns String
* @author 
*/
export const getUtc = () => { 
  let utc = Cookies.get(localeUtc) || '';
  return utc || defaultUtc;
};
/**
 * 设置时区UTC
 * @param utc 时区的UTC
 * @author 
 */
 export const setUtc = (utc) => {
  if (utc) {
    setCookies(localeUtc, utc);
  }
};
