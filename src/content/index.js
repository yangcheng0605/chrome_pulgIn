let audioActive = null
const currentDomain = window.location.hostname;
const targetDomain = 'nxcloud.com';
const protocol = window.location.protocol;
const domain = window.location.hostname;
const fullDomain = protocol + "//" + domain;

// 检测麦克风
if (currentDomain.includes(targetDomain)) {
  navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    audioActive = stream?.active
    console.log("Microphone access granted");
    chrome.runtime.sendMessage({ active: 'mediaDevices', status: true, fullDomain})
  })
  .catch(function(err) {
      console.error("Microphone access denied", err);
      chrome.runtime.sendMessage({ active: 'mediaDevices', status: false, fullDomain})
  });
} else {
}
// 接收web页面事件
window.addEventListener('message', function (event) {
  switch (event.data && event.data.type) {
    case 'call':
      console.log('call：', event.data.message)
      // window.postMessage({ type: 'callSuccess', message: 'call success' }, '*');
      chrome.runtime.sendMessage({ active: 'webToBackground_Call', data: event.data.message})
      break;
    case 'login':
      console.log('login：', event.data.message)
      // window.postMessage({ type: 'loginSuccess', message: 'login success' }, '*');
      chrome.runtime.sendMessage({ active: 'webToBackground_Login', data: Object.assign( event.data.message,{fullDomain})})
      break;
    case 'callOut':
      console.log('callOut：', event.data.message)
      // window.postMessage({ type: 'loginSuccess', message: 'login success' }, '*');
      chrome.runtime.sendMessage({ active: 'callOut', data: Object.assign( event.data.message,{fullDomain})})
      break;
  }
})

function getTabId() {
  chrome.runtime.sendMessage({ active: 'getTabId'}, (response) => {
    // tabId = response?.tabId
    // console.log('获取到tabId', tabId)
  })
}
getTabId()

// 接受信息
chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
  if (data.active) {
    switch (data.active) {
      case 'greeting':
        console.log(audioActive)
        sendResponse("👀这是来自content的响应");
        break;
    }
  } else {
    console.log("📌收到消息：", data);
    sendResponse({ message: '📌这是来自Background Script的响应：牛逼 我拿到你给我的消息了' });
  }
  // if (data.orgin === "popup" && data.target == 'content' ) {
  //   console.log("📌收到来自Popup的消息：", data);
  //   sendResponse("📌这是来自Background Script的响应");
  // } else {
  //   console.log("📌收到来自Background的消息：", data);
  //   sendResponse({ message: '📌这是来自Background Script的响应：牛逼 我拿到你给我的消息了' });
  // }
});


// chrome.runtime.onConnect.addListener(port => {
//   console.log(port)
// 	if(port.name == 'background') {
// 		port.onMessage.addListener(msg => {
// 			if(msg.cmd== 'background-connect') {
//         console.log(msg)
//         port.postMessage({cmd: 'cnt-connect'});
//       }
// 			if(msg.cmd== 'done'){
//         console.log(msg)
//         port.postMessage({cmd: 'done'});
//       }
// 		});
// 	}else if(port.name === 'content'){
// 	}
// });







// var localStorageData = {};
// for (var i = 0; i < localStorage.length; i++) {
//   var key = localStorage.key(i);
//   var value = localStorage.getItem(key);
//   localStorageData[key] = value;
// }
// let tabId 

//发消息
// chrome.runtime.sendMessage({ greeting: localStorageData, orgin:'content', target: "background" }, (response) => {
//   if (chrome.runtime.lastError) {
//     console.error('Error sending message:', chrome.runtime.lastError)
//     return
//   }
//   if (response) {
//     console.log('👀: content_scripts.js  receive_Back:', response)
//   }
// })
