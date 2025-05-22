/*
 * KB모바일인증서 연동로그인/연동인증 전용 js
 */
var kbsignCertObj = new Object();
var kbsing_successCallback = "";
var kbsing_failCallback = "";
var kbsign_electCertn; //KB모바일인증서 변수 

 
/**
 * kbSignRelayLoginPrcss(oLoginReq_V.jsp 에서 호출하는 KB모바일연동로그인 인증 팝업 호출
 * 
 * @param nonce   : nonce 값
 * @param certType :  K1: 핀, K2: 패턴, K3: 생체
 * @param successCallback : 성공 callback
 * @param failCallback : 실패 callback
 */ 
function kbSignRelayLoginPrcss (nonce , certType, successCallback, failCallback) {
    
    // 입력받은 K1,K2,K3 값을 KB모바일인증서에서 취급하는 값으로 변환(1: 간편비밀번호, 2: 생체 또는 패턴, 3: 패턴, 4: 생체 또는 핀, 5: 생체 값)
    // K1 = 1, K2 = 3, K3 =5
    /*
    var _certType = "";
    if(certType == "K1") _certType = "1";
    else if(certType == "K2") _certType = "3";
    else if(certType == "K3") _certType = "5";
    */

    kbsing_successCallback = successCallback;
    kbsing_failCallback = failCallback;
	//호출 값 세팅
	var openUrl = "/quics?page=C065563&QLS=F";
	//var openUrl = "/quics?page=C027330&QLS=F";
	
	var param	= "&param_nonce="+nonce+"&cert_type="+certType;
	    param  += "&successCallback=kbSignRelaySuccessCallback&failCallback=kbSignRelayFailCallback";
	    //param  += "&successCallback="+successCallback+"&failCallback="+failCallback;
	
	//Layer popup 호출
	kbSign_iFrameShow("popupKbSignRelay",caq.util.encodeURI(openUrl+param),"",580,550);   
}

function kbSignDigiSign (keys, values, formats, delimeter, successCallback) {
	
    //값과 키와 구분자가 없으면 오류처리
	if(!keys || !values || !delimeter ){
		alert( "입력데이터가 장상적으로 입력 되지 않았습니다.");
		return
	}

	var keyArray = keys.split(delimeter);		
	var valueArray = values.split(delimeter);
	
	var formatArray = null;
	if(formats!=null && formats.length>0){
		formatArray = formats.split(delimeter);
	} 
	
	var data = "";
	var format = "";
	//for(var i=0; i<keyArray.length; i++){ 
	for(var i=0; i< keyArray.length; i++){
		if(data.length>0){
			data += "&";
		}
		//data += encodeURIComponent(keyArray[i]);
		data += encodeURIComponent(keyArray[i]);
		data += "=";
		data += encodeURIComponent(valueArray[i]);
		
		if(format.length>0){
			format += "&";
		}			 
		if (formatArray!=null) {
		 
			format += encodeURIComponent(keyArray[i]);
			//format += keyArray[i];
			format += "=";
			format += encodeURIComponent(formatArray[i]);
		}
		//console.log("data["+i+"]:"+data);
	}
	
	if(format.length>0){  
		//data = "&__electCertn="+encodeURIComponent(data)+","+encodeURIComponent(format);
		kbsign_electCertn = data+","+format;
	}
    
    kbsing_successCallback = successCallback;

	//호출 값 세팅(oKbSignCertnPop_V.jsp)
	var openUrl = "/quics?page=C065597&QLS=F";
	var param	= "&cert_type=K1&flag=T";
	    param  += "&successCallback=kbSignCmnRelaySuccessCallback&failCallback=kbSignFailCallback";
	    //param  += data;
	
	//Layer popup 호출
	kbSign_iFrameShow("popupKbSignRelay",caq.util.encodeURI(openUrl+param),"",580,550 , 10003);   
} 

function kbSignCertn(certType, successCallback, failCallback){
	

	var openUrl = "/quics?page=C065597&QLS=F&cc=b066511:b066478"; 

	var param	= "&cert_type="+certType+"&flag=C";
	    param  += "&successCallback="+successCallback+"&failCallback="+failCallback;
	
	//Layer popup 호출
	kbSign_iFrameShow("popupKbSignRelay",caq.util.encodeURI(openUrl+param),"",580,580 , 10003);
	
	
}

