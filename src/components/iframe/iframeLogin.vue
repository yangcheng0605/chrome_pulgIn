<template>
  <div class="mobile-box-login">
    <div class="mobile-box-row">
      <div class="mobile-box-dial-login">
        <div class="box-linear"></div>
        <div class="box-right">
          <div class="box-right-main box-right-login">
            <div class="box-right-tab">
              <div
                :class="activeKey ? 'active border-right' : ''"
                @click="mainLogin"
              >
              {{ i18nText.emaiAccount }}
              </div>
              <span class="box-right-devider"></span>
              <div
                :class="!activeKey ? 'active border-left' : ''"
                @click="childLogin"
              >
              {{i18nText.loginPhone}}
              </div>
            </div>
            <div class="login-info">
              <a-form ref="formRef" :model="formState" :rules="rule">
                <a-form-item
                  v-if="activeKey"
                  ref="email"
                  name="email"
                  class="account-addon"
                >
                  <a-input
                    v-model:value="formState.email"
                    :placeholder="i18nText.inputTip + i18nText.email"
                    autoComplete="off"
                    @pressEnter="submitLogin"
                  >
                    <template #addonBefore>
                      <img src="./img/loginAccount.svg" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item v-if="!activeKey" ref="phone" name="phone">
                  <a-space direction="vertical" style="width: 100%">
                    <a-input
                      v-model:value="formState.phone"
                      :placeholder="i18nText.inputTip + i18nText.phone"
                      class="phoneInput"
                    >
                      <template #addonBefore>
                        <a-select
                          style="width: 68px"
                          v-model:value="regionCode"
                          show-search
                          @change="changeRegion"
                          :options="regionOptions"
                          :filter-option="filterOption"
                          optionLabelProp="labelProp"
                          :fieldNames="{
                            label: 'extendLabel',
                            value: 'extendValue'
                          }"
                          :virtual="false"
                          :showArrow="true"
                        >
                        </a-select>
                      </template>
                    </a-input>
                  </a-space>
                </a-form-item>
                <a-form-item
                  ref="password"
                  name="password"
                  class="login-password account-addon"
                >
                  <a-input-password
                    v-if="activeKey"
                    v-model:value="formState.password"
                    :placeholder="i18nText.inputTip + i18nText.password"
                    @pressEnter="submitLogin"
                  >
                    <template #addonBefore>
                      <img src="./img/loginPw.svg" />
                    </template>
                  </a-input-password>
                  <a-input-password
                    v-else
                    v-model:value="formState.password"
                    :placeholder="i18nText.inputTip + i18nText.password"
                    @pressEnter="submitLogin"
                    class="phonePwd"
                  >
                  </a-input-password>
                </a-form-item>
              </a-form>
            </div>
            <a-button
              type="primary"
              class="submitLogin"
              @click="submitLogin"
              :loading="loginLoad"
              >{{i18nText.signin}}</a-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  onBeforeMount
} from "vue";
import { login, imageVerify, contactVerification } from "./api";
import { patterns, validePassword } from "./utils/pattern.js";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import i18n2 from "./utils/i18n_config.js";

