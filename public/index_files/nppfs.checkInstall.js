/**
 * 전자금융홈페이지 가상키패드 업그레이드
 * @date 2018.03.09.
 * @author T003980
 */

/**
 * 키패드 공통 이벤트 처리 
 */
//키패드 상단 X 버튼 클릭해서 close했을 때 check box는 check값 그대로
nosQuery(document).on("nppfs-npv-closed", function(event){
	$("input[name="+event.name+"]").closest('td').find("[type=checkbox]").attr("checked", true);
});


//화면 이동 시 키패드 hide
var npPfsExtension = new function() {
	this.beforeFinalize = function(event) {
		$(".nppfs-keypad-div").hide();
	};
};


/**
 * [isInstallCheck_ASTx] 키보드보안모듈 설치 확인 및 키패드 구동 함수
 * 	interval : 함수실행 인터벌 숫자 입력	//DEFAULT : 0
 *  form : form네임명 						//DEFAULT : document.IBF
 *  loginFlag : 키패드강제 세팅여부			//DEFAULT : NULL
 *  keypadOption : NOS 키패드 옵션			//DEFAULT : NULL
 *  사용 예시 ---> isInstallCheck_ASTx(0, "cert_form", true, keypadOption)
 */
function isInstallCheck_ASTx(interval, formName, isMobile, keypadOption) {
	keypadOption = typeof keypadOption != "undefined" ? [false, false, false, true] : keypadOption;
	var form = (typeof formName != "undefined") ? eval("document." + formName) : document.IBF;

	/* 키패드init 함수가 호출될 경우-> 신/구 키패드 사용 여부를 구분하기 위한 필드 추가 */
	var NOSEncryptInput = document.createElement('input');
	NOSEncryptInput.type = 'hidden';
	NOSEncryptInput.name = 'NOSEncrypt';
	NOSEncryptInput.value = 'Y';
	form.appendChild(NOSEncryptInput);
	
	//신키패드 init되면 구키패드 함수 override
	if(typeof vKpd != "undefined") {
		vKpd.hideAll = function(){
			$(".nppfs-keypad-div").hide();
		};
	}

	if(!_getParam(isMobile, false)) {
		var mode = $ASTX2_KB.getSecureMode();		
		setTimeout(function() {
			if("ACTIVEX" == mode){ checkFailure_ASTx(); }
			else if(null == mode){
				if (typeof ($ASTX2) == "undefined" || typeof ($ASTX2.init) != "function") {
					alert("[Warning][ASTx] Not installCheck function. Please include the file");
					return;
				}
				var ck = _getParam($_astxu.getCookie("kpdCd"),"");
				if("" != ck && "0" != ck){
					checkFailure_ASTx();
				}else{ 
					$ASTX2.init(checkSuccess_ASTx, checkFailure_ASTx); 
					//npVCtrl.isAbsoluteUse = function() { return false; }; 
				}}
			else{ checkSuccess_ASTx(); } 
		
			nosQuery(document).ready(function() {
				if(npPfsCtrl.IsSupport()){
					npPfsStartup(form, false, false, false, true, "npkencrypt", "on");
				}else{
					alert("보안프로그램을 지원하지 않는 환경입니다.");
				}
			});
		}, _getParam(interval, 0));
	}else{ // isMobile
		nosQuery(document).ready(function() {
			if(npPfsCtrl.IsSupport()){
				npPfsStartup(form, false, false, false, true, "npkencrypt", "on");
				checkFailure_ASTx();
			}else{
				alert("보안프로그램을 지원하지 않는 환경입니다.");
			}
		});
	}
}

/**
 *  loginFlag 에 따른 키패드 강제 구동여부
 *  정의 안될 경우 default pc 환경
 */
function checkSuccess_ASTx() {
	if(null == $ASTX2_KB.getSecureMode()) $ASTX2_KB.setSecureMode("ASTX2");
	npVCtrl.isAbsoluteUse = function() { return false; }; //강제 사용 해제 
	var name = $('#frmAstxInstallCheck').attr('name');
	if(name == undefined) createAstxForm(0);	
	$(".nProtectUseYn").attr("checked", false);	
	$_astxu.set_cookie("kpdCd",$ASTX2_CONST.ERROR_SUCCESS);
}
function checkFailure_ASTx() { 		
	if("ACTIVEX" != $ASTX2_KB.getSecureMode()) $ASTX2_KB.setSecureMode("ACTIVEX");
	npVCtrl.isAbsoluteUse = function(){ return true; }; //강제 사용
	var err = $ASTX2.getLastError();
	if(err == "0") $ASTX2.setLastError($ASTX2_CONST.ERROR_NOTINST);
	//createAstxForm($ASTX2.getLastError());
	$(".nProtectUseYn").attr("checked", true);
	$(".nProtectUseYn").val("Y");
	$_astxu.set_cookie("kpdCd",$ASTX2.getLastError());
	if(_SITE_SystemLang != "KOR") N.m88 = "When the keyboard security module is in an unsupported environment, you must use the virtual keypad"; 
}

function createAstxForm(val) {
	var html = "";
	html+= "<form id=\"frmAstxInstallCheck\" name=\"frmAstxInstallCheck\" method=\"post\" action=\"/quics?QAction=732637&RType=json\">";
	html+= "<input type=\"hidden\" id=\"astxInstallCheck\" name=\"astxInstallCheck\" value=\""+val+"\" />";
	html+= "</form>";
	
	var body = document.getElementsByTagName("body")[0];
	var div = document.createElement("div");
	div.id = "astx_div";
	div.name = "astx_div";
	div.style.position = "absolute";
	div.style.left = "-1";
	div.style.top = "-1";
	div.style.width = "0";
	div.style.height = "0";

	div.innerHTML = html;
	body.appendChild(div);
	
	var frm = document.getElementById('frmAstxInstallCheck');
	var callback = 'astxInstallCheckCallback_install';
	doAjaxAction(frm,callback,false);
}
function astxInstallCheckCallback_install(data){
//	alert(data.msg.servicedata.resultCode);
}

function _getParam(_obj, _defaultVal){
	if(typeof _obj != "undefined"){
		return _obj;
	}else{
		return _defaultVal;
	}
}