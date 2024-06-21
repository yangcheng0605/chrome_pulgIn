<template>
  <div class="mobie-record">
    <h3 class="record-title">callLogs</h3>
    <a-spin :spinning="loadings">
      <div class="record-list">
        <ul class="record-ul">
          <li v-for="(item, index) in recordList" :key="index">
            <div class="record-left">
              <div class="record-top">
                <p class="record-number">
                  <span class="record-number-name">
                    {{
                      item.direction == 0 || item.direction == 2
                        ? item.displayCaller
                        : item.displayCallee
                    }}</span
                  >
                  <span class="record-remark">{{
                    item.remark ? item.remark : ""
                  }}</span>
                </p>
              </div>
              <div class="accessStatus">
                {{ item.accessStatus }}
              </div>
              <div class="record-bottom">
                <span class="record-time">
                  {{ common.format(item.callDuration) }}
                </span>
                <span class="record-date">{{ item.endTime }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </a-spin>
  </div>
</template>
<script>
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  toRaw,
  getCurrentInstance
} from "vue";
import { workbenchRecord } from "./api";
import common from "./utils/common";
import dayjs from "dayjs";
import { state } from "./utils/state";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const states = reactive({
      tabId: 2,
      recordList: [],
      loadings: true
    });

    const initRecord = () => {
      let postForm = {
        direction: null,
        answered: null
      };
      states.loadings = true;
      workbenchRecord(postForm).then((response) => {
        if (response.data.code === 0) {
          // answered:true接通,false未接通
          response.data.data.map((item) => {
            switch (item.answered) {
              case true:
                item.callIcon =
                  item.direction == 0 || item.direction == 2 ? "in" : "out";
                break;
              case false:
                item.callIcon =
                  item.direction == 0 || item.direction == 2 ? "noAns" : "out";
                break;
              default:
                break;
            }
          });
          states.recordList = response.data.data;
          states.loadings = false;
        } else {
          message.error(response.data.msg);
        }
      });
    };

    const backCalling = (item) => {
      let number = "";
      if (item.direction == 0) {
        number = item.caller;
      } else if (item.direction == 2) {
        number = item.clientSipFrom;
      } else {
        number = item.callee;
      }
      if (number) {
        if (state.isMic == false) {
          message.warning(
            "If you fail to obtain a microphone, please enable the microphone permission first"
          );
          return;
        }
        if (state.callStatus == -2) {
          message.warning("No agent information");
          return;
        }
        if (state.callStatus == null) {
          message.warning("The dialer is in the initialization.");
          return;
        }
        if (state.callStatus == -1) {
          message.warning("The dialer failed to register.");
          return;
        }
        if (
          state.callStatus === 0 ||
          state.callStatus === 1 ||
          state.callStatus === 2
        ) {
          message.warning("In a call");
          return;
        }
        state.callNumber = number;
        state.callStatus = 0;
        if (state.nxwcall) {
          state.openCalling = true;
          const backCall = toRaw(state.nxwcall);
          if (item.didNumberId == null || item.didNumberId == 0) {
            let hdrs;
            if (item.routerId) {
              hdrs = new Array(
                `X-CallBack-Call-ID: ${item.callId}`,
                `X-NXCC-Router-ID:  ${item.routerId}`
              );
            } else {
              hdrs = new Array(`X-CallBack-Call-ID: ${item.callId}`);
            }
            backCall.placeCall(number, hdrs);
          } else {
            let hdrs = new Array(
              `X-NXCC-Out-Caller-Number:  ${
                item.direction == 0 ? item.callee : item.clientSipFrom
              }`,
              `X-CallBack-Call-ID: ${item.callId}`
            );
            backCall.placeCall(number, hdrs);
          }
        }
      } else {
        message.warning("The record has no number");
      }
    };

    return {
      ...toRefs(states),
      ...toRefs(state),
      common,
      dayjs,
      backCalling,
      initRecord
    };
  }
});
</script>
<style lang="less">
// 通话记录
.mobie-record {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .record-title {
    width: 100%;
    font-size: 16px;
    color: #000000;
    line-height: 30px;
    padding: 15px 15px 0 15px;
  }
  .record-list {
    width: 100%;
    height: calc(100% - 35px);
    overflow-y: scroll;
  }
  .record-ul {
    width: 100%;
    padding: 0 15px;
    padding-bottom: 30px;
    li {
      width: 100%;
      padding: 11.5px 0;
      display: flex;
      border-bottom: 1px solid #eeeeee;
      .record-left {
        width: 100%;
        text-align: left;
        .record-top {
          width: 100%;
          p {
            display: inline-block;
            vertical-align: middle;
          }
          .record-number {
            line-height: 18px;
            span {
              vertical-align: middle;
            }
            .record-number-name {
              font-size: 14px;
              color: #000000;
            }
            .record-remark {
              font-size: 12px;
              color: #999999;
              margin-left: 15px;
            }
          }
        }
        .accessStatus {
          font-size: 12px;
          color: #999999;
          margin-top: 4px;
          margin-bottom: 4px;
        }
        .record-bottom {
          width: 100%;
          display: flex;
          justify-content: space-between;
          span {
            display: inline-block;
            font-size: 12px;
            color: #999999;
            line-height: 14px;
          }
          .record-date {
            // margin-right: 25px;
            // margin-top: 4px;
            width: 60%;
            text-align: right;
          }
          .record-time {
            text-align: left;
            width: 40%;
          }
        }
      }
      .record-right {
        width: 20%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img {
          width: 20px;
          display: block;
        }
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }
  .ant-spin-nested-loading {
    height: calc(100% - 53px);
    .ant-spin-container {
      height: 100%;
    }
  }
}
// 媒体查询
@media screen and (min-width: 501px) {
  /* 在屏幕宽度大于 500px 时应用的样式 */
  .mobie-record {
    height: 100%;
  }
  .mobie-record {
    .record-ul {
      padding-bottom: 60px;
    }
  }
}
</style>
./utils/common./utils/state