if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

var _Delfino_Base = window.location.origin;
var _Delfino_Svc  = window.location.origin;
var _Delfino_Down = _Delfino_Base + "/down";
_Delfino_Down = "https://download.kbstar.com/security/wizvera/delfino";


var _Delfino_SystemMode = "real"; //"dev", "test", "real"
var _Delfino_SystemLang = "KOR";  //"KOR", "ENG", "CHN", "JPN", "VNM"
var _Delfino_ModuleType = "";     //"G2", "G3", "G4"
if (typeof _SITE_SystemMode != "undefined") _Delfino_SystemMode = _SITE_SystemMode;
if (typeof _SITE_SystemLang != "undefined") _Delfino_SystemLang = _SITE_SystemLang;
if (typeof _SITE_ModuleType != "undefined") _Delfino_ModuleType = _SITE_ModuleType;

var DelfinoConfig = {
    multiDomain : ".kbstar.com",
    uiType : "", //"senior",

    version : { //설치버전
        WinIE   : "2,1,7,2",
        WinMoz  : "2.1.7.2",
        Mac     : "2.1.7.2",
        Linux   : "2.1.7.2"
    },
    version_update : { //업데이트버전: 설치페이지에서 Delfino.setVersion()사용
        WinIE   : "3,3,1,1",
        WinMoz  : "3.3.1.1",
        Mac     : "3.3.1.1",
        Linux   : "3.3.1.1"
    },
    version_g3 : { //V3 URL 핸들러
        WinIE   : "3,1,4,1",
        WinMoz  : "3,6,8,4",
        Mac     : "3,6,9,5",
        Linux   : "3,6,8,4"
    },
    version_update_g3 : {  //G3 업데이트버전: 설치페이지에서 Delfino.setVersion()사용
        WinIE   : "3,3,1,1",
        WinMoz  : "3,6,8,4",
        Mac     : "3,6,9,5",
        Linux   : "3,6,8,4"
    },
    mimeType : { //object MimeType
        WinIE   : "CLSID:BAE6E050-BFA0-4bea-B62D-2D9F75E51084",
        WinMoz  : "application/x-dolphinobj",
        Mac     : "application/x-dolphinobj",
        Linux   : "application/x-dolphinobj"
    },
    installPage : { //설치페이지
        WinIE   : _Delfino_Base + "/quics?page=C040531&P_name=Delfino&QSL=F&sys=WinIE",
        WinMoz  : _Delfino_Base + "/quics?page=C040531&P_name=Delfino&QSL=F&sys=WinMoz",
        Mac     : _Delfino_Base + "/quics?page=C040531&P_name=Delfino&QSL=F&sys=Mac",
        Linux   : _Delfino_Base + "/quics?page=C040531&P_name=Delfino&QSL=F&sys=Linux",
        iOS     : _Delfino_Base + "/quics?page=C023665&P_name=Delfino&QSL=F&sys=iOS",
        Android : _Delfino_Base + "/quics?page=C023665&P_name=Delfino&QSL=F&sys=Android"
    },
    installPage_g3 : {
        url : _Delfino_Base + "/quics?page=C040531&QSL=F&P_name=Delfino&module=G3&url=close",
        width : 980,
        height : 800
    },
    installPkg : { //다운로드 모듈
        Cab32   : "",
        Cab64   : "",
        Win32   : _Delfino_Down + "/delfino.exe",
        Win64   : _Delfino_Down + "/delfino-x64.exe",

        Cab32_sha2   : "",
        Cab64_sha2   : "",
        Win32_sha2   : _Delfino_Down + "/delfino-sha2.exe",
        Win64_sha2   : _Delfino_Down + "/delfino-x64-sha2.exe",

        Mac32   : _Delfino_Down + "/delfino.pkg",
        Mac64   : _Delfino_Down + "/delfino.pkg",
        Dev32   : _Delfino_Down + "/delfino_i386.deb",
        Dev64   : _Delfino_Down + "/delfino_amd64.deb",
        Rpm32   : _Delfino_Down + "/delfino.i386.rpm",
        Rpm64   : _Delfino_Down + "/delfino.x86_64.rpm",

        iOS     : "#",
        Android : "#"
    },
    installPkg_g3 : { //다운로드 모듈
        Cab32   : "",
        Cab64   : "",
        Win32   : _Delfino_Down + "/g3/delfino-g3.exe",
        Win64   : _Delfino_Down + "/g3/delfino-g3.exe",

        Win32_sha2   : _Delfino_Down + "/g3/delfino-g3-sha2.exe",
        Win64_sha2   : _Delfino_Down + "/g3/delfino-g3-sha2.exe",

        Mac32   : _Delfino_Down + "/g3/delfino-g3.pkg",
        Mac64   : _Delfino_Down + "/g3/delfino-g3.pkg",
        Dev32   : _Delfino_Down + "/g3/delfino-g3_i386.deb",
        Dev64   : _Delfino_Down + "/g3/delfino-g3_amd64.deb",
        Rpm32   : _Delfino_Down + "/g3/delfino-g3.i386.rpm",
        Rpm64   : _Delfino_Down + "/g3/delfino-g3.x86_64.rpm",

        iOS     : "#",
        Android : "#"
    },


    /** 로고이미지 URL 설정: size(428x81) */
    logoImageUrl :        _Delfino_Base + "/ocom/img/wizvera/logo/delfino_logo.html",
    logoImageUrl_428x81 : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_logo_428x81.html",
    logoImageUrl_html5  : {
        desktop : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_logo_428x81.png", //428x81
        tablet  : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_logo_tablet.png", //420x32
        mobile  : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_logo_mobile.png"  //600x32
    },

    /** 전자서명 타이틀 이미지 URL 설정: size(428x50) **/
    confirmSignTitleImageUrl : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_logo_confirm_sign.html",
    confirmSignTitleImageUrl_html5  : {
        desktop : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_logo_confirm_sign.png" //428x50
        //tablet  : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_logo_confirm_sign_tablet.png", //420x32
        //mobile  : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_logo_confirm_sign_mobile.png"  //600x32
    },

    /** 가져오기 / 내보내기 URL 설정: size(360x223) */
    exportImageUrl : _Delfino_Base + "/ocom/img/wizvera/logo/export_cert.html",
    importImageUrl : _Delfino_Base + "/ocom/img/wizvera/logo/import_cert.html",

    /** 미설치시 설치확인(confirm)을 위한 메시지 ""일경우 메시지 없이 설치페이지로 이동함 */
    installMessage : {
        NO      : "해당 기기(OS)에서는 인증이 지원되지 않습니다.",
        PC      : "인증프로그램을 설치하셔야만 이용이 가능한 서비스입니다.\n[확인]을 선택하시면 설치페이지로 연결됩니다.",
        Mobile  : "전용 프로그램 설치가 필요합니다. \n[승인]을 선택하시면 KB스타뱅킹이 실행되거나 설치페이지로 이동합니다."
    },


    /** 인증서 선택창에서 저장매체 캐쉬 설정(필요시 하단에서 도메인별로 설정) */
    cacheCertStore :  false,

    /** 인증서 선택창에서 저장매체 enable/disable(BROWSER|FIND_CERT|EA|LOCAL_DISK|REMOVABLE_DISK|TOKEN|HSM|PHONE|USIM|SWHSM)*/
    certStoreFilter : "",
    prepareCertStore : "USIM|SWHSM|ONE_SIGN|EA",
    disableCertStore : "",

    disableExpireFilter : false,  //만료된 인증서 보이기
    disableExpireWarn   : false, //만료된 인증서 경고툴팁 안보이기
    //lastUsedCertFirst   : true,  //마지막 사용 인증서 맨위로 보여주기
    /** 인증서 선택창에서 인증서 필터링 위한 인증서 발급자 DN 설정.
     * '|'로 구분하여 여러개를 설정. */
    issuerCertFilter : ""
                        +"CN=yessignCA Class 1,OU=AccreditedCA,O=yessign,C=kr|" //금융결제원
                        +"CN=yessignCA Class 2,OU=AccreditedCA,O=yessign,C=kr|" //금융결제원
                        +"CN=yessignCA Class 3,OU=AccreditedCA,O=yessign,C=kr|" //금융결제원
                        +"CN=SignKorea CA2,OU=AccreditedCA,O=SignKorea,C=KR|"   //코스콤
                        +"CN=SignKorea CA3,OU=AccreditedCA,O=SignKorea,C=KR|"   //코스콤
                        +"CN=SignKorea CA4,OU=AccreditedCA,O=SignKorea,C=KR|"   //코스콤
                        +"CN=signGATE CA4,OU=AccreditedCA,O=KICA,C=KR|"         //한국정보인증
                        +"CN=signGATE CA5,OU=AccreditedCA,O=KICA,C=KR|"         //한국정보인증
                        +"CN=signGATE CA6,OU=AccreditedCA,O=KICA,C=KR|"         //한국정보인증
                        +"CN=CrossCertCA2,OU=AccreditedCA,O=CrossCert,C=KR|"    //한국전자인증
                        +"CN=CrossCertCA3,OU=AccreditedCA,O=CrossCert,C=KR|"    //한국전자인증
                        +"CN=CrossCertCA4,OU=AccreditedCA,O=CrossCert,C=KR|"    //한국전자인증
                        +"CN=TradeSignCA2,OU=AccreditedCA,O=TradeSign,C=KR|"    //무역정보통신
                        +"CN=TradeSignCA3,OU=AccreditedCA,O=TradeSign,C=KR|"    //무역정보통신
                        +"CN=TradeSignCA4,OU=AccreditedCA,O=TradeSign,C=KR|"    //무역정보통신
                        +"CN=INIPASS CA,OU=AccreditedCA,O=INIPASS,C=KR|"         //이니텍

                        /* //GPKI+EPKI
                        +"CN=CA128000031,OU=GPKI,O=Government of Korea,C=KR|"   //대검찰청
                        +"CN=CA128000032,OU=GPKI,O=Government of Korea,C=KR|"   //대검찰청
                        +"CN=CA130000031,OU=GPKI,O=Government of Korea,C=KR|"   //병무청
                        +"CN=CA131100001,OU=GPKI,O=Government of Korea,C=KR|"   //행정안전부(행정용)
                        +"CN=CA131100002,OU=GPKI,O=Government of Korea,C=KR|"   //행정안전부(공공금융용)
                        +"CN=CA974000031,OU=GPKI,O=Government of Korea,C=KR|"   //대법원
                        +"CN=CA134100031,OU=GPKI,O=Government of Korea,C=KR|"   //교육부(EPKI)
                        */
                        ,

    issuerCertFilter_test : ""
                        +"CN=yessignCA-Test Class 2,OU=AccreditedCA,O=yessign,C=kr|"
                        +"CN=yessignCA-Test Class 3,OU=AccreditedCA,O=yessign,C=kr|"
                        +"CN=yessignCA-Test Class 4,OU=AccreditedCA,O=yessign,C=kr|"
                        +"CN=yessignCA-Test Class 5,OU=AccreditedCA,O=yessign,C=kr|"
                        +"CN=SignKorea Test CA3,OU=AccreditedCA,O=SignKorea,C=KR|"
                        +"CN=SignKorea Test CA4,OU=AccreditedCA,O=SignKorea,C=KR|"
                        +"CN=SignKorea Test CA5,OU=AccreditedCA,O=SignKorea,C=KR|"
                        +"CN=signGATE FTCA04,OU=AccreditedCA,O=KICA,C=KR|"
                        +"CN=signGATE FTCA06,OU=AccreditedCA,O=KICA,C=KR|"
                        +"CN=signGATE FTCA07,OU=AccreditedCA,O=KICA,C=KR|"
                        +"CN=CrossCertTestCA3,OU=AccreditedCA,O=CrossCert,C=KR|"
                        +"CN=CrossCertTestCA4,OU=AccreditedCA,O=CrossCert,C=KR|"
                        +"CN=CrossCertTestCA5,OU=AccreditedCA,O=CrossCert,C=KR|"
                        +"CN=TestTradeSignCA,OU=AccreditedCA,O=TradeSign,C=KR|"
                        +"CN=TradeSignCA2018Test,OU=AccreditedCA,O=TradeSign,C=KR|"
                        +"CN=INIPASS TEST CA 2,OU=AccreditedCA,O=INIPASS,C=KR|"
                                  		
                        //행안부
                        +"CN=CA131100001,ou=GPKI,o=Government of Korea,c=KR|"
                        +"CN=CA131000002,ou=GPKI,o=Government of Korea,c=KR|"
                        +"CN=Class 3 CA,ou=GPKI,o=Government of Korea,c=KR|"
                        //행안부
                        ,


    /** 인증서 선택창에서 인증서 필터링 위한 인증서 정책 OID 설정.
     * '|'로 구분하여 여러개를 설정. */
    policyOidCertFilter : ""
                        //상호연동(12)
                        +"1.2.410.200005.1.1.1|"     //금결원,   개인, 상호연동
                        +"1.2.410.200005.1.1.5|"     //금결원,   법인, 상호연동
						+"1.2.410.200005.1.1.1-B|"   //금결원,   개인, 브라우저용
                        +"1.2.410.200005.1.1.5-B|"   //금결원,   법인, 브라우저용
                        //+"1.2.410.200005.1.1.1.1|" //금결원,   개인, 상호연동-보안매체용-PC에서는 설정할필요없음
                        //+"1.2.410.200005.1.1.5.1|" //금결원,   법인, 상호연동-보안매체용-PC에서는 설정할필요없음
                        +"1.2.410.200004.5.1.1.5|"   //코스콤,   개인, 상호연동
                        +"1.2.410.200004.5.1.1.7|"   //코스콤,   법인, 상호연동
                        +"1.2.410.200004.5.2.1.2|"   //정보인증, 개인, 상호연동
                        +"1.2.410.200004.5.2.1.1|"   //정보인증, 법인, 상호연동
                        +"1.2.410.200004.5.4.1.1|"   //전자인증, 개인, 상호연동
                        +"1.2.410.200004.5.4.1.2|"   //전자인증, 법인, 상호연동
                        +"1.2.410.200012.1.1.1|"     //무역정보, 개인, 상호연동
                        +"1.2.410.200012.1.1.3|"     //무역정보, 법인, 상호연동
                        +"1.2.410.200004.5.5.1.1|"   //이니텍,  개인, 상호연동
                        +"1.2.410.200004.5.5.1.2|"   //이니텍,  법인, 상호연동

                        //은행,보험,카드,민원(2)
                        +"1.2.410.200005.1.1.4|"     //금결원,   개인, 용도제한(은행/보험/카드/민원)
                        +"1.2.410.200005.1.1.2|"     //금결원,   법인, 용도제한(은행/보험/카드/민원)
                        //+"1.2.410.200005.1.1.4.1|" //금결원,   개인, 용도제한(은행/보험/카드/민원)-보안매체용-PC에서는 설정할필요없음
                        //+"1.2.410.200005.1.1.2.1|" //금결원,   법인, 용도제한(은행/보험/카드/민원)-보안매체용-PC에서는 설정할필요없음
						+"1.2.410.200005.1.1.4.8|" //금결원,   개인, 용도제한(은행/보험/카드/민원)-조합번호전용
                        //+"1.2.410.200005.1.1.4.4|" //금결원,   개인, 용도제한(은행/보험/카드/민원)-KB전자등기용
                        
                        //은행(4)
                        +"1.2.410.200005.1.1.6.1|"   //금결원,   법인, 용도제한(기업뱅킹)
                        +"1.2.410.200004.5.2.1.7.1|" //정보인증, 개인, 용도제한(은행/보험)
                        +"1.2.410.200004.5.4.1.101|" //전자인증, 개인, 용도제한(은행/보험)
                        +"1.2.410.200012.1.1.101|"   //무역정보, 법인, 용도제한(은행/보험/민원) *별도협의필요*

                        /* //카드(7)
                        +"1.2.410.200004.5.1.1.9.2|" //코스콤,   개인, 용도제한(카드)
                        +"1.2.410.200004.5.2.1.7.3|" //정보인증, 개인, 용도제한(카드)
                        +"1.2.410.200004.5.2.1.7.1|" //정보인증, 개인, 용도제한(은행/보험)
                        +"1.2.410.200004.5.4.1.103|" //전자인증, 개인, 용도제한(카드)
                        //+"1.2.410.200012.1.1.105|"   //무역정보, 개인, 용도제한(카드) *별도협의필요*
                        //+"1.2.410.200012.1.1.103|"   //무역정보, 개인, 용도제한(증권/카드) *별도협의필요*
                        //+"1.2.410.200004.5.1.1.12.908|" //코스콤, 법인, 용도제한(신한카드세금계산서결제전용)
                        */

                        /* //보험(4)
                        +"1.2.410.200004.5.1.1.9|"   //코스콤,   개인, 용도제한(증권/보험/민원)
                        +"1.2.410.200004.5.2.1.7.1|" //정보인증, 개인, 용도제한(은행/보험)
                        +"1.2.410.200004.5.4.1.101|" //전자인증, 개인, 용도제한(은행/보험)
                        //+"1.2.410.200012.1.1.101|"   //무역정보, 법인, 용도제한(은행/보험/민원) *별도협의필요*
                        */

                        /* //증권(4)
                        +"1.2.410.200004.5.1.1.9|"   //코스콤,   개인, 용도제한(증권/보험/민원)
                        +"1.2.410.200004.5.2.1.7.2|" //정보인증, 개인, 용도제한(증권)
                        +"1.2.410.200004.5.4.1.102|" //전자인증, 개인, 용도제한(증권)
                        //+"1.2.410.200012.1.1.103|"   //무역정보, 개인, 용도제한(증권/카드) *별도협의필요*
                        */

                        /* //기타(5)
                        +"1.2.410.200004.5.2.1.5001|"  //정보인증, 법인, 용도제한(세금계산서-국세청)
                        +"1.2.410.200004.5.2.1.6.257|" //정보인증, 법인, 용도제한(세금계산서-일반)
                        +"1.2.410.200004.5.4.1.104|"   //전자인증, 개인, 용도제한(민원)
                        +"1.2.410.200005.1.1.6.8|"     //금결원,   법인, 용도제한(세금계산서)
                        +"1.2.410.200004.5.5.1.4.2|"   //이니텍,   법인, 용도제한(세금계산서)
                        */

                        /* //GPKI+EPKI(13)
                        +"1.2.410.100001.2.1.1|"       //GPKI, 전자관인
                        +"1.2.410.100001.2.1.2|"       //GPKI, 컴퓨터용
                        +"1.2.410.100001.2.1.3|"       //GPKI, 특수목적용
                        +"1.2.410.100001.2.1.4|"       //GPKI, 공공/민간 전자관인
                        +"1.2.410.100001.2.1.5|"       //GPKI, 공공/민간 컴퓨터용
                        +"1.2.410.100001.2.1.6|"       //GPKI, 공공/민간 특수목적용
                        +"1.2.410.100001.2.2.1|"       //GPKI, 공무원 전자서명
                        +"1.2.410.100001.2.2.2|"       //GPKI, 공공/민간 개인용 전자서명
                        +"1.2.410.100001.5.3.1.3|"     //EPKI, 교육부/개인사용자
                        +"1.2.410.100001.5.3.1.1|"     //EPKI, 교육부/전자관인
                        +"1.2.410.100001.5.3.1.7|"     //EPKI, 교육부/서버용
                        +"1.2.410.100001.5.3.1.9|"     //EPKI, 교육부/SSL용
                        +"1.2.410.100001.5.3.1.5|"     //EPKI, 교육부/특수목적용
                        */
                        ,

    //real ca
    yessignCaHost : "203.233.91.71",
    yessignCaPort : 4512,
    crosscertCaHost : "211.192.169.90",
    crosscertCaPort : 4512,
    signkoreaCaHost : "210.207.195.100",
    signkoreaCaPort : 4099,
    kicaCaHost : "211.35.96.43",
    kicaCaPort : 4502,


    //test ca
    yessignCaHost_test : "203.233.91.231",    //금융결제원
    yessignCaPort_test : 4512,
    crosscertCaHost_test : "211.180.234.201", //전자인증
    crosscertCaPort_test : 4512,
    signkoreaCaHost_test : "211.175.81.101",  //코스콤
    signkoreaCaPort_test : 4099,
    kicaCaHost_test : "211.35.96.115",        //정보인증
    kicaCaPort_test : 4502,

    //web cmp
    yessignWebCmpUrl : "https://www.yessign.or.kr:4512/cmp",
    yessignWebCmpUrl_test : "https://fidoweb.yessign.or.kr:4512/cmp",

    hsmUsingDrivers : "XecureHSM:1.0.0.0",//"XecureHSM:1.0.0.0|Vid_04e8&Pid_0007"
    enableHsmGuide : false,
    forceScreenKeyboard: true,

    passwordError: false,
    passwordCounter : "5",
    closeOnError: false,
    enableCheckVid : false,
    installError: false,
    changePasswordPolicy : "v2",

    //insideIframe : true, //iframe 안에서 로드 될 경우 이 값이 true이면 top disable 됨.
    useDelfinoSession : false,  //나중에 사용위함.
    useBrowserCookie : true,    //서명시 브라우저의 DELFINO 쿠키값 전달 여부
    useRecentModule : true, //최근 setModule로 설정한 module사용

    stringsDelimiter : ":",
    multiSignDelimiter : "￡",
    nonceUrl : _Delfino_Svc + "/ocom/jsp/pav/wizvera/delfino_nonce.jsp",
    nonce : null ,
    nonceKeyName : "nonce",

    //useNonceOption : true, //nonceKeyName이 아닌 __DELFINO_NONCE 사용
    //addCertStoreType : true, //서명시 서명데이터에 certStoreType을 추가
    //serverTimeUrl : _Delfino_Svc + "/delfino_serverTime.jsp", //서버제공 서명시간 사용

    mobileUrlHandlerType : false,
    mobileCloseHtml : _Delfino_Base + "/ocom/img/wizvera/logo/mobile_close.html", //frame환경에서 ios용 close.html
    processingImageUrl : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_processing.gif",
    mobileUrlHandlerServerUrl : "",
    mobileProviderName : "kbstar", //"wizvera"

    //urlHanlderServerUrl : _Delfino_Svc + "/delfino_handler.jsp",
    handlerBlankUrl : _Delfino_Base + "/ocom/img/wizvera/logo/handler_blank.html", //iframe용 src페이지(IE 6전용)

    sitename : "KBSTAR",

    //인증서 발급/갱신시 내부에서 결과 message를 alert 할지 여부, 미설정시 alert함.
    //alertCmpComplete : false,

end : "end"};

