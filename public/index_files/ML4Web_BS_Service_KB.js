
//뱅크사인 모듈 로드
function loadML4Web_BS(){
	//로드를 하지 않았을 경우
	if(!$("#ML4Web_ez").is("*")){
		var ml4Html = ''
			+ '<div id="ML4Web_ez" style="display:none;">'
			+ '   <input type="hidden" id="ML_businessTypeCode" value="" />'
			+ '   <input type="hidden" id="ML_tabType" value="0" />'
			+ '   <input type="hidden" id="ML_originalText" value="" />'
			+ '   <input type="hidden" id="ML_originalMessage" value="" />'
			+ '   <input type="hidden" id="ML_signTyCd" value="01" />'
			+ '   <iframe id="ML4Web_BS" src="" class="ML_BS_frame" style="width:100%; height:100%;border:0;" frameborder="0" scrolling="no"></iframe>'
			+ '</div>';
		$("body").append(ml4Html);
		$("body").append('<link rel="stylesheet" type="text/css" href="/ocom/html5/blck/css/ML4Web_BS_style.css?20181018">');
		$("body").append('<script type="text/javascript" src="/ocom/html5/blck/js/ML4Web_BS_jquery.min.js?20181018"></script>');
		$("body").append('<script type="text/javascript" src="/ocom/html5/blck/js/ML4Web_BS_jquery-ui.min.js?20181018"></script>');
		$("body").append('<script type="text/javascript" src="/ocom/html5/blck/js/ML4Web_BS_Service.js?20181018"></script>');
		$("body").append('<script type="text/javascript" src="/ocom/html5/blck/js/ML4Web_BS_Config.js?20181018"></script>');
		
		//뱅크사인 팝업페이지 설정
//		ml4web_service.iframeUrl = "/ocom/html5/blck/ML4Web_BS.html";
		
		//팝업오픈이 정상적으로 수행시 호출할 메소드
		ml4web_service.ML_checkInit_Callback = function(check,type){
			ml4web_service.ML_Init_Check = check;
			ml4web_service.tabType = type;
		};
		
		//서버에서 리턴되는 데이터의 형태가 아래의 형태와 같지 않은 경우 ml4web_service.ML_HttpCallback 함수에서  data값을 변형하여 callback 처리 필요
		//아래의 ml4web_service.ML_HttpCallback 함수의 두번째 파라미터인 data가 서버에서 리턴된 데이터임.
		//{"responseCode" :"0000","responseMessage" :"SUCCESS","tid" :"aasdf","encQrInfo" :"MDEyMDk2My","pushCertificationNumber" :"7777","certificationNumber" :"777733"}
		ml4web_service.ML_HttpCallback = function (code,data,callback){
			
			/* 아래의 예제 소스는 Kbank에서 리턴되는 데이터를 예제로 작성.
			 * var orgData = JSON.parse(ML4Web_BS$.trim(data));   //리턴된 데이터를 JSON 객체로 파씽 후 value 획득
			 * var returnData = JSON.stringify(orgData._msg_);    //획득한 value 를 JSON string으로 파싱
			 * 
			 */
			var returnData = ML4Web_BS$.trim(data);
			callback(code, returnData);
		}
		
	}
}


