if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

var _CertGate_Base = window.location.origin + "/ocom/html5/certgate";
var _CertGate_Svc  = window.location.origin + "/ocom/html5/certgate";
var _CertGate_SystemLang = "KOR";  //"KOR", "ENG", "CHN", "JPN", "VNM"
if (typeof _SITE_SystemLang != "undefined" && _SITE_SystemLang != "null") _CertGate_SystemLang = _SITE_SystemLang;

var EAConfig = {
    useCommonCookie : true, //도메인쿠키 사용여부
    pollingInterval : 2, //서명값 등록 확인 폴링 간격 설정
    tabType : ['tel','qr'], //해당 tab 활성화 여부
    defaultTab : 'tel', //사용 여부에 관계없이 기본 tab 설정. 기본값 : undefined 또는 ''
    certStoreTypeOnesignToPhone : true, //EA to PHONE
    autoSignOnWebview : true,// true일 경우 웹뷰에서 서명값 받아온 후 바로 서명 진행.
    pushWarningOnSign : '',// 푸시 서명 시에 알림 받기 전까지 나올 경고문구. 아래 다국어 적용 부분에서 설정함.
    pushErrorText : 'PUSH',// alert(푸시에러메시지[XXXX_10222]) 형식의 XXXX부분의 문자열 설정.

    EASServiceUrl : _CertGate_Svc + "/svc/certgate_service.jsp?service=EAS",

    mainUI : _CertGate_Svc + "/main.jsp",
    //mainUI : _CertGate_Svc + "/main_kbnew.jsp",
    signUI : _CertGate_Svc + "/sign.jsp",

    lang : _CertGate_SystemLang,
    infoLang : {},
    languageData : {},
    serviceList : {},

    langUrl : {
        koreanUrl     : _CertGate_Base + '/lang/korean.js?20220405',
        englishUrl    : _CertGate_Base + '/lang/english.js?20220405'
    },

end : "end"};

