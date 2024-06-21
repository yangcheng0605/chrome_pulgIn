<template>
  <div class="mobile-box">
    <div class="mobile-box-row">
      <div class="mobile-box-dial">
        <div class="iframe_google_content">
          <div class="iframe_google_content_flex">
            <div class="google_welcome">
              welconme
            </div>
            <div class="google_title">
              <img
                src="./img/google.svg"
                alt=""
                class="display_inblock"
              />
              <span class="display_inblock">goolgeSsoLogin</span>
            </div>
            <div class="iframe-login-info">
              <a-form ref="formRef" :model="googleForm" :rules="rules">
                <a-form-item name="company_domain" class="account-addon-gg">
                  <a-input
                    v-model:value="googleForm.company_domain"
                    :placeholder="`selectDomain`"
                    autoComplete="off"
                    @pressEnter="submitGoogleLogin"
                    :maxlength="255"
                  >
                    <template #addonBefore>
                      <img src="./img/google_domain.svg" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-form>
            </div>
            <a-button
              type="primary"
              class="submitLogin"
              @click="submitGoogleLogin"
              :loading="loginLoad"
              >signin</a-button
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
  reactive,
  toRefs,
  getCurrentInstance,
  ref,
  onMounted,
  onBeforeUnmount,
  onBeforeMount
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { getCompanyDomain } from "./api";
import { CacheManager } from "./utils/domain.js";

import "./index.less";

export default defineComponent({
  name: 'plugGoogle',
  setup() {
    let router = useRouter();
    let route = useRoute();
    const formRef = ref();
    const validePhone = async (rule, value) => {
      if (!value) {
        return Promise.reject(`selectDomain`);
      } else {
        const phoneForm = {
          company_domain: value
        };
        await getCompanyDomain(phoneForm).then((res) => {
          if (res.data.code === 0 && !res.data.data) {
            return Promise.reject('cpmpanyNotFound');
          }
        });
      }
      return Promise.resolve();
    };
    const state = reactive({
      googleForm: {
        company_domain: ""
      },
      loginLoad: false,
      rules: {
        company_domain: [
          {
            validator: validePhone,
            trigger: "blur"
          }
        ]
      }
    });
    // 监听 message 事件
    // window.addEventListener("message", function (event) {
    //   // 处理接收到的数据
    //   if (event.data.type == 0) {
    //     const dataReceived = event.data;
    //     console.log("接收到的窗口信息", dataReceived); // 输出参数值
    //     localStorage.setItem("dataReceived", JSON.stringify(dataReceived));
    //     router.push({
    //       path: "/nxcc",
    //       query: {
    //         companyDomain: dataReceived.data.companyDomain,
    //         isFrame: dataReceived.data.isFrame,
    //         loginType: dataReceived.data.loginType,
    //         token: dataReceived.data.token
    //       }
    //     });
    //   } else if (event.data.type == 1) {
    //     message.error('accountNotFounnd');
    //   }
    // });
    
    onBeforeMount(()=>{
      chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
        console.log(data)
        if (data.active) {
          switch (data.active) {
            case 'BackToPop_SSOToken':
              if (data.info) {
                const dataReceived = data.info;
                localStorage.setItem("dataReceived", JSON.stringify(dataReceived));
                chrome.storage.local.set({ 'iframe_token': dataReceived.token });
                router.push({
                  path: "/nxcc",
                  query: {
                    companyDomain: dataReceived.companyDomain,
                    isFrame: dataReceived.isFrame,
                    loginType: dataReceived.loginType,
                    token: dataReceived.token
                  }
                });
              }
              break;
          }
          sendResponse()
        } else {
          console.log("😝收到消息：", data);
          sendResponse("😝这是来自popup的响应");
        }
      })
    })
    onMounted(async () => {
      if (localStorage.getItem("company_domain")) {
        let domain = localStorage.getItem("company_domain");
        state.googleForm.company_domain = domain ? domain : "";
      }
    });

    const submitGoogleLogin = () => {
      formRef.value.validate().then(() => {
        const protocol = window.location.protocol;
        const domain = window.location.hostname;
        const fullDomain = protocol + "//" + domain + '/popup.html';
        // 定义新窗口的尺寸
        const width = 550;
        const height = 600;
        localStorage.setItem("company_domain", state.googleForm.company_domain);
          let redictUrl = `${fullDomain}#/iframe_redirect`;
          let encodeUrl = encodeURIComponent(redictUrl);
          console.log(`https://testnxlink.nxcloud.com/admin/saas_plat/sso/login?company_domain=${state.googleForm.company_domain}&isFrame=1&redirect_url=${encodeUrl}`)
          chrome.windows.create({url: `https://testnxlink.nxcloud.com/admin/saas_plat/sso/login?company_domain=${state.googleForm.company_domain}&isFrame=1&redirect_url=${encodeUrl}`, type: "normal", width,height,top: 80,left:100}, function(window) {
            console.log(window)
          });
      });
    };

    const visibilityGooglechangeListenner = () => {
      if (document.visibilityState == "visible") {
        if (localStorage.getItem("iframe_token")) {
          const dataReceivedInfo = JSON.parse(
            localStorage.getItem("dataReceived")
          );
          router.push({
            path: "/nxcc",
            query: {
              companyDomain: dataReceivedInfo.data.companyDomain,
              isFrame: dataReceivedInfo.data.isFrame,
              loginType: dataReceivedInfo.data.loginType,
              token: dataReceivedInfo.data.token,
              autoLgin: "0"
            }
          });
        }
      }
    };
    // document.addEventListener(
    //   "visibilitychange",
    //   visibilityGooglechangeListenner
    // );
    onBeforeUnmount(() => {
      // document.removeEventListener(
      //   "visibilitychange",
      //   visibilityGooglechangeListenner
      // );
    });

    return {
      ...toRefs(state),
      formRef,
      submitGoogleLogin
    };
  }
});
</script>
<style lang="less">
.account-addon-gg {
  .ant-form-item-explain-error {
    font-size: 12px;
  }
  .ant-input-group-addon {
    img {
      width: 18px;
    }
  }
}
</style>
