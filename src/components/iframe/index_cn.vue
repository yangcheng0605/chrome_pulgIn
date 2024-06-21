<template>
  <div class="mobile-box">
    <div class="mobile-box-row">
      <div class="mobile-box-dial" v-show="tabId == 1">
        <div class="mobile-head">
          <div class="system_change_mobile">
            <div
              class="mobile-status"
              style="margin-right: 12px"
              :class="
                callStatus == -1 ? 'mobile-status-fail' : 'mobile-status-sus'
              "
            >
              <img
                src="./img/int.svg"
                alt=""
                v-show="callStatus == null"
              />
              <img
                src="./img/sus.svg"
                alt=""
                v-show="callStatus == 4"
              />
              <img
                src="./img/warn.svg"
                alt=""
                v-show="callStatus == -1"
              />
            </div>
            <div class="mobile-change-status">
              <a-dropdown
                :overlayStyle="{
                  backgroundColor: '#ffffff',
                  borderRadius: '4px'
                }"
                placement="bottom"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode"
                :disabled="isMic ? false : true"
              >
                <div class="diar_change diar_change_rel">
                  <a-badge
                    v-if="nowSeatStatus == 1 && inacw == false"
                    status="success"
                    :text="statusName"
                  />
                  <a-badge
                    v-else-if="nowSeatStatus == 2 && inacw == false"
                    status="error"
                    :text="statusName"
                  />

                  <a-badge
                    v-else-if="inacw == true"
                    status="processing"
                    :text="statusName"
                  />
                  <a-badge v-else status="warning" :text="statusName" />
                  <i
                    class="iconfont icon-xiajiantou cloud-icon"
                    style="padding-right: 0; color: #333333; margin-left: 4px"
                  ></i>
                  <img src="./img/frame.png" alt="" class="frame_img" />
                </div>
                <template #overlay>
                  <a-menu class="diar_change">
                    <a-menu-item v-for="item of dliarStatus" :key="item.id">
                      <a
                        @click="changeSipStatu(item.id, 1)"
                      >
                        <a-badge :status="item.color" />
                        {{ item.value }}
                      </a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
          <div class="system_change_mobile">
            <a-dropdown
              :overlayStyle="{
                width: '120px',
                backgroundColor: '#ffffff',
                borderRadius: '4px'
              }"
              placement="bottom"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            >
              <img src="./img/lang.svg" width="20" height="20" />
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    v-for="item of langOptions"
                    :key="item.value"
                    :style="
                      item.value === lang ? { background: '#ebf8f3' } : {}
                    "
                  >
                    <a
                      :style="item.value === lang ? { color: '#33a05c' } : {}"
                      @click="langSwitch(item.value)"
                      >{{ item.label }}</a
                    >
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <div class="mobile-iframe-option">
          <div class="mobile-external">
            <!-- 路由呼出 -->
            <a-select
              v-model:value="routerNumberId"
              showSearch
              placeholder="pleaseSlecectRouter"
              @change="changeRouters"
              :dropdownMatchSelectWidth="false"
              v-if="callType == 1"
              style="width: 100%; font-size: 12px"
            >
              <a-select-option
                v-for="item in externalList"
                :key="item.routerId"
                :value="item.routerId"
                style="font-size: 12px"
              >
                {{ item.routerName }}
              </a-select-option>
            </a-select>
            <!-- did号码 -->
            <a-select
              v-model:value="external.number"
              showSearch
              placeholder="selectDisplayNumber"
              :filter-option="false"
              @change="changeExternal"
              @focus="getExternalNumber"
              :disabled="isMic ? false : true"
              :dropdownMatchSelectWidth="false"
              style="width: 100%; font-size: 12px"
              v-else
            >
              <a-select-option
                v-for="item in externalList"
                :key="item.id"
                :label="`${item.number}`"
                :value="item.id"
                style="font-size: 12px"
              >
                {{ item.number
                }}{{
                  item.remark != null && item.remark != ""
                    ? "-" + item.remark
                    : ""
                }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="mobile-dial-number">
          <a-input-group compact class="mobile-dial-compact">
            <a-select
              v-model:value="callCountry"
              placeholder="countryCode"
              showSearch
              allowClear
              class="number-country"
              style="width: 45%; height: 32px; font-size: 12px"
              @change="changeCallCountry"
              @focus="getCountry"
              :disabled="isMic ? false : true"
            >
              <a-select-option
                v-for="item in openCountryList"
                :key="item.code"
                :value="item.code"
              >
                {{ `+${item.code} - ${item.iso2}` }}
              </a-select-option>
            </a-select>
            <a-input
              ref="numberRef"
              v-model:value="numberText"
              @input="phoneInputChange"
              :disabled="isMic ? false : true"
              id="callPhoneId"
              style="width: 55%; height: 32px"
              :maxlength="20"
            />
          </a-input-group>
          <div class="number-pad">
            <a-row :gutter="15" class="numberRow">
              <div class="isMic" v-show="!isMic" @click="openMic"></div>
              <a-col :span="8" v-for="(item, index) in numberJson" :key="index">
                <div
                  class="mobile-number-circle"
                  @click="clickKeyBoardNumberKey(item.number)"
                >
                  <div class="number-content">
                    <h3>{{ item.number }}</h3>
                  </div>
                </div>
              </a-col>
              <a-col :span="8"> </a-col>
              <a-col :span="8">
                <div class="mobile-call-button" @click="callPhone">
                  <img src="./img/call_out.svg" alt="" />
                </div>
              </a-col>
              <a-col :span="8">
                <div class="mobile-delete-button">
                  <a-button class="delete-number" @click="deleteNumber">
                  </a-button>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
      <div class="mobile-tab">
        <div
          class="mobile-list"
          v-for="item in tabList"
          :key="item.id"
          @click="handleTab(item.id, item.path)"
        >
          <img :src="item.icon" alt="" v-show="tabId != item.id" />
          <img :src="item.iconAct" alt="" v-show="tabId == item.id" />
        </div>
        <div class="mobile-list" @click="openOut">
          <img src="./img/icon_log.svg" alt="" />
        </div>
      </div>

      <div class="mobileCalling" v-show="openCalling">
        <MobileCalling />
      </div>
      <!-- 通话记录 -->
      <div class="callLogs" v-show="tabId == 2">
        <CallLog ref="callRecordRef" />
      </div>
    </div>
  </div>
  <a-modal
    v-model:visible="dialogVisible"
    title="hint"
    width="400px"
    :maskClosable="false"
  >
    <span>logoutTip</span>
    <template #footer>
      <a-button @click="dialogVisible = false">cancel</a-button>
      <a-button type="primary" @click="loginOut">
        confirm
      </a-button>
    </template>
  </a-modal>
  <!-- 响铃需要的标签 -->
  <audio style="display: none" id="remoteAudio" controls></audio>
  <audio style="display: none" id="playAudio" controls></audio>
</template>
<script>
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
  toRaw,
  getCurrentInstance,
  watch,
  onBeforeMount
} from "vue";
import {
  changeSeatStatus,
  getDidExternal,
  getOpenCountry,
  getLogInfo,
  exitLogin,
  switchLanguage,
  loginCc,
  getSpeechTime,
  checkToken,
  putAftCallTims,
  loginNotice,
  logoutNotice,
  getDesensitize,
  getDesensitizeNumber
} from "./api";
import MobileCalling from "./mobileCalling.vue";
import CallLog from "./callLogs.vue";
import NxwCall from "./nxwebrtc";
import { state } from "./state";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";
import common from "./common";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import "./index.less";
import { message } from "ant-design-vue";

