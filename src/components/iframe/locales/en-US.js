export default {
  head: {
    confirm: 'Confirm',
    cancel: 'cancel',
    tokenExpired: 'Login has expired, please login again!',
    loginDiale: 'Please log in to the phone first'
  },
  dashboard: {
    hangUp: 'Hang up',
  },
  sip_i: {
    noAgentInformation: 'No agent information',
    noDialerInformation: 'No dialer information',
    noAgentAvailable: 'No agent available',
    dialerInitialization: 'Dialer initialization.',
    dialerFailedRegister: 'Dialer registration failed.',
    inCall: 'In a call',
    inCallIng: 'In a call',
    ringings: 'Ringing',
    savedSuccessfully: 'Saved successfully',
    free: 'Free',
    busy: 'Busy',
    workfree: 'Work-Idle',
    workbusy: 'Work-Busy',
    afterCall: 'After-call work',
    equipmentDetection: 'Device detection',
    logout: 'Logout',
    dailPad: 'Dial Pad',
    dialing: 'Dialing',
    dialerOverdue: 'Balance is insufficient',
    notCountry: 'The country is restricted from calling.',
    errNumber: 'Incorrect number',
    networkError: 'Network Error',
    limitOutFiveNums: "Today's call experience limit has been reached.",
    didBindErr: 'DID number call failed.',
    registerSuccessfully: 'Registration successful',
    registrationFailed: 'registration failed',
    errSymCode: 'The number contains an illegal symbol ("#")',
    enterNumber: 'Please enter the phone number',
    rejected: 'Rejected',
    newCall: 'New call',
    dialer: 'Dialer ',
    minuteAgo: ' minute ago',
    hourAgo: ' hour ago',
    justNow: ' just now',
    displayNumber: 'Caller ID',
    selectDisplayNumber: 'Select call display number',
    agentGroupManager: 'Agent group leader',
    noManager: 'No leader',
    setManager: 'Set leader',
    successfullySet: 'Set successful',
    pleaseSelectAgent: 'Please select an agent',
    synchronizePhoneNumbers: 'Synchronize phone numbers',
    type: 'type',
    randomNumber: 'Random number',
    unknown: 'unknown',
    reconnecting: 'Service reconnecting...',
    selectDisplayNumbers: 'Please select an outbound caller ID',
    completeEnterpriseCertification: 'Please complete company verification first.',
    notSupportMic: 'The browser does not support the microphone, please change the browser.',
    isHaveMic: 'Please go to the browser settings to enable microphone permissions, or consult the administrator.',
    aiOutboundTask: 'AI Outbound Calling Task',
    mute: 'mute',
    recover: 'recover',
    logoutTip: 'Are you sure you want to log out?',
    newlineCall: 'You have a new call - NXCLOUD',
    restMeeting: 'Rest-Meeting',
    restEating: 'Rest-Eating',
    restWc: 'Rest-Toilet',
    restSleep: 'Rest-Sleeping',
    restOther: 'Rest-Else',
    restTime: 'Rest duration',
    resStatusTimes: 'Rest status duration',
    workRecord: 'Work records'
  },
  record: {
    inboundCall: 'Inbound',
    outboundCall: 'Outbound',
    callLogs: 'Call log',
  },
  agent: {
    hint: 'Prompt',
  },
  quote: {
    countryCode: 'Country code'
  },
  seeting: {
    blacklistedNumberTip: 'Call failed (blacklisted number)',
    callFailureLimit: 'Call failed (call limit reached)',
    cannotNumber: 'Current number cannot be used',
  },
  equipment: {
    checkWhetherMicrophone: 'Please check if a microphone is present, go to the browser settings to check if it is enabled, or consult technical support',
  },
  verify: {
    pw: 'Password must be 8 to 20 character and a combination of numbers and letters.',
    pw_length: 'The length of the password is no less than 8 characters.',
    pw_no_more: 'The length of the password is no more than 20 characters',
    pw_must: 'The password must be a combination of numbers and letters'
  },
  monitor: {
    sortOutShow: 'In ACW'
  },
  v2: {
    numberTotal: 'Numbers',
    callTotal: 'Attempts',
    completedNum: 'Completion',
    answered: 'Answered',
    answerRate: 'Answer(numbers)%',
    answerRateDial: 'Answer(attempts)%',
    transferAgent: 'Transfer',
    transferRate: 'Transfer%',
    loss: 'Loss',
    lossRate: 'Loss%',
    laborTurnover_num: 'Transfer',
    numberCalls: 'Dialing attempts',
    allMumbers: 'All numbers',
    allCalls: 'All dialing',
    completionStatus: 'Completion status',
    onCondition: 'Answer status',
    connect: 'Connect',
    notConnect: 'Not Connect',
    seatUtilization2: 'Utilization%',
    laborTurnover_normal: 'Transfer%',
    connectionRate_normal: 'Answer(numbers)%',
    callRate2_normal: 'Answer(attempts)%',
    AICallAnalytics: 'AI Call Analytics',
    allSeatingGroups: 'All agent groups',
    AVGWait: 'AVG Wait(sec)',
    ASA: 'ASA(sec)',
    AVGTalk: 'AVG Talk(sec)',
    ACW: 'AVG ACW(sec)',
    AVGHandle: 'AVG Handle(sec)',
    customerReviews: 'Reviews',
    satisfactionRate: 'Satisfaction%',
    everyDay: 'Per day',
    everySevenDays: 'Per week',
    everyHour: 'Per hour',
    hint_1: `Transfer%: number of calls transferred to the queue wait for agents ÷ number of  calls answered by users.<br />Answer(numbers) %: number of calls answered by users ÷ numbers<br />Answer(attempts)%: number of calls answered by users÷  attempts`,
    hint_2: 'Task progress = Completed/Total number of numbers',
    hint_3: 'Completed: The quantity of numbers that have been connected or completed all attempts<br />Numbes: The quantity of numbers uploaded in the task<br />Attempts: The quantity of dialing attempts',
    aidetail_hint1: 'Completion status of numbers called',
    aidetail_hint2: 'Result of whether the number was answered by the user',
    aidetail_hint3: 'Dialing label automatically identified by AI call',
    aidetail_hint4: 'Label assigned by the agent after the conversation',
    aidetail_hint5: 'Attempt strategy for the number',
    aidetail_hint6: 'Number of dialing rounds experienced by a number',
    aidetail_hint7: 'Call status of the current dialing',
    aidetail_hint8: 'Dialing round to which the current call belongs',
    aidetail_hint9: 'Agent talk time + after-call work time / (Agent talk time + aftert call work time + idle time)',
    analytics_hint1: 'Completed: The quantity of numbers that have been connected or completed all attempts<br />Attempts: The total number of dialing attempts<br />Answered : The total number of calls answered by users',
    analytics_hint2: 'Answer(numbers) %: number of calls answered by users ÷ numbers<br />Answer(attempts)%: number of calls answered by users÷  attempts',
    analytics_hint3: 'Transfer : The total number of calls transferred to the queue wait for agents<br />Transfer%: number of calls transferred to the waiting queue for agents ÷ total number of calls answered by users.',
    analytics_hint4: 'Loss%: The number of calls abandoned ÷ the number of calls transferred to the queue<br />Loss: The number of calls transferred to the queue but abandoned befer being answered by agents',
    analytics_hint5: 'Total time of users wait for agents answer÷ Total number of calls agent answered',
    analytics_hint6: 'Total time for agent from ring to answer ÷ Total number of calls agent answered',
    analytics_hint7: 'Total talk time of agents ÷ Total number of calls agent answered',
    analytics_hint8: 'Total after-call work time of agents ÷Total number of calls agent answeredanswered',
    analytics_hint9: 'Total handling time ÷Total number of calls, where handling time = answer time + talk time + after-call work time',
    routeManagement: 'Route Management',
    routeAssignment: 'Route Assignment',
    routeHoming: 'Route Homing',
    routeName: 'Route Name',
    routeDescription: 'Route Description',
    inboundSupport: 'Inbound Support',
    inboundSupport_hint: 'After closure, no inbound calls to the agent group will be allowed via this route.',
    noInboundOrOutbound: 'No Inbound Or Outbound',
    inboundAndOutbound: 'Inbound And Outbound',
    inboundOnly: 'Inbound Only',
    outboundOnly: 'Outbound Only',
    updateTime: 'Update Time',
    lineName: 'Line Name',
    gatewayAddress: 'Gateway Address',
    calledPrefix: 'Called Prefix',
    lineName: 'Line Name', 
    maxConcurrent: 'Max Concurrent',
    numberMatching: 'Number Matching',
    weight: 'Weight',
    numberPool: 'Number Pool',
    chooseNumberPool: 'Selected number pool',
    routeOperation: 'Routing operation', 
    lineOperation: 'Line operation', 
    description: 'Description',
    management: 'Management',
    addNumberPool: 'Add Number',
    managementPool: 'Manage Number Pools',
    addRoute: 'Add Route',
    addLine: 'Add Line',
    editRoute: 'Edit Route',
    editLine: 'Edit Line',
    addNewNumber: 'Add Number',
    existingNumber: 'Existing Number',
    inputRange: 'Input Range',
    selectAll: 'Select All',
    deleteSelected: 'Delete Selected',
    ringingDuration: 'Ringing Time',
    callRouting: 'Call Routing',
    callConfig: 'Incoming management',
    callConfig_hint: 'Routes can be assigned to specific agent groups in agent group management',
    numberSearch: 'Please enter the number to search',
    ringingDuration_hint: 'Range: 1-99. Use 0 for maximum ring duration.',
    maxConcurrent_hint: 'Range: 0-9999, where 9999 represents no limit.',
    weight_hint: 'Weight defaults to 1 and can be entered from 0 to 10. It cannot be empty. If two lines match the same number range, the line with a higher weight will be chosen.',
    confirmDeleteModel: 'Please confirm whether to delete the route',
    confirmDeleteModel2: 'Please confirm whether to delete the line',
    confirmDeleteModel3: 'Please confirm whether to delete the number',
    confirmDeleteModel4: 'This operation serves as a batch deletion operation !',
    input_hint: 'Please enter the called prefix：? : ?',
    choose_error: 'Please select a number',
    enterNumber: 'Please enter multiple numbers as ";" Same interval, such as 651234x0xx;655678xvx',
    enterNumber_hint: 'Number length limit exceeded: 20',
    error_hint: 'Format error ',
    add_error_hint: 'Number already exists, add failed',
    calloutStatistics: 'Outbound statistics',
    callinStatistics: 'Inbound statistics',
    IVRFlow: 'IVR process',
    inboundConfigHint_1: 'Incoming call to seat group',
    inboundConfigHint_2: 'Incoming call to IVR',
    inboundConfigHint_3: 'Use this routing agent group',
    dataZoom_hint1: 'Region scaling',
    dataZoom_hint2: 'Region Zoom Restore',
    today: 'Today',
    sevenday: 'Last 7 days',
    thrtyday: 'Last 30 days',
    recentlySeven: 'Every seven days',
    everyday: 'Per day',
    everyhour: 'Per hour',
    answerNums: 'Answered',
    missAnswerNums: 'Missed',
    avgWaitAnswerTimes: 'AVG Wait(sec)',
    avgAnswerDurationTimes: 'AVG Talk(sec)',
    avgCallAfterTimes: 'AVG ACW(sec)',
    avgHandleTimes: 'AVG Handle(sec)',
    avgHandleAnswerTimes: 'ASA(sec)',
    avgHandleHuawu: 'AVG Handle(sec)',
    avfRingWaitTimes: 'AVG Wait(sec)',
    customerSatisfied: 'Satisfaction%',
    agentCallStistics: 'Agent call statistics',
    avgWaitAnswerTimesOutTips: 'Total time of agent wait for user answer ÷ Total number of calls user answered',
    avgWaitAnswerTimesInTips: 'Total time of users wait for agents answer ÷ Total number of calls agent answered',
    avgAnswerDurationTimesTips: 'Total talk time of agents ÷ Total number of calls agent answered',
    avgCallAfterTimesTips: 'Total after-call work time of agents ÷ Total number of calls agent answeredanswered',
    avgHandleTimesTips: 'Total handling time ÷Total number of calls, where handling time = answer time + talk time + after-call work time',
    avgHandleAnswerTimesTips: 'Total time for agent from ring to answer ÷ Total number of calls agent answered',
    allPagesTotal: 'Total of All Pages',
    aiTrraInbound: 'AI transfer to agent',
    aiTrraInboundTips: 'AI call that dials and transfers to agents after waiting for user to answer',
    aicallInbound: 'Answered',
    aimissInbound: 'Missed',
    seatCallOutTotal: 'Total outbound calls',
    seatCallOutAnswer: 'Answered',
    seatCallOutMiss: 'Missed',
    userCallinTotal: 'Total inbound calls',
    userCallinAnswer: 'Answered',
    userCallinMiss: 'Missed',
    ssoConfig: 'SSO configuration',
    ssoUrl: 'SSO URL',
    ssoSeverInfo: 'Service Provider Information',
    ssoDomainMsg: 'Enterprise domain management',
    ssoDomain: 'Enterprise domain',
    selectDomain: 'Enterprise domain',
    certificateMsg: 'Certificate management',
    certificateUse_xml: 'LDP raw data for SAML signature verification, supporting XML format.',
    certificateUse_pem: 'Certificate file for SAML signature verification, support pem formatThe certificate file for SAML signature verification supports the pem format.',
    certificateSupport: 'Supported file extensions: .xml',
    certificateSupport_pem: 'Supported file extensions: .pem',
    certificateNeed: 'Please upload the file',
    perrsonEEmailInvite: 'Personal email invitation',
    sendUsrCompany: `Send account to the enterprise owner's email`,
    ssoTeamInvite: 'SSO team email invitation',
    inviteModelDl: 'Please upload according to the agent invitation template',
    dlseatModedl: 'Download agent invitation template',
    emailNeed: 'Email is a required field, nickname is optional',
    AcsUrl: 'ACS URL',
    goolgeSsoLogin: 'Google SSO login',
    menuNam: 'System operation log',
    logActionr: 'operator',
    actins: 'action',
    actionObject: 'Operational details',
    actionTimes: 'Operation time',
    module: 'module',
    selectAction: 'Please select an action',
    selectModule: 'Please select a menu',
    onlineLog: 'Online records',
    routerConfig: 'Routing configuration.',
    selectrouterConfig: 'Please select a routing configuration',
    onlinePeson: 'Number of online agents',
    meantimePerson: 'Simultaneously online.',
    statusLog: 'Status log',
    workIngTime: 'Working',
    restIngTime: 'Resting',
    accountNotFounnd: 'The account does not exist',
    cpmpanyNotFound: 'The enterprise domain does not exist',
    aihumanAnswer: 'The number of times an agent was manually called',
    aihumanMissAnswer: 'The number of times a manual inbound agent was not answered',
    onlySsoLogin: 'SSO login only',
    pleaseSlecectRouter: 'Please select a route',
    gwUrl: 'Google Workspace 发行人URL',
    targetUrl: '目标URL',
    aiboundCall: "AI outbound call"
  },
  iframe: {
    lLgOut: 'Log out',
    chinese: '中文（简体）',
    unfold: 'Expand',
    packUp: 'Collapse',
    inputTip: 'Please Enter ',
    phone: 'Phone',
    verifyPhone: 'Invaild Mobile Number',
    verifyaccount: 'This account is nonexistent.',
    emailValid: 'Enter your Account Number or Email Address, the system automatically identifies the type login',
    verification: 'Verification Code',
    email: "Email Address",
    password: 'Password',
    signin: 'Sign In',
    emaiAccount: 'Email/Account',
    loginPhone: 'Mobile Number',
    welconme: 'Welcome to login!'
  }
}