DelfinoConfig.version_g2 = DelfinoConfig.version;
DelfinoConfig.installPkg_g2 = DelfinoConfig.installPkg;

//DelfinoConfig.outputEncoding = "hex"; //base64, hex

//버튼 색상 및 스타일 설정
DelfinoConfig.style_DEF = {
    button   : { backgroundColor:"#1d79d3", backgroundColorSelected:"#054d94", fontColor:"#ffffff", fontColorSelected:"#ffffff", borderColor:"#075fb5", borderColorSelected:"#003399" },
    tab      : { backgroundColor:"#1d79d3", fontColor:"#ffffff", borderColor:"#075fb5"},
    keyboard : { type:0, logoUrl:_Delfino_Base + "/sitelogo/keyboard_logo.html", disableEffect:"true", enableDummy:"true"}
};
DelfinoConfig.style_RED = {
    button   : { backgroundColor:"#c74445", backgroundColorSelected:"#a41c1d", fontColor:"#ffffff", fontColorSelected:"#d269a", borderColor:"#c1272d", borderColorSelected:"#9b0d0f" },
    tab      : { backgroundColor:"#c74445", fontColor:"#ffffff", borderColor:"#c1272d"},
    keyboard : { type:1, logoUrl:_Delfino_Base + "/sitelogo/keyboard_logo.html", disableEffect:"true", enableDummy:"true"}
};
//DelfinoConfig.style = DelfinoConfig.style_DEF;
//DelfinoConfig.style = DelfinoConfig.style_RED;

