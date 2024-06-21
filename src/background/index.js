/* ————————————————全局变量———————————————— */
let popupWindow = null
let isUseMic = null
let tabIds = []
let callOut = null
let loginInfo = null
// 后续改成缓存
/* ————————————————全局变量—End——————————————— */

/* ————————————————初始———————————————— */

chrome.runtime.onInstalled.addListener(async() => {
  // 限制域名 可访问
  // chrome.action.disable();
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
	// 	chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [
  //       new chrome.declarativeContent.PageStateMatcher(
  //         { pageUrl: { hostSuffix: 'nxcloud.com'} }
  //       ),
  //     ],
  //     actions: [ new chrome.declarativeContent.ShowAction() ]
  //   }]);
	// });

});
//点击扩展图标事件
chrome.action.onClicked.addListener(async(tabValue) => {
  console.log('扩展图标被点击了！', tabValue)
  createPopup()
})
chrome.windows.onRemoved.addListener(function(windowId) {
  CacheManager.getCache('popupWindow',(res)=>{
    if (res && res.id === windowId) {
      CacheManager.setCache('popupWindow', null);
    }
  })
});

/* ————————————————初始—End——————————————— */

// 建立与popup页面的长连接
chrome.runtime.onConnect.addListener((port) => {
  console.log("与popup页面建立了长连接");

  // 接收来自popup页面的消息
  port.onMessage.addListener((message) => {
    console.log("收到来自popup页面的消息:", message);

    // 向popup页面发送响应消息
    port.postMessage("收到你的消息了！");
  });

  // 监听长连接断开事件
  port.onDisconnect.addListener(() => {
    console.log("与popup页面的长连接断开了");
  });
});


/* ————————————————接收消息———————————————— */

// 保持消息监听通道
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  return true; 
});

chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
  let obj=''
  console.log('background Listener:', data)
  if (data.active) {
    switch (data.active) {
      // Pop加载完成
      case 'popupLoaded':
        // CacheManager.getCache('iframe_token',(res)=>{
        //   console.log('backgtound iframe_token', res)
        //   if (res) {
        //     if (callOut) {
        //       sendCallInfo(callOut)
        //     }
        //   } else {
            if (loginInfo) {
              sendLoginInfo(loginInfo)
            } else {
              noLoginInfo()
            }
          // }
        // });
        sendResponse({message:true})
        break;
      case 'getTabId':
        obj = Object.assign({},{tabId: sender.tab && sender.tab.id })
        tabs(sender)
        sendResponse()
        // sendResponse(obj)
        break;
      case 'mediaDevices':
        isUseMic = data.status
        CacheManager.setCache('isUseMic', data.status);
        CacheManager.setCache('fullDomain', data.fullDomain);
        // mediaDevicesToPopup(data.status)
        break;
      case 'getMediaDevices':
        isUseMic = data.status
        sendResponse({isUseMic})
        break;
      case 'webToBackground_Login':
        loginInfo = data.data
        createPopup()
        // isUseMic = data.status
        // sendResponse({isUseMic})
        break;
      case 'callOut':
        callOut = data.data
        getUserToken(res=>{
          if (res && callOut) {
            createPopup()
            sendCallInfo(data.data)
          }
        })

        // chrome.storage.local.get(null, function(result) {
        //   console.log(result);
        // });
        // chrome.storage.local.get('iframe_token', (result) => {
        //   console.log('backgtound iframe_token', result)
        // });
        
        // isUseMic = data.status
        // sendResponse({isUseMic})
        break;
      case 'SSOloginSuccess':
        console.log(data.data)
        // isUseMic = data.status
        // sendResponse({isUseMic})
        break;
      case 'SSOloginFail':
        console.log(data.data)
        // isUseMic = data.status
        // sendResponse({isUseMic})
        break;
      case 'logout':
        console.log(data.data)
        loginInfo = null
        // sendResponse({isUseMic})
        break;
    }
  } 
})

/* ————————————————接收消息—End——————————————— */


/* ————————————————发送消息———————————————— */