export default defineComponent({
  name: 'iframeTest',
  components: { MobileCalling, CallLog },
  setup() {
    let router = useRouter();
    let route = useRoute();
    const numberRef = ref();
    const callRecordRef = ref();
    let currentUser = null;
    const dialstate = reactive({
      tabId: 1,
      openCountryList: [],
      external: {
        number: null
      },
      externalList: [],
      externalInfo: {},
      dialogVisible: false,
      timers: null,
      lang: "",
      langOptions: [
        {
          label: 'chinese',
          value: "zh-CN"
        },
        {
          label: "English",
          value: "en-US"
        },
        {
          label: "Español",
          value: "es-MX"
        }
      ],
      statusName: "",
      dliarStatus: [
        {
          id: 1,
          command: "Available",
          state: "Waiting",
          value: "workfree",
          color: "success"
        },
        {
          id: 2,
          command: "On break",
          state: "Idle",
          value: "workbusy",
          color: "error"
        },
        {
          id: 3,
          command: "Rest",
          state: "Meeting",
          value: "restMeeting",
          color: "warning"
        },
        {
          id: 4,
          command: "Rest",
          state: "Eating",
          value: "restEating",
          color: "warning"
        },
        {
          id: 5,
          command: "Rest",
          state: "Wc",
          value: "restWc",
          color: "warning"
        },
        {
          id: 6,
          command: "Rest",
          state: "Sleep",
          value: "restSleep",
          color: "warning"
        },
        {
          id: 7,
          command: "Rest",
          state: "Other",
          value: "restOther",
          color: "warning"
        }
      ],
      dialDisabled: null,
      msgAiccInfo: {},
      isHasSip: false,
      msgSb: 0,
      msgReq: 0,
      switchVisible: -1,
      busyTimer: null,
      count: 0,
      speechNum: null,
      initForm: {},
      nowMethod: null,
      switchs: 0,
      inacw: false
    });

    watch(
      () => state.callStatus == 5,
      (val) => {
        setTimeout(() => {
          if (state.callStatus == -1) {
            state.statusTxt = 'reconnecting';
          } else {
            console.log("hangupms", state.callStatus);
            if (state.callStatus != 1) {
              state.statusTxt =
              'dialer' +
              'registerSuccessfully'
              state.callStatus = 4;
            }
          }
        }, 800);
      }
    );
    // window.addEventListener("storage", function (event) {
    //   if (event.key === "mStatus") {
    //     if(event.newValue == '8' || event.newValue == '9' || event.newValue == '10' || event.newValue == '11'){
    //       changeCallTab(event.newValue);
    //     }
    //   }
    // });
    onBeforeMount(()=>{
      // chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
      //   if (data.active) {
      //     switch (data.active) {
      //       case 'mediaDevices':
      //         state.isUseMic = data.status
      //         break;
      //       case 'activeTab':
      //         state.pageInfo = data.tabInfo
      //         break;
      //     }
      //   } else {
      //     console.log("😝收到消息：", data);
      //     sendResponse("😝这是来自popup的响应");
      //   }
      //   document.getElementById('m-plugin-wrap').style.display = 'block'
      // })
    })
    onMounted(() => {
      dialstate.lang = localStorage.getItem("locale");
      if (dialstate.switchs == 0) {
        if (route.query.loginMethod == 0) {
          dialstate.switchs = 1;
          localStorage.setItem("iframe_token", route.query.token);
          dialstate.nowMethod = 0;
          getregsterInfo();
          initCountry();
          getSpeechTimes();
        } else if (route.query && route.query.loginType == "2") {
          // 判断是否为谷歌登录
          googleLoginJudgment();
          getUrlErrInfo();
        } else {
          if (window.self === window.parent) {
            router.push({
              path: "/iframe_login"
            });
          }
        }
      }
    });

    const initForms = (event) => {
      // 获取从父级发送来的数据
      let form = event.data;
      state.initForm = form;
      // 对接收到的数据进行处理
      if (form.type == "init") {
        // 监听用户传参为谷歌登录
        if (form.content.loginMethod == 1) {
          dialstate.nowMethod = 2;
          if (localStorage.getItem("iframe_token")) {
            // const mmStatus = localStorage.getItem("mStatus");
            // if (mmStatus && ["9", "10", "11"].includes(mmStatus)) {
            //   // 空块表示此处有意留空或待添加逻辑
            //   localStorage.setItem(
            //     "mStatus",
            //     state.nowSeatStatus ? state.nowSeatStatus : 2
            //   );
            // }
            getregsterInfo();
            initCountry();
            getSpeechTimes();
            getMaskingConfig();
          } else {
            nextTick(() => {
              router.push({
                path: "/iframe_google"
              });
            });
          }
        } else {
          // 监听用户传参为nxlink账号登录
          dialstate.nowMethod = 1;
          if (localStorage.getItem("iframe_token")) {
            getregsterInfo();
            initCountry();
            getSpeechTimes();
          } else {
            loginsystem(form);
          }
        }
      }
      if (form.type == "callOut") {
        // 监听会触发两次，添加callStatus，当为0呼出中的时候不再触发这个事件
        if (state.callStatus != 0) {
          getNumToCall(form.content);
        }
      }
    };

    window.addEventListener("message", initForms, false);

    const googleLoginJudgment = () => {
      console.log("获取谷歌登录的信息", route.query);
      if (
        localStorage.getItem("iframe_token") == null ||
        route.query.autoLgin == "0"
      ) {
        let routerInfo = route.query;
        if (routerInfo && routerInfo.loginType == "2") {
          localStorage.setItem("iframe_token", routerInfo.token);
          // const mmStatus = localStorage.getItem("mStatus");
          // if (mmStatus && ["9", "10", "11"].includes(mmStatus)) {
          //   // 空块表示此处有意留空或待添加逻辑
          //   localStorage.setItem(
          //     "mStatus",
          //     state.nowSeatStatus ? state.nowSeatStatus : 2
          //   );
          // }
          dialstate.nowMethod = 2;
          getregsterInfo();
          initCountry();
          getSpeechTimes();
          getMaskingConfig();
        }
      }
    };
    const getUrlErrInfo = () => {
      const url = window.location.href;
      // 创建URL对象
      const parsedUrl = new URL(url);
      // 获取查询参数部分
      const hash = parsedUrl.hash;
      // 检查是否存在"error"参数
      const hasErrorParam = hash.includes("?error");
      // 输出结果
      if (hasErrorParam) {
        message.error(t("v2.accountNotFounnd"));
      }
    };

    const loginsystem = async (form) => {
      // 获取从父级发送来的数据
      let loginInfo = form;
      console.log("loginInfo", loginInfo);
      console.log("iframe_token1", localStorage.getItem("iframe_token"));
      // 对接收到的数据进行处理
      if (loginInfo.content) {
        if (loginInfo.type == "init") {
          const postForm = {
            email: loginInfo.content.email,
            password: loginInfo.content.password,
            graphVerificationCode: "",
            key: "",
            loginMethod: 0
          };
          await loginCc(postForm).then((response) => {
            if (response.data.code == 0) {
              localStorage.setItem("iframe_token", response.data.data.token);
              if (
                localStorage.getItem("iframe_token") == response.data.data.token
              ) {
                getregsterInfo();
                initCountry();
                getSpeechTimes();
                loginNotice({ status: "login-web" }).then((res) => {});
              }
            } else {
              message.error(response.data.msg);
            }
          });
        }
      } else {
        message.warning('noDialerInformation');
      }
    };

    const getregsterInfo = async () => {
      if (dialstate.msgSb == 0) {
        getLogInfoFun();
      }
      if (dialstate.msgSb == 1 && dialstate.msgReq == 0) {
        dialstate.msgReq = 1;
        getLogInfoFun();
      }
    };
    const getLogInfoFun = async () => {
      const postForm = {
        agentName: ""
      };
      await getLogInfo(postForm).then(async (response) => {
        if (response.data.code == 0) {
          // 话机信息
          console.log("获取话机信息");
          dialstate.isHasSip = true;
          const sips = {
            domain: response.data.data.domain,
            wssurl: response.data.data.url,
            ccAgent: response.data.data.email,
            ccToken: localStorage.getItem("iframe_token"),
            ccQueue: response.data.data.groupNo,
            sipNum: response.data.data.sipNum,
            email: response.data.data.email,
            utcDate: response.data.data.utcDate
          };
          state.sipDialInfo = sips;
          state.speechTimeStatus = response.data.data.enableWrapUp;
          await initExternal();
          let numberInfo = "";
          let numberArr = [];
          if (dialstate.externalList.length > 0) {
            dialstate.externalList.map((item) => {
              numberArr.push(item.number);
            });
            numberInfo = numberArr.length > 0 ? numberArr.join(",") : "";
          } else {
            numberInfo = "";
          }
          window.parent.postMessage(
            {
              type: "login",
              content: {
                email: response.data.data.email,
                sipNum: response.data.data.sipNum,
                groupNo: response.data.data.groupNo,
                numbers: numberInfo
              }
            },
            "*"
          );
          window.parent.postMessage(
            {
              type: "agentExists",
              content: {
                code: 1
              }
            },
            "*"
          );
          regsterPhone(sips, response.data.data.autoAnswerEnable);
        } else if (
          response.data.code == 407 ||
          response.data.code == 408 ||
          response.data.code == 409
        ) {
          // 没有坐席信息，也能正常登录
          dialstate.isHasSip = false;
          message.warning("No dialer information");
          state.callStatus = -2;
          window.parent.postMessage(
            {
              type: "agentExists",
              content: {
                code: 2
              }
            },
            "*"
          );
          window.parent.postMessage(
            {
              type: "login"
            },
            "*"
          );
        } else {
          message.error(response.data.msg);
          if (
            [12001, 11031, 401, 12109, 12142, 403].indexOf(response.data.code)
          ) {
            removeItem();
          }
        }
      });
    };
    const openMic = () => {
      if (dialstate.dialDisabled == 1) {
        message.warning("Please turn on microphone permissions first");
      }
    };
    const regsterPhone = (sips, autoAnswerEnable) => {
      if (sips) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(function (stream) {
              state.isMic = true;
              dialstate.dialDisabled = null;
            })
            .catch(function (error) {
              // 获取权限失败
              state.isMic = false;
              dialstate.dialDisabled = 1;
              message.warning('checkWhetherMicrophone');
            });
        } else {
          message.warning("Not support WebRTC API");
        }
        nextTick(() => {
          let passWord = md5(
            sips.email + ":" + sips.domain + ":" + sips.utcDate
          );
          state.options = {
            nxuser: sips.sipNum,
            nxpass: passWord,
            nxtype: 7,
            logLevel: "debug",
            retries: 0,
            playTone: 0x9f,
            audioElementId: "remoteAudio",
            playElementId: "playAudio",
            audioSrcPath:
              "https://nxcc-sgp-1259196162.cos.ap-singapore.myqcloud.com/static/resource/audio",
            domain: sips.domain,
            wssurl: sips.wssurl,
            ccAgent: sips.email,
            ccToken: localStorage.getItem("iframe_token"),
            ccQueue: sips.ccQueue,
            expires: 3600,
            multiTab: 1,
            tabTsWaitMsg: 300000
          };
          initApp();
          state.nxwcall.setAutoAnswer(autoAnswerEnable);
          state.nxwcall.setAutoAnswerDelay(0);
        });
      } else {
        state.options = {};
      }
    };
    const initApp = () => {
      if (currentUser !== state.options.nxuser) {
        if (state.nxwcall) {
          state.nxwcall.disconnect();
          // delete nxwcall
          state.nxwcall = null;
        }
        currentUser = state.options.nxuser;
      }
      // 创建对象
      if (state.nxwcall == null) {
        state.nxwcall = new NxwCall(state.options);
        const initNxw = toRaw(state.nxwcall);
        setupEvents(initNxw);
      }
    };
    // 可选：处理events
    const setupEvents = (nxwcall) => {
      if (nxwcall == null) {
        return;
      }
      const e = nxwcall.myEvents;
      let callTimer;
      // 发起通话
      e.on("placeCall", function (param1) {
        console.log("================", "placeCall", param1);
        localStorage.setItem("mStatus", 9);
        state.msgDirection = 1;
        changeCallSipStatu("Available", "Receiving", 9);
        state.statusTxt = "Ringing";
        if (dialstate.busyTimer) {
          clearInterval(dialstate.busyTimer); //删除定时器
          dialstate.busyTimer = null;
          pustAfterCall();
        }
      });
      e.on("placeCallOK", function () {
        state.msgCallId = nxwcall.lastCallId;
        // iframe内部使用postMessage向父级发送数据
        state.msgCaller = state.callDidNumber;
        state.msgCallee = state.callNumber;
        state.callStartTimestampState = new Date().getTime();
        window.parent.postMessage(
          {
            type: "dialStatus",
            content: {
              code: 0,
              callId: nxwcall.lastCallId,
              orderId: state.msgOrderId,
              direction: 1,
              caller: state.callDidNumber,
              callee: state.callNumber,
              params: state.params,
              callStartTimestamp: state.callStartTimestampState,
              other: ""
            }
          },
          "*"
        );
      });
      // 呼出时获取callid
      e.on("onAccept", function (param1) {});
      // 电话呼入
      e.on("onCallReceived", function (param1) {
        console.log("================", "onCallReceived", param1);
        if (
          localStorage.getItem("mStatus") == "9" ||
          localStorage.getItem("mStatus") == "10" ||
          localStorage.getItem("mStatus") == "11"
        ) {
          const disCall = toRaw(state.nxwcall);
          disCall.hangupCall();
          state.refuseCall = 0;
          return;
        }
        state.openCalling = true;
        localStorage.setItem("mStatus", 10);
        state.msgDirection = nxwcall.nxDirectionType;
        changeCallSipStatu("Available", "Receiving", 10);
        let notification = new Notification("", {
          body: 'newlineCall',
          icon: "https://nxcc-sgp-1259196162.cos.ap-singapore.myqcloud.com/static/static/resource/img/logo.png" // "图标路径，若不指定默认为favicon"
        });
        notification.onclick = function () {
          window.focus(); // 打开该通知所在的页面
        };
        state.callStatus = 1;
        state.statusTxt = 'inboundCall';
        const paramNum = param1.split("@")[0];
        state.callNumber = paramNum;
        // state.recordCallId = nxwcall.lastCcCallId;
        // iframe内部使用postMessage向父级发送数据
        state.msgCallId = nxwcall.lastCcCallId;
        state.msgCaller = state.callNumber;
        state.msgCallee = nxwcall.lastRequest.getHeader("X-NXCC-Caller-DID");
        // 号码脱敏 callIngNumber
        state.callIngNumber = nxwcall.lastRequest.getHeader(
          "X-AICC-DisplayCaller"
        );
        // 获取aicc的变量
        dialstate.msgAiccInfo = {};
        if (nxwcall.lastRequest.getHeader("X-NX-Params")) {
          let decoded = Base64(nxwcall.lastRequest.getHeader("X-NX-Params"));
          // 转换为对象
          dialstate.msgAiccInfo = JSON.parse(decoded);
        }
        // 获取other和orderid变量
        state.callStartTimestampState = new Date().getTime();
        state.msgOrderId = nxwcall.lastRequest.getHeader("X-ORDER-ID")
          ? nxwcall.lastRequest.getHeader("X-ORDER-ID")
          : "";
        state.otherParames = nxwcall.lastRequest.getHeader("X-CALL-OTHERS")
          ? nxwcall.lastRequest.getHeader("X-CALL-OTHERS")
          : "";
        state.otherParames = window.atob(state.otherParames);
        window.parent.postMessage(
          {
            type: "dialStatus",
            content: {
              code: 1,
              callId: nxwcall.lastCcCallId,
              orderId: state.msgOrderId,
              direction: nxwcall.nxDirectionType,
              caller: state.callNumber,
              callee: nxwcall.lastRequest.getHeader("X-NXCC-Caller-DID"),
              params: "",
              callStartTimestamp: state.callStartTimestampState,
              other: state.otherParames
            }
          },
          "*"
        );
      });
      // 接听
      e.on("onCallAnswered", function (param1) {
        console.log("================", "onCallAnswered", param1);
        // 给后端传递通话中状态
        localStorage.setItem("mStatus", 11);
        changeCallSipStatu("Available", "In a queue call", 11);
        state.statusTxt = 'inCall'
        // 获取CallID
        callTimer = setInterval(() => {
          const t = nxwcall.talkingTime / 1000;
          const time = Math.floor(t);
          state.isTimer = parseInt(time);
          state.talkCallTime = common.format(parseInt(time));
          // if (state.isTimer > 0 && state.isTimer % 180 == 0) {
          //   changeCallSipStatu("Available", "In a queue call", 11);
          // }
        }, 1000);
        state.callStatus = 2;
        // iframe内部使用postMessage向父级发送数据
        state.callConnectedTimestampState = new Date().getTime();
        window.parent.postMessage(
          {
            type: "dialStatus",
            content: {
              code: 2,
              callId: state.msgCallId,
              orderId: state.msgOrderId,
              direction: state.msgDirection,
              caller: state.msgCaller,
              callee: state.msgCallee,
              params: state.params,
              callStartTimestamp: state.callStartTimestampState,
              callConnectedTimestamp: state.callConnectedTimestampState,
              other: state.msgDirection == 1 ? "" : state.otherParames
            }
          },
          "*"
        );
      });
      // 挂断
      e.on("onCallHangup", function (param1) {
        console.log("=====挂断======", "onCallHangup", param1);
        state.openCalling = false;
        // 停止通话时间
        clearInterval(callTimer);
        state.callStatus = 5;
        state.statusTxt = 'hangUp'
        // 初始化数据
        state.talkCallTime = "00:00:00";
        state.numberText = "";
        callRecordRef.value.initRecord();
        state.isMuted = false;
        // 判断是否开启话后整理、
        if (state.refuseCall != 0) {
          if (state.msgDirection == 1) {
            // 呼出
            if (state.speechTimeStatus === true && nxwcall.confirmTs != null) {
              localStorage.setItem("mStatus", 8);
              changeSipStatu(8, -1);
              const timeNums = dialstate.speechNum;
              speechTimer(timeNums);
              state.afterStartTime = dayjs().unix();
            } else {
              localStorage.setItem("mStatus", state.nowSeatStatus);
              changeSipStatu(state.nowSeatStatus, 1);
            }
          } else {
            // 呼入
            if (state.speechTimeStatus === true && nxwcall.confirmTs != null) {
              localStorage.setItem("mStatus", 8);
              changeSipStatu(8, -1);
              const timeNums = dialstate.speechNum;
              speechTimer(timeNums);
              state.afterStartTime = dayjs().unix();
            } else if (
              state.speechTimeStatus === true &&
              nxwcall.confirmTs == null &&
              state.isOrNoAnwser == 0
            ) {
              localStorage.setItem("mStatus", 8);
              changeSipStatu(8, -1);
              const timeNums = dialstate.speechNum;
              speechTimer(timeNums);
              state.afterStartTime = dayjs().unix();
            } else {
              localStorage.setItem("mStatus", state.nowSeatStatus);
              changeSipStatu(state.nowSeatStatus, 1);
            }
          }
          state.isOrNoAnwser = null;
        }
        state.refuseCall = null;
        // iframe内部使用postMessage向父级发送数据
        window.parent.postMessage(
          {
            type: "dialStatus",
            content: {
              code: 5,
              callId: state.msgCallId,
              orderId: state.msgOrderId,
              direction: state.msgDirection,
              caller: state.msgCaller,
              callee: state.msgCallee,
              params: state.params,
              callStartTimestamp: state.callStartTimestampState,
              callConnectedTimestamp: state.callConnectedTimestampState,
              callHangUpTimestamp: new Date().getTime(),
              other: state.msgDirection == 1 ? "" : state.otherParames
            }
          },
          "*"
        );
      });
      // 挂断后获取挂断原因
      e.on("onReject", function (param1) {
        // 挂断后异常提示,sip的协议栈，不同的异步回调函数
        switch (nxwcall.lastCcCode) {
          case "810":
            message.error('dialerOverdue')
            break;
          case "811":
            message.error('notCountry')
            break;
          case "812":
            message.error('errNumber')
            break;
          case "813":
            message.error('tokenExpired')
            break;
          case "814":
            message.error('blacklistedNumberTip')
            break;
          case "815":
            message.error('callFailureLimit')
            break;
          case "816":
            message.error('cannotNumber')
            break;
          case "800":
            message.error('networkError')
            break;
          case "801":
            message.error('networkError')
            break;
          case "817":
            message.error('limitOutFiveNums')
            break;
          case "819":
            message.error('didBindErr')
            break;

          default:
            break;
        }
      });
      // 注册成功
      e.on("onRegistered", function (param1) {
        console.log("================", "onRegistered", param1);
        state.callStatus = 4;
        state.statusTxt =
          'dialer' +
          'registerSuccessfully'
        state.isLoginSuccess = 1;
        state.isFalse = false;
        if (
          localStorage.getItem("mStatus") &&
          localStorage.getItem("mStatus") != "undefined"
        ) {
          let oldStatus = localStorage.getItem("mStatus");
          if (
            oldStatus == "9" ||
            oldStatus == "10" ||
            oldStatus == "11" ||
            oldStatus == "8"
          ) {
            changeCallTab(oldStatus);
          } else {
            changeSipStatu(parseInt(oldStatus), 1);
          }
        } else {
          changeSipStatu(2, 1);
          dialstate.statusName = 'busy'
        }
        // iframe内部使用postMessage向父级发送数据
        window.parent.postMessage(
          {
            type: "dialStatus",
            content: {
              code: 4
            }
          },
          "*"
        );
      });
      // wss链接成功
      e.on("onServerConnect", function (param1) {
        console.log("================", "onServerConnect", param1);
        state.statusTxt = 'dialerInitialization'
      });
      // wss断开连接
      e.on("onServerDisconnect", function (param1) {
        state.statusTxt = 'reconnecting'
        // iframe内部使用postMessage向父级发送数据
        window.parent.postMessage(
          {
            type: "dialStatus",
            content: {
              code: 3
            }
          },
          "*"
        );
      });
      e.on("onConnectOK", function (param1) {
        console.log("================", "onConnectOK", param1);
        state.statusTxt = "dialerInitialization"
      });
      e.on("onRegisterOK", function (param1) {
        console.log("================", "onRegisterOK", param1);
      });
      // 注册失败
      e.on("onUnregistered", function (statusCode) {
        // 根据star建议判断是否登陆成功过一次 isLoginSuccess 为1
        state.statusTxt =
         "dialer" +
          "registrationFailed"
        state.callStatus = -1;
        if (state.isLoginSuccess != 1 || statusCode == "403") {
          const disCall = toRaw(state.nxwcall);
          const DISCONNECT_STATES = [6, 7, 8, 10];
          if (DISCONNECT_STATES.includes(disCall.state)) {
            disCall.hangupCall();
          }
          disCall.disconnect();
          // iframe内部使用postMessage向父级发送数据
          window.parent.postMessage(
            {
              type: "dialStatus",
              content: {
                code: -1
              }
            },
            "*"
          );
          if (statusCode == "403" && localStorage.getItem("iframe_token")) {
            setTimeout(() => {
              state.nxwcall = null;
              getLogInfoFun();
            }, 500);
          }
        } else {
          if (dialstate.msgSb != 1) {
            initApp();
          }
        }
      });
      // 错误集合
      e.on("error", function (param1) {
        console.log("================", "error", param1);
        initApp();
      });
    };

    const phoneInputChange = (val) => {
      if (val.target.value) {
        let value = val.target.value;
        state.numberText = value.replace(/[^\d]/g, "");
      }
    };

    // 异步传递通话信息
    const sendMessageToParent = (message) => {
      return new Promise((resolve, reject) => {
        // 发送消息给父页面
        window.parent.postMessage(message, "*");
      });
    };

    // 输入号码
    const clickKeyBoardNumberKey = (num) => {
      const nxwcallDtmf = toRaw(state.nxwcall);
      let nums = "";
      if (num == "*") {
        nums = "star";
      } else if (num == "#") {
        nums = "hash";
      } else {
        nums = num;
      }
      nxwcallDtmf.play("start", `${nums}.wav`);
      state.numberText += num;
      numberRef.value.focus();
    };

    // 删除号码
    const deleteNumber = () => {
      state.numberText = state.numberText.slice(0, -1);
    };

    const changeCallCountry = (value) => {
      localStorage.setItem("mobileCallCountry", value);
    };
    // 获取已开通国家
    const getCountry = () => {
      initCountry();
    };
    const initCountry = () => {
      getOpenCountry().then((response) => {
        if (response.data.code == 0) {
          dialstate.openCountryList = response.data.data;
          if (dialstate.openCountryList.length > 0) {
            if (localStorage.getItem("mobileCallCountry")) {
              for (let i = 0; i < dialstate.openCountryList.length; i++) {
                if (
                  dialstate.openCountryList[i].code ==
                  localStorage.getItem("mobileCallCountry")
                ) {
                  state.callCountry = dialstate.openCountryList[i].code;
                  break;
                } else {
                  state.callCountry = dialstate.openCountryList[0].code;
                }
              }
            } else {
              state.callCountry = dialstate.openCountryList[0].code;
            }
          } else {
            state.callCountry = null;
          }
        } else {
          message.error(response.data.msg);
          if (
            [12001, 11031, 401, 12109, 12142, 403].indexOf(response.data.code)
          ) {
            removeItem();
          }
        }
      });
    };
    const changeCallTab = (oldStatus) => {
      switch (oldStatus) {
        case "8":
          state.callStatus = 5;
          localStorage.setItem("mStatus", 8);
          changeCallSipStatu("Available", "Idle", 8);
          dialstate.statusName = "sortOutShow"
          break;
        case "9":
          state.callStatus = 0;
          localStorage.setItem("mStatus", 9);
          changeCallSipStatu("Available", "Receiving", 9);
          dialstate.statusName = "ringings"
          state.statusTxt = "ringings"
          break;
        case "10":
          state.callStatus = 1;
          localStorage.setItem("mStatus", 10);
          changeCallSipStatu("Available", "Receiving", 10);
          dialstate.statusName = "newCall"
          state.statusTxt = "newCall"
          break;
        case "11":
          state.callStatus = 2;
          localStorage.setItem("mStatus", 11);
          changeCallSipStatu("Available", "In a queue call", 11);
          state.statusTxt = "inCall"
          dialstate.statusName = "inCall"
          break;

        default:
          break;
      }
    };
    // 获取外呼显号
    const changeExternal = (val) => {
      localStorage.setItem("mobileExternalNumber", JSON.stringify(val));
      if (val != 0) {
        dialstate.externalList.forEach((item) => {
          if (val == item.id) {
            state.callDidNumber = item.number;
            dialstate.externalInfo = item;
          }
        });
      } else {
        dialstate.externalInfo = {};
        state.callDidNumber = "";
      }
    };
    const getExternalNumber = () => {
      initExternal();
    };
    const initExternal = async () => {
      await getDidExternal().then((response) => {
        if (response.data.code == 0) {
          dialstate.externalList = response.data.data;
          if (dialstate.externalList.length > 0) {
            state.callType = null;
            state.callType = response.data.data[0].type;
            if (state.callType == 1) {
              // 路由
              let getRouterId = localStorage.getItem("routerNumberId");
              let routers = getRouterId
                ? getRouterId.replace(/^"(.*)"$/, "$1")
                : null;
              if (routers) {
                for (let i = 0; i < dialstate.externalList.length; i++) {
                  if (dialstate.externalList[i].routerId === routers) {
                    state.routerNumberId = routers;
                    return;
                  } else {
                    state.routerNumberId = dialstate.externalList[0].routerId;
                  }
                }
              } else {
                state.routerNumberId = dialstate.externalList[0].routerId;
              }
            } else {
              if (
                localStorage.getItem("mobileExternalNumber") &&
                parseInt(localStorage.getItem("mobileExternalNumber")) != 0
              ) {
                for (let i = 0; i < dialstate.externalList.length; i++) {
                  if (
                    dialstate.externalList[i].id ==
                    parseInt(localStorage.getItem("mobileExternalNumber"))
                  ) {
                    dialstate.external.number = dialstate.externalList[i].id;
                    state.callDidNumber = dialstate.externalList[i].number;
                    dialstate.externalInfo = dialstate.externalList[i];
                    break;
                  } else {
                    initList();
                  }
                }
              } else {
                for (let i = 0; i < dialstate.externalList.length; i++) {
                  if (dialstate.externalList[i].id == 0) {
                    dialstate.external.number = 0;
                    state.callDidNumber = "";
                    dialstate.externalInfo = {};
                    break;
                  } else {
                    initList();
                  }
                }
              }
            }
          } else {
            dialstate.external.number = null;
            dialstate.externalInfo = {};
            state.routerNumberId = "";
          }
        } else {
          message.error(response.data.msg);
          if (
            [12001, 11031, 401, 12109, 12142, 403].indexOf(response.data.code)
          ) {
            removeItem();
            return;
          }
        }
      });
    };
    const changeRouters = (val) => {
      localStorage.setItem("routerNumberId", JSON.stringify(val));
    };
    const initList = () => {
      dialstate.external.number = dialstate.externalList[0].id;
      state.callDidNumber = dialstate.externalList[0].number;
      dialstate.externalInfo = dialstate.externalList[0];
    };
    // 拨号盘发起通话
    const callPhone = () => {
      // 选择随机号码
      if (dialstate.external.number == null && state.callType != 1) {
        message.warning("selectDisplayNumber")
        return;
      }
      // 没有坐席信息
      if (state.callStatus == -2) {
        message.warning("noAgentInformation")
        return;
      }
      // 话机初始化中
      if (state.callStatus == null) {
        message.warning("dialerInitialization")
        return;
      }
      if (
        state.callStatus == 0 ||
        state.callStatus == 1 ||
        state.callStatus == 2
      ) {
        message.warning("inCall")
        return;
      }
      if (state.numberText !== "") {
        if (state.numberText.indexOf("#") != -1) {
          message.warning("errSymCode")
          return;
        }
        let callCountrys = state.callCountry ? state.callCountry : "";
        state.callNumber = callCountrys + state.numberText;
        state.callIngNumber = callCountrys + state.numberText;
        state.callStatus = 0;
        state.params = "";
        state.msgOrderId = "";
        if (state.nxwcall) {
          const nxwcallPlace = toRaw(state.nxwcall);
          if (state.callType == 1) {
            let hdrs = new Array(
              `X-NXCC-Router-ID:  ${state.routerNumberId}`,
              `X-Callee-Country-Code: ${callCountrys}`
            );
            nxwcallPlace.placeCall(`${callCountrys + state.numberText}`, hdrs);
          } else {
            if (
              dialstate.externalInfo.type == 0 &&
              dialstate.external.number != 0
            ) {
              let hdrs = new Array(
                `X-NXCC-Out-Caller-Number:  ${state.callDidNumber}`,
                `X-Callee-Country-Code: ${callCountrys}`
              );
              nxwcallPlace.placeCall(callCountrys + state.numberText, hdrs);
            } else {
              nxwcallPlace.placeCall(callCountrys + state.numberText);
            }
          }
          //   state.numberText = "";
          state.openCalling = true;
        }
      } else {
        message.warning("enterNumber");
      }
    };
    // 根据号码发起通话
    const getNumToCall = async (numberOptions) => {
      if (state.callStatus == null) {
        message.warning("loginDiale");
        window.parent.postMessage(
          {
            type: "dialStatus",
            content: {
              code: 6
            }
          },
          "*"
        );
        return;
      }
      if (state.callStatus == -1) {
        message.warning("dialerInitialization");
        return;
      }
      if (numberOptions.callee != null || numberOptions.callee != "") {
        if (
          state.callStatus == 0 ||
          state.callStatus == 1 ||
          state.callStatus == 2
        ) {
          message.warning("inCall");
          return;
        }
        state.callDidNumber = numberOptions.caller;
        if (state.desenType == 0) {
          state.callNumber = numberOptions.callee;
          state.callIngNumber = numberOptions.callee;
        } else {
          const postForm = {
            originPhone: numberOptions.callee,
            countryCode: numberOptions.countryCode
          }
          await getDesensitizeNumber(postForm).then((response) => {
            if (response.data.code === 0) {
              state.callNumber = response.data.data.realPhone;
              state.callIngNumber = response.data.data.displayPhone
            } else {
              message.error(response.data.msg);
            }
          });
        }
        state.callStatus = 0;
        let countryCoded = numberOptions.countryCode
          ? numberOptions.countryCode
          : null;
        state.params = numberOptions.params ? numberOptions.params : "";
        if (state.nxwcall) {
          const nxwcallPlace = toRaw(state.nxwcall);
          if (numberOptions.orderId) {
            nxwcallPlace.myOrderId = numberOptions.orderId;
            state.msgOrderId = numberOptions.orderId;
          }
          nxwcallPlace.myCallParams = numberOptions.params;
          if (state.callType == 1) {
            let hdrs = new Array(
              `X-NXCC-Router-ID:  ${state.routerNumberId}`,
              `X-Callee-Country-Code: ${countryCoded}`
            );
            nxwcallPlace.placeCall(state.callNumber, hdrs);
          } else {
            if (numberOptions.caller == "") {
              let hdrs = new Array(`X-Callee-Country-Code: ${countryCoded} `);
              nxwcallPlace.placeCall(state.callNumber, hdrs);
            } else {
              let hdrs = new Array(
                `X-NXCC-Out-Caller-Number:  ${numberOptions.caller}`,
                `X-Callee-Country-Code: ${countryCoded}`
              );
              nxwcallPlace.placeCall(state.callNumber, hdrs);
            }
          }
          state.numberText = "";
          state.openCalling = true;
        }
      } else {
        message.warning("enterNumber")
      }
    };
    // 状态倒计时，每5分钟上报一次后台
    const timeVal = () => {
      clearInterval(dialstate.timers);
      let statusId = localStorage.getItem("mStatus");
      if (statusId == "9" || statusId == "10" || statusId == "11") {
        switch (statusId) {
          case "9":
            state.callStatus = 0;
            state.statusTxt = "ringings"
            dialstate.statusName = "ringings"
            break;
          case "10":
            state.callStatus = 1;
            state.statusTxt = "newCall"
            dialstate.statusName = "newCall"
            break;
          case "11":
            state.callStatus = 2;
            state.statusTxt = "inCall"
            dialstate.statusName = "inCall"
            break;

          default:
            break;
        }
      }
      let timeNums = 0;
      dialstate.timers = setInterval(() => {
        timeNums++;
        if (timeNums > 0 && timeNums % 3 == 0) {
          changeSipStatu(statusId, -1, dialstate.switchVisible);
        }
      }, 60000);
    };
    const changeSipStatu = (id, num, type) => {
      let states = "";
      let command = "";
      let statusNames = "";
      if (id == 8) {
        command = "Available";
        states = "Idle";
        statusNames = "sortOutShow";
      } else {
        dialstate.dliarStatus.map((item) => {
          if (item.id == id) {
            command = item.command;
            states = item.state;
            statusNames = item.value;
          }
        });
      }
      let dateTime = dayjs().utc(8).format("YYYY-MM-DD HH:mm:ss");
      let unixTime = dayjs(dateTime).unix();
      let statusForm = {
        agentName: state.sipDialInfo.email,
        status: command,
        state: states,
        updateTime: unixTime
      };
      if (localStorage.getItem("iframe_token")) {
        if (state.callStatus == 4 || state.callStatus == 5) {
          checkToken().then(async (response) => {
            if (response.data.code == 0) {
              const infoCall = toRaw(state.nxwcall);
              infoCall.sendMessage(JSON.stringify(statusForm));
              if (num == 1) {
                state.nowSeatStatus = id;
              }
              dialstate.statusName = statusNames;
              if (id != 8 && state.speechTimeStatus == true) {
                if (dialstate.busyTimer) {
                  pustAfterCall();
                }
                clearInterval(dialstate.busyTimer);
                dialstate.busyTimer = null;
              }
              localStorage.setItem("mStatus", id);
              dialstate.inacw = id == 8 ? true : false;
              // 通话中中止五分钟上报状态
              if (states == "In a queue call") {
                clearInterval(dialstate.timers);
                dialstate.timers = null;
              } else {
                timeVal();
              }
              dialstate.msgSb = 0;
              window.parent.postMessage(
                {
                  type: "agentStatus",
                  content: {
                    code: id == 8 ? 2 : parseInt(id)
                  }
                },
                "*"
              );
            } else {
              message.error(response.data.msg);
              if (
                [12001, 11031, 401, 12109, 12142, 403].indexOf(
                  response.data.code
                )
              ) {
                dialstate.msgSb = 1;
                dialstate.msgReq = 0;
                const disCall = toRaw(state.nxwcall);
                if (disCall) {
                  await disCall.disconnect();
                }
                removeItem(type);
              }
            }
          });
        } else if (state.callStatus == -1) {
          message.warning("dialerFailedRegister")
        } else if (
          state.callStatus == 0 ||
          state.callStatus == 1 ||
          state.callStatus == 2
        ) {
          // 是否呼叫中和通话中
          message.warning("inCall")
        } else {
          // 话机初始化中
          message.warning("dialerInitialization")
        }
      } else {
        dialstate.msgSb = 1;
        dialstate.msgReq = 0;
        const disCall = toRaw(state.nxwcall);
        if (disCall) {
          disCall.disconnect();
        }
        removeItem(type);
      }
    };
    const changeCallSipStatu = (status, states, id) => {
      let dateTime = dayjs().utc(8).format("YYYY-MM-DD HH:mm:ss");
      let unixTime = dayjs(dateTime).unix();
      let statusForm = {
        agentName: state.sipDialInfo.email,
        status: status,
        state: states,
        updateTime: unixTime,
        direction: state.msgDirection
      };
      checkToken().then(async (response) => {
        if (response.data.code == 0) {
          const infoCall = toRaw(state.nxwcall);
          infoCall.sendMessage(JSON.stringify(statusForm));
          clearInterval(dialstate.timers);
          dialstate.timers = null;
          dialstate.inacw = id == 8 ? true : false;
          window.parent.postMessage(
            {
              type: "agentStatus",
              content: {
                code: 2
              }
            },
            "*"
          );
        } else {
          message.error(response.data.msg);
          const errorCodes = [12001, 11031, 401, 12109, 12142, 403];
          const isErrorCodePresent = errorCodes.includes(response.data.code);
          if (isErrorCodePresent && ![0, 1, 2].includes(state.callStatus)) {
            dialstate.msgSb = 1;
            dialstate.msgReq = 0;

            const rawNxwcall = toRaw(state.nxwcall);
            if (rawNxwcall) {
              await rawNxwcall.disconnect();
            }

            removeItem();
          }
        }
      });
    };
    const handleTab = (id) => {
      state.tabId = id;
      if (id == 2) {
        callRecordRef.value.initRecord();
      }
    };
    const openOut = () => {
      dialstate.dialogVisible = true;
    };
    // 话后整理
    const getSpeechTimes = () => {
      getSpeechTime().then((response) => {
        if (response.data.code === 0) {
          dialstate.speechNum = response.data.data.postTalkSortTimeSecond.value;
        } else {
          message.error(response.data.msg);
        }
      });
    };
    // 获取脱敏配置
    const getMaskingConfig = () => {
      getDesensitize().then((response) => {
        if (response.data.code === 0) {
          const desenInfo = response.data.data;
          state.desenType = desenInfo.type;
        } else {
          message.error(response.data.msg);
        }
      });
    };
    const speechTimer = (ss) => {
      const TIME_COUNT = parseInt(ss);
      if (!dialstate.busyTimer) {
        dialstate.count = TIME_COUNT;
        dialstate.busyTimer = setInterval(() => {
          if (dialstate.count > 1 && dialstate.count <= TIME_COUNT) {
            //限制倒计时区间
            dialstate.count--;
          } else {
            clearInterval(dialstate.busyTimer); //删除定时器
            dialstate.busyTimer = null;
            // 需要进行的操作）
            changeSipStatu(state.nowSeatStatus, -1);
            // 传递整理参数给后台
            if (state.msgCallId != "") {
              pustAfterCall();
            }
          }
        }, 1000);
      }
    };
    const pustAfterCall = async () => {
      const postForm = {
        callId: state.msgCallId,
        startTime: state.afterStartTime,
        endTime: dayjs().unix()
      };
      await putAftCallTims(postForm).then((response) => {
        if (response.data.code === 0) {
        } else {
          message.error(response.data.msg);
        }
      });
    };
    const loginOut = async () => {
      if (localStorage.getItem("mStatus") == "8" && state.msgCallId != "") {
        const postForm = {
          callId: state.msgCallId,
          startTime: state.afterStartTime,
          endTime: dayjs().unix()
        };
        await putAftCallTims(postForm).then((response) => {
          if (response.data.code === 0) {
          } else {
            message.error(response.data.msg);
          }
        });
      }
      logoutnotices();
      await exitLogin().then((response) => {
        if (
          response.data.code == 0 ||
          response.data.code == 12109 ||
          response.data.code == 12001
        ) {
          if (state.nxwcall) {
            const disCall = toRaw(state.nxwcall);
            disCall.disconnect();
          }
          localStorage.removeItem("mStatus");
          state.isMic = false;
          dialstate.dialDisabled = 2;
          state.callStatus = null;
          clearInterval(dialstate.timers);
          dialstate.timers = null;
          if (dialstate.busyTimer) {
            clearInterval(dialstate.busyTimer); //删除定时器
            dialstate.busyTimer = null;
          }
          dialstate.dialogVisible = false;
          localStorage.removeItem("iframe_token");
          localStorage.removeItem("dataReceived");
          document.removeEventListener(
            "visibilitychange",
            visibilitychangeListenner
          );
          window.removeEventListener("message", initForms);

          setTimeout(() => {
            state.nxwcall = null;
            state.currentUser = null;
            window.parent.postMessage(
              {
                type: "logout"
              },
              "*"
            );
            if (dialstate.nowMethod == 0) {
              router.push({
                path: "/iframe_login"
              });
            }
            if (dialstate.nowMethod == 2) {
              router.push({
                path: "/iframe_google"
              });
            }
          }, 1000);
        } else {
          message.error(response.data.msg);
        }
      });
    };
    const removeItem = (id) => {
      if (state.nxwcall) {
        const disCall = toRaw(state.nxwcall);
        disCall.disconnect();
      }
      localStorage.removeItem("mStatus");
      state.isMic = false;
      dialstate.dialDisabled = 2;
      state.nxwcall = null;
      state.currentUser = null;
      state.callStatus = null;
      clearInterval(dialstate.timers);
      dialstate.timers = null;
      if (dialstate.busyTimer) {
        clearInterval(dialstate.busyTimer); //删除定时器
        dialstate.busyTimer = null;
      }
      state.statusTxt =
       "dialer" +
       "registrationFailed"
      localStorage.removeItem("iframe_token");
      localStorage.removeItem("dataReceived");
      if (dialstate.msgSb == 1 && id != 0) {
        window.parent.postMessage(
          {
            type: "tokenInvalid"
          },
          "*"
        );
      }
      document.removeEventListener(
        "visibilitychange",
        visibilitychangeListenner
      );
      window.removeEventListener("message", initForms);
      if (dialstate.nowMethod == 0) {
        router.push({
          path: "/iframe_login"
        });
      }
      if (dialstate.nowMethod == 2) {
        router.push({
          path: "/iframe_google"
        });
      }
    };
    const langSwitch = (val) => {
      switchLanguage({ lang: val.replace("-", "_") }).then((res) => {
        if (res.data.code === 0) {
          localStorage.setItem("locale", val);
          window.location.reload();
        } else {
          message.error(response.data.msg);
          if (
            [12001, 11031, 401, 12109, 12142, 403].indexOf(response.data.code)
          ) {
            removeItem();
          }
        }
      });
    };
    // const updateTranslatedTexts = () => {
    //   state.translatedTexts = {
    //     text1: i18n.global.t("text1"),
    //   }
    // };
    // 上报登录登出
    const logoutnotices = () => {
      if (state.sipDialInfo && state.sipDialInfo.sipNum) {
        logoutNotice({
          status: "logout-web",
          sipNum: state.sipDialInfo.sipNum
        }).then((res) => {});
      }
    };
    // 监听页面是否激活
    const visibilitychangeListenner = () => {
      if (document.visibilityState == "visible" && dialstate.isHasSip == true) {
        if (
          localStorage.getItem("mStatus") == "9" ||
          localStorage.getItem("mStatus") == "10" ||
          localStorage.getItem("mStatus") == "11" ||
          localStorage.getItem("mStatus") == "8"
        ) {
          let oldStatus = localStorage.getItem("mStatus");
          changeCallTab(oldStatus);
        } else {
          if (state.sipDialInfo) {
            dialstate.switchVisible = -1;
            const disCall = toRaw(state.nxwcall);
            if (state.nxwcall && disCall.state == 5) {
              disCall.register();
            }
            if (disCall.state == 5) {
              state.callStatus = 4;
            }
            if (state.callStatus != null) {
              let getStatus = parseInt(localStorage.getItem("mStatus"));
              changeSipStatu(getStatus, -1);
              state.nowSeatStatus = getStatus;
            }
          }
        }
      } else {
        if (document.visibilityState === "hidden") {
          if (document.hidden) {
            // 在这里执行离开或最小化浏览器时的操作
            clearInterval(dialstate.timers);
            dialstate.timers = null;
          }
        }
        dialstate.switchVisible = 0;
      }
    };
    document.addEventListener("visibilitychange", visibilitychangeListenner);
    window.addEventListener("beforeunload", function (event) {
      const disCall = toRaw(state.nxwcall);
      if (
        disCall.state == 6 ||
        disCall.state == 7 ||
        disCall.state == 8 ||
        disCall.state == 10
      ) {
        state.refuseCall = 0;
        localStorage.setItem("mStatus", 2);
        // 刷新挂断iframe内部使用postMessage向父级发送数据
        window.parent.postMessage(
          {
            type: "dialStatus",
            content: {
              code: 5,
              callId: state.msgCallId,
              orderId: state.msgOrderId,
              direction: state.msgDirection,
              caller: state.msgCaller,
              callee: state.msgCallee,
              params: state.params,
              callStartTimestamp: state.callStartTimestampState,
              callConnectedTimestamp: state.callConnectedTimestampState,
              callHangUpTimestamp: new Date().getTime(),
              other: state.msgDirection == 1 ? "" : state.otherParames
            }
          },
          "*"
        );
        disCall.disconnect();
        state.nxwcall = null;
      }
    });

    return {
      ...toRefs(dialstate),
      ...toRefs(state),
      numberRef,
      callRecordRef,
      md5,
      common,
      phoneInputChange,
      callPhone,
      clickKeyBoardNumberKey,
      deleteNumber,
      changeCallCountry,
      getCountry,
      changeExternal,
      getExternalNumber,
      handleTab,
      loginOut,
      openOut,
      openMic,
      langSwitch,
      changeSipStatu,
      changeRouters
    };
  }
});
</script>
<style lang="less"></style>
./utils/common./utils/state./utils/nxwebrtc