//windows NT 6.1 이상만 sha2 설치
/* if(!navigator.userAgent.match(/NT 5./i) && !navigator.userAgent.match(/NT 6.0/i)) {
    DelfinoConfig.installPkg.Cab32 = DelfinoConfig.installPkg.Cab32_sha2;
    DelfinoConfig.installPkg.Cab64 = DelfinoConfig.installPkg.Cab64_sha2;
    DelfinoConfig.installPkg.Win32 = DelfinoConfig.installPkg.Win32_sha2;
    DelfinoConfig.installPkg.Win64 = DelfinoConfig.installPkg.Win64_sha2;

    DelfinoConfig.installPkg_g3.Win32 = DelfinoConfig.installPkg_g3.Win32_sha2;
    DelfinoConfig.installPkg_g3.Win64 = DelfinoConfig.installPkg_g3.Win64_sha2;
} */

//인증서로밍: 가져오기/내보내기
DelfinoConfig.certRelay = {
     provider : "wizveraV2",
     providerUrl : _Delfino_Svc + "/ocom/jsp/pav/wizvera/delfino_certRelay.jsp"
};
DelfinoConfig.certRelay.providerUrl = "https://rs.wizvera.com/relayServer/certMove.do"; //WIZVERA default

//휴대폰 가져오기/내보내기 설정
DelfinoConfig.transferInfo = {
    provider : "crosscert",
    host : "211.192.169.44",
    port : 443,
    csrKey : "1892D918",
    importInfoUrl : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_import.png",
    exportInfoUrl : _Delfino_Base + "/ocom/img/wizvera/logo/delfino_export.png"
};