// 发送call信息给到popup
function sendCallInfo(res){
  console.log('sendCallInfo:', res)
 runSendMessage({ active: 'BackToPop_Call', info: res });
}
// 获取token
function getUserToken(callback){
 runSendMessage({ active: 'getUserToken' },res=>{
  typeof callback =='function' && callback(res)
 });
}
// 发送login信息给到popup
function sendLoginInfo(res){
 runSendMessage({ active: 'BackToPop_Login', info: res });
}
// 发送login信息给到popup
function noLoginInfo(res){
 runSendMessage({ active: 'toLogin' });
}
// 发送SSO Token信息给到popup
function sendSSOTokenInfo(res, callback){
//  runSendMessage({ active: 'BackToPop_SSOToken', info: res }, function (response) {
//     callback()
//   });
  chrome.runtime.sendMessage({ active: 'BackToPop_SSOToken', info: res }, function (response) {
    callback()
  });
}
// 发送tab信息给到popup
function sendTabsInfo(tab){
  tab.isUseMic = isUseMic
  runSendMessage({ active: 'activeTab', tabInfo: tab });
}
function runSendMessage(obj, callback){
  if (callback && typeof callback === 'function') {
    chrome.runtime.sendMessage(obj, callback);
  } else {
    chrome.runtime.sendMessage(obj);
  }
}

/* ————————————————发送消息—End——————————————— */



/* ————————————————监听标签页———————————————— */
// 标签页打开时
chrome.tabs.onCreated.addListener(function(tab) {
  if (tabIds.indexOf(tab.id) == -1) {
    tabIds.push(tab.id);
  }
});
// 监听用户切换tab页
chrome.tabs.onActivated.addListener(function(activeInfo) {
  var tabId = activeInfo.tabId;
  let imgUrl = ''
  // 在此处执行你想要的操作，例如获取当前标签页的信息或执行特定的逻辑
  console.log('用户切换到标签页：', tabId)
  if (tabIds.indexOf(tabId) == -1) {
    tabIds.push(tabId);
  }
  chrome.tabs.get(tabId,res=>{
    if (res.url.indexOf('nxcloud') > -1) {
      var text = 
`标签页ID：${res.id}
${res.title}
${res.url}
`
      showNotification(text)
    }
    // 控制图标
    // controlIcon(res.url)
  })
  // sendTabsInfo(activeInfo)
});
// 监听标签页状态更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabIds.indexOf(tabId) == -1) {
    tabIds.push(tabId);
  }
  if (changeInfo.status === 'complete') {
    console.log('Tab 更新:', tab);
    if (tab.url.indexOf('iframe_redirect') > -1) {
      var SSOData = durl(tab.url)
      console.log('SSOData：', SSOData)
      sendSSOTokenInfo(SSOData,res=>{
        closeTabs(tab.id)
      })
    }
    if (tab.title=="操作记录") {
      /* 长连接 */
      const port = chrome.tabs.connect(tab.id, {name: 'background'});
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        port.postMessage({cmd: 'background-connect',value:'extension'});
        port.onMessage.addListener(msg => {
          if(msg.cmd === 'cnt-connect') {
            console.log(msg)
            port.postMessage({cmd: 'done'});
          }
          if(msg.cmd === 'done') {
            console.log(msg)
          }
        });
      });
    }
    // sendTabsInfo(tab)
  }
});
// 监听标签页关闭
chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{
  var index = tabIds.indexOf(tabId);
  if (index !== -1) {
    tabIds.splice(index, 1);
  }
  console.log('标签页关闭了', tabId, removeInfo)
})

/* ————————————————监听标签页—End—————————————— */




/* ————————————————公共方法—————————————— */
// 创建并显示通知
function showNotification(message) {
  // 请求通知权限
  chrome.notifications.getPermissionLevel(function(permissionLevel) {
    if (permissionLevel === 'granted') {
      // 创建通知
      chrome.notifications.create({
        type: 'basic',
        iconUrl: chrome.runtime.getURL("assets/logo.png"),
        // iconUrl: 'https://github.yanhaixiang.com/jest-tutorial/images/logo.png',
        title: '当前页面信息',
        message: message,
        buttons: [
          {
            title: '按钮1',
            iconUrl: chrome.runtime.getURL("assets/logo.png")
          },
          {
            title: '按钮2',
            iconUrl: chrome.runtime.getURL("assets/logo.png")
          }
        ]
      }, function(notificationId) {
        // 创建通知后的回调函数
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
        }
        console.log('Notification created with ID:', notificationId);
      });
    }
  });
}
// 获取url参数
function durl (url) {
  var urlParams = new URLSearchParams(url.split('?')[1]);
  var queryParams = {};
  for (let pair of urlParams.entries()) {
    var key = pair[0];
    var value = pair[1];
    queryParams[key] = value;
  }
  return queryParams
}
// 关闭标签页
function closeTabs(id) {
  chrome.tabs.remove([id],()=>{
    console.log('*********end***************')
  })
}

