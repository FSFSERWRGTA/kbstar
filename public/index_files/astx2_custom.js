/**
 * (C) Copyright AhnLab, Inc.
 *
 * Any part of this source code can not be copied with
 * any method without prior written permission from
 * the author or authorized person.
 *
 * @version		$Revision: 14384 $
 *
 */

var $ASTX2_CUST =
{
	// ASTX2_CUST defined values
	URL_GET_INIT  : 101,
	URL_GET_CERT  : 102,
	URL_GET_STAMP : 103,
	URL_CHK_STAMP : 104,

	getURL: function(type)
	{
		var result = '';

		//<protocol>//<hostname>:<port>
		var url = window.location.protocol+'//'+window.location.hostname;
		url += (window.location.port ? ':'+window.location.port : '');

		var fileBaseURL = '/ocom/jsp/pav/ahnlab/';
		url += fileBaseURL;
		
		switch(type)
		{
			case this.URL_GET_INIT :
				result = url+'astx2_doGetInit.jsp';
			break;
			case this.URL_GET_CERT :
				result = url+'astx2_doGetCert.jsp';
			break;
			case this.URL_GET_STAMP :
				result = url+'astx2_doGetStamp.jsp';
			break;
			case this.URL_CHK_STAMP :
				result = url+'astx2_doChkStamp.jsp';
			break;
		} // end of switch

		return result;
	},

	isE2EObject: function(obj)
	{
		// Password Type 중 E2E예외 목록
	    var E2E_EXCEPTION_O = "SOCIALID1;SOCIALID2;SOCIALID3;SOCIALID4;SOCIALID5;SOCIALID6;SOCIALID7;SOCIALID8;SOCIALID9;"
        					+ "주민번호2;hpnum3;cardNum2;cardNum3;homenum3;officenum3;주민등록번호2;BrCphnNo03;SelrCphnNo03;"
        					+ "조회검증번호1;조회검증번호2;휴대폰라인번호;txt_hp3_id;전화번호3;팩스번호3;휴대폰번호3;중개업소폰번호3;";
		
	    var E2E_EXCEPTION = E2E_EXCEPTION_O.split(';');
	    var isNonE2E = false;
		
		//password 필드 자동 e2e
		if(obj) {
			if(obj.type == 'password') {
				for(var i=0;i<E2E_EXCEPTION.length;i++) {
					if(obj.name==E2E_EXCEPTION[i]) {
						return false;
					}
				}

				if(obj.getAttribute("e2e_type") < 0) {
					return false;
				}else{
					return true;
				}
			}
		}
		return false;
	},

	getE2Etype: function(obj)
	{
		return null;
	},

	getErrorMessage: function(errno)
	{
		var message = '';

		switch(errno)
		{
			case $ASTX2_CONST.ERROR_FAILED: //101
				message = "보안프로그램 통신 오류가 발생하였습니다. (안랩-"+errno+")\n브라우저를 새로고침하여 주세요.";
			break;
			case $ASTX2_CONST.ERROR_NOINIT: //102
				message = "보안프로그램 통신 오류가 발생하였습니다. (안랩-"+errno+")\n브라우저를 새로고침하여 주세요.";
			break; 
			case $ASTX2_CONST.ERROR_NOTINST: //103
				message = "보안프로그램이 설치되어 있지 않습니다. (안랩-"+errno+")\n통합보안프로그램(ASTx)을 재설치하시기 바랍니다";
			break;
			case $ASTX2_CONST.ERROR_NOTSUPPORTED: //104
				message = "맥,리눅스에서는 키보드보안이 지원되지 않습니다. (안랩-"+errno+")\n윈도우 OS를 사용하시도록 안내해 주시기 바랍니다.";
			break;
			case $ASTX2_CONST.ERROR_NOCONNECT: //105
				message = "통신이 원활하지 않습니다. (안랩-"+errno+")";
			break;
			case $ASTX2_CONST.ERROR_NCK: //106
				message = "키보드보안 프로그램이 정상동작하지 않습니다. (안랩-"+errno+")\n브라우저를 새로고침하여 주세요.";
			break;
			case $ASTX2_CONST.ERROR_ERR: //107
				message = "보안프로그램내부 오류가 발생하였습니다. (안랩-"+errno+")\n브라우저를 새로고침하여 주세요.";
			break;
			case $ASTX2_CONST.ERROR_NSP: //108
				message = "지원하지 않는 브라우저입니다. (안랩-"+errno+")\n통합보안프로그램 (ASTx) 는 IE, Edge, Chrome, FifeFox , Safari, Opera \n브라우저를 지원합니다.";
			break;
			case $ASTX2_CONST.ERROR_PARAM: //109
				message = "보안프로그램 내부 오류가 발생하였습니다. (안랩-"+errno+")\n브라우저를 새로고침하여 주세요.";
			break;
			case $ASTX2_CONST.ERROR_PARAM: //110
				message = "재시도 회수를 초과 하였습니다.(안랩-"+errno+")";
			break;
		} // end of switch

		return message;
	},

	errorAbort: function(errno)
	{
		alert(this.getErrorMessage(errno));
	}
};