DelfinoConfig.langUrl = {
    koreanUrl : _Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_korean.js?20230428",
    englishUrl :_Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_english.js?20230428",
    chaneseUrl :_Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_chinese.js?20230428",
    japaneseUrl :_Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_japanese.js?20230428",
    vietnameseUrl :_Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_vietnamese.js?20230428"
};
DelfinoConfig.langUrl_b64 = {
    koreanUrl : _Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_korean_b64.js?20230428",
    englishUrl :_Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_english_b64.js?20230428",
    chaneseUrl :_Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_chinese_b64.js?20230428",
    japaneseUrl :_Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_japanese_b64.js?20230428",
    vietnameseUrl :_Delfino_Base + "/ocom/img/wizvera/lang/delfino_lang_vietnamese_b64.js?20230428"
};
DelfinoConfig.lang = _Delfino_SystemLang;
//DelfinoConfig.langUrl = DelfinoConfig.langUrl_b64;

var ubikeyConfig = {
    enable: "true",
    download: _Delfino_Base + "/quics?page=C019677",
    version: "3,0,0,1",
    download_x64: _Delfino_Base + "/quics?page=C019677",
    version_x64: "1,1,0,7",
    update: "KBSTAR_WIZVERA|NULL",
    securekeyboard: "WIZVERA|AHNLABST" //"WIZVERA|SOFTCAMP"
};
//ubikeyConfig.enable = "false";

var ubikeyConfigMac = {
    enable: "true",
    download: _Delfino_Base + "/quics?page=C019677",
    version: "v.1,0,0,2",
    update: "KBSTAR_WIZVERA|NULL",
    securekeyboard: ""//WIZVERA|AHNLABST"
};
ubikeyConfigMac.enable = "false";

var ubikeyConfigLinux = {
    enable: "true",
    download: _Delfino_Base + "/quics?page=C019677",
    version: "1,0,0,1",
    update: "KBSTAR_WIZVERA|NULL",
    securekeyboard: ""//WIZVERA|AHNLABST"
};
ubikeyConfigLinux.enable = "false";

var mobisignConfig = {
    enable:     "true",
    download:   "http://www.mobisign.kr/mobisigndll.htm",
    //download: "http://demo.wizvera.com/down/lumensoft/mobisign.html",
    version:    "5,0,3,8",
    sitecode:   "5020004",
    aclist:     "34;yessignCA;1.2.410.200005.1.1.1;yessignCA;1.2.410.200005.1.1.5;yessignCA;1.2.410.200005.1.1.4;yessignCA;1.2.410.200005.1.1.2;yessignCA;1.2.410.200005.1.1.6.1;yessignCA Class 1;1.2.410.200005.1.1.1;yessignCA Class 1;1.2.410.200005.1.1.5;yessignCA Class 1;1.2.410.200005.1.1.4;yessignCA Class 1;1.2.410.200005.1.1.2;yessignCA Class 1;1.2.410.200005.1.1.6.1;signGATE CA;1.2.410.200004.5.2.1.2;signGATE CA;1.2.410.200004.5.2.1.1;signGATE CA;1.2.410.200004.5.2.1.7.1;signGATE CA4;1.2.410.200004.5.2.1.2;signGATE CA4;1.2.410.200004.5.2.1.1;signGATE CA4;1.2.410.200004.5.2.1.7.1;SignKorea CA;1.2.410.200004.5.1.1.5;SignKorea CA;1.2.410.200004.5.1.1.7;SignKorea CA2;1.2.410.200004.5.1.1.5;SignKorea CA2;1.2.410.200004.5.1.1.7;NCASign CA;1.2.410.200004.5.3.1.2;NCASign CA;1.2.410.200004.5.3.1.9;CrossCert Certificate Authority;1.2.410.200004.5.4.1.1;CrossCert Certificate Authority;1.2.410.200004.5.4.1.2;CrossCert Certificate Authority;1.2.410.200004.5.4.1.101;CrossCertCA2;1.2.410.200004.5.4.1.1;CrossCertCA2;1.2.410.200004.5.4.1.2;CrossCertCA2;1.2.410.200004.5.4.1.101;TradeSignCA;1.2.410.200012.1.1.1;TradeSignCA;1.2.410.200012.1.1.3;TradeSignCA;1.2.410.200012.1.1.101;TradeSignCA2;1.2.410.200012.1.1.1;TradeSignCA2;1.2.410.200012.1.1.3;TradeSignCA2;1.2.410.200012.1.1.101;",
    aclist_test:"42;yessignCA-TEST;1.2.410.200005.1.1.1;yessignCA-TEST;1.2.410.200005.1.1.2;yessignCA-TEST;1.2.410.200005.1.1.4;yessignCA-TEST;1.2.410.200005.1.1.6.1;SignGateFTCA CA;1.2.410.200004.2.201;SignGateFTCA CA;1.2.410.200004.5.2.1.7.1;signGATE FTCA02;1.2.410.200004.2.201;signGATE FTCA02;1.2.410.200004.5.2.1.7.1;signGATE FTCA02;1.2.410.200004.2.202;SignKorea Test CA;1.2.410.200004.5.1.1.7;SignKorea Test CA;1.2.410.200004.5.1.1.5;NCATESTSign;1.2.410.200004.5.3.1.2;NCATESTSign;1.2.410.200004.5.3.1.9;CrossCertCA-Test2;1.2.410.200004.5.4.1.1;CrossCertCA-Test2;1.2.410.200004.5.4.1.2;CrossCertCA-Test2;1.2.410.200004.5.4.1.101;TestTradeSignCA;1.2.410.200012.1.1.3;TestTradeSignCA;1.2.410.200012.1.1.1;TestTradeSignCA;1.2.410.200012.1.1.101;yessignCA-Test Class 0;1.2.410.200005.1.1.1;yessignCA-Test Class 0;1.2.410.200005.1.1.2;yessignCA-Test Class 0;1.2.410.200005.1.1.4;yessignCA-Test Class 0;1.2.410.200005.1.1.5;yessignCA-Test Class 0;1.2.410.200005.1.1.6.1;yessignCA-Test Class 0;1.2.410.200005.1.1.6.8;yessignCA-Test Class 1;1.2.410.200005.1.1.1;yessignCA-Test Class 1;1.2.410.200005.1.1.2;yessignCA-Test Class 1;1.2.410.200005.1.1.4;yessignCA-Test Class 1;1.2.410.200005.1.1.5;yessignCA-Test Class 1;1.2.410.200005.1.1.6.1;yessignCA-Test Class 1;1.2.410.200005.1.1.6.8;signGATE FTCA04;1.2.410.200004.2.201;signGATE FTCA04;1.2.410.200004.5.2.1.7.1;signGATE FTCA04;1.2.410.200004.2.202;SignKorea Test CA2;1.2.410.200004.5.1.1.7;SignKorea Test CA2;1.2.410.200004.5.1.1.5;CrossCertTestCA2;1.2.410.200004.5.4.1.1;CrossCertTestCA2;1.2.410.200004.5.4.1.2;CrossCertTestCA2;1.2.410.200004.5.4.1.101;TradeSignCA2009Test2;1.2.410.200012.1.1.3;TradeSignCA2009Test2;1.2.410.200012.1.1.1;TradeSignCA2009Test2;1.2.410.200012.1.1.101;"
};
//mobisignConfig.enable = "false";

