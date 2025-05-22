/*******************************************************************************
*@ 서비스명     : [KB국민인증서(기업)] 공통 js
*@ JS NAME      : /ocom/js/cert/KbCrtfiCorpCert.js
*@ JS 작성자    : S022417
*@ 작성일       : 2024-01-09
********************************************************************************
번호  날짜/시        작성자     확인자     변경내역
********************************************************************************
*1    2024-01-09     S022417               최초작성        
*******************************************************************************/

var _POPUP_IFRAME_DIV_ID = 'popupKbCrtfiCorp';

var KBCrtfiCorp = {};

KBCrtfiCorp.isEventListenerCheck = false;

/**
 * 환경에 따른 화면설정
 * @param actionType 호출유형
 */
KBCrtfiCorp.initPage = function(actionType) {
    var domain = "";
    var pagecd = "";
    
    var ua = window.navigator.userAgent;
    var isIE = /MSIE|Trident/.test(ua);
    
    if(isIE){
        alert(KBCrtfiCorp.returnInfo["903"]);
        return;
    }
    
    switch(_SITE_QUICS_MODE) {
        case "DQ" :
            domain = "https://zcert.kbstar.com";
            break;
        case "TQ" :
            domain = "https://ycert.kbstar.com";
            break;
        case "RQ" :
            domain = "https://cert.kbstar.com";
            break;
    }
    
    if(domain) {
        
        switch(actionType) {
            case "login" :
                pagecd = "C111127";
                break;
            case "certn" :
                pagecd = "C111127";
                break;
            case "sign" :
                pagecd = "C111128";
                break;
            case "issue" :
                pagecd = "C111135";
                break;
        }
        
        // 정상 환경
        var quicsInfo = "/quics?page="+pagecd+"&QSL=F&";
        var reqDomain = domain + quicsInfo;    
        
        KBCrtfiCorp.initPageWeb(reqDomain, domain, actionType);
        
        
    } else {
        
        // 잘못된 환경세팅
        var rtnJSON = {};
        var 응답코드 = "999";
        rtnJSON.응답코드 = 응답코드;
        rtnJSON.응답메시지 = KBCrtfiCorp.returnInfo[응답코드];
        
       // 콜백네임이 function 
        if (typeof KBCrtfiCorp.callback === 'function') {
            KBCrtfiCorp.callback(rtnJSON);  
        }else{
            if(window[KBCrtfiCorp.callback]) {
                window[KBCrtfiCorp.callback](rtnJSON);
            }else{
                console.log('error');
            }    
        }
    }
}

/**
 * 웹 접근
 * @param domain 도메인
 * @param actionType 호출유형
 */
KBCrtfiCorp.initPageWeb = function(reqDomain, domain, actionType) {
    // 새창 전달 파라미터 생성 및 호출
    var reqParams = {}
    reqParams.type         = actionType;
    reqParams.origin       = location.origin;
    
    for(obj in KBCrtfiCorp.param){
        var key = obj;
        var data = KBCrtfiCorp.param[obj];
        
        reqParams[key] = data;
    }
    
    // 1.I-FRAME 부르기전 세션복제
    sessionAajx('1', function(){
        KBCrtfiCorp.iFrameShow(_POPUP_IFRAME_DIV_ID, caq.util.encodeURI(reqDomain), reqParams,"", 750, 610);
    });
     
    // 응답
    if(!KBCrtfiCorp.isEventListenerCheck) {
        
        // 새창 결과 응답
        window.KbCrtfiCorpWebListener = function(e){
            
            if(e.origin !== domain){
                console.error('허용되지 않은 도메인');
                window.caq.popup.iFrameHideFocus(_POPUP_IFRAME_DIV_ID);
                return;
            }
            
            if(actionType =="login"){
                sessionAajx('3', function(){
                    window.caq.popup.iFrameHideFocus(_POPUP_IFRAME_DIV_ID);
                    
                    // 콜백함수 호출
                    if(typeof KBCrtfiCorp.callback === 'function'){
                        KBCrtfiCorp.callback(e.data);    
                    }else{
                        window[KBCrtfiCorp.callback](e.data);
                    }
                    
                    window.removeEventListener("message", window.KbCrtfiCorpWebListener);
                    KBCrtfiCorp.isEventListenerCheck = false;
                });    
            }else{
                sessionAajx('2', function(){
                    window.caq.popup.iFrameHideFocus(_POPUP_IFRAME_DIV_ID);
                    
                    if(actionType =="sign"){
                        
                        if(e.data.data != undefined && $.trim(e.data.data.전자서명내용) != ''){
                            var pkcs7 = $.trim(e.data.data.전자서명내용);
                            $("input[name='signed_msg']").val(pkcs7);
                        }
                        
                    }
                    
                    // 콜백함수 호출
                    if(typeof KBCrtfiCorp.callback === 'function'){
                        KBCrtfiCorp.callback(e.data);    
                    }else{
                        window[KBCrtfiCorp.callback](e.data);
                    }
                    
                    window.removeEventListener("message", window.KbCrtfiCorpWebListener);
                    KBCrtfiCorp.isEventListenerCheck = false;
                }); 
            }
        }
        
        window.addEventListener("message", window.KbCrtfiCorpWebListener);
        KBCrtfiCorp.isEventListenerCheck = true;
    }
}