// 创建popup窗口
function createPopup(callback) {
   CacheManager.getCache('popupWindow',(res)=>{
    console.log('缓存popupWindow：', res)
    // 如果窗口已存在并且未关闭，则聚焦到该窗口
    if (res && !res.closed) {
      console.log(res)
      // 以防万一 先检查有没有这个窗口  没有就先清除缓存在重新创建新窗口
      chrome.windows.get(res.id, res=>{
        if (res){
          chrome.windows.update(res.id, { focused: true },res=>{
            console.log('windows激活：', res)
          });
        } else {
          CacheManager.setCache('popupWindow', null);
          createPopup()
        }
      })
    } else {
      // 如果窗口不存在或已关闭，则创建一个新的弹出窗口
      chrome.windows.getCurrent(function(w) {
        chrome.windows.create({url: "popup.html", type: "popup", width:350,height:550,top: 80,left: (w.width - 340)}, function(window) {
          CacheManager.setCache('popupWindow', window);
          typeof callback == 'function' && callback()
        });
      });
      // 打开扩展内其他页面
      // const componentPageURL = chrome.runtime.getURL('test.html');
      // chrome.tabs.create({ url: componentPageURL });
    }
   });
}
// 监测到新的tab  与 tabs contentjs 通信
function tabs(obj) {
  // 在背景页面发送消息，需要当前 tabID
  const { tab } = obj
  chrome.tabs.sendMessage(tab.id, { tab }, function (response) {
    console.log(response)
  });
};

// 获取当前 tab ID
function getCurrentTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log('activeTab:',  tabs[0])
      resolve(tabs.length ? tabs[0].id : null)
    });
  })
};


// 存取删除缓存的方法
const CacheManager = {
  setCache: (key, data) => {
    chrome.storage.local.set({ [key]: data });
  },
  getCache: (key, callback) => {
    chrome.storage.local.get(key, (result) => {
      callback(result[key]);
    });
  },
  deleteCache: (key) => {
    chrome.storage.local.remove(key);
  },
}

function controlIcon (url) {
  if ( url && url.indexOf('nxcloud') > -1) {
    imgUrl = "assets/logo.png"
    chrome.action.enable()
  } else {
    // chrome.action.disable()
    imgUrl = "assets/logo_ban.png"
    chrome.action.setPopup({popup: chrome.runtime.getURL('test.html')}, res=>{
      console.log(res)
    })
  }
  chrome.action.setIcon({
    path: {
      "48":  chrome.runtime.getURL(imgUrl),  
      "128":  chrome.runtime.getURL(imgUrl)
    }
  });
}
/* ————————————————公共方法—End————————————— */



// function mediaDevicesToPopup(data){
//   console.log('传递麦克风', data)
//   chrome.runtime.sendMessage({ active: 'mediaDevices', status: data})
// }



// // 监听用户导航事件
// chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
//   console.log('用户正在前往：', details.url);
//   // 获取当前活跃的标签页信息
// });



// // 检测缓存变化
// chrome.storage.onChanged.addListener((changes, namespace) => {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });



// // 定时器，每隔30分钟触发一次
// chrome.alarms.create("myAlarm", {
//   delayInMinutes: 1,
//   periodInMinutes: 1
// });

// // // 监听定时器触发事件
// chrome.alarms.onAlarm.addListener(function(alarm) {
//   if (alarm.name === "myAlarm") {
//     console.log('1分钟已过：执行定时任务')
//     console.log(tabIds)
//     chrome.tabs.sendMessage(tabIds[0], {active:"greeting", message:'📌单独给你发的' }, function (response) {
//       console.log(response)
//     });
//     chrome.runtime.sendMessage({active:"greeting", message:'📌广播给你发的' }, function (response) {
//       console.log('📌: background.js  发送222后 receive_Back :', response)
//     });
//   }
// });