DelfinoConfig.smartone = {
    enable:      false,
    version:     "1,0,0,5",
    download:    _Delfino_Base + "/quics?page=C018873&QSL=F&cc=b028364:b053301",
    host :       "api.smart-one.co.kr",
    port:         443,
    siteCode:    "065004"
};
if (_Delfino_SystemMode == "test" || _Delfino_SystemMode == "dev" ) DelfinoConfig.smartone.host = "dev.smart-one.co.kr";

//ax-plugin:  scsk, touchenkey, kings, npkcx, aos
//non-plugin: scsk, touchennxkey, astx(nve), nosk(npkfx), kos
var secureKeyboardConfig = {
    enable: true,
    toggle: true,
    showMessage: true,
    product: "astx,scsk"
};

//스마트인증
DelfinoConfig.usim = {
    usingDrivers : "USIM_0001|USIM_0002",
    certSelector : "mobile",
    displayDataAtMobile : false,
    siteDomain : "www.wizvera.com",
    disableInHSM : false,
    raon : { download: "http://www.usimcert.com/popup/pop_install.php", siteCode : "900000000", displayDataAtMobile : false },
    dream : { download: "http://ids.smartcert.kr", host : "center.smartcert.kr", port : "443", displayDataAtMobile : true }
};

//위즈베라 세이프하드 , 금결원 안전디스크 중 order 번호가 낮은 쪽이 메뉴 위쪽에 뜸(인덱스가 없거나 같으면 세이프하드가 위쪽에 뜸)
//위즈베라 세이프하드
DelfinoConfig.safehard = {
    order: 1,
    version:  "1,0,1,5",
    download: "http://download.safehard.co.kr/install/install.html",
    downloadNormal: "http://download.safehard.co.kr/install/install_normal.html",
    cloudUrl: "http://cloud.safehard.co.kr/safeHardRelayServer/safeHardReq.do",
    secureKeyboardConfig : secureKeyboardConfig
};

//금결원 안전디스크
/* DelfinoConfig.secureDisk = {
    order: 2,
    enable:   true,
    version:  "1.5.2",
    download: "https://www.dgb.co.kr/cms/sdz/disk_guide.html"
}; */

//EA
DelfinoConfig.EA = {
    enable: false
};

//myPassword
DelfinoConfig.myPassword = {
    enable: false
};

//connected
/* DelfinoConfig.connected = {
    servers : ['https://apple.wizvera.com','https://banana.wizvera.com', 'https://cherry.wizvera.com']
}; */

//KTB솔루션
/* DelfinoConfig.KTB = {
    DGBank : {version:"1.0.0.0", ip:"realip.dgbank.co.kr", port:"2577", publickey:"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgNhWIhZNzcvHGcnfePBuf7DljXda9CECCEdMjtDa3VbC6bz4dZE1rlW7t1DY/TU4muT12rgkiGgG4MJT3Jb2FCzy2oo473z79YxavFq0/HPwcqScYgKiEAv9LtvfvQ6O6TzpLDW1KulICZ1yWLEsQ3kNDVs0wEDFD0d2qV1sQ6geCVyd7JFITrdAZqAm05nMx/7PzoTOjRz6W8NQ2891f8NRq+0KqfNRvzkmMq01qdB//GJAG8DgvSM9k8vrTqMZwFUwRZANVj6c48St9hO4kCfSrtTKsHvR7mYWNCVIJVYUHufp+pcGLESxRfmMA6eGhYnMGayJtoZtCMaR1fd/KQIDAQAB"}
}; */

//G4설정
DelfinoConfig.g4 = {};
/*
DelfinoConfig.g4.signServerUrl = "https://obank.kbstar.com/ocom/html5/delfinoG10";
if (document.location.hostname.indexOf("obank.kbstar.com") >= 0) {
    DelfinoConfig.g4.signServerUrl = window.location.origin + "/ocom/html5/delfinoG10";
    if (document.location.hostname.indexOf("bobank.kbstar.com") >= 0) {
    	DelfinoConfig.g4.signServerUrl = "https://obank.kbstar.com/ocom/html5/delfinoG10";
    }
}

if (_Delfino_SystemMode == "test") DelfinoConfig.g4.signServerUrl = "https://zobank.kbstar.com/ocom/html5/delfinoG10";
if (_Delfino_SystemMode == "test" && document.location.origin.indexOf("https://z") >= 0) DelfinoConfig.g4.signServerUrl = "https://zobank.kbstar.com/ocom/html5/delfinoG10";
if (_Delfino_SystemMode == "test" && document.location.origin.indexOf("https://y") >= 0) DelfinoConfig.g4.signServerUrl = "https://yobank.kbstar.com/ocom/html5/delfinoG10";
if (_Delfino_SystemMode == "test" && window.location.port != "") DelfinoConfig.g4.signServerUrl = window.location.origin + "/ocom/html5/delfinoG10";
*/
DelfinoConfig.g4.signServerUrl = window.location.origin + "/ocom/html5/delfinoG10";


//G4 저장매체 표시 옵션
//DelfinoConfig.g4.uiType = "default"; //간편인증제외
DelfinoConfig.g4.uiType = "smart";   //간편인증포함
//DelfinoConfig.g4.uiType = "none";    //무설치버전UI
//DelfinoConfig.g4.manageButton = true; //서명창 인증서리스트 왼쪽 하단에 인증서 관리 버튼 나타남.

DelfinoConfig.g4.useV1 = true; //v﻿4262 이상 secretV2 로 동작함, G4 SDK가 v210 이하일경우  secretV1으로 처리
//DelfinoConfig.g4.needKey = true; //v4046(2017.04.19 이후 릴리즈)가 아닐 경우 해당 옵션 true 필요(false가 기본값)
//DelfinoConfig.g4.enableRotationOnTablet = true; ///true 값일 경우 : 태블릿 모드일 때 가로 금지 안함.
//DelfinoConfig.g4.useJSON = true; //G4서버와 통신시에 contentType으로 JSON 객체 사용.(false가 기본값, 이전과 같은 동작임)

//DelfinoConfig.g4.enablePreload = true; //iframe 미리 로드 (해당 값 없을 경우 false 기본값)
//DelfinoConfig.g4.useMapOnKeyboard = true; //가상키패드 모바일 웹접근성(add 20180822)

//금결원 OpenCert 설정: 위즈베라OpenCert는 지원안하며 encryptedParams 값은 고객사에서 금결원에 요청하여 받아야함 (add 20180918)
DelfinoConfig.g4.opencert = {
    enable: true,
    useOnlyOpencertStorage: false,
    mode:          "real",
	color:         "yellow",
    relaySrc:      "https://www.yessign.or.kr:3100/v2/relay.js?corp=004&dt=",
    relaySrc_test: "https://fidoweb.yessign.or.kr:3100/v2/relay.js?corp=004&dt=",
    encryptedParams:      "UW/HWoK+k227nI08lFBt2I5TgsX7gSyTbuQroIvmHj+MWjchJTQrqNuu6esF1Q++PBFF5OKNJynIuMAmb6WT+g==",
    encryptedParams_test: "8/aHPIirZ3sHRoP3cJJbNT9H6/QSCBP3aUd/7MFCZOsLxGc7rcRiGlEP4OChz43U66cBrgidDw2XfvIyDlQuxw=="
};
//DelfinoConfig.g4.opencert.color = "";
DelfinoConfig.g4.opencert.cloudMode = "tray";
if (_Delfino_SystemMode == "test" || _Delfino_SystemMode == "dev" ) {
	DelfinoConfig.g4.opencert.mode = "test";
    DelfinoConfig.g4.opencert.encryptedParams = DelfinoConfig.g4.opencert.encryptedParams_test;
	DelfinoConfig.g4.opencert.relaySrc = DelfinoConfig.g4.opencert.relaySrc_test;
    //DelfinoConfig.g4.opencert.enable = false; //내부망에서 접근 안될경우 주석 제거
}
//DelfinoConfig.g4.opencert.enable = false;
//브라우저용 인증서 내보내기 방지 설정
DelfinoConfig.g4.notAllowedExportOidCertFilter = "1.2.410.200005.1.1.1-B|1.2.410.200005.1.1.5-B"; 