EAConfig.defaultService = "kbstar";// service 이름이 들어가지 않았을 경우 기본 값.
EAConfig.serviceList["local"] =
{
    "appIconUrlPng" : _CertGate_Base + "/sitelogo/wizvera_test.png",
    "appName"       : "간편인증",
    "appNameEng"    : "EasyAuth",

    // protocol://path?query
    "useScheme"     : true,
    // 미설치 처리를 위한 store 링크.
    // Universal link(iOS) 또는 Intent Url(Android) 사용 시 해당 store 링크 필요 없음.
    "appScheme"     : {
        // Intent url 사용 시 login 및 sign에 해당하는 intent  url.
        // app scheme 사용 시 해당 scheme url 및 store url 필요..
        // certgateapp://login?num=\\1
        "android": {
            "login" : "intent://login?num=\\1#Intent;scheme=certgateapp;package=com.wizvera.certgateapp;end;",
            "sign"  : "intent://sign#Intent;scheme=certgateapp;package=com.wizvera.certgateapp;end;",
            "store" : ""
        },
        // Universal Links 사용 시 login 및 sign에 universal link에 해당하는 http url.
        // app scheme 사용 시 해당 scheme url 및 store url 필요..
        "ios": {
            isUniversalLink: false,
            "login" : "certgateapp://login?num=\\1",
            "sign"  : "certgateapp://sign",
            "store" : "https://apps.apple.com/kr/app/%EC%9B%90%EC%8B%B8%EC%9D%B8/id1112825251"
        },
    },

    "KOR": {
        "telBodyDetail"           : "공인인증서가 저장된 휴대폰번호를 입력해주세요.",
        "warningPhoneNumber"      : "<span style=\"color:#FF0000\"><b>처음 이용하신다면!</b></span><br/>'%AppName%앱'을 설치하여 PUSH수신 동의하여 주시기 바랍니다.<br/><span class=\"embracedInfo\"><b>'%AppName%앱' 실행 > 전체메뉴 <img src=\"img/ic_3line.png\"> > PUSH수신설정(알림수신동의)</b></span>",
        "noVenderListTail"        : "\n[경로 : '%AppName%앱' 실행 > 전체메뉴> PUSH수신설정(알림수신동의)]",

        "confirmCodeDetail"       : "스마트폰으로 전송된 PUSH메시지를 선택해주세요.<br/>'%AppName%앱'이 실행되면 <span class='embracedInfo'>확인코드</span>를 입력 또는 확인해주세요.",
        "warningConfirmCodeLogin" : "PUSH가 오지 않으면 <u>QR코드 또는 인증번호</u> 방식을 이용해주세요.",
        "progressAuthDetailPush"  : "스마트폰으로 전송된 PUSH 메시지를 선택해주세요.",
        "warningConfirmCodeSign"  : "PUSH가 오지 않으면 <u>QR코드 또는 인증번호</u> 방식으로 로그인 후 재거래하여 주시기 바랍니다.",

        "qrBodyDetail"            : "'%AppName%앱'을 실행하여 <span class='embracedInfo'>로그인(QR코드)</span> 메뉴에서<br/>QR코드 촬영 또는 인증번호 입력해주세요.",
        "warningAuthCodeLogin"    : "'%AppName%앱' 실행 > 전체메뉴 <img src=\"img/ic_3line.png\"> > 인증 > <b>로그인(QR코드)</b>",
        "progressAuthDetail"      : "'%AppName%앱'을 실행하여 <span class='embracedInfo'>전자서명(이체)</span><br/> 메뉴를 선택하여 주세요.",
        "warningAuthCodeSign"     : "'%AppName%앱' 실행 > 전체메뉴 <img src=\"img/ic_3line.png\"> > 인증 > <b>전자서명(이체)</b>",

        "runManuallyDetail"       : "스마트폰에서 인증 완료시까지 대기 중입니다."
    },
    "ENG": {
        "telBodyDetail"           : "Please enter a phone number that is used in<br/>the auth by a certificate or fingerprint.",
        "warningPhoneNumber"      : "Please agree about Push notification first.<br/><span class=\"embracedInfo\"><b>All <img src=\"img/ic_3line.png\"> > Management > Preference > PUSH notification</b></span>",
        "noVenderListTail"        : "\n[Path : Launch '%AppName% App' > All>  authentication > Notification subscription]",

        "confirmCodeDetail"       : "Please select a notification sent to your smartphone.<br/>Please enterthe confirm code <br/>when the '%AppName% App' is run.",
        "warningConfirmCodeLogin" : "If device can't get notification, please use <u>authentication code</u>.",
        "progressAuthDetailPush"  : "Please select a PUSH message sent to your smartphone.",
        "warningConfirmCodeSign"  : "If device can't get notification, please login again and retry again by using <u>authentication code</u>.",

        "qrBodyDetail"            : "Launch '%AppName% App' to recognize the QR code<br/>or enter the authentication number.",
        "warningAuthCodeLogin"    : "Launch '%AppName% App' > All <img src=\"img/ic_3line.png\"> > authentication > <b>login(QR)</b>",
        "progressAuthDetail"      : "Please run the '%AppName% App' to select the electronic signature menu.",
        "warningAuthCodeSign"     : "Launch '%AppName% App' > All <img src=\"img/ic_3line.png\"> > authentication > <b>signature</b>",

        "runManuallyDetail"       : "Waiting for smartphones to complete Easy Authentication."
    }
};

/*
EAConfig.serviceList["onesign"] = $.extend({},EAConfig.serviceList["local"],{});
EAConfig.serviceList["onesign"].appIconUrlPng = _CertGate_Base + '/sitelogo/wizvera_onesign.png';
EAConfig.serviceList["onesign"].appName       = '원사인';
EAConfig.serviceList["onesign"].appNameEng    = 'OneSign';
EAConfig.serviceList["onesign"].appScheme    = 'onesign://?auth_num=\\1';
*/

