import { reactive } from 'vue'
export const state = reactive({
    numberText: "",
    callCountry: null,
    numberJson: [
        {
            number: 1,
            label: ""
        },
        {
            number: 2,
            label: "ABC"
        },
        {
            number: 3,
            label: "DEF"
        },
        {
            number: 4,
            label: "GHI"
        },
        {
            number: 5,
            label: "JKL"
        },
        {
            number: 6,
            label: "MNO"
        },
        {
            number: 7,
            label: "PQRS"
        },
        {
            number: 8,
            label: "TUV"
        },
        {
            number: 9,
            label: "WXYZ"
        },
        {
            number: "*",
            label: ""
        },
        {
            number: 0,
            label: "+"
        },
        {
            number: "#",
            label: ""
        }
    ],
    tabList: [
        {
            id: 1,
            name: 'dailPad',
            icon: require("../img/icon_dial.svg"),
            iconAct: require("../img/icon_dial_act.svg"),
            path: "/mobileDial"
        },
        {
            id: 2,
            name: 'callLogs',
            icon: require("../img/icon_record.svg"),
            iconAct: require("../img/icon_record_act.svg"),
            path: "/mobileLog"
        }
    ],
    callNumber: '',
    callStatus: null, // 0 发起通话
    nxwcall: null,
    currentUser: null,
    isLoginSuccess: null,
    isTimer: null,
    talkCallTime: '00:00:00',
    statusTxt: 'dialerInitialization',
    openCalling: false,
    openRecord: false,
    tabId: 1,
    isMic: false,
    sipDialInfo: {},
    ccToken: '',
    mStatus: '',
    displayNumber: '',
    routerNumberId: '',
    callType: null,
    speechTimeStatus: false,
    nowSeatStatus: null,
    isMuted: false,
    isOrNoAnwser: null,
    msgDirection: null,
    params: "",
    msgOrderId: "",
    msgCallId: "",
    msgCaller: "",
    msgCallee: "",
    callStartTimestampState: null,
    callConnectedTimestampState: null,
    otherParames: "",
    callDidNumber: null,
    afterStartTime: null,
    refuseCall: null,
    callIngNumber: '',
    desenType: null
})