//true 일 경우 브라우저용 인증서 비밀번호 정책에서 영문자/숫자 만으로 이루어지도록 체크. 기본값은 false.
//DelfinoConfig.g4.passwordPolicyWithoutSpecial = true;

/** 인증서 선택창에서 저장매체 enable/disable(BROWSER|FIND_CERT|EA|LOCAL_DISK|TOKEN|HSM|PHONE|USIM|SWHSM)*/
DelfinoConfig.g4.certStoreFilter = DelfinoConfig.certStoreFilter; //"BROWSER|FIND_CERT|LOCAL_DISK";
DelfinoConfig.g4.prepareCertStore = "USIM|SWHSM"; //DelfinoConfig.prepareCertStore; //"USIM|SWHSM";

//DelfinoConfig.g4.hardDiskToDefaultStore = true; //g4 기본 저장소설정: default(BROWSER), true(LOCAL_DIST)
DelfinoConfig.g4.certStoreTypeBrowserToLocalDisk = true; //default(BROWSER), true(LOCAL_DISK) KB
DelfinoConfig.g4.certStoreTypeOnesignToPhone = true; //default(EA), true(PHONE) KB

DelfinoConfig.g4.checkedSaveCertInBrowser = true;
DelfinoConfig.g4.insertViewportTag = false;

DelfinoConfig.g4.certConverter = {
    Win     : _Delfino_Down + "/certconvert/CertConverter.exe",
    Mac     : _Delfino_Down + "/certconvert/CertConverter.dmg",
    Linux32 : _Delfino_Down + "/certconvert/CertConverter_32.tgz",
    Linux64 : _Delfino_Down + "/certconvert/CertConverter_64.tgz"
};

DelfinoConfig.g4.popupHelp = {
    url    : "", //_Delfino_Base + "/quics?page=C039183",
    width  : 700,
    height : 560
};

DelfinoConfig.g4.roamingImage = {
    desktopExport : _Delfino_Base + "/ocom/img/wizvera/logo/cert_export_roaming_x1.png",        // 270 x 130
    desktopImport : _Delfino_Base + "/ocom/img/wizvera/logo/cert_import_roaming_x1.png",        // 270 x 130
    tabletExport  : _Delfino_Base + "/ocom/img/wizvera/logo/cert_export_roaming_x2_tablet.png", // 760 x 400
    tabletImport  : _Delfino_Base + "/ocom/img/wizvera/logo/cert_import_roaming_x2_tablet.png", // 760 x 400
    mobileExport  : _Delfino_Base + "/ocom/img/wizvera/logo/cert_export_roaming_x2_mobile.png", // 300 x 150
    mobileImport  : _Delfino_Base + "/ocom/img/wizvera/logo/cert_import_roaming_x2_mobile.png"  // 300 x 150
};

// 브라우저인증서에 물리키보드 연동 설정
// src값을 ui.jsp에서 인클루드 하므로 TouchEnNx의 주소를 입력.
// enableOS : "WINDOWS|MAC|LINUX"
DelfinoConfig.g4.secureKeyboard = {
    enable: false,
    name: "touchennxkey",
    enableOS: "WINDOWS", //WINDOWS,MAC,LINUX
    src: "/TouchEn/cmn/TouchEnNx.js"
};

var g4Astx = {
    enable: true,
    name: "astx",
    src: [
        "/js/common/ahnlab/astx2.min.js",
        "/js/common/ahnlab/astx2_custom.js"
    ]
};

DelfinoConfig.g4.secureKeyboard = g4Astx;

//connected
DelfinoConfig.g4.connected = DelfinoConfig.connected;


//mobile 인증서 가져오기 설정
DelfinoConfig.g4.typeOfImportLocal = ['find', 'app'];
DelfinoConfig.g4.typeOfImportLocalApp = "certrelay"; // 'clipboard' or 'certrelay'

//android local npki 인증서 가져오기 //TODO: 확인후 복사app으로 넘겨주면 삭제해야함.
DelfinoConfig.g4.mobileCertImportServiceUrl = "https://rs.wizvera.com/relayServer/certMove.do";

//인증서 가져오기 스킴 및 패키지 url 설정. 2017/04/24이전 릴리즈는 onesign, com.wizvera.onesign이 기본값.
//DelfinoConfig.g4.certCopyScheme = "wizvera-certcopy";
//DelfinoConfig.g4.certCopyPackageUrl = "com.wizvera.certcopy";


//indexedDB동작안할때 window.open 및 타이틀 설정(add 20180822)
DelfinoConfig.g4.newWindowNoDb = true;
DelfinoConfig.g4.backgroundAndTitle = {
    title: 'DelfinoG4 전자서명',
    desktop: '',
    tablet: ''
};

DelfinoConfig.g4.cacheCertStore = true;
////////////////////////
//Delfino_G4_END
////////////////////////


////////////////////////
//Delfino_G5_START
////////////////////////
DelfinoConfig.g5 = $.extend({}, DelfinoConfig.g4);
DelfinoConfig.g5.signServerUrl = window.location.origin + "/wizvera/delfino4html/g5";
DelfinoConfig.g5.enablePreload = false;
DelfinoConfig.g5.certStoreFilter = "";

DelfinoConfig.g5.certRelayProviders = {};
DelfinoConfig.g5.certRelayProviders.common = DelfinoConfig.certRelay;

DelfinoConfig.g5.certRelayProviders.yessign = {
    provider : "wizveraV2",
    providerUrl : "https://fidoweb.yessign.or.kr:3300/wizvera/delfino/svc/delfino_certRelay.jsp",
    label: {
        "import": {
            title: "다른 기기 브라우저에 저장되어 있는 인증서를 가져옵니다.",
            help: "인증센터 ▶ 브라우저 인증서 이동 ▶ 인증서 가져오기 클릭",
            comment: "다른 기기 브라우저에 표시된 인증번호를 확인후 입력하세요"
        },
        "export": {
            title: "선택하신 인증서를 다른 기기 브라우저로 내보냅니다.",
            help: "인증센터 ▶ 브라우저 인증서 이동 ▶ 인증서 내보내기 클릭",
            comment: "표시된 인증번호를 다른 기기 브라우저에 입력하세요"
        }
    }
};
////////////////////////
//Delfino_G5_END
////////////////////////