//KBSTAR: smartone, startbank
EAConfig.serviceList["kbstar"] =
{
    "appIconUrlPng" : _CertGate_Base + "/sitelogo/kbstar_smartone.png",
    "appName"       : "KB든든간편인증",
    "appNameEng"    : "KB SmartOne",
    "KOR": {
        "telBodyDetail"           : "든든간편인증이 발급된 휴대폰 번호를 입력해주세요.",
        "warningPhoneNumber"      : "PUSH 미동의 고객은 KB스마트통합인증앱에서 PUSH 수신동의를 선행하여 주시기 바랍니다.<br/>[경로: 스마트원통합인증앱 > 든든간편인증 로그인 > 동의절차 자동진행]",
        "noVenderListTail"        : "",

        "confirmCodeDetail"       : "휴대폰에 전송된 PUSH의 <span class=\"embracedInfo\">확인코드</span>와<br/>일치할 경우만 진행해주세요.",
        "warningConfirmCodeLogin" : "1. 스마트폰으로 전송된 PUSH메시지를 클릭하여 스마트원통합인증앱 실행<br/>2. 확인코드 확인<br/>3. 든든간편인증 PIN번호 입력하여 로그인<br/><span class=\"embracedInfo\"><b>스마트원통합인증 PUSH가 오지 않으면 QR코드 또는 인증번호 방식을 이용해주세요.</b></span>",
        "progressAuthDetailPush"  : "휴대폰에 전송된 PUSH를 확인해주세요.",
        "warningConfirmCodeSign"  : "1. 스마트폰으로 전송된 PUSH메시지를 클릭하여 스마트원통합인증앱 실행<br/>2. 인증대상 거래내역 확인<br/>3. 든든간편인증 PIN번호 입력하여 거래인증<br/><span class=\"embracedInfo\"><b>PUSH가 오지 않으면 QR코드 또는 인증번호 로그인 후 재거래하여 주시기 바랍니다.</b><span>",

        "qrBodyDetail"            : "스마트원통합인증 앱을 실행하여 <span class=\"embracedInfo\">든든간편인증 로그인 메뉴</span>에서<br/>QR코드 촬영 또는 인증번호 입력해주세요.",
        "warningAuthCodeLogin"    : "1. KB스마트원통합인증앱 실행 후 든든간편인증 로그인 메뉴 선택<br/>2. QR코드촬영 또는 인증번호입력 중 원하는 인증방식을 선택하여 인증<br/>3. 든든간편인증 PIN 번호 입력하여 로그인",
        "progressAuthDetail"      : "스마트원통합인증앱의 <span class=\"embracedInfo\">든든간편인증 이체/기타 인증</span><br/>메뉴를 찾아주세요.",
        "warningAuthCodeSign"     : "1. KB스마트원통합인증앱 실행 후 든든간편인증 이체/기타인증 메뉴 선택<br/>2. 인증대상 거래내역을 확인<br/>3. 든든간편인증 PIN번호 입력하여 거래인증",

        "runManuallyDetail"       : "스마트원통합인증앱에서 인증을 완료하여 주세요."
    },
    "ENG": {
        "telBodyDetail"           : "Please enter a phone number that <br/>internet banking authentication is saved in",
        "warningPhoneNumber"      : "If you don't agree with notification, please agree with notification on KB SmartOne.<br/><span class=\"embracedInfo\"><b>[Path: SmartOne App > SecureSimpleAuth login > Automatic procedure for agreement]</b></span>",
        "noVenderListTail"        : "",

        "confirmCodeDetail"       : "Only if <span class=\"embracedInfo\">the confirm code</span> which you<br/>get from notification is matched, please keep progress.",
        "warningConfirmCodeLogin" : "1. Run SmartOne by touching notification on smartphone<br/>2. Check confirm code.<br/>3. Login by entering PIN number for SecureSimpleAuth.<br/><span class=\"embracedInfo\"><b>If you can't get SmartOne notification, please use QR code or auth code.</b></span",
        "progressAuthDetailPush"  : "Please check push notification on cell phone.",
        "warningConfirmCodeSign"  : "1. Run SmartOne by touching notification on smartphone<br/>2. Check transaction details for authentication.<br/>3. Signing by entering PIN number for SecureSimpleAuth.<br/><span class=\"embracedInfo\"><b>If you can't get SmartOne notification, please use QR code or auth code from login.</b></span>",

        "qrBodyDetail"            : "Run SmartOne app and take a QR code or<br/>enter auth code on <span class=\"embracedInfo\">SecureSimpleAuth login</span>.",
        "warningAuthCodeLogin"    : "1. Run SmartOne and select SecureSimpleAuth login <br/>2. Signing by taking QR code or entering auth code for authentication.<br/>3. Signing by entering PIN number for SecureSimpleAuth login.",
        "progressAuthDetail"      : "Please find <span class=\"embracedInfo\">SecureSimpleAuth for transaction</span> menu on SmartOne app.",
        "warningAuthCodeSign"     : "1. Run SmartOne and select SecureSimpleAuth transaction/authentication<br/>2. Check transaction details for authentication.<br/>3. Signing by entering PIN number for SecureSimpleAuth.",

        "runManuallyDetail"       : "Complete authentication on %AppName% app."
    }
};