function kbSignCertnRelaySuccessCallback(data){
   	setTimeout(function(){
    if($("#popupKbSignRelay").html() == null) {
    	
    	var _kbsing_successCallback = kbsing_successCallback;
    	 
    	kbsing_successCallback = "";
    	kbsing_failCallback = "";
       
  		if(window[_kbsing_successCallback]) window[_kbsing_successCallback](data);
        }else kbSignCertnRelaySuccessCallback(data);
    
   	}, 300);

}


function kbSignRelaySuccessCallback(data){

  	     	setTimeout(function(){
            if($("#popupKbSignRelay").html() == null) {
            	var token = data.msg.servicedata.단말푸쉬토큰내용;
            	var certnMsg = data.msg.servicedata.전자서명내용;
            	var certnWay = data.msg.servicedata.인증방법;
            	
            	var _kbsing_successCallback = kbsing_successCallback;
            	var _kbsing_failCallback = kbsing_failCallback; 
            	kbsing_successCallback = "";
            	kbsing_failCallback = "";
               
            	
            	Delfino.setModule(certnWay); 
            	Delfino_createCookie("delfino.recentModule", certnWay);
            	
          		if(window[_kbsing_successCallback]) window[_kbsing_successCallback](data);
                }else kbSignRelaySuccessCallback(data);
            
  	     	}, 300);
  
}

function kbSignRelayFailCallback(data){
	//TODO.tobeDELETED 
  var _kbsing_successCallback = kbsing_successCallback;
  var _kbsing_failCallback = kbsing_failCallback;
  kbsing_successCallback = "";
  kbsing_failCallback = "";
	if(window[_kbsing_failCallback]) window[_kbsing_failCallback](data);
}

function kbSignCmnRelaySuccessCallback(data){
	
   	setTimeout(function(){
    if($("#popupKbSignRelay").html() == null) {
    	 
    	$("input[name='signed_msg']").val(data.msg.servicedata.전자서명내용);
    	var _kbsing_successCallback = kbsing_successCallback;
    	var _kbsing_failCallback = kbsing_failCallback; 
    	kbsing_successCallback = "";
    	kbsing_failCallback = "";
       
	    	if(window[_kbsing_successCallback]) window[_kbsing_successCallback]();
	  		else alert("콜백 함수 " + _kbsing_successCallback + "가 존재하지 않습니다.");
    	
    }else kbSignCmnRelaySuccessCallback(data);
    }, 300);


}


/**
 * kbSign_iFrameShow: KB연동로그인 relay 화면을 그리는 함수
 * @param objId : popupKbSignRelayLogin ID명
 * @param url   : url주소(param 값 포함)
 * @param nextObjId : default ""
 * @param sWidth    : 넓이
 * @param sHeight   : 높이
 */
function kbSign_iFrameShow(objId,url,nextObjId,sWidth,sHeight,sZindex){ 
	
    _NEXT_TARGET_OBJID = nextObjId;
    sWidth  = (sWidth  === undefined) ? 550   : sWidth;
    sHeight = (sHeight === undefined) ? 550   : sHeight;
    sZindex = (sZindex === undefined) ? 10003 : sZindex;
    var iframeDiv  = "<div id='"+objId+"' style='display:none;background:transparent;'>";
        iframeDiv += "  <iframe src='javascript:false;' id='"+objId+"-Iframe' name='"+objId+"-Iframe' frameborder='0' style='width:100%;height:100%;'></iframe>";
        //iframeDiv += "  <input type='hidden' name='_kbsign_electCertn' id='_kbsign_electCertn'>"+kbsign_electCertn+"</input>";
        iframeDiv += "</div>";  
    $("body").append(iframeDiv);
    if($.browser.msie && $.browser.version=="6.0"){
      caq.popup.iFrameSubmit(url,objId+"-Iframe");
    }else{
      $("#"+objId).find("iframe").attr("src",url);
    }
    var targetObj = $("#"+objId);
    targetObj.attr("name",objId);
    targetObj.val(kbsign_electCertn);
    targetObj.dialog({
      width:sWidth, height:sHeight,
      modal:true, zIndex:sZindex,
      resizable:false, bgiframe:true,
      closeOnEscape:false,
      open: function(event, ui) {
        targetObj.prev().hide();
        targetObj.parent().css({"overflow":"hidden","padding":"0px","border":"0px solid #806c5d","background":"transparent"});
        targetObj.css({"width":sWidth,"height":sHeight,"overflow":"hidden","padding":"0px","border":"0px"});
      }
    });
  }

