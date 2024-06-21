<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
    <h1>当前麦克风授权状态：{{isUseMic?'已允许':'禁止'}}</h1>
    <p v-if="pageInfo">
      当前页面信息：{{ pageInfo }}
    </p>
    <p id="m-plugin-wrap">
      接收到后台消息啦：{{ message }}
    </p>
    <router-link to="login">跳转</router-link>
    <button @click="local">缓存</button>
    <button @click="login">登录</button> -->
    <p style="width: 200px;">当前域暂无使用权限</p>
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, toRefs, watch } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      id: '',
      message: '',
      pageInfo: null,
      audioValue: 'default',
      isUseMic: false,
    })
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
    onMounted(async () => {
      // document.addEventListener('DOMContentLoaded', function() {
        // chrome.runtime.sendMessage({ active: 'popupLoaded' }, (response) => {
        //   getAudioStatus()
        // });
      // });
    })
    
    const local = e => {
      // 获取本地存储数据
      // chrome.storage.local.get(['isUseMic'], function(result) {
      //   console.log('chrome本地数据：', result);
      // });
    }
    const getAudioStatus = e => {
      // chrome.storage.local.get(['isUseMic'], function(result) {
      //   if (typeof result.isUseMic == 'boolean') {
      //     state.isUseMic = result.isUseMic || state.pageInfo.isUseMic || ''
      //   } else {
      //     chrome.runtime.sendMessage({active: "getMediaDevices" }, function(response) {
      //       console.log("📌收到background的响应：", response);
      //       state.isUseMic = response.isUseMic
      //     });
      //   }
      // });
    }
    const login = e => {
      // const getViews = chrome.extension.getViews();
      // console.log(getViews)
      // const getBackgroundPage = chrome.extension.getBackgroundPage();
      // console.log(getBackgroundPage)
    }
 
    return {
      ...toRefs(state),
      local,
      login,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
