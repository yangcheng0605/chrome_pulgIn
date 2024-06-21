<template>
  <div class="mobile-calling">
    <div class="mobile-calling-box">
      <div class="mobile-calling-number">
        {{ `${callIngNumber}` }}
      </div>
      <div class="call-status">
        <span v-if="callStatus == 0 || callStatus == 1">
          {{
            callStatus == 0
              ? 'ringings'
              : 'newCall'
          }}
        </span>
        <span v-if="callStatus == 2">
          {{ talkCallTime }}
        </span>
      </div>
      <img
        src="./img/call.gif"
        alt=""
        class="callGIf"
        v-show="callStatus == 2 && !showDial"
      />
      <div class="show-dial" v-show="showDial">
        <a-row :gutter="15">
          <a-col :span="8" v-for="(item, index) in numberJson" :key="index">
            <div
              class="mobile-number-circle"
              @click="clickKeyBoardNumberKeys(item.number)"
            >
              <div class="number-content">
                <h3>{{ item.number }}</h3>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="dial-act-btn">
        <div
          :class="
            callStatus == 1 ? 'dial-act-btn-row-half' : 'dial-act-btn-row'
          "
          v-if="callStatus == 1"
        >
          <img
            src="./img/call_out.svg"
            alt=""
            class="hangupBtn"
            @click="anwserCall"
          />
        </div>
        <div class="dial-act-btn-row" v-if="callStatus == 2">
          <img
            src="./img/no_mute.svg"
            alt=""
            class="callingLeftRight"
            style="margin-right: 7.5px"
            @click="changeMuted(0)"
            v-if="!isMuted"
          />
          <img
            src="./img/mute.svg"
            alt=""
            class="callingLeftRight"
            style="margin-right: 7.5px"
            @click="changeMuted(1)"
            v-if="isMuted"
          />
        </div>
        <div
          :class="
            callStatus == 1 ? 'dial-act-btn-row-half' : 'dial-act-btn-row'
          "
        >
          <img
            src="./img/hangup.svg"
            alt=""
            class="hangupBtn"
            @click="hangUpCall"
          />
        </div>
        <div class="dial-act-btn-row" v-show="!showDial && callStatus == 2">
          <img
            src="./img/showdial.svg"
            alt=""
            @click="openDial"
            class="callingLeftRight"
            style="margin-left: 7.5px"
          />
        </div>
        <div class="dial-act-btn-row" v-show="showDial && callStatus == 2">
          <span @click="closeDial" style="margin-left: 7.5px">packUp</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, toRaw } from "vue";
import { state } from "./utils/state";
import "./index.less";

export default defineComponent({
  setup() {
    const ingState = reactive({
      showDial: false
    });
    const openDial = () => {
      ingState.showDial = true;
    };
    const closeDial = () => {
      ingState.showDial = false;
    };
    const anwserCall = () => {
      if (state.nxwcall != null) {
        const nxwcallPlace = toRaw(state.nxwcall);
        nxwcallPlace.answerCall();
        state.callStatus = 2;
        localStorage.setItem("mStatus", 11);
      }
    };
    const hangUpCall = () => {
      if (state.nxwcall != null) {
        ingState.showDial = false;
        state.openCalling = false;
        state.isOrNoAnwser = 0;

        // 判断是否开启话后整理、
        if (state.msgDirection == 1) {
          if (state.speechTimeStatus === true) {
            localStorage.setItem("mStatus", 8);
          } else {
            localStorage.setItem("mStatus", state.nowSeatStatus);
          }
        } else {
          if (state.speechTimeStatus === true && nxwcall.confirmTs != null) {
            localStorage.setItem("mStatus", 8);
          } else if (
            state.speechTimeStatus === true &&
            nxwcall.confirmTs == null &&
            state.isOrNoAnwser == 0
          ) {
            localStorage.setItem("mStatus", 8);
          } else {
            localStorage.setItem("mStatus", state.nowSeatStatus);
          }
        }
        const nxwcallPlace = toRaw(state.nxwcall);
        nxwcallPlace.hangupCall();
      }
    };
    const clickKeyBoardNumberKeys = (num) => {
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
      if (state.callStatus == 2) {
        nxwcallDtmf.sendDTMF(num.toString());
        state.callIngNumber += num;
      }
    };
    const changeMuted = (id) => {
      state.isMuted = id == 0 ? true : false;
      const nxCall = toRaw(state.nxwcall);
      nxCall.muteCall(state.isMuted);
    };
    return {
      ...toRefs(state),
      ...toRefs(ingState),
      openDial,
      closeDial,
      hangUpCall,
      clickKeyBoardNumberKeys,
      anwserCall,
      changeMuted
    };
  }
});
</script>
<style lang="less">
.show-dial {
  width: 100%;
  margin-top: 25px;
  // padding: 0 43px;
  margin-top: 30px;

  .mobile-number-circle {
    width: 44px;
    height: 44px;
    margin: 0 auto;
    border-radius: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
    margin-bottom: 10px;
    cursor: pointer;

    .number-content {
      width: 100%;

      h3 {
        font-weight: 500;
        font-size: 22px;
        width: 100%;
        color: #ffffff;
        // margin-bottom: 0;
        margin: 0;
      }

      p {
        width: 100%;
        font-size: 12px;
        color: #ffffff;
        margin-bottom: 0;
      }
    }
  }

  .mobile-call-button {
    width: 75px;
    height: 75px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .mobile-delete-button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .delete-number {
      width: 46px;
    }
  }
  .hide-dial {
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.callGIf {
  width: 70%;
  display: block;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 110px;
}
.dial-act-btn {
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 65px;
  left: 0;
  // padding: 0 43px;
  .dial-act-btn-row {
    width: 33.333%;
    text-align: center;
    .callingLeftRight {
      width: 22px;
      display: inline-block;
    }
    span {
      font-size: 14px;
      color: #ffffff;
    }
  }
  .dial-act-btn-row-half {
    width: 50%;
  }
}
// 媒体查询
@media screen and (min-width: 501px) {
  .show-dial {
    .hide-dial {
      line-height: 50px;
    }
  }
}
</style>
./utils/state