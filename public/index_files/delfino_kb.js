//-----------------------------------------------------------------------------------------------------------------------
// * 위즈베라(국민은행) 전용
// * 작성일 : 2011-09-09
//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
// * 뱅크사인 작업 START
// * 작성일 : 2018-07-20
// * 작업자 : 지익호
//-----------------------------------------------------------------------------------------------------------------------

$("body").ready(function(){ 
 if($("#CERT_MEDIA_TYPE").val() == '10'){
  $("body").append('<script type="text/javascript" src="/ocom/html5/blck/js/ML4Web_BS_Service_KB.js"><\/script>');
  //뱅크사인 모듈 로드
  loadML4Web_BS();
 }
});

//-----------------------------------------------------------------------------------------------------------------------
// * 뱅크사인 작업 END
//-----------------------------------------------------------------------------------------------------------------------

  var _CALLBACK_FUNCTION; // 전자서명 후 호출 할 함수명   


  /**
   * digiSign(keys, formats) : 위즈베라 전자서명 호출 함수
   * @param {Object} keys
   * @param {Object} formats
   */ 
  function digiSign(keys, formats, callback_func){
    var delimeter = ":";
    _CALLBACK_FUNCTION = callback_func;
    var values = $("input[name='hi_encryptData']").val();

//-----------------------------------------------------------------------------------------------------------------------
// * 뱅크사인 작업 START
// * 작성일 : 2018-07-20
// * 작업자 : 지익호
//-----------------------------------------------------------------------------------------------------------------------
    /*
    //기존
    Delfino.signKeyValue(keys, values, formats, delimeter, signCallback);
    */
    var module = Delfino_readCookie("delfino.recentModule");
    var certMediaType = $("#CERT_MEDIA_TYPE").val(); 
    if(certMediaType == '10' || module == 'BL'){
       if(!window['blckDigiSign']){
           $("body").append('<script type="text/javascript" src="/ocom/html5/blck/js/ML4Web_BS_Service_KB.js"><\/script>');
           //뱅크사인 모듈 로드
           loadML4Web_BS();
       }
       blckDigiSign(keys, values, formats, delimeter, signCallback);
    }else if("K1,K2,K3".indexOf(module) > -1 || "K1,K2,K3".indexOf(certMediaType) > -1){
       //2019.08.23 김규현 추가 KB국민인증서
       kbSignDigiSign(keys, values, formats, delimeter, callback_func);
     }else if("B1,B2,B3".indexOf(module) > -1 || "B1,B2,B3".indexOf(certMediaType) > -1){
       // 2024.03.19 채운병 추가 KB기업인증서
       KBCrtfiCorp.sign(callback_func, keys, values, formats, delimeter);
    }else {
     //기존 위즈베라 모듈 호출
     Delfino.signKeyValue(keys, values, formats, delimeter, signCallback);
    }
//-----------------------------------------------------------------------------------------------------------------------
// * 뱅크사인 작업 END
//-----------------------------------------------------------------------------------------------------------------------

  }

  /** 
   * signCallback(pkcs7, vid_random) : 위즈베라 전자서명 콜백 함수
   * @param {Object} pkcs7
   * @param {Object} vid_random
   */
  function signCallback_org(pkcs7, vid_random) {
    $("input[name='signed_msg']").val(pkcs7);
    var callback_func = _CALLBACK_FUNCTION;
    _CALLBACK_FUNCTION = null;
    if(window[callback_func]){
      window[callback_func]();
    }else{
      alert("콜백 함수 " + callback_func + "가 존재하지 않습니다.");
    }
  }
   
  function signCallback(pkcs7, vid_random) {
    $("input[name='signed_msg']").val(pkcs7);
    try {
    	if( $("#SMARTONE_CERT").val() ==  "Y" ) {
    		getSmartOtp(signCallback_smartOtp);
    	} else {
    		signCallback_smartOtp();
    	}
    }	catch(err) {
       alert("getStartOpt Set Err[" + err.description  + "]");
    }
  }

  function signCallback_smartOtp() {
    var callback_func = _CALLBACK_FUNCTION;
    _CALLBACK_FUNCTION = null;
    if(window[callback_func]){
      window[callback_func]();
    }else{
      alert("콜백 함수 " + callback_func + "가 존재하지 않습니다.");
    }
  }

  var _SIGN_FORM = null;
  function digiSignForm(keys, formats, callback_func, hi_encryptData_Form, signed_msg_Form){
    var delimeter = ":";
    _SIGN_FORM = signed_msg_Form;
    _CALLBACK_FUNCTION = callback_func;
    var values = $(hi_encryptData_Form).find("input[name='hi_encryptData']").val();
    Delfino.signKeyValue(keys, values, formats, delimeter, signCallbackForm);
  }
  function signCallbackForm(pkcs7, vid_random) {
	$(_SIGN_FORM).find("input[name='signed_msg']").val(pkcs7);
    _SIGN_FORM = null;
    var callback_func = _CALLBACK_FUNCTION;
    _CALLBACK_FUNCTION = null;
    if(window[callback_func]){
      window[callback_func]();
    }else{
      alert("콜백 함수 " + callback_func + "가 존재하지 않습니다.");
    }
  }
  
  function digiSign_Bonds(data, signComplete){
    Delfino.sign(data, signComplete, 
        {
    	    encoding: "euckr",
            signType:"signedData"
        }
    );
  }
  function digiSign_Bonds_multi(data, signComplete){
    Delfino.sign(data, signComplete, 
        {
            multiSign: true,
            multiSignDelimeter: "￡",
    	    encoding: "euckr",
            signType:"signedData"
        }
    );
  }
  
  /** 
   * KB인증서 필터링 설정값
   * CERT_Accept_Koscom
   * CERT_Accept_YesSign
   * CERT_Accept_YesSign_sERP
   * CERT_Accept_YesSign_BILL
   */

  var CERT_Accept_Koscom = "1.2.410.200004.5.1.1.7|" //증권전산, 법인, 상호연동
	  					 + "1.2.410.200004.5.1.1.9|" //증권전산, 개인, 용도제한(개인)*
						 + "1.2.410.200004.5.1.1.5|" //증권전산, 개인, 상호연동 
						 + "1.2.410.200004.5.2.1.2|" //정보인증, 개인, 상호연동
						 + "1.2.410.200004.5.2.1.1|" //정보인증, 법인, 상호연동
						 + "1.2.410.200004.5.3.1.9|" //전산원,   개인, 상호연동
						 + "1.2.410.200004.5.3.1.2|" //전산원,   법인, 상호연동
						 + "1.2.410.200004.5.4.1.1|" //전자인증, 개인, 상호연동
						 + "1.2.410.200004.5.4.1.2|" //전자인증, 법인, 상호연동
						 + "1.2.410.200005.1.1.1|"	 //금결원,  개인, 상호연동
						 + "1.2.410.200005.1.1.5|"	 //금결원,  법인, 상호연동
						 + "1.2.410.200012.1.1.1|"	 //무역정보, 개인, 상호연동
						 + "1.2.410.200012.1.1.3|"	 //무역정보, 법인, 상호연동
  						 ;
  
  //yes_accept_cert: View_Sign()
  //ex) Delfino.setPolicyOidCertFilter(CERT_Accept_YesSign)
  var CERT_Accept_YesSign 		= "1.2.410.200005.1.1.1|"       //금결원, 개인, 상호연동
	  							+ "1.2.410.200005.1.1.2|"       //금결원, 법인, 용도제한(은행/보험/카드)
	  							+ "1.2.410.200005.1.1.4|"    	//금결원, 개인, 용도제한(은행/보험/카드)
	  							+ "1.2.410.200005.1.1.5|"		//금결원, 법인, 상호연동
	  							+ "1.2.410.200005.1.1.6.1|"		//금결원, 법인, 용도제한(기업뱅킹)
	  							+ "1.2.410.200004.5.4.1.1|"		//전자인증, 개인, 상호연동
	  							+ "1.2.410.200004.5.4.1.2|"		//전자인증, 법인, 상호연동
	  							+ "1.2.410.200004.5.1.1.7|"		//증권전산, 법인, 상호연동
	  							+ "1.2.410.200004.5.1.1.5|"		//증권전산, 개인, 상호연동
	  							;
  
  //yes_accept_cert_sERP : View_Sign_sERP()
  //ex) Delfino.setPolicyOidCertFilter(CERT_Accept_YesSign_sERP)
  var CERT_Accept_YesSign_sERP	=  "1.2.410.200005.1.1.6.1|"		//금결원,  법인, 용도제한(기업뱅킹)
								;
  
  //yes_accept_cert_bill : View_Sign_bill()
  //ex) Delfino.setPolicyOidCertFilter(CERT_Accept_YesSign_BILL)
  var CERT_Accept_YesSign_BILL	=  "1.2.410.200005.1.1.6.8|"
								;
							
  //sec_accept_cert:
  //ex) Delfino.setPolicyOidCertFilter(CERT_Accept_SEC)
  /*
  var CERT_Accept_SEC 			= "1.2.410.200005.1.1.1|"		//금결원,  개인, 상호연동
								+ "1.2.410.200005.1.1.5|"		//금결원,  법인, 상호연동
								+ "1.2.410.200004.5.2.1.2|"		//정보인증, 개인, 상호연동
								+ "1.2.410.200004.5.2.1.1|"		//정보인증, 법인, 상호연동
								+ "1.2.410.200004.5.1.1.7|"		//증권전산, 법인, 상호연동
								+ "1.2.410.200004.5.1.1.5|"		//증권전산, 개인, 상호연동
								+ "1.2.410.200004.5.1.1.9|"		//증권전산, 개인, 용도제한(개인)
								+ "1.2.410.200004.5.3.1.2|"		//전산원,   법인, 상호연동
								+ "1.2.410.200004.5.3.1.9|"		//전산원,   개인, 상호연동
								+ "1.2.410.200004.5.3.1.4|"		//전산원,   개인 , 용도제한(개인)
								+ "1.2.410.200004.5.4.1.1|"		//전자인증, 개인, 상호연동
								+ "1.2.410.200004.5.4.1.2|"		//전자인증, 법인, 상호연동
								+ "1.2.410.200012.1.1.3|"		//무역정보, 법인, 상호연동
								+ "1.2.410.200012.1.1.1|"		//무역정보, 개인, 상호연동
								+ "1.2.410.200004.5.1.1.7|"		//증권전산, 법인, 상호연동
								+ "1.2.410.200004.5.1.1.5|"		//증권전산, 개인, 상호연동
								+ "1.2.410.200004.5.1.1.9|"		//증권전산, 개인, 용도제한(개인)
								;
  */

  /** 
  * GPKI인증서 필터링 설정값
  * CERT_Accept_GPKI_IssuerDN
  * CERT_Accept_GPKI_OID
  */
  //ex) 
  // Delfino.setIssuerCertFilter(CERT_Accept_GPKI_IssuerDN);
  // Delfino.setPolicyOidCertFilter(CERT_Accept_GPKI_OID);

  // GPKI 구 CA-Test 인증서	
  var CERT_Accept_GPKI_IssuerDN_TEST = "CN=CA131000031T,OU=GPKI,O=Government of Korea,C=KR|";
  var CERT_Accept_GPKI_IssuerDN = 
	 "CN=Root CA,OU=GPKI,O=Government of Korea,C=KR|"	// GPKI ROOT 인증서
  	+"CN=GPKIRootCA,OU=GPKI,O=Government of Korea,C=KR|"  // GPKI ROOT 인증서
  	+"CN=GPKIRootCA1,OU=GPKI,O=Government of Korea,C=KR|" // GPKI ROOT 인증서 
  	// GPKI 구 CA인증서
  	+"CN=CA131000001,OU=GPKI,O=Government of Korea,C=KR|" // 행정안전부(행정부-기관용)
  	+"CN=CA131000002,OU=GPKI,O=Government of Korea,C=KR|" // 행정안전부(행정부-개인용)
  	+"CN=CA131000009,OU=GPKI,O=Government of Korea,C=KR|" // 행정안전부(공공금융-기관용)
  	+"CN=CA131000010,OU=GPKI,O=Government of Korea,C=KR|" // 행정안전부(공공금융-개인용)
  	+"CN=CA134040001,OU=GPKI,O=Government of Korea,C=KR|" // 교육과학기술부
  	+"CN=CA128000001,OU=GPKI,O=Government of Korea,C=KR|" // 대검찰청
  	+"CN=CA128000002,OU=GPKI,O=Government of Korea,C=KR|" // 대검찰청
  	+"CN=CA974000001,OU=GPKI,O=Government of Korea,C=KR|" // 대법원
  	+"CN=CA974000002,OU=GPKI,O=Government of Korea,C=KR|" // 대법원
  	+"CN=CA130000002,OU=GPKI,O=Government of Korea,C=KR|" // 병무청
  	+"CN=CA130000003,OU=GPKI,O=Government of Korea,C=KR|" // 병무청
  	// GPKI 신 CA인증서
  	+"CN=CA131100001,OU=GPKI,O=Government of Korea,C=KR|" // 행정안전부(행정부)
  	+"CN=CA131100002,OU=GPKI,O=Government of Korea,C=KR|" // 행정안전부(공공금융)
  	+"CN=CA134100031,OU=GPKI,O=Government of Korea,C=KR|" // 교육과학기술부
  	+"CN=CA128000032,OU=GPKI,O=Government of Korea,C=KR|" // 대검찰청
  	+"CN=CA128000031,OU=GPKI,O=Government of Korea,C=KR|" // 대검찰청
  	+"CN=CA974000031,OU=GPKI,O=Government of Korea,C=KR|" // 대법원
  	+"CN=CA130000031,OU=GPKI,O=Government of Korea,C=KR|" // 병무청
  	;

  var CERT_Accept_GPKI_OID = "1.2.410.100001.2.1|" // GPKI/기관용
  	+"1.2.410.100001.2.1.1|"	// GPKI/전자관인
  	+"1.2.410.100001.2.1.2|"	// GPKI/컴퓨터용
  	+"1.2.410.100001.2.1.3|"	// GPKI/특수목적용
  	+"1.2.410.100001.2.1.4|"	// GPKI/공공/민간 전자관인
  	+"1.2.410.100001.2.1.5|"	// GPKI/공공/민간 컴퓨터용
  	+"1.2.410.100001.2.1.6|"	// GPKI/공공/민간 특수목적용
  	+"1.2.410.100001.2.2|"		// GPKI/개인용
  	+"1.2.410.100001.2.2.1|"	// GPKI/공무원 전자서명
  	+"1.2.410.100001.2.2.2|"	// GPKI/공공/민간 개인용 전자서명
  	;
  
  /* if (_Delfino_SystemMode == "test") {
	  CERT_Accept_GPKI_IssuerDN += CERT_Accept_GPKI_IssuerDN_TEST;
  }*/

/*  
if (Delfino.getModule() == "G3") {
    DelfinoConfig.version_update = DelfinoConfig.version_g3;
    DelfinoConfig.version_senior = DelfinoConfig.version_g3;
}
*/
	if(window.location.hostname.indexOf("obank.kbstar.com") < 0)
	g4Astx.enable = false;
    
    if(DC_platformInfo.Mac || DC_platformInfo.Linux)
    g4Astx.enable = false;