export default defineComponent({
  setup() {
    let router = useRouter();
    let route = useRoute();
    const formRef = ref();
    const validePhone = async (rule, value) => {
      if (!value) {
        return Promise.reject(
          `${i18n2.global.t("iframe.inputTip")}${i18n2.global.t(
            "iframe.phone"
          )}`
        );
      } else {
        const reg = patterns.number;
        if (!reg.test(value)) {
          return Promise.reject(i18n2.global.t("iframe.verifyPhone"));
        }
        const phoneForm = {
          type: 1,
          contact: state.regionCode + value,
          check_nx_cloud_account: true
        };
        await contactVerification(phoneForm).then((res) => {
          if (res.data.code === 0 && !res.data.data.is_exist) {
            return Promise.reject(i18n2.global.t("iframe.verifyaccount"));
          }
        });
      }
      return Promise.resolve();
    };
    const valideEmail = async (rule, value) => {
      if (!value) {
        return Promise.reject(`${i18n2.global.t("iframe.emailValid")}`);
      } else {
        const params = {
          contact: value,
          type: 2,
          check_account: true
        };
        await contactVerification(params).then((res) => {
          if (res.data.code === 0 && !res.data.data.is_exist) {
            return Promise.reject(i18n2.global.t("iframe.verifyaccount"));
          }
        });
      }
      state.sendBtn = false;
      return Promise.resolve();
    };
    const state = reactive({
      i18nText:{
        emaiAccount: i18n2.global.t("iframe.emaiAccount"),
        loginPhone: i18n2.global.t("iframe.loginPhone"),
        inputTip: i18n2.global.t("iframe.inputTip"),
        email: i18n2.global.t("iframe.email"),
        phone: i18n2.global.t("iframe.phone"),
        password: i18n2.global.t("iframe.password"),
        verification: i18n2.global.t("iframe.verification"),
        signin: i18n2.global.t("iframe.signin"),
        verifyPhone: i18n2.global.t("iframe.verifyPhone"),
        verifyaccount: i18n2.global.t("iframe.verifyaccount"),
        emailValid: i18n2.global.t("iframe.emailValid")
      },
      activeKey: true,
      imageKey: "",
      callInfo: null,
      imageData:
        "data:image/png;base64,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",
      formState: {
        phone: "",
        subName: "",
        password: "",
        verifyCode: ""
      },
      loginLoad: false,
      showImage: false,
      yzmErro: "",
      regionOptions: [],
      regionCode: 86,
      rule: {
        phone: [{ validator: validePhone, trigger: "blur" }],
        email: [{ validator: valideEmail, trigger: "blur" }],
        password: [{ validator: validePassword, trigger: "blur" }],
        verifyCode: [
          {
            required: true,
            message: `${i18n2.global.t("iframe.inputTip")}${i18n2.global.t(
              "iframe.verification"
            )}`,
            trigger: "blur"
          }
        ]
      }
    });
    onBeforeMount(()=>{
      chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
        console.log(data)
        if (data.active) {
          switch (data.active) {
            case 'BackToPop_Call':
              state.callInfo = data.info
              break;
          }
          sendResponse()
        } else {
          console.log("😝收到消息：", data);
          sendResponse("😝这是来自popup的响应");
        }
      })
     
    })
    onMounted(() => {
      // 加载完成 通知backgtound
      // document.addEventListener('DOMContentLoaded', function() {
      chrome.runtime.sendMessage({ active: 'popupLoaded' }, (response) => {
        console.log(response)
        const bg = chrome.extension.getBackgroundPage()
        console.log(bg)
      });
      // });
      // state.regionOptions = await initDict();
      if (localStorage.getItem("iframe_token")) {
        router.push({
          path: "/nxcc",
          query: {
            loginMethod: 0,
            token: localStorage.getItem("iframe_token")
          }
        });
      }
      
    });
    const mainLogin = () => {
      state.activeKey = true;
      formRef.value.resetFields();
    };
    const childLogin = () => {
      state.activeKey = false;
      formRef.value.resetFields();
    };
    const submitLogin = () => {
      formRef.value.validate().then(() => {
        state.loginLoad = true;
        let loginForm = {
          password: state.formState.password,
          graphVerificationCode: state.formState.verifyCode,
          key: state.imageKey
        };
        if (state.activeKey) {
          // 邮箱登录
          loginForm.loginMethod = 0;
          loginForm.email = state.formState.email;
        } else {
          // 手机登录
          loginForm.loginMethod = 1;
          loginForm.phone = state.regionCode + state.formState.phone;
        }
        login(loginForm).then((response) => {
          const code = response.data.code;
          if (code === 12036) {
            // 验证码错误（密码输错三次，需展示验证码）
            state.showImage = true;
            state.loginLoad = false;
            message.error(response.data.msg);
            return;
          }
          // 12038 图形验证码已失效
          // 12043 图形验证码输入错误
          if ([12038, 12043].indexOf(code) > -1) {
            getImageVerify();
          }
          result(response);
        });
      });
    };
    const result = (response) => {
      if (response.data && response.data.code === 0) {
        state.yzmErro = "";
        const data = response.data.data;
        let lang = data.lang;
        localStorage.setItem("iframe_token", data.token)
        chrome.storage.local.set({ 'iframe_token': data.token });
        router.push({
          path: "/nxcc",
          query: {
            loginMethod: 0,
            lang: lang,
            token: data.token
          }
        });
      } else {
        state.loginLoad = false;
        message.error(response.data.msg);
      }
    };
    // // 获取图形验证码
    // const getImageVerify = () => {
    //   imageVerify().then((res) => {
    //     if (res.data.code === 0) {
    //       state.imageData = res.data.data.image;
    //       state.imageKey = res.data.data.key;
    //     } else {
    //       message.error(res.data.msg);
    //     }
    //   });
    // };
    const changeRegion = (value) => {
      formRef.value.clearValidate("phone");
      formRef.value.validateFields("phone");
    };
    const filterOption = (input, option) => {
      const value = option.extendValue.toString();
      return (
        value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
        option.extendLabel.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    };
    return {
      ...toRefs(state),
      i18n2,
      formRef,
      mainLogin,
      childLogin,
      submitLogin,
      changeRegion,
      filterOption
    };
  }
});
</script>