//KB뱅크사인 전자서명시 사용할 펑션 delfino_kb.js 에서 호출
function blckDigiSign(keys, values, formats, delimeter, signCallback) {
	
	var signTyCd = "01";
	var bussinessType = "03";
	
	var originalTextBuffer = "";
	var userConfirmFormat = "";
//  var originalMessageTotalJson = [];
//	var originalMessageJson = {};
    var originalMessage = "";
    
    //값과 키와 구분자가 없으면 오류처리
	if(!keys || !values || !delimeter ){
		alert( "입력데이터가 장상적으로 입력 되지 않았습니다.");
		return
	}
	//키
	var blckDigiSignKeysArr 	= keys.split(delimeter);	
	//원문
	var blckDigiSignValuesArr 	= values.split(delimeter);	
	//labels
	var blckDigiSignFormatsArr	= formats.split(delimeter); 
	
	//라벨이 없으면 Key로 대체
	if(!formats || formats.length == 0){
		blckDigiSignFormatsArr = blckDigiSignKeysArr; 
	}
	
	//값보다 키가 작으면 오류처리
	if( blckDigiSignValuesArr.length == 0 
		|| blckDigiSignValuesArr.length > blckDigiSignFormatsArr.length
	){
		alert("입력데이터가 장상적으로 입력 되지 않았습니다.");
		return false;
	}
	
	//전자서명 값 생성
	originalMessage +='<style type="text/css">';
	originalMessage +='.tbl_view01 {clear:both;border:1px solid #ccc;border-radius:3px;overflow:hidden;}';
	originalMessage +='.tbl_view01 table {width:100%;border-spacing:0;border-collapse:collapse;font-size:13px;font-family:Droid Sans,Roboto,AppleSDGothicNeo,Sans-serif;color:#333;}';
	originalMessage +='.tbl_view01 caption{visibility:hidden;width:0;height:0;line-height:0;font-size:1px;overflow:hidden;}';
	originalMessage +='.tbl_view01 th {padding:10px 8px;color:#454545;font-weight:normal;text-align:left;border-top:1px solid #ccc;background:#f2f2f2;}';
	originalMessage +='.tbl_view01 td {padding:10px 8px;color:#333;text-align:left;border-top:1px solid #ccc;background:#fff;}';
	originalMessage +='.tbl_view01 tr:first-child th {border-top:0;border-radius:3px 0 0 0;}';
	originalMessage +='.tbl_view01 tr:first-child td {border-top:0;border-radius:0 3px 0 0;}';
	originalMessage +='.tbl_view01 tr:last-child th {border-radius:0 0 0 3px;}';
	originalMessage +='.tbl_view01 tr:last-child td {border-radius:0 0 3px 0;}';
	originalMessage +='</style>';
	
	originalMessage +='<div class="tbl_view01">';
	originalMessage +='<table class="tbl_view01">';
	originalMessage +='<caption>전자서명 상세</caption>';
	originalMessage +='<colgroup>';
	originalMessage +='<col style="width:43%">';
	originalMessage +='<col>';
	originalMessage +='</colgroup>';
	originalMessage +='<tbody>';
	for(var i = 0; i < blckDigiSignValuesArr.length; i++){
//        originalMessageJson[blckDigiSignFormatsArr[i]] = blckDigiSignValuesArr[i];
		originalMessage += "<tr>";
		originalMessage += "<th>" + (blckDigiSignFormatsArr[i] || '') + "</th>";
		originalMessage += "<td>" + (blckDigiSignValuesArr[i] || '') + "</td>";
		originalMessage += "</tr>";
        if(i > 0){
        	originalTextBuffer += "&";
        	userConfirmFormat += "&";
        }
        originalTextBuffer += encodeURIComponent(blckDigiSignKeysArr[i]);
        originalTextBuffer += "=";
        originalTextBuffer += encodeURIComponent(blckDigiSignValuesArr[i]);
        
        userConfirmFormat += encodeURIComponent(blckDigiSignKeysArr[i]);
        userConfirmFormat += "=";
        userConfirmFormat += encodeURIComponent(blckDigiSignFormatsArr[i]);
	}
	originalMessage +="</tbody>";
	originalMessage +="</table>";
	originalMessage +='</div>';
	
	originalTextBuffer += "&__USER_CONFIRM_FORMAT=" + encodeURIComponent(userConfirmFormat.toString());
//    originalMessageTotalJson.push(originalMessageJson);
    
    //콜백메소드 생성
    var blckSignCallback = function (code,data){
    	signCallback(data.signDoc, "");
    };
//    blckOpenBankSign(bussinessType, originalTextBuffer, JSON.stringify(originalMessageTotalJson), signTyCd, blckSignCallback);
    blckOpenBankSign(bussinessType, originalTextBuffer, originalMessage, signTyCd, blckSignCallback);
    
    
}

//뱅크사인 전자서명 호출( 로그인, 전자서명시 사용)
function blckOpenBankSign(bussinessType, originalTextBuffer, riginalMessageTotal, signTyCd, runFun){
	
	//솔루션 업체에서 제공한 인터페이스인 input 박스에 데이터 설정
	$("#ML_businessTypeCode").val(bussinessType);
    $("#ML_originalText").val(originalTextBuffer);
    $("#ML_originalMessage").val(riginalMessageTotal);
    $("#ML_signTyCd").val(signTyCd);
    
    //위에 선언된 값을 읽지 않아 수동으로 데이터 읽음.
    ml4web_service.businessTypeCode = document.getElementById("ML_businessTypeCode").value;
	ml4web_service.tabType = document.getElementById("ML_tabType").value;
	ml4web_service.originalText = document.getElementById("ML_originalText").value;
	ml4web_service.originalMessage = document.getElementById("ML_originalMessage").value;
	ml4web_service.signTyCd = document.getElementById("ML_signTyCd").value;
    
    //콜백메소드 
	var userML4Web_callback = $.isFunction(runFun) ? runFun : window[runFun];
    
	//콜백메소드 부재시 오류 발생
	if(!userML4Web_callback){
		alert("입력데이터에 오류가 발생하였습니다. 관리자에게 문의해주시기 바랍니다.");
		return false;
	}
	
	//콜백메소드를 호출하는 평선 선언
	var customML4Web_callback = function customML4Web_callback(code,sdata){
		//JSON 으로 변경
		var data  = JSON.parse(sdata);
		
		//submit으로 페이지 이동하는 버그가 있어 별도의 스레드로 처리
		setTimeout(function(){
			//콜백메소드 호출
			userML4Web_callback(code,data);
	   	},100);
	
	    return false;
	};
	
	ml4web_service.ML_Callback = customML4Web_callback;
	openBankSign();
    
}