/**
 * KB국민인증서(기업) 로그인
 * @param callback 콜백함수
 * @param signPlanText 전자서명
 */
KBCrtfiCorp.login = function(callback, signPlanText ) {
    KBCrtfiCorp.callback = callback;
    KBCrtfiCorp.param = {
            param_nonce : signPlanText
            , actionType : "login"
    }
    
    KBCrtfiCorp.initPage("login");
};

/**
 * KB국민인증서(기업) 인증
 * @param callback 콜백함수
 * @param signPlanText 전자서명
 */
KBCrtfiCorp.certn = function(callback, signPlanText ) {
    KBCrtfiCorp.callback = callback;
    KBCrtfiCorp.param = {
            param_nonce : signPlanText
            , actionType : "certn"
    }
    
    KBCrtfiCorp.initPage("certn");
};

/**
 * KB국민인증서(기업) 발급
 * @param callback  : 콜백함수
 * @param option    : option
 */

KBCrtfiCorp.issue = function(option, callback ) {
    KBCrtfiCorp.callback = callback;
    KBCrtfiCorp.param = option; 
    
    KBCrtfiCorp.initPage("issue");
};

/**
 * KB국민인증서(기업) 전자서명
 * @param mode 호출환경(DQ/TQ/RQ)
 * @param signPlanText 전자서명값
 * @param callback 콜백함수
 */
KBCrtfiCorp.sign = function(callback, keys, values, formats, delimeter) {
    KBCrtfiCorp.callback = callback;
    KBCrtfiCorp.param = {
            전자서명원문 : KBCrtfiCorp.sign_makeValue(keys, values, formats, delimeter)
    }

    KBCrtfiCorp.initPage("sign");
};

KBCrtfiCorp.sign_makeValue = function(keys, values, formats, delimeter) {
    
    //값과 키와 구분자가 없으면 오류처리
    if(!keys || !values || !delimeter ){
        var rtnJSON = {};
        var 응답코드 = "100";
        rtnJSON.응답코드 = 응답코드;
        rtnJSON.응답메시지 = KBCrtfiCorp.returnInfo[응답코드];
        KBCrtfiCorp.callback && KBCrtfiCorp.callback(rtnJSON);
        
        return;
    }

    var keyArray = keys.split(delimeter);       
    var valueArray = values.split(delimeter);
    
    var formatArray = null;
    if(formats!=null && formats.length>0){
        formatArray = formats.split(delimeter);
    } 
    
    var data = "";
    var format = "";
    for(var i=0; i< keyArray.length; i++){
        if(data.length>0){
            data += "&";
        }
        data += encodeURIComponent(keyArray[i]);
        data += "=";
        data += encodeURIComponent(valueArray[i]);
        
        if(format.length>0){
            format += "&";
        }            
        if (formatArray!=null) {
         
            format += encodeURIComponent(keyArray[i]);
            format += "=";
            format += encodeURIComponent(formatArray[i]);
        }
    }
    
    if(format.length>0){  
        data = data + "&" + "__USER_CONFIRM_FORMAT=" + encodeURIComponent(format);
    }
    
    return data;
}