EAConfig.serviceList["kbstar2"] =
{
    "appIconUrlPng" : _CertGate_Base + "/sitelogo/kbstar_starbank.png",
    "appName"       : "KB스타뱅킹",
    "appNameEng"    : "KB StarBanking",
    "KOR": {
        "telBodyDetail"           : "인증서가 저장된 휴대폰번호를 입력해주세요.<br/><span class=\"embracedInfo\">스타뱅킹앱 실행 시 지문·Face ID인증 팝업이 나오는경우 <br/>해당 팝업 종료 후 연동인증을 진행해주세요</span>",
        "warningPhoneNumber"      : "<span style=\"color:#FF0000\"><b>처음 이용하신다면!</b></span><br/>KB스타뱅킹에서 서비스 신청/PUSH 수신 동의를 완료해주세요.<br/>KB스타뱅킹 > 전체메뉴(<img src=\"img/ic_3line.png\">) > 인증/보안 > 공동인증서(구 공인인증서) ><br/>KB스타뱅킹연동인증 > <b>서비스 신청/변경</b>",
        "noVenderListTail"        : "\n(경로 : KB스타뱅킹 > 전체메뉴 > 인증/보안 > 공동인증서(구 공인인증서) > KB스타뱅킹 연동 인증 > 서비스 신청/변경)",

        "userName"                : "이름",
        "userBirth"               : "생년월일",
        "userPhone"               : "휴대폰번호",
        "savePhoneNumber"         : "내 정보 저장하기 (개인 컴퓨터에서만 저장해주세요.)",

        "confirmCodeDetail"       : "휴대폰에 전송된 PUSH의 <span class=\"embracedInfo\">확인코드</span>와<br/>일치할 경우만 진행해주세요.",
        "warningConfirmCodeLogin" : "<span style=\"color:#FF0000\"><b>PUSH가 가지 않는다면!</b></span><br/>KB스타뱅킹에서 PUSH 수신 해제 후 재동의하여 주세요.<br/>KB스타뱅킹 > 전체메뉴(<img src=\"img/ic_3line.png\">) > 인증/보안 > 공동인증서(구 공인인증서) ><br/>KB스타뱅킹연동인증 > <b>서비스 신청/변경</b><br/>또는, PUSH 대신 <u>QR코드/인증번호</u> 방식을 이용해주세요.",
        "progressAuthDetailPush"  : "휴대폰에 전송된 PUSH를 확인해주세요.",
        "warningConfirmCodeSign"  : "PUSH가 오지 않으면 <u>QR코드 또는 인증번호</u> 방식으로 로그인 후 재거래하여 주시기 바랍니다.",

        "qrBodyDetail"            : "<span class=\"embracedInfo\">KB스타뱅킹앱의 QR코드 촬영(인증번호 입력) 메뉴</span><br/>전체메뉴 (<img src=\"img/ic_3line.png\">) > 인증/보안 > 공동인증서(구 공인인증서) ><br/>KB스타뱅킹연동인증 > <b>인터넷뱅킹 로그인</b>",
        "warningAuthCodeLogin"    : "<span style=\"color:#FF0000\"><b>처음 이용하신다면!</b></span><br/>KB스타뱅킹에서 서비스를 신청해 주세요.<br/>KB스타뱅킹 > 전체메뉴(<img src=\"img/ic_3line.png\">) > 인증/보안 > 공동인증서(구 공인인증서) ><br/>KB스타뱅킹연동인증 > <b>서비스 신청/변경</b>",
        "progressAuthDetail"      : "<span class=\"embracedInfo\">KB스타뱅킹앱의 인터넷뱅킹 인증 메뉴</span><br/>KB스타뱅킹 > 전체메뉴 (<img src=\"img/ic_3line.png\">) > 인증/보안 > 공동인증서(구 공인인증서) ><br/>KB스타뱅킹연동인증 > <b>인터넷뱅킹 인증</b>",
        "warningAuthCodeSign"     : "", 

        "runManuallyDetail"       : "%AppName%앱에서 인증을 완료하여 주세요."
    },
    "ENG": {
        "telBodyDetail"           : "Please enter a phone number that is used in<br/>the auth by a certificate or fingerprint.",
        "warningPhoneNumber"      : "Please agree about Push notification first.<br/><span class=\"embracedInfo\"><b>All <img src=\"img/ic_3line.png\"> > Management > Preference > PUSH notification</b></span>",
        "noVenderListTail"        : "\n(Path : KB star banking > All > Management > Preference > Smart notification",

        "confirmCodeDetail"       : "Only if <span class=\"embracedInfo\">the confirm code</span> which you<br/>get from notification is matched, please keep progress.",
        "warningConfirmCodeLogin" : "If you can't get notification on KB star banking, please use <u>QR code or auth code</u>.",
        "progressAuthDetailPush"  : "Please check push notification on cell phone.",
        "warningConfirmCodeSign"  : "If device can't get notification, please login again and retry again by using <u>authentication code</u>.",

        "qrBodyDetail"            : "Run KB star banking app and take a QR code or<br/>enter auth code on <span class=\"embracedInfo\">Login for internet banking</span>.",
        "warningAuthCodeLogin"    : "<span class=\"embracedInfo\"><b>All <img src=\"img/ic_3line.png\"> > Authentication center > Certificate > Login for internet banking</b></span>",
        "progressAuthDetail"      : "Please find <span class=\"embracedInfo\">Internet banking transaction</span> menu on KB StarBanking app.",
        "warningAuthCodeSign"     : "<span class=\"embracedInfo\"><b>All <img src=\"img/ic_3line.png\"> > Authentication center > Certificate > Auth for internet banking</b></span",

        "runManuallyDetail"       : "Complete authentication on %AppName% app."
    }
};

EAConfig.serviceList["kbstar"].appScheme    = 'kbstar://?auth_num=\\1';
EAConfig.serviceList["kbstar2"].appScheme    = 'kbstar2://?auth_num=\\1';

//다국어 적용
function setInfoByLanguage(serviceName) {

    // 간편인증 배너 및 안내문구 다국어 설정.
    if(serviceName) {
        var langTarget = EAConfig.lang;
        var infoLangSet = EAConfig.serviceList[serviceName][langTarget];

        for(var key in infoLangSet) {
            EAConfig.infoLang[key] = infoLangSet[key];
        }
    }
}

//모바일웹뷰에서 KB 3센터 접속문제로 obank1으로 변경 처리
if (document.location.hostname.indexOf("obank.kbstar.com") == 0 || document.location.hostname.indexOf("bobank.kbstar.com") == 0) {
    EAConfig.signUI = "https://obank1.kbstar.com/ocom/html5/certgate/sign.jsp";
}
