export default {
  head: {
    confirm: '确定',
    cancel: '取消',
    tokenExpired: '登录信息已过期，请重新登录',
    loginDiale: '请先登录话机'
  },
  dashboard: {
    hangUp: '挂断'
  },
  sip_i: {
    noAgentInformation: '无坐席信息',
    noDialerInformation: '无话机信息',
    noAgentAvailable: '无可用坐席',
    dialerInitialization: '话机初始化中',
    dialerFailedRegister: '话机注册失败',
    inCall: '正在通话中',
    inCallIng: '通话中',
    ringings: '振铃中',
    savedSuccessfully: '保存成功',
    free: '示闲',
    busy: '示忙',
    workfree: '工作-示闲',
    workbusy: '工作-忙碌',
    afterCall: '话后整理',
    equipmentDetection: '设备检测',
    logout: '退出登录',
    dailPad: '拨号盘',
    dialing: '呼叫中',
    dialerOverdue: '余额不足',
    notCountry: '不允许呼叫的国家',
    errNumber: '号码不正确',
    networkError: '网络异常',
    limitOutFiveNums: '今日呼叫体验已上限。',
    didBindErr: 'DID号码呼叫失败。',
    registerSuccessfully: '注册成功',
    registrationFailed: '注册失败',
    errSymCode: `号码中包含不合法的符号（"#"）`,
    enterNumber: '请输入号码',
    rejected: '已拒接',
    newCall: '新来电',
    dialer: '话机',
    minuteAgo: '分钟前',
    hourAgo: '小时前',
    justNow: '刚刚',
    displayNumber: '外呼显号',
    selectDisplayNumber: '请选择外呼显号',
    agentGroupManager: '坐席组组长',
    noManager: '无',
    setManager: '设置组长',
    successfullySet: '设置成功',
    pleaseSelectAgent: '请选择一名成员',
    synchronizePhoneNumbers: '同步号码',
    type: '类型',
    randomNumber: '随机号码',
    unknown: '未知',
    reconnecting: '服务重连中...',
    selectDisplayNumbers: '请选择外呼显号',
    completeEnterpriseCertification: '请先完成企业认证',
    notSupportMic: '浏览器不支持麦克风，请更换浏览器',
    isHaveMic: '请先前往浏览器设置处开启麦克风权限，或咨询管理员。',
    aiOutboundTask: 'AI外呼任务',
    mute: '静音',
    recover: '恢复',
    logoutTip: '您确定要退出登录吗？',
    newlineCall: '您有新来电-牛信云呼叫中心',
    restMeeting: '休息-会议',
    restEating: '休息-吃饭',
    restWc: '休息-厕所',
    restSleep: '休息-睡觉',
    restOther: '休息-其他',
    restTime: '休息时长',
    resStatusTimes: '休息状态时长',
    workRecord: '工作记录',
    newlineCall: '您有新来电-牛信云呼叫中心'
  },
  record: {
    inboundCall: '呼入',
    outboundCall: '呼出',
    callLogs: '通话记录',
  },
  agent: {
    hint: '提示'
  },
  quote: {
    countryCode: '国码'
  },
  verify: {
    pw: '请输入密码，8-20位数字和字母组合',
    pw_length: '密码长度不能小于8位',
    pw_no_more: '密码长度不能大于20位',
    pw_must: '密码必须是数字和字母的组合'
  },
  seeting: {
    blacklistedNumberTip: '呼叫失败（黑名单号码）',
    callFailureLimit: '呼叫失败（呼叫次数限制）',
    cannotNumber: '当前号码无法使用',
  },
  equipment: {
    checkWhetherMicrophone: '请检查是否存在麦克风,并前往浏览器设置检查是否开启或者咨询技术人员',
  },
  monitor: {
    sortOutShow: '整理中',
  },
  v2: {
    numberTotal: '号码总量',
    callTotal: '拨打量',
    completedNum: '完成量',
    answered: '接通量',
    answerRate: '号码接通率',
    answerRateDial: '拨打接通率',
    transferAgent: '转人工量',
    transferRate: '转人工率',
    loss: '呼损量',
    lossRate: '呼损率',
    laborTurnover_num: '转人工量',
    numberCalls: '拨打次数',
    allMumbers: '所有号码',
    allCalls: '所有拨打',
    completionStatus: '完成状态',
    onCondition: '接通状况',
    connect: '接通',
    notConnect: '未接通',
    seatUtilization2: '坐席利用率',
    laborTurnover_normal: '转人工率',
    connectionRate_normal: '号码接通率',
    callRate2_normal: '拨打接通率',
    laborTurnover_echarts: '转人工率',
    connectionRate_echarts: '号码接通率',
    callRate2_echarts: '拨打接通率',
    AICallAnalytics: 'AI外呼统计',
    allSeatingGroups: '全部坐席组',
    AVGWait: '平均等待时长',
    ASA: '平均接起时长',
    AVGTalk: '平均通话时长',
    ACW: '平均整理时长',
    AVGHandle: '平均处理时长',
    customerReviews: '客户评价数',
    satisfactionRate: '满意度',
    everyDay: '每天',
    everySevenDays: '每周',
    everyHour: '每小时',
    hint_1: '转人工率：转接坐席组等待接听数量/用户接通电话总数<br />号码接通率：用户接通电话总数/号码总量<br />拨打接通率：用户接通电话总数/拨打量',
    hint_2: "任务进度=已完成/号码总量",
    hint_3: '已完成：已接通或完成所有拨打次数的号码总数<br />号码总量：任务中累计上传的号码数量<br />拨打量：所有的拨打次数',
    aidetail_hint1: '号码的通话完成状态',
    aidetail_hint2: '号码是否被用户接通的结果',
    aidetail_hint3: 'AI呼叫自动识别的拨打标签',
    aidetail_hint4: '坐席人员通话后为本通话所标记标签',
    aidetail_hint5: '号码的拨打策略',
    aidetail_hint6: '号码所经历的拨打轮次',
    aidetail_hint7: '本次拨打的通话状态',
    aidetail_hint8: '本次拨打所属拨打轮次',
    aidetail_hint9: '坐席通话+话后整理时长/坐席通话+话后整理+空闲总时长',
    analytics_hint1: '完成量：已接通或完成所有拨打次数的号码总数<br />拨打量：所有的拨打次数<br />接通量：成功被用户端接起的拨打总数',
    analytics_hint2: '号码接通率：用户接通电话总数/号码总量<br />拨打接通率：用户接通电话总数/拨打量',
    analytics_hint3: '转人工量：转接坐席组等待接听拨打总数<br />转人工率：转人工量/接通量',
    analytics_hint4: '呼损率：呼损量/转接坐席组等待接听数量<br />呼损量：转接至坐席组等待接听，但未能被坐席接起的电话数量',
    analytics_hint5: '用户等待坐席接通总时长/坐席接通总数',
    analytics_hint6: '坐席响铃到接起总时长/坐席接通总数',
    analytics_hint7: '坐席通话总时长/坐席接通总数',
    analytics_hint8: '坐席话后整理总时长/接通总数',
    analytics_hint9: '总处理时长/总通话次数,其中处理时长=接起时长+通话时长+话后整理时长',
    routeManagement: '路由管理',
    routeAssignment: '路由指派',
    routeHoming: '路由归属',
    routeName: '路由名称',
    routeDescription: '路由说明',
    inboundSupport: '允许呼入',
    inboundSupport_hint: '关闭后将不允许用户通过此路由呼入到坐席组',
    noInboundOrOutbound: '禁止呼入呼出',
    inboundAndOutbound: '呼入呼出',
    inboundOnly: '仅呼入',
    outboundOnly: '仅呼出',
    updateTime: '更新时间',
    lineName: '线路名称',
    gatewayAddress: '网关地址',
    calledPrefix: '被叫前缀',
    lineName: '线路名称',
    maxConcurrent: '最大并发',
    numberMatching: '号段匹配',
    weight: '权重',
    numberPool: '号码池',
    chooseNumberPool: '已选号码池',
    routeOperation: '路由操作',
    lineOperation: '线路操作',
    description: '描述',
    management: '管理',
    addNumberPool: '新增号码',
    managementPool: '管理号码池',
    addRoute: '新增路由',
    addLine: '新增线路',
    editRoute: '编辑路由',
    editLine: '编辑线路',
    addNewNumber: '新增号码',
    existingNumber: '已有号码',
    inputRange: '输入范围',
    selectAll: '全选',
    deleteSelected: '删除所选',
    ringingDuration: '最大振铃时长',
    callRouting: '呼叫路由',
    callConfig: '呼入管理',
    callConfig_hint: '可在坐席组管理中分配路由到具体坐席组',
    numberSearch: '请输入号码搜索',
    ringingDuration_hint: '填写范围1~99，填0表示采用线路最大响铃时长',
    maxConcurrent_hint: '请输入0~9999并发，9999表示不限制',
    weight_hint: '权重默认为1，可输入0~10不可为空；某号段两条线路同时匹配，则走权重更高线路',
    confirmDeleteModel: '请确认是否删除该路由',
    confirmDeleteModel2: '请确认是否删除该线路',
    confirmDeleteModel3: '请确认是否删除该号码',
    confirmDeleteModel4: '该操作为批量删除操作!',
    input_hint: '请输入被叫前缀：? : ?',
    choose_error: '请选择号码',
    enterNumber: '请输入号码，多个号码以”;”同隔，如651234x0xx;655678xvx;',
    enterNumber_hint: '超出号码长度限制：20',
    error_hint: '格式错误',
    add_error_hint: '号码已存在,添加失败',
    calloutStatistics: '呼出统计',
    callinStatistics: '呼入统计',
    IVRFlow: 'IVR流程',
    inboundConfigHint_1: '呼入至坐席组',
    inboundConfigHint_2: '呼入至IVR',
    inboundConfigHint_3: '使用该路由坐席组',
    dataZoom_hint1: '区域缩放',
    dataZoom_hint2: '区域缩放还原',
    today: '今天',
    sevenday: '最近7天',
    thrtyday: '最近30天',
    recentlySeven: '每七天',
    everyday: '每天',
    everyhour: '每小时',
    answerNums: '接听量',
    missAnswerNums: '未接量',
    avgWaitAnswerTimes: '平均等待接听时长(秒)',
    avgAnswerDurationTimes: '平均通话时长(秒)',
    avgCallAfterTimes: '平均话后整理时长(秒)',
    avgHandleTimes: '平均处理时长(秒)',
    avgHandleAnswerTimes: '平均接起时长(秒)',
    avgHandleHuawu: '平均话务处理时长(秒)',
    avfRingWaitTimes: '平均呼叫等待时长(秒)',
    customerSatisfied: '满意率',
    agentCallStistics: '人工通话统计',
    avgWaitAnswerTimesOutTips: '坐席等待用户接通时长总和/接通总数',
    avgWaitAnswerTimesInTips: '用户呼入等待接通总时长/接通总数',
    avgAnswerDurationTimesTips: '总计通话时长/接通总数',
    avgCallAfterTimesTips: '坐席话后整理总时长/接通总数',
    avgHandleTimesTips: '总处理时长/总通话次数,其中处理时长=接起时长+通话时长+话后整理时长',
    avgHandleAnswerTimesTips: '坐席响铃到接起总时长/接通总数',
    allPagesTotal: '所有页总计',
    aiTrraInbound: 'AI拨打转坐席',
    aiTrraInboundTips: 'AI拨打电话且用户接听后转接到坐席接听',
    aicallInbound: '人工接听',
    aimissInbound: '人工未接',
    seatCallOutTotal: '坐席呼出总数',
    seatCallOutAnswer: '呼出接听',
    seatCallOutMiss: '呼出未接',
    userCallinTotal: '用户呼入总数',
    userCallinAnswer: '呼入接听',
    userCallinMiss: '呼入未接',
    ssoConfig: 'SSO配置',
    ssoUrl: 'SSO网址',
    ssoSeverInfo: '服务商信息',
    ssoDomainMsg: '企业域管理',
    ssoDomain: '企业域',
    selectDomain: '请输入企业域',
    certificateMsg: '证书管理',
    certificateUse_xml: '用于SAML签名验证的ldp原数据,支持xml格式。',
    certificateUse_pem: '用于SAML签名验证的证书文件,支持pem格式用于SAML签名验证的证书文件,支持pem格式。',
    certificateSupport: '支持扩展名为：.xml',
    certificateSupport_pem: '支持扩展名为：.pem',
    certificateNeed: '请上传文件',
    perrsonEEmailInvite: '个人邮箱邀请',
    sendUsrCompany: '发送账号到企业所有者邮箱',
    ssoTeamInvite: 'SSO团队邮箱邀请',
    inviteModelDl: '请按照坐席邀请模版上传',
    dlseatModedl: '下载坐席邀请模版',
    emailNeed: '邮箱为必填项,昵称为非必填项',
    AcsUrl: 'ACS网址',
    goolgeSsoLogin: 'Google SSO 登录',
    menuNam: '系统操作日志',
    logActionr: '操作人',
    actins: '动作',
    actionObject: '操作详情',
    actionTimes: '操作时间',
    module: '模块',
    selectAction: '请选择动作',
    selectModule: '请选择模块',
    onlineLog: '在线记录',
    routerConfig: '路由配置',
    selectrouterConfig: '请选择路由配置',
    onlinePeson: '在线坐席',
    meantimePerson: '同时在线',
    statusLog: '状态日志',
    workIngTime: '工作中',
    restIngTime: '休息中',
    accountNotFounnd: '该账号不存在',
    cpmpanyNotFound: '企业域不存在',
    aihumanAnswer: '人工呼入坐席接听次数',
    aihumanMissAnswer: '人工呼入坐席未接听次数',
    onlySsoLogin: '仅限SSO登录',
    pleaseSlecectRouter: '请选择路由',
    gwUrl: 'Google Workspace 发行人URL',
    targetUrl: '目标URL',
    aiboundCall: "AI外呼"
  },
  iframe: {
    lLgOut: '退出登录',
    chinese: '中文（简体）',
    unfold: '展开',
    packUp: '收起',
    inputTip: '请输入',
    phone: '手机号码',
    verifyPhone: '手机号码无效',
    verifyaccount: '该账号不存在',
    emailValid: '请输入邮箱或账号，系统自动识别类型登录',
    verification: '验证码',
    email: "邮箱或账号",
    password: '密码',
    signin: '登 录',
    emaiAccount: '邮箱/账号登录',
    loginPhone: '手机登录',
    welconme: '欢迎登录！'
  }
}