////////////////////////
//Delfino_G10_START
////////////////////////
DelfinoConfig.cg = $.extend(true, {}, DelfinoConfig.g4);
//DelfinoConfig.cg.signServerUrl = window.location.origin + "/wizvera/delfino4html/vpcg";
DelfinoConfig.cg.VPCGClientConfig = {
    // 전자서명 상태조회 주기(milliseconds)
    interval: 3000,

    // vpcg-sdk service url
    serviceUrl: _Delfino_Svc + '/delfino_vpcgService.jsp',

    // 표시할 Provider 설정: ,로 구분된 Provider name 순서대로 정렬됨: delfino, kakao, toss, naver, fincert 가능
    displayProviders: 'fincert,delfino,fincertcorp',
    displayProvidersCorp: 'fincertcorp,fincert,delfino',

    // 기본적으로 선택되어 표시될 Provider id : delfino, kakao, toss, naver, fincert
    defaultProvider: 'fincert',
    defaultProviderCorp: 'fincertcorp',

	// 이전에 사용한 Provider를 자동선택되도록 한다. cacheCert: true시 전자서명시 캐시되는 것과는 기능이 다름(기본값 false)
    cacheProvider: true,
	
    // G4 비활성화 : 기본값 false
    //disableG4: true,
	
    // G4외의 provider로 confirmSign을 사용하여 서명요청시 원문 보여주기 화면 노출 여부, 설정에 따라 SignType이 정해짐.기본값 : true
    // true : SignType.CONFIRM, false: SignType.SIMPLE
    // G4는 sign format여부에 따라 구분되므로 이 옵션의 영향을 받지 않음
    // G4외의 provider를 sign을 이용하여 서명요청시에는 이 옵션의 영향을 받지 않음(SigmType.SIMPLE만 사용)
    //displaySignConfirmView: false,
	
    // 금용인증서 전용 설명
    finCertOptions: {
        // 금융인증서 필수 설정값
        finCertSdkMode: ['FinCert', 'FinCertCorp'],
        finCertSdkDefault: 'FinCert',
        finCertSdkDefaultCorp: 'FinCertCorp',

        finCertSdkUrl: 'https://4user.yeskey.or.kr/v1/fincert.js',
        //finCertSdkUrl_test: 'https://fidoweb.yessign.or.kr:3300/fincert/v1/fincert.js',
        finCertSdkUrl_test: 'https://t-4user.yeskey.or.kr/v1/fincert.js',
		
        finCertCorpSdkUrl: 'https://4user.yeskey.or.kr/v1/fincertCorp.js',
		finCertCorpSdkUrl_test: 'https://t-4user.yeskey.or.kr/v1/fincertCorp.js',

        //encryptedFinCertParams 형식: {"orgCode": "D2XXXXXXXX", "apiKey": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}
        //encryptedFinCertParams: 'HepvrhNNeWd45vNGQue9R0B9peXgwK3CFhTp9wsiW5jqMIeOHJU/+D3M/IklpDNsGbFtUxzVjfOJuY5YydM11ykTruV0wc1FqwWMWKrsrZ2h7H3EoHbIpjSfimNtGVSD',
        //encryptedFinCertParams_test: 'uvLZ/nWxwecwklwdApyaMup1dKONl6HmcWwUoAv73pmsVaiylT0iL4atnTq2Nlsn41ki8xzMJg34gEVHinApuXF4wjIq2yS0Kk/F1szHjqfqr2iJ9yAKIR6BP3T50kFV',      
     
        //KB 뉴테스트
        encryptedFinCertParams_test: '95aVFoTFEd4gosXHAuPmZFPayInQ4lIqp0F3dqnsCSvM2Wa6KebxuREZuOyYffHP3oL0By7VgJjXIs9iuCQNPrFnpXblvL6Q+999tNfyCWOwS2q2gn0fB1M+Y4fiC3Xd',
        // KB 운영
        encryptedFinCertParams: 'hMnB4z4fVb2tXA4AVtfqrvvN0JMoOrKw7RCE0HPW1/wBgkV4L89ElQLuBQRH/bs+RNfa3CIHnVvuXkZ6tMzdGOIJgGgEhVwtQXdxOAnpLsDk1n24H+ur+BICeZ/h1Huw',

        // fincert.js 로딩완료 체크 interval(milliseconds) : 기본값 500
        scriptLoadCheckInterval: 500,
	  
	    // fincert.js 로딩 대기 시간(milliseconds), 지정된 시간동인 로딩이 안되면 에러처리 : 기본값 30000
        scriptLoadingTimeout: 10000,
	  
	    // 전자서명 원본 데이터의 형식이 G4의 form-urlencoded(key-value)인 경우 JSON으로 변환 여부(기본값 true)
        //convertSignDataToJSON: true,
		
		// 금융인증서 전자서명 view.enableTextViewAddInfo 설정 옵션
        enableTextViewAddInfo: {
            //nameValueSeparator: '=',
            //pairSeparator: '&',
            nameExclusionRegExp: '^__'         // 반드시 문자열 형태로 설정해야 함 /^__/ -> '^__'
        },

        // lang: 'kor',             // kor, eng, ...
        // signEncoding: 'EUC-KR',  // EUC-KR, UTF-8, 기본값(UTF-8)
        lastAccessCert: true,   // 마지막 사용된 인증서 자동 선택
        // signType: '06',          // 사용자 전자서명 거래 종류, 미지정시 기본값 - AUTH: '01', SIMPLE & CONFIRM: '06'
        // enableTextView: false,   // 서명 내용 표시 여부. 미지정시 confirmSign일 때 true
	    cssUrls: ['https://oimg1.kbstar.com/css/osite/ui_theme_yellow.css'], // UI 재정의 CSS 목록, 반드시 Array형식이어야 함
	  
	    end: "end"
    },
  
    // G10용 가이드 팝업 표시여부, 값이 비어있거나 없으면 해당 Provider 선택시 가이드 창이 표시되지 않음
    // 유효한 Providers: delfino, kakao, toss, naver, fincert
    // size: 256(w) x 505(h)
    guideUrls: {
        enable: true,
        delfino: 'images/g10/guide/pubcert_guide.png',
        fincert: 'images/g10/guide/fincert_guide.png',
        fincertcorp: 'images/g10/guide/fincert_guide.png'
    },
	
    // 전자서명시 addCertStoreType: true인 경우 삽입되는 __CERT_STORE_MEDIA_TYPE에 들어갈 이름을 지정할 수 있다.
    // 해당 Provider에 설정된 값이 없으면 해당 Provider명이 UpperCase로 들어간다.(fincert -> FINCERT)
    // 유효한 Providers: kakao, toss, naver, pass, fincert, 
	certStoreMediaTypeAlias: {
        fincert: 'Y1',
        fincertcorp: 'Y1'
    },
	
    // Provider 표시명 설정. 해당 Provider의 표시명을 변경한다. 설정된 값이 없으면 기본값을 사용한다.
    // 너무 긴 값을 설정하면 화면이 깨지니 주의할 것
    // longName: defaultProvider 가 지정되지 않을때 표시되는 인증수단 선택창에 표시되는 긴 이름(longName) - 빈 값을 지정 할 수 없음(필수값)
    // shortName: G10 좌측 Provider 선택메뉴에 표시되는 짧은 이름(shortName) - 빈 값을 지정 할 수 없음(필수값)
    // subName: shortName 하단에 표시될 보조이름(subName) - 빈 값 설정 가능
    providerNameAlias: {
        delfino: {
            longName: '브라우저 인증서',
            shortName: '브라우저인증서',
            subName: ''
        }
    },
end : "end"};

if (_Delfino_SystemMode == "test" || _Delfino_SystemMode == "dev" ) {
    DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl_test;
    DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl_test;
    DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams_test;
}

if (document.location.hostname.indexOf("obiz.kbstar.com") >= 0) {
    // 기업도메인인 경우 기업금융인증서가 목록에 표시되고 default로 선택되도록 설정
    DelfinoConfig.cg.VPCGClientConfig.displayProviders = DelfinoConfig.cg.VPCGClientConfig.displayProvidersCorp;
    DelfinoConfig.cg.VPCGClientConfig.defaultProvider = DelfinoConfig.cg.VPCGClientConfig.defaultProviderCorp;
    DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkDefault = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkDefaultCorp;
}
////////////////////////
//Delfino_G10_END
////////////////////////

//개발모드  설정
if (_Delfino_SystemMode == "test" || _Delfino_SystemMode == "dev" ) {
    DelfinoConfig.issuerCertFilter = DelfinoConfig.issuerCertFilter_test;
    DelfinoConfig.yessignCaHost = DelfinoConfig.yessignCaHost_test;
    DelfinoConfig.yessignCaPort = DelfinoConfig.yessignCaPort_test;
    DelfinoConfig.crosscertCaPort = DelfinoConfig.crosscertCaPort_test;
    DelfinoConfig.crosscertCaHost = DelfinoConfig.crosscertCaHost_test;
    DelfinoConfig.signkoreaCaHost = DelfinoConfig.signkoreaCaHost_test;
    DelfinoConfig.signkoreaCaPort = DelfinoConfig.signkoreaCaPort_test;
    DelfinoConfig.kicaCaHost = DelfinoConfig.kicaCaHost_test;
    DelfinoConfig.kicaCaPort = DelfinoConfig.kicaCaPort_test;
    DelfinoConfig.yessignWebCmpUrl = DelfinoConfig.yessignWebCmpUrl_test;
    mobisignConfig.aclist = mobisignConfig.aclist_test;
}
//alert(_Delfino_SystemMode + "\n" + DelfinoConfig.issuerCertFilter);