<style lang="less">
.mobile-box-login {
  width: 100%;
  height: 100%;
  .box-linear {
    width: 100%;
    height: 100px;
    background: linear-gradient(180deg, #d3ffee 0%, #ffffff 100%);
  }

  .submitLogin {
    width: 100%;
    height: 38px;
    font-size: 14px;
    margin-bottom: 16px;
    margin-top: 16px;
    border-radius: 8px;
  }

  .submitLogin.ant-btn-primary[disabled] {
    background: #00a062;
    border: none;
    color: #ffffff;
    opacity: 0.5;
  }
  .box-right {
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
    padding: 15px;
    background-color: #ffffff;
    box-sizing: border-box;
    .box-right-main {
      width: 100%;
      .cc-logo {
        width: 130px;
        display: block;
        margin-bottom: 60px;
      }
      .box-right-tab {
        text-align: left;
        cursor: pointer;
        width: 100%;
        height: 48px;
        color: #bfbfbf;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        .box-right-devider {
          width: 1px;
          height: 12px;
          display: inline;
          background-color: #d9d9d9;
          margin: 0 16px;
        }
        .active {
          font-weight: 500;
          color: #000000;
        }
      }
    }
  }
  .login-info {
    .ant-input-group {
      height: 38px;
      border: 1px solid #e4e7e9;
      border-radius: 12px;
      overflow: hidden;
      .ant-input {
        height: 100%;
        border: none;
      }
      .ant-input-affix-wrapper {
        height: 100%;
        border: none;
      }
      .ant-input-group-addon {
        border: none;
      }
    }
    .phonePwd {
      height: 38px;
      border: 1px solid #e4e7e9;
      border-radius: 12px;
    }
  }
  .verify-img {
    margin-top: 5px;
  }
}
.account-addon {
  .ant-input {
    font-size: 12px;
  }
  .ant-input-group-addon {
    img {
      width: 18px;
    }
  }
}
// 媒体查询
@media screen and (min-width: 501px) {
  /* 在屏幕宽度大于 500px 时应用的样式 */
  .mobile-box-login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }
  .mobile-box-row {
    width: 256px;
    height: 460px;
    margin: 0 auto;
    position: relative;
  }
  .mobile-box-dial-login {
    border-radius: 8px 8px 0 0;
    width: 100%;
    height: 100%;
  }
}
</style>