/**
 * KBCrtfiCorp_iFrameShow: KB국민인증서(기업) 로그인 화면을 그리는 함수
 * @param objId : popupKbCrtfiCorp ID명
 * @param url   : url주소(param 값 포함)
 * @param nextObjId : default ""
 * @param sWidth    : 넓이
 * @param sHeight   : 높이
 */
KBCrtfiCorp.iFrameShow = function(objId,url,param,nextObjId,sWidth,sHeight,sZindex){ 
    _NEXT_TARGET_OBJID = nextObjId;
    sWidth  = (sWidth  === undefined) ? 750   : sWidth;
    sHeight = (sHeight === undefined) ? 610   : sHeight;
    sZindex = (sZindex === undefined) ? 10003 : sZindex;
    var iframeDiv  = "<div id='"+objId+"' style='display:none;background:transparent;'>";
        iframeDiv += "  <iframe src='javascript:false;' id='"+objId+"-Iframe' name='"+objId+"-Iframe' frameborder='0' style='width:100%;height:100%;'></iframe>";
        iframeDiv += "</div>";  
    $("body").append(iframeDiv);
    
    var targetObj = $("#"+objId);
    targetObj.attr("name",objId);
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
    
    KBCrtfiCorp.iFrameSubmit(url, objId+"-Iframe", param);
}


KBCrtfiCorp.iFrameSubmit = function(url, target, param){
    var tempStr    = decodeURI(url);
    var sUrl       = tempStr;
    var sParams    = param;
    var tempFrm  = "<form name='_FORM_"+target+"' id='_FORM_"+target+"' method='post' action='' target='"+target+"'>";
        tempFrm += paramsToInput(sParams);
        tempFrm += "</form>";
    $("body").append(tempFrm);
    
    if($("#_FORM_"+target+" #page").is("input")){
        sUrl = sUrl +"?page="+ $("#_FORM_"+target+" #page").val();
        $("#_FORM_"+target+" #page").remove();
    }
    $("#_FORM_"+target).attr("action",sUrl);
    $("#_FORM_"+target).submit();
    $("#_FORM_"+target).remove();
}

function paramsToInput(params){
    var returnHtml = "";
    
    for(param in params){
        var key = param;
        var data = params[param];
        data = data || "";
        if(!(key===undefined || data===undefined)){
            returnHtml += '<input type="hidden" name="'+key+'" id="'+key+'" value="'+data+'"/>\n';
        }
    }
    return returnHtml;
}

function sessionAajx(gubun, fnCallback){
    
    if(gubun){
        var newForm    = $("<form></form>");
        newForm.attr("charset", "UTF-8").attr("method", "post");
        newForm.append($("<input/>", {type:"hidden", name:"세션업무구분", value:gubun}));
        
        $.ajax({
            type: 'POST',
            url: "/quics?QAction=1188564&Rtype=json",
            contentType : "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            data: newForm.serialize(),
            async: false,
            success: function(data) {
                console.debug(data);
                fnCallback(data);
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
}


/** 
 * KB국민인증서(기업) 응답코드정보
 */
KBCrtfiCorp.returnInfo = {
        "000" : "정상",

        "100" : "필수값이 누락되었습니다.",
        "101" : "전자서명값이 누락되었습니다.",
        
        "200" : "취소되었습니다..",
        "201" : "장시간 미사용으로 종료되었습니다.",
        
        "900" : "잘못된 환경정보입니다.",
        "901" : "발급가능한 기기가 아닙니다.",
        "902" : "조회 가능한 인증서가 없습니다. 인증서를 발급해주시기 바랍니다.",
        "903" : "MS 인터넷익스플로러(IE) 브라우저 지원이 2022년 6월 15일 종료됨에 따라 안전하고 원활한 서비스 접속을 위해 구글 크롬 브라우저 또는 MS 엣지 브라우저를 이용해주세요.",
            
        "999" : "시스템 오류입니다. 다시 한번 시도해 주시기 바랍니다."
}

window.KBCrtfiCorp = KBCrtfiCorp;