if (document.location.hostname.indexOf("obiz.kbstar.com") >= 0) DelfinoConfig.cacheCertStore = true; //KB:기업:저장매체캐쉬
if (typeof _SITE_SiteName != "undefined" && _SITE_SiteName == "osenior") DelfinoConfig.uiType = "senior"; //KB:시니어뱅킹


//모바일 구분(iOS, Android)
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {

}
else if(navigator.userAgent.match(/Android/i)){
    DelfinoConfig.installMessage.Mobile = "전용 브라우저를 사용하여야만 이용이 가능한 서비스입니다.\n[확인]을 선택하시면 전용 브라우저가 실행(설치)됩니다.";
}

//다국어 적용
if (_Delfino_SystemLang == "ENG") {
    DelfinoConfig.installPage_g3.url = _Delfino_Base + "/quics?page=C040532&QSL=F&P_name=Delfino&module=G3&url=close";
    DelfinoConfig.installPage.WinIE = _Delfino_Base + "/quics?page=C040532&P_name=Delfino";
    DelfinoConfig.installPage.WinMoz = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installPage.Mac = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installPage.Linux = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installMessage.NO = "Certification in an environment that does not support transactions have access.";
    DelfinoConfig.installMessage.PC = "This service is available only after installation of the security program. Selecting \n[Confirm] will connect you to the installation page.";
    DelfinoConfig.installMessage.Mobile = "This service is available only when using a dedicated browser. Selecting \n[Approve] will open (install) the browser.";
    if(navigator.userAgent.match(/Android/i))
        DelfinoConfig.installMessage.Mobile = "This service is available only when using a dedicated browser. Selecting \n[Confirm] will open (install) the browser.";
} else if (_Delfino_SystemLang == "CHN") {
    DelfinoConfig.installPage_g3.url = _Delfino_Base + "/quics?page=C040534&QSL=F&P_name=Delfino&module=G3&url=close";
    DelfinoConfig.installPage.WinIE = _Delfino_Base + "/quics?page=C040534&P_name=Delfino";
    DelfinoConfig.installPage.WinMoz = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installPage.Mac = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installPage.Linux = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installMessage.NO = "Certification in an environment that does not support transactions have access.";
    DelfinoConfig.installMessage.PC = "安装安全程序后方可使用的服务。\n点击[确认]，则将进入安装页面。";
    DelfinoConfig.installMessage.Mobile = "使用专用浏览器方可使用的服务。\n点击[批准]，则将运行（安装）专用浏览器。";
    if(navigator.userAgent.match(/Android/i))
        DelfinoConfig.installMessage.Mobile = "使用专用浏览器方可使用的服务。\n点击[确认]，则将运行（安装）专用浏览器。";
} else if (_Delfino_SystemLang == "JPN") {
    DelfinoConfig.installPage_g3.url = _Delfino_Base + "/quics?page=C040538&QSL=F&P_name=Delfino&module=G3&url=close";
    DelfinoConfig.installPage.WinIE = _Delfino_Base + "/quics?page=C040538&P_name=Delfino";
    DelfinoConfig.installPage.WinMoz = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installPage.Mac = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installPage.Linux = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installMessage.NO = "Certification in an environment that does not support transactions have access.";
    DelfinoConfig.installMessage.PC = "セキュリティプログラムをインストールしなければ、ご利用できないサービスです。\n[確認]を選択すると、インストールページにアクセスされます。";
    DelfinoConfig.installMessage.Mobile = "専用ブラウザをご利用しなければ、ご利用できないサービスです。\n[承認]を選択すると、専用ブラウザが実行(インストール)されます。";
    if(navigator.userAgent.match(/Android/i))
        DelfinoConfig.installMessage.Mobile = "専用ブラウザをご利用しなければ、ご利用できないサービスです。\n[確認]を選択すると、専用ブラウザが実行(インストール)されます。";
} else if (_Delfino_SystemLang == "VNM") {
    DelfinoConfig.installPage_g3.url = _Delfino_Base + "/quics?page=C040532&QSL=F&P_name=Delfino&module=G3&url=close";
    DelfinoConfig.installPage.WinIE = _Delfino_Base + "/quics?page=C040532&P_name=Delfino";
    DelfinoConfig.installPage.WinMoz = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installPage.Mac = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installPage.Linux = DelfinoConfig.installPage.WinIE;
    DelfinoConfig.installMessage.NO = "Certification in an environment that does not support transactions have access.";
    DelfinoConfig.installMessage.PC = "Dịch vụ này chỉ có sau khi cài đặt của chương trình bảo mật. Lựa chọn \n[Xác nhận] sẽ kết nối bạn đến trang cài đặt.";
    DelfinoConfig.installMessage.Mobile = "Dịch vụ này hiện có sẵn chỉ khi sử dụng một trình duyệt chuyên dụng. Lựa chọn \n[Phê duyệt] sẽ mở (cài đặt) của trình duyệt.";
    if(navigator.userAgent.match(/Android/i))
        DelfinoConfig.installMessage.Mobile = "Dịch vụ này hiện có sẵn chỉ khi sử dụng một trình duyệt chuyên dụng. Lựa chọn \n[Xác nhận] sẽ mở (cài đặt) của trình duyệt.";
}

//모바일_설치페이지변경
if (typeof _SITE_SiteName != "undefined" && _SITE_SiteName == "omweb") {
    DelfinoConfig.installPage.iOS = _Delfino_Base + "/quics?page=C023657&P_name=Delfino";
    DelfinoConfig.installPage.Android = _Delfino_Base + "/quics?page=C023657&P_name=Delfino";
}

/*
 *  WizIN-Delfino 동작방식 설정
 * - G2: plug-in, G3: handler, G4: html5
 * - 접속브라우저 확인 후 최종값이 문자열로 설정됨
 * - 외부에서 _SITE_ModuleType(_Delfino_ModuleType)값이 설정되어 있을 경우 업무 설정값을 우선으로 사용됨
*/
if (_Delfino_ModuleType != "") {
    DelfinoConfig.module = _Delfino_ModuleType;
} else {
    DelfinoConfig.module = {};
    DelfinoConfig.module.all = "G3";
    //DelfinoConfig.module.all = "G4,G3";

    DelfinoConfig.module.win32 = {};
    //DelfinoConfig.module.win32.all = "G3";
    //DelfinoConfig.module.win32.edge = "G3";
    //DelfinoConfig.module.win32.chrome = "G3";
    //DelfinoConfig.module.win32.firefox = "G3";
    //DelfinoConfig.module.win32.opera = "G3";
    //DelfinoConfig.module.win32.safari = "G3";
    //DelfinoConfig.module.win32.msie = "G2";
    //DelfinoConfig.module.win32.msie06 = "G2";
    //DelfinoConfig.module.win32.msie07 = "G2";
    //DelfinoConfig.module.win32.msie08 = "G2";
    //DelfinoConfig.module.win32.msie09 = "G2";
    //DelfinoConfig.module.win32.msie10 = "G2";
    //DelfinoConfig.module.win32.msie11 = "G2";

    DelfinoConfig.module.win64 = {};
    //DelfinoConfig.module.win64.all = "G3";
    //DelfinoConfig.module.win64.edge = "G3";
    //DelfinoConfig.module.win64.chrome = "G3";
    //DelfinoConfig.module.win64.firefox = "G3";

    DelfinoConfig.module.mac = {};
    //DelfinoConfig.module.mac.all = "G4";
    //DelfinoConfig.module.mac.chrome = "G4";
    //DelfinoConfig.module.mac.firefox = "G4";
    //DelfinoConfig.module.mac.opera = "G4";
    //DelfinoConfig.module.mac.safari = "G4";

    DelfinoConfig.module.linux = {};
    //DelfinoConfig.module.linux.all = "G4";
    //DelfinoConfig.module.linux.chrome = "G4";
    //DelfinoConfig.module.linux.firefox = "G4";
    //DelfinoConfig.module.linux.opera = "G4";

    DelfinoConfig.module.mobile = {};
    DelfinoConfig.module.mobile.all = "G2";
}