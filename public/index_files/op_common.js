//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 파일업로드/다운로드 자바스크립트
// * 소  속 : 업무공통팀
// * 작성일 : 2011-08-09
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------

  /**
   * OpenFileUpload(sFormId, sDomainCode, sSiteCode, sFixedCode, sSecurityCode)
   * @param {Object} sFormId
   * @param {Object} sDomainCode
   * @param {Object} sSiteCode
   * @param {Object} sFixedCode
   * @param {Object} sSecurityCode
   */
  function OpenFileUpload(sFormId, sDomainCode, sSiteCode, sFixedCode, sSecurityCode){
    var form_action = $("#" + sFormId).attr("action");
    OpenFileUploadUrl(sFormId, form_action, sDomainCode, sSiteCode, sFixedCode, sSecurityCode);
  }

  /**
   * OpenFileUploadUrl(sFormId, form_action, sDomainCode, sSiteCode, sFixedCode, sSecurityCode)
   * @param {Object} sFormId
   * @param {Object} form_action
   * @param {Object} sDomainCode
   * @param {Object} sSiteCode
   * @param {Object} sFixedCode
   * @param {Object} sSecurityCode
   */
  function OpenFileUploadUrl(sFormId, form_action, sDomainCode, sSiteCode, sFixedCode, sSecurityCode){
    if(sSecurityCode === undefined || sSecurityCode =="" || sSecurityCode == null) sSecurityCode = 'Y';
    var frmObj = $("#" + sFormId);
    frmObj.find("[name='_DOMAIN_CODE']").remove();
    frmObj.find("[name='_SITE_CODE']").remove();
    frmObj.find("[name='_SECURITY_CODE']").remove();
    frmObj.find("[name='_FIXED_CODE']").remove();
    frmObj.find("[name='_LANG_TYPE']").remove();
    var fileHtml  = '<input type="hidden" name="_DOMAIN_CODE"   id="_DOMAIN_CODE"/>';
        fileHtml += '<input type="hidden" name="_SITE_CODE"     id="_SITE_CODE"/>';
        fileHtml += '<input type="hidden" name="_SECURITY_CODE" id="_SECURITY_CODE"/>';
        fileHtml += '<input type="hidden" name="_FIXED_CODE"    id="_FIXED_CODE"/>';
        fileHtml += '<input type="hidden" name="_LANG_TYPE"     id="_LANG_TYPE"/>';
    frmObj.append(fileHtml);
    frmObj.find("[name='_DOMAIN_CODE']").val(sDomainCode);
    frmObj.find("[name='_SITE_CODE']").val(sSiteCode);
    frmObj.find("[name='_SECURITY_CODE']").val(sSecurityCode);
    frmObj.find("[name='_FIXED_CODE']").val(sFixedCode);
    frmObj.find("[name='_LANG_TYPE']").val(caq.getLangType());
    frmObj.submit();
  }

  /**
   * OpenFileDownload(sFormId, file_name, sDomainCode, sSiteCode, sFixedCode, sSecurityCode)
   * @param {Object} sFormId       : 폼 태그명(2011-09-23 사용하지않음)
   * @param {Object} file_name     : 파일명
   * @param {Object} sDomainCode   : 도메인코드
   * @param {Object} sSiteCode     : 사이트코드
   * @param {Object} sFixedCode    : 절대경로 코드
   * @param {Object} sSecurityCode : 보안코드
   */
  function OpenFileDownload(sFormId, file_name, sDomainCode, sSiteCode, sFixedCode, sSecurityCode){
    var form_action = $("#" + sFormId).attr("action");
    OpenFileDownloadUrl(sFormId, form_action, file_name, sDomainCode, sSiteCode, sFixedCode, sSecurityCode);
  }

  /**
   * OpenFileDownloadUrl(sFormId, form_action, file_name, sDomainCode, sSiteCode, sFixedCode, sSecurityCode)
   * @param {Object} sFormId       : 폼 태그명(2011-09-23 사용하지않음)
   * @param {Object} form_action   : 요청 URL(2011-09-23 사용하지않음)
   * @param {Object} file_name     : 파일명
   * @param {Object} sDomainCode   : 도메인코드
   * @param {Object} sSiteCode     : 사이트코드
   * @param {Object} sFixedCode    : 절대경로 코드
   * @param {Object} sSecurityCode : 보안코드
   */
  function OpenFileDownloadUrl(sFormId, form_action, file_name, sDomainCode, sSiteCode, sFixedCode, sSecurityCode){
    if(sSecurityCode === undefined || sSecurityCode =="" || sSecurityCode == null) sSecurityCode = 'Y';
    var strFileIframe = "_FILEDOWNLOAD_IFRAME";
    var strFileForm   = "_FILEDOWNLOAD_FORM";
    var strAsfileCode = "555555";
    if(caq.util.isIOSFlag()||caq.util.isAndroidFlag()){
      caq.util.isAndroidFlag()
      var strHttp = (caq.util.isAndroidFlag()) ? "http://"+caq.getDomainName()+".kbstar.com" : "";
      var strUrl  = strHttp + "/quics?asfilecode="+strAsfileCode+"&QSL=F&_DOMAIN_CODE="+sDomainCode+"&_SITE_CODE="+sSiteCode+"&_SECURITY_CODE="+sSecurityCode+"&_FIXED_CODE="+sFixedCode+"&_FILE_NAME="+file_name+"&_LANG_TYPE="+caq.getLangType();
      window.open(caq.util.encodeURI(strUrl),strFileIframe,"");
    }else{
      $("#"+strFileIframe).remove();
      $("#"+strFileForm).remove();
      var iFrameHtml = '<iframe id="'+strFileIframe+'" name="'+strFileIframe+'" scrolling="no" frameborder="0" src="javascript:false;" style="width:0px;height:0px;"></iframe>';
      var formHtml   = '<form id="'+strFileForm+'" name="'+strFileForm+'" method="post" target="'+strFileIframe+'" action="/quics?asfilecode='+strAsfileCode+'"></form>';
      $("body").append(iFrameHtml);
      $("body").append(formHtml);
      var objFileForm = $("#"+strFileForm);
      var fileHtml   = '<input type="hidden" name="_DOMAIN_CODE"   id="_DOMAIN_CODE"/>';
          fileHtml  += '<input type="hidden" name="_SITE_CODE"     id="_SITE_CODE"/>';
          fileHtml  += '<input type="hidden" name="_SECURITY_CODE" id="_SECURITY_CODE"/>';
          fileHtml  += '<input type="hidden" name="_FIXED_CODE"    id="_FIXED_CODE"/>';
          fileHtml  += '<input type="hidden" name="_FILE_NAME"     id="_FILE_NAME"/>';
          fileHtml  += '<input type="hidden" name="_LANG_TYPE"     id="_LANG_TYPE"/>';
      objFileForm.append(fileHtml);
      objFileForm.find("[name='_DOMAIN_CODE']").val(sDomainCode);
      objFileForm.find("[name='_SITE_CODE']").val(sSiteCode);
      objFileForm.find("[name='_SECURITY_CODE']").val(sSecurityCode);
      objFileForm.find("[name='_FIXED_CODE']").val(sFixedCode);
      objFileForm.find("[name='_FILE_NAME']").val(file_name);
      objFileForm.find("[name='_LANG_TYPE']").val(caq.getLangType());
      objFileForm.submit();
      objFileForm.remove();
    }
  }

  /**
   * OpenFileDownloadParam(sFileCode, sFileName, sParams)
   * @param {Object} sFileCode : Quics파일코드
   * @param {Object} sFileName : 파일명
   * @param {Object} sParams   : 파라미터
   */
  function OpenFileDownloadParam(sFileCode, sFileName, sParams){
    var strFileIframe = "_FILEDOWNLOAD_IFRAME";
    var strFileForm   = "_FILEDOWNLOAD_FORM";
    if(caq.util.isIOSFlag()||caq.util.isAndroidFlag()){
      var strHttp = (caq.util.isAndroidFlag()) ? "http://"+caq.getDomainName()+".kbstar.com" : "";
      var strUrl  = strHttp + "/quics?asfilecode="+sFileCode+"&QSL=F&_FILE_NAME="+sFileName+"&_LANG_TYPE="+caq.getLangType()+sParams;
      window.open(caq.util.encodeURI(strUrl),strFileIframe,"");
    }else{
      var iFrameHtml = '<iframe id="'+strFileIframe+'" name="'+strFileIframe+'" scrolling="no" frameborder="0" src="javascript:false;" style="width:0px;height:0px;"></iframe>';
      var formHtml   = '<form id="'+strFileForm+'" name="'+strFileForm+'" method="post" target="'+strFileIframe+'" action="/quics?asfilecode='+sFileCode+'"></form>';
      $("#"+strFileIframe).remove();
      $("#"+strFileForm).remove();
      $("body").append(iFrameHtml);
      $("body").append(formHtml);
      var objFileForm = $("#"+strFileForm);
      var fileHtml  = '<input type="hidden" name="_LANG_TYPE" id="_LANG_TYPE" value="'+caq.getLangType()+'"/>';
          fileHtml += caq.util.paramsToInput(sParams);
      objFileForm.append(fileHtml);
      objFileForm.submit();
      objFileForm.remove();
    }
  }

  /**
   * OpenStreamDownload(strFileName, strAsfileCode, strParam)
   * @param {Object} strFileName   : 파일명
   * @param {Object} strAsfileCode : 요청URL
   * @param {Object} strParam      : 파라미터 (ex:출금계좌번호=xxxxxxx&거래시작일=xxxxxx)
   */
  function OpenStreamDownload(strFileName, strAsfileCode, strParam){
    var strStreaIframe = "_STREAM_IFRAME";
    var strStreaForm   = "_STREAM_FORM";
    if(caq.util.isIOSFlag()||caq.util.isAndroidFlag()){
      var strHttp = (caq.util.isAndroidFlag()) ? "http://"+caq.getDomainName()+".kbstar.com" : "";
      var strUrl  = strHttp + "/quics?asfilecode="+strAsfileCode+"&QSL=F&_FILE_NAME="+strFileName+"&_LANG_TYPE="+caq.getLangType() + "&" + strParam;
      
      if(caq.util.isAndroidFlag()) location.href = caq.util.encodeURI(strUrl);
      else window.open(caq.util.encodeURI(strUrl),strStreaIframe,"");
      	
    }else{
      var iFrameHtml = '<iframe id="'+strStreaIframe+'" name="'+strStreaIframe+'" scrolling="no" frameborder="0" src="javascript:false;" style="width:0px;height:0px;"></iframe>';
      var formHtml   = '<form id="'+strStreaForm+'" name="'+strStreaForm+'" method="post" target="'+strStreaIframe+'" action="/quics?asfilecode='+strAsfileCode+'"></form>';
      $("#"+strStreaIframe).remove();
      $("#"+strStreaForm).remove();
      $("body").append(iFrameHtml);
      $("body").append(formHtml);
       var objStreaForm = $("#"+strStreaForm);
      objStreaForm.append(caq.util.paramsToInput("&" + strParam+"&_FILE_NAME="+strFileName+"&_LANG_TYPE="+caq.getLangType()));
      objStreaForm.submit();
      objStreaForm.remove();
    }
  }

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 쿠키 관련 자바스크립트
// * 소  속 : 업무공통팀
// * 작성일 : 2011-08-23
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------

  /**
   * cookie : 쿠기값 설정, 삭제, 가져오기
   */
  cookie = function(){
    return{
      /**
       * cookie.getCookie(name) : 쿠기값 가져오기
       * @param {Object} name : 쿠기명
       */
      getCookie : function(name){
        var i,x,y,ARRcookies=document.cookie.split(";");
        for(i=0;i<ARRcookies.length;i++){
          x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
          y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
          x = x.replace(/^\s+|\s+$/g,"");
          if (x==name){
            return unescape(y);
          }
        }
      },

      /**
       * cookie.getCookieVal(offset)
       * @param {Object} offset
       */
      getCookieVal : function(offset){
        var endstr = document.cookie.indexOf (";", offset);
        if (endstr == -1) endstr = document.cookie.length;
        return unescape(document.cookie.substring(offset, endstr));
      },

      /**
       * cookie.setCookie(name, value, expires, path, domain) : 쿠키값 설정
       * @param {Object} name    : 쿠키명
       * @param {Object} value   : 쿠키값
       * @param {Object} expires : 쿠키 만기 날짜
       * @param {Object} path    : 쿠키 된 경로
       * @param {Object} domain  : 쿠키 된 도메인
       */
      setCookie : function(name, value, expires, path, domain){
        if (!path) path = "/";
        document.cookie = name + "=" + escape (value) +
          ((expires) ? "; expires=" + expires : "")   +
          ((path)    ? "; path="    + path    : "")   +
          ((domain)  ? "; domain="  + domain  : "");
      },

      /**
       * cookie.delCookie(name, path, domain) : 쿠키값 삭제
       * @param {Object} name   : 쿠키명
       * @param {Object} path   : 쿠키 된 경로
       * @param {Object} domain : 쿠키 된 도메인
       */
      delCookie : function(name, path, domain){
        if (!path) path = "/";
        if (getCookie(name)) {
        document.cookie = name + "=" +
          ((path)   ? "; path="   + path   : "") +
          ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
      },

      /**
       * cookie.getExpDate(days, hours, minutes) : 일, 시간, 분 입력하여 GMT 사건 가져오기
       * @param {Object} days    : 일
       * @param {Object} hours   : 시간
       * @param {Object} minutes : 분
       */
      getExpDate : function(days, hours, minutes){
        var expDate = new Date();
        if (typeof days == "number" && typeof hours == "number" && typeof hours == "number") {
          expDate.setDate(expDate.getDate() + parseInt(days));
          expDate.setHours(expDate.getHours() + parseInt(hours));
          expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
          return expDate.toGMTString();
        }
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 자바스크립트
// * 소  속 : 업무공통팀
// * 작성일 : 2011-08-07
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------

  caq = function(){

    var _OPEN_LANG_TYPE     = "KOR";   // 언어코드 기본 KOR
    var _OPEN_SITE_NAME     = "obank"; // 사이트명 기본 obank
    var _OPEN_DOMAIN_NAME   = "bank";  // 도메인명 기본 bank
    var _OPEN_LAST_PAGE_URL = "";      // 마지막으로 doAjaxCC한 페이지 URL

    return{

      /**
       * caq.setLangType(sLangType) : 언어코드 설정
       * @param {Object} sLangType : 언어코드
       */
      setLangType : function(sLangType){
        _OPEN_LANG_TYPE = sLangType;
      },

      /**
       * caq.getLangType() : 언어코드 가져오기
       */
      getLangType : function(){
        return _OPEN_LANG_TYPE;
      },

      /**
       * caq.setLastPageUrl(url) : 마지막 doAjaxCC URL 설정
       * @param {Object} url : 마지막 doAjaxCC URL
       */
      setLastPageUrl : function(url){
        _OPEN_LAST_PAGE_URL = url;
      },

      /**
       * caq.getLastPageUrl() : 마지막 doAjaxCC URL 가져오기
       */
      getLastPageUrl : function(){
        return _OPEN_LAST_PAGE_URL;
      },

      /**
       * caq.setSiteName(siteName) : 사이트명 설정
       * @param {Object} siteName : 사이트명
       */
      setSiteName : function(siteName){
        _OPEN_SITE_NAME = (siteName==""||siteName===undefined)?"obank":siteName;
      },

      /**
       * caq.getSiteName() : 사이트명 가져오기
       */
      getSiteName : function(){
        return _OPEN_SITE_NAME;
      },

      /**
       * caq.setDomainName(domainName) : 도메인명 설정
       * @param {Object} domainName : 도메인명
       */
      setDomainName : function(domainName){
        _OPEN_DOMAIN_NAME = (domainName==""||domainName===undefined)?"bank":domainName;
      },

      /**
       * caq.getDomainName() : 도메인명 가져오기
       */
      getDomainName : function(){
        try{
          var domainCode = document.domain.split(".");
          var domainStr  = domainCode[0].toLowerCase();
          var returnStr  = (domainStr.indexOf("do") > -1 ) ? domainStr.replace("do","d") : domainStr.replace("o","");
          returnStr = (returnStr=="kbstar") ? "obank":returnStr;
          return returnStr;
        }catch(e){
          return _OPEN_DOMAIN_NAME;
        }
      },

     /**
       * caq.popupAccountInquery(form_name, bank_Code, Acc_Num, Acc_Nick, Acn_knd, Tag_knd) : 입금지정계좌검색
       * @param {Object} form_name          : Fomm 태그 name
       * @param {Object} bank_Code          : 은행 input name
       * @param {Object} Acc_Num            : 계좌번호 input name
       * @param {Object} Acc_Nick           : 계좌별칭 input name
       * @param {Object} Acn_knd            : 계좌 구분 코드 설정
       * @param {Object} Tag_knd            : 태그 종류 설정 : 입금계좌번호
       */
     popupAccountInquery  : function(form_name, bank_code, acc_num, acc_nick, acn_knd, tag_knd){
        var attribute = "width=450,height=605,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C026814&QSL=F";
        var params    = "&form_name=" + form_name + "&bank_code=" + bank_code;
            params   += "&acc_num=" + acc_num+ "&acc_nick=" + acc_nick;
            params   += "&acn_knd=" + acn_knd+ "&tag_knd=" + tag_knd;
        caq.popup.iFrameShow("popupAccount",caq.util.encodeURI(url+params),bank_code,450,615);
      },    
 
     /**
       * caq.popupIMMAproval(form_name,next_target_obj,telaproval_result,siteId,langtype):  2채널인증-전화승인팝업 페이지 오픈-이통사명의확인 default
       * @param {Object} form_name          : Fomm 태그 name 
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID 
       * @param {Object} histDstic            :  내역구분
       * @param {Object} strTelMent           : 멘트종류
       * @param {Object} telaproval_result            : 전화승인팝업처리결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       */
       popupIMMAproval  : function(form_name,next_target_obj,telaproval_result,siteId,langtype){
        var url  = "";
        var params     = "&form_name=" + form_name ;
            params   += "&telaproval_result=" + telaproval_result ;

         var s_domain = window.location.host;
  
          if( s_domain.indexOf("ocsw.kbstar.com") > -1 ){
            siteId = "omini";
          } else {
          }

        if(siteId == "omweb"){                     // 모바일
            caq.popup.iMobileShow("popupTelAprval",params,"b049637");
        }else if(siteId == "omini"){                 // 미니뱅킹
           url = "/quics?page=C032102&QLS=F";	
           $("#popupTelAprval").remove();
           caq.popup.iFrameShow("popupTelAprval",caq.util.encodeURI(url+params),next_target_obj,380,350);
        }else if(siteId == "osenior"){              // 시니어뱅킹
           url = "/quics?page=C032102&QLS=F";
           $("#popupTelAprval").remove();
           caq.popup.iFrameShow("popupTelAprval",caq.util.encodeURI(url+params),next_target_obj,520,350);
        }else{
            if(langtype == "KOR"){ 
                  url = "/quics?page=C033944&QLS=F";		//CC
                  //url = "/quics?page=C032102&QLS=F";	//Ajax
            }else{                                                     // 다국어 적용
		       		if(langtype=="ENG"){
                  url = "/quics?page=C033033&QLS=F";	
              }else if(langtype=="JPN"){
                  url = "/quics?page=C033032&QLS=F";	
              }else if(langtype=="CHN"){
                  url = "/quics?page=C033026&QLS=F";	
              }
            }
            $("#popupTelAprval").remove();
            caq.popup.iFrameShow("popupTelAprval",caq.util.encodeURI(url+params),next_target_obj,550,480);
        }
       },

    /**
       * caq.popupSMSAproval(form_name,next_target_obj,smsaproval_result,siteId,langtype):  휴대폰SMS인증 팝업 페이지오픈
       * @param {Object} form_name          : Fomm 태그 name 
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID 
       * @param {Object} smsaproval_result            : 휴대폰SMS인증 결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       */
       popupSMSAproval  : function(form_name,next_target_obj,smsaproval_result,siteId,langtype){
        var url  = "";
        var params     = "&form_name=" + form_name ;
              params   += "&smsaproval_result=" + smsaproval_result ;

         var s_domain = window.location.host;
  
          if( s_domain.indexOf("ocsw.kbstar.com") > -1 ){
            siteId = "omini";
          } else {
          }

        if(siteId == "omweb"){                     // 모바일
            caq.popup.iMobileShow("popupTelAprval",params,"b049638");
        }else if(siteId == "omini"){                 // 미니뱅킹
           url = "/quics?page=C033073&QLS=F";	
           $("#popupTelAprval").remove();
           caq.popup.iFrameShow("popupTelAprval",caq.util.encodeURI(url+params),next_target_obj,380,350);
        }else if(siteId == "osenior"){              // 시니어뱅킹
           url = "/quics?page=C033082&QLS=F";
           $("#popupTelAprval").remove();
           caq.popup.iFrameShow("popupTelAprval",caq.util.encodeURI(url+params),next_target_obj,520,350);
        }else{
             if(langtype == "KOR"){                           
                  url = "/quics?page=C032575&QLS=F";			
            }else{                                                     // 다국어 적용
		       if(langtype=="ENG"){
                      url = "/quics?page=C032983&QLS=F";	
                  }else if(langtype=="JPN"){
                      url = "/quics?page=C032982&QLS=F";	
                  }else if(langtype=="CHN"){
                      url = "/quics?page=C032981&QLS=F";	
                  }
            }
            $("#popupTelAprval").remove();

            caq.popup.iFrameShow("popupTelAprval",caq.util.encodeURI(url+params),next_target_obj,600,550);
        }
       }, 
      
     /**
       * caq.popupTelAproval(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype):  2채널인증-전화승인팝업 페이지 오픈-이통사명의확인 default
       * @param {Object} form_name          : Fomm 태그 name 
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID 
       * @param {Object} histDstic            :  내역구분
       * @param {Object} strTelMent           : 멘트종류
       * @param {Object} telaproval_result            : 전화승인팝업처리결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       */
       popupTelAproval  : function(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype){
        var tel_nominal  = false;          //  이통사명의확인여부 default 값
        var login_p = "";
        caq.popupTelAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p);
       },

    /**
       * caq.popupTelAproval(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal):  2채널인증-전화승인팝업 페이지 오픈 - 이통사명의확인 
       * @param {Object} form_name          : Fomm 태그 name 
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID  
       * @param {Object} histDstic            :  내역구분
       * @param {Object} strTelMent           : 멘트종류
       * @param {Object} telaproval_result            : 전화승인팝업처리결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       * @param {Object} tel_nominal            :  이통사명의확인여부
       */
       popupTelAproval  : function(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal){
        var b_tel_nominal = false;
        if(typeof(tel_nominal) =="boolean") b_tel_nominal =tel_nominal;
        var login_p = "";
        caq.popupTelAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,b_tel_nominal,login_p);
       },

    /**
       * caq.popupTelAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p):  2채널인증-전화승인팝업 페이지 오픈
       * @param {Object} form_name          : Fomm 태그 name  
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID 
       * @param {Object} histDstic            :  내역구분
       * @param {Object} strTelMent           : 멘트종류
       * @param {Object} telaproval_result            : 전화승인팝업처리결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       * @param {Object} tel_nominal            :  이통사명의확인여부
       * @param {Object} login_p            :    로그인패스여부
       */
       popupTelAprovalNomial  : function(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p){
       	var is_ModiTel = "";
       	caq.popupTelAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,b_tel_nominal,login_p,is_ModiTel);
       },

    /**
       * caq.popupTelAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p,is_ModiTel):  2채널인증-전화승인팝업 페이지 오픈
       * @param {Object} form_name          : Fomm 태그 name  
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID 
       * @param {Object} histDstic            :  내역구분
       * @param {Object} strTelMent           : 멘트종류
       * @param {Object} telaproval_result            : 전화승인팝업처리결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       * @param {Object} tel_nominal            :  이통사명의확인여부
       * @param {Object} login_p            :    로그인패스여부
       * @param {Object} is_ModiTel            :  자택직장휴대폰변경여부
       */
       popupTelAprovalNomial  : function(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p,is_ModiTel){
        var url  = "";
        var params     = "&form_name=" + form_name ;
              params   += "&histDstic=" + histDstic+ "&strTelMent=" + strTelMent;
              params   += "&telaproval_result=" + telaproval_result + "&tel_nominal=" + tel_nominal;
              params   += "&LOGIN_PASS=" + login_p + "&is_ModiTel=" + is_ModiTel;
              
         var s_domain = window.location.host;
  
          if( s_domain.indexOf("ocsw.kbstar.com") > -1 ){
            siteId = "omini";
          } else {
          }

        if(siteId == "omweb"){                     // 모바일
            caq.popup.iMobileShow("popupTelAprval",params,"b046028");
        }else if(siteId == "omini"){                 // 미니뱅킹
           url = "/quics?page=C027913&QLS=F";	
           $("#popupTelAprval").remove();
           caq.popup.iFrameShow("popupTelAprval",caq.util.encodeURI(url+params),next_target_obj,380,350);
        }else if(siteId == "osenior"){              // 시니어뱅킹
           url = "/quics?page=C030235&QLS=F";
           $("#popupTelAprval").remove();
           caq.popup.iFrameShow("popupTelAprval",caq.util.encodeURI(url+params),next_target_obj,520,350);
        }else{
             if(langtype == "KOR"){                           
                  url = "/quics?page=C027219&QLS=F";			
            }else{                                                     // 다국어 적용
		       if(langtype=="ENG"){
                      url = "/quics?page=C027967&QLS=F";	
                  }else if(langtype=="JPN"){
                      url = "/quics?page=C027975&QLS=F";	
                  }else if(langtype=="CHN"){
                      url = "/quics?page=C027971&QLS=F";	
                  }
            }
            $("#popupTelAprval").remove();
            caq.popup.iFrameShow("popupTelAprval",caq.util.encodeURI(url+params),next_target_obj,550,480);
        }
      },

     /**
       * caq.popupTelComAproval(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype):  전화승인이통사명의확인
       * @param {Object} form_name          : Fomm 태그 name 
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID 
       * @param {Object} histDstic            :  내역구분
       * @param {Object} strTelMent           : 멘트종류
       * @param {Object} telaproval_result            : 전화승인팝업처리결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       */
       popupTelComAproval  : function(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype){
        var tel_nominal  = false;          //  이통사명의확인여부 default 값
        var login_p = "";
        caq.popupTelComAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p);
       },

    /**
       * caq.popupTelComAproval(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal):  전화승인이통사명의확인
       * @param {Object} form_name          : Fomm 태그 name 
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID  
       * @param {Object} histDstic            :  내역구분
       * @param {Object} strTelMent           : 멘트종류
       * @param {Object} telaproval_result            : 전화승인팝업처리결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       * @param {Object} tel_nominal            :  이통사명의확인여부
       */
       popupTelComAproval  : function(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal){
        var b_tel_nominal = false;
        if(typeof(tel_nominal) =="boolean") b_tel_nominal =tel_nominal;
        var login_p = "";
        caq.popupTelComAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,b_tel_nominal,login_p);
       },

    /**
       * caq.popupTelComAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p):  전화승인이통사명의확인
       * @param {Object} form_name          : Fomm 태그 name  
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID 
       * @param {Object} histDstic            :  내역구분
       * @param {Object} strTelMent           : 멘트종류
       * @param {Object} telaproval_result            : 전화승인팝업처리결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       * @param {Object} tel_nominal            :  이통사명의확인여부
       * @param {Object} login_p            :    로그인패스여부
       */
       popupTelComAprovalNomial  : function(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p){
       	var is_ModiTel = "";
       	caq.popupTelComAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,b_tel_nominal,login_p,is_ModiTel);
       },

    /**
       * caq.popupTelComAprovalNomial(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p,is_ModiTel):  2채널인증-전화승인팝업 페이지 오픈
       * @param {Object} form_name          : Fomm 태그 name  
       * @param {Object} next_target_obj          : 창이 닫힌 후 다음 포커스 오브젝트 ID 
       * @param {Object} histDstic            :  내역구분
       * @param {Object} strTelMent           : 멘트종류
       * @param {Object} telaproval_result            : 전화승인팝업처리결과
       * @param {Object} siteId            :  도메인명
       * @param {Object} langtype            :  다국어
       * @param {Object} tel_nominal            :  이통사명의확인여부
       * @param {Object} login_p            :    로그인패스여부
       * @param {Object} is_ModiTel            :  자택직장휴대폰변경여부
       */
       popupTelComAprovalNomial  : function(form_name,next_target_obj,histDstic,strTelMent,telaproval_result,siteId,langtype,tel_nominal,login_p,is_ModiTel){
        var url  = "";
        var params     = "&form_name=" + form_name ;
              params   += "&histDstic=" + histDstic+ "&strTelMent=" + strTelMent;
              params   += "&telaproval_result=" + telaproval_result + "&tel_nominal=" + tel_nominal;
              params   += "&LOGIN_PASS=" + login_p + "&is_ModiTel=" + is_ModiTel;
              
         var s_domain = window.location.host;
  
          if( s_domain.indexOf("ocsw.kbstar.com") > -1 ){
            siteId = "omini";
          } else {
          }

        if(siteId == "omweb"){                     // 모바일
            caq.popup.iMobileShow("popupTelComAprval",params,"b059375");
        }else if(siteId == "omini"){                 // 미니뱅킹
           url = "/quics?page=C056596&QLS=F";	
           $("#popupTelComAprval").remove();
           caq.popup.iFrameShow("popupTelComAprval",caq.util.encodeURI(url+params),next_target_obj,380,350);
        }else if(siteId == "osenior"){              // 시니어뱅킹
           url = "/quics?page=C056596&QLS=F";
           $("#popupTelComAprval").remove();
           caq.popup.iFrameShow("popupTelComAprval",caq.util.encodeURI(url+params),next_target_obj,520,350);
        }else{
             if(langtype == "KOR"){                           
                  url = "/quics?page=C056596&QLS=F";			
            }else{                                                     // 다국어 적용
		       if(langtype=="ENG"){
                      url = "/quics?page=C056596&QLS=F";	
                  }else if(langtype=="JPN"){
                      url = "/quics?page=C056596&QLS=F";	
                  }else if(langtype=="CHN"){
                      url = "/quics?page=C056596&QLS=F";	
                  }
            }
            $("#popupTelComAprval").remove();
            caq.popup.iFrameShow("popupTelComAprval",caq.util.encodeURI(url+params),next_target_obj,820,650);
        }
      },

      /**
       * caq.popupZipcodeInquery(form_name, zipcode1_name, zipcode2_name, address1_name, address2_name, usage_cleanaddress, zip_serial_name) : 우편번호조회 팝업페이지 오픈
       * @param {Object} form_name          : 폼이름(form)
       * @param {Object} zipcode1_name      : 우편번호1(text)
       * @param {Object} zipcode2_name      : 우편번호2(text)
       * @param {Object} address1_name      : 우편번호주소(text)
       * @param {Object} address2_name      : 상세주소(text)
       * @param {Object} usage_cleanaddress : 정제주소사용여부(Y:정제, N:일반)
       * @param {Object} zip_serial_name    : 우편일련번호(선택사항)(hidden)
       */
      popupZipcodeInquery : function(form_name, zipcode1_name, zipcode2_name, address1_name, address2_name, usage_cleanaddress, zip_serial_name){
        form_name          = (form_name          === undefined) ? "" : form_name;
        zipcode1_name      = (zipcode1_name      === undefined) ? "" : zipcode1_name;
        zipcode2_name      = (zipcode2_name      === undefined) ? "" : zipcode2_name;
        address1_name      = (address1_name      === undefined) ? "" : address1_name;
        address2_name      = (address2_name      === undefined) ? "" : address2_name;
        usage_cleanaddress = (usage_cleanaddress === undefined) ? "" : usage_cleanaddress;
        zip_serial_name    = (zip_serial_name    === undefined) ? "" : zip_serial_name;
        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url     = "/quics?page=C019693&QSL=F";
        var params  = "&form_name=" + form_name + "&zip1_field_name=" + zipcode1_name;
            params += "&zip2_field_name=" + zipcode2_name + "&address1_field_name=" + address1_name;
            params += "&address2_field_name=" + address2_name + "&clean_address="+usage_cleanaddress;
            params += "&zip_serial_name="+zip_serial_name+"&functionName=none";
        //window.open(caq.util.encodeURI(url+params),"popupZipcode",attribute);
        caq.popup.iFrameShow("popupZipcode",caq.util.encodeURI(url+params),address2_name);
      },

      /**
       * caq.popupZipcodeInqueryWithType(form_name, zipcode1_name, zipcode2_name, address1_name, address2_name, usage_cleanaddress, zip_serial_name, formatted_type) : 우편번호조회 팝업페이지 오픈
       * @param {Object} form_name          : 폼이름(form)
       * @param {Object} zipcode1_name      : 우편번호1(text)
       * @param {Object} zipcode2_name      : 우편번호2(text)
       * @param {Object} address1_name      : 우편번호주소(text)
       * @param {Object} address2_name      : 상세주소(text)
       * @param {Object} usage_cleanaddress : 정제주소사용여부(Y:정제, N:일반)
       * @param {Object} zip_serial_name    : 우편일련번호(선택사항)(hidden)
       * @param {Object} formatted_type     : 표준화주소용(hidden)
       */
      popupZipcodeInqueryWithType : function(form_name, zipcode1_name, zipcode2_name, address1_name, address2_name, usage_cleanaddress, zip_serial_name, formatted_type){
        form_name          = (form_name          === undefined) ? "" : form_name;
        zipcode1_name      = (zipcode1_name      === undefined) ? "" : zipcode1_name;
        zipcode2_name      = (zipcode2_name      === undefined) ? "" : zipcode2_name;
        address1_name      = (address1_name      === undefined) ? "" : address1_name;
        address2_name      = (address2_name      === undefined) ? "" : address2_name;
        usage_cleanaddress = (usage_cleanaddress === undefined) ? "" : usage_cleanaddress;
        zip_serial_name    = (zip_serial_name    === undefined) ? "" : zip_serial_name;
        formatted_type     = (formatted_type     === undefined) ? "" : formatted_type;
        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url     = "/quics?page=C019693&QSL=F";
        var params  = "&form_name=" + form_name + "&zip1_field_name=" + zipcode1_name;
            params += "&zip2_field_name=" + zipcode2_name + "&address1_field_name=" + address1_name;
            params += "&address2_field_name=" + address2_name + "&clean_address="+usage_cleanaddress;
            params += "&zip_serial_name="+zip_serial_name+"&formatted_type="+formatted_type+"&functionName=none";
        //window.open(caq.util.encodeURI(url+params),"popupZipcode",attribute);
        caq.popup.iFrameShow("popupZipcode",caq.util.encodeURI(url+params),address2_name);
      },

      /**
       * caq.popupZipcodeInqueryStreetName() : 우편번호조회 팝업페이지 오픈(도로명)
       * @param {Object} form_name                  : 폼이름(form)
       * @param {Object} zipcode1_name              : 우편번호1(text)
       * @param {Object} zipcode2_name              : 우편번호2(text)
       * @param {Object} address1_name              : 우편번호주소(text)
       * @param {Object} address2_name              : 상세주소(text)
       * @param {Object} usage_cleanaddress         : 정제주소사용여부(Y:정제, N:일반)
       * @param {Object} zip_serial_name            : 우편일련번호(선택사항)(hidden)
       * @param {Object} zipcode_gubun_code         : 주소표시구분코드 (hidden)
       * @param {Object} zipcode                    : 지번우편번호(hidden)
       * @param {Object} ser_no                     : 지번일련번호(hidden)
       * @param {Object} jibun_basic_address        : 지번기본주소(hidden)
       * @param {Object} jibun_detail_address       : 지번상세주소(hidden)
       * @param {Object} streetname_basic_address   : 도로기본주소(hidden)
       * @param {Object} streetname_detail_address  : 도로상세주소(hidden)
       * @param {Object} streetname_zipcode         : 도로명우편번호(hidden)
       * @param {Object} streetname_manage_num      : 도로명우편보조번호(hidden)
       * @param {Object} streetname_area_code       : 도로명구역코드(hidden)
       * @param {Object} jiha_yn                    : 도로명지하구분(hidden)
       * @param {Object} building_major_num         : 도로명건물본번호(hidden)
       * @param {Object} building_minor_num         : 도로명건물부번호(hidden)
       * @param {Object} building_manage_num        : 도로명건물관리번호(hidden)
       * @param {Object} streetname_eupmyun_seq     : 도로명읍면번호(hidden)
       * @param {Object} streetname_detail          : 도로명상세주소(hidden)
       */
      popupZipcodeInqueryStreetName : function(
            form_name
          , zipcode1_name
          , zipcode2_name
          , address1_name
          , address2_name
          , usage_cleanaddress
          , zip_serial_name
          , zipcode_gubun_code
          , zipcode
          , ser_no
          , jibun_basic_address
          , jibun_detail_address
          , streetname_basic_address
          , streetname_detail_address
          , streetname_zipcode
          , streetname_manage_num
          , streetname_area_code
          , jiha_yn
          , building_major_num
          , building_minor_num
          , building_manage_num
          , streetname_eupmyun_seq
          , streetname_detail
        ) {

        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C023406&QSL=F";
        var params    = "&form_name=" + form_name;
            params   += "&zip1_field_name=" + zipcode1_name;
            params   += "&zip2_field_name=" + zipcode2_name;
            params   += "&address1_field_name=" + address1_name;
            params   += "&address2_field_name=" + address2_name;
            params   += "&clean_address=" + usage_cleanaddress;
            params   += "&zip_serial_name=" + zip_serial_name;
            params   += "&functionName=none";
            params   += "&zipcode_gubun_code=" + zipcode_gubun_code;
            params   += "&zipcode=" + zipcode;
            params   += "&ser_no=" + ser_no;
            params   += "&jibun_basic_address=" + jibun_basic_address;
            params   += "&jibun_detail_address=" + jibun_detail_address;
            params   += "&streetname_basic_address=" + streetname_basic_address;
            params   += "&streetname_detail_address=" + streetname_detail_address;
            params   += "&streetname_zipcode=" + streetname_zipcode;
            params   += "&streetname_manage_num=" + streetname_manage_num;
            params   += "&streetname_area_code=" + streetname_area_code;
            params   += "&jiha_yn=" + jiha_yn;
            params   += "&building_major_num=" + building_major_num;
            params   += "&building_minor_num=" + building_minor_num;
            params   += "&building_manage_num=" + building_manage_num;
            params   += "&streetname_eupmyun_seq=" + streetname_eupmyun_seq;
            params   += "&streetname_detail=" + streetname_detail;
        //window.open(caq.util.encodeURI(url+params),"popupZipcode",attribute);
        caq.popup.iFrameShow("popupZipcode",caq.util.encodeURI(url+params),address2_name);

      },

      /**
       * caq.popupZipcodeInqueryWithTypeStreetName() : 우편번호조회 팝업페이지 오픈(도로명)
       * @param {Object} form_name                  : 폼이름(form)
       * @param {Object} zipcode1_name              : 우편번호1(text)
       * @param {Object} zipcode2_name              : 우편번호2(text)
       * @param {Object} address1_name              : 우편번호주소(text)
       * @param {Object} address2_name              : 상세주소(text)
       * @param {Object} usage_cleanaddress         : 정제주소사용여부(Y:정제, N:일반)
       * @param {Object} zip_serial_name            : 우편일련번호(선택사항)(hidden)
       * @param {Object} formatted_type             : 표준화주소용(hidden)
       * @param {Object} zipcode_gubun_code         : 주소표시구분코드 (hidden)
       * @param {Object} zipcode                    : 지번우편번호(hidden)
       * @param {Object} ser_no                     : 지번일련번호(hidden)
       * @param {Object} jibun_basic_address        : 지번기본주소(hidden)
       * @param {Object} jibun_detail_address       : 지번상세주소(hidden)
       * @param {Object} streetname_basic_address   : 도로기본주소(hidden)
       * @param {Object} streetname_detail_address  : 도로상세주소(hidden)
       * @param {Object} streetname_zipcode         : 도로명우편번호(hidden)
       * @param {Object} streetname_manage_num      : 도로명우편보조번호(hidden)
       * @param {Object} streetname_area_code       : 도로명구역코드(hidden)
       * @param {Object} jiha_yn                    : 도로명지하구분(hidden)
       * @param {Object} building_major_num         : 도로명건물본번호(hidden)
       * @param {Object} building_minor_num         : 도로명건물부번호(hidden)
       * @param {Object} building_manage_num        : 도로명건물관리번호(hidden)
       * @param {Object} streetname_eupmyun_seq     : 도로명읍면번호(hidden)
       * @param {Object} streetname_detail          : 도로명상세주소(hidden)
       */
      popupZipcodeInqueryWithTypeStreetName : function(
            form_name
          , zipcode1_name
          , zipcode2_name
          , address1_name
          , address2_name
          , usage_cleanaddress
          , zip_serial_name
          , formatted_type
          , zipcode_gubun_code
          , zipcode
          , ser_no
          , jibun_basic_address
          , jibun_detail_address
          , streetname_basic_address
          , streetname_detail_address
          , streetname_zipcode
          , streetname_manage_num
          , streetname_area_code
          , jiha_yn
          , building_major_num
          , building_minor_num
          , building_manage_num
          , streetname_eupmyun_seq
          , streetname_detail
        ) {

        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C023406&QSL=F";
        var params    = "&form_name=" + form_name;
            params   += "&zip1_field_name=" + zipcode1_name;
            params   += "&zip2_field_name=" + zipcode2_name;
            params   += "&address1_field_name=" + address1_name;
            params   += "&address2_field_name=" + address2_name;
            params   += "&clean_address=" + usage_cleanaddress;
            params   += "&zip_serial_name=" + zip_serial_name;
            params   += "&functionName=none";
            params   += "&formatted_type=" + formatted_type;
            params   += "&zipcode_gubun_code=" + zipcode_gubun_code;
            params   += "&zipcode=" + zipcode;
            params   += "&ser_no=" + ser_no;
            params   += "&jibun_basic_address=" + jibun_basic_address;
            params   += "&jibun_detail_address=" + jibun_detail_address;
            params   += "&streetname_basic_address=" + streetname_basic_address;
            params   += "&streetname_detail_address=" + streetname_detail_address;
            params   += "&streetname_zipcode=" + streetname_zipcode;
            params   += "&streetname_manage_num=" + streetname_manage_num;
            params   += "&streetname_area_code=" + streetname_area_code;
            params   += "&jiha_yn=" + jiha_yn;
            params   += "&building_major_num=" + building_major_num;
            params   += "&building_minor_num=" + building_minor_num;
            params   += "&building_manage_num=" + building_manage_num;
            params   += "&streetname_eupmyun_seq=" + streetname_eupmyun_seq;
            params   += "&streetname_detail=" + streetname_detail;
        //window.open(caq.util.encodeURI(url+params),"popupZipcode",attribute);
        caq.popup.iFrameShow("popupZipcode",caq.util.encodeURI(url+params),address2_name);

      },

     /**
       * caq.popupZipcodeInqueryWithTypeStreetNamePlusSix() : 우편번호조회 팝업페이지 오픈(도로명)(5자리 일괄 전환에 따른 기존 6자리 포함)
       * @param {Object} form_name                  : 폼이름(form)
       * @param {Object} zipcode1_name              : 우편번호1(text)
       * @param {Object} zipcode2_name              : 우편번호2(text)
       * @param {Object} address1_name              : 우편번호주소(text)
       * @param {Object} address2_name              : 상세주소(text)
       * @param {Object} usage_cleanaddress         : 정제주소사용여부(Y:정제, N:일반)
       * @param {Object} zip_serial_name            : 우편일련번호(선택사항)(hidden)
       * @param {Object} formatted_type             : 표준화주소용(hidden)
       * @param {Object} zipcode_gubun_code         : 주소표시구분코드 (hidden)
       * @param {Object} zipcode                    : 지번우편번호(hidden)
       * @param {Object} ser_no                     : 지번일련번호(hidden)
       * @param {Object} jibun_basic_address        : 지번기본주소(hidden)
       * @param {Object} jibun_detail_address       : 지번상세주소(hidden)
       * @param {Object} streetname_basic_address   : 도로기본주소(hidden)
       * @param {Object} streetname_detail_address  : 도로상세주소(hidden)
       * @param {Object} streetname_zipcode         : 도로명우편번호(hidden)
       * @param {Object} streetname_manage_num      : 도로명우편보조번호(hidden)
       * @param {Object} streetname_area_code       : 도로명구역코드(hidden)
       * @param {Object} jiha_yn                    : 도로명지하구분(hidden)
       * @param {Object} building_major_num         : 도로명건물본번호(hidden)
       * @param {Object} building_minor_num         : 도로명건물부번호(hidden)
       * @param {Object} building_manage_num        : 도로명건물관리번호(hidden)
       * @param {Object} streetname_eupmyun_seq     : 도로명읍면번호(hidden)
       * @param {Object} streetname_detail          : 도로명상세주소(hidden)
       * @param {Object} zipcode_origin          : 우편번호6자리(hidden)
       * @param {Object} zip_serial_name_origin          : 우편번호6자리 일련번호(hidden)
       */
      popupZipcodeInqueryWithTypeStreetNamePlusSix : function(
            form_name
          , zipcode1_name
          , zipcode2_name
          , address1_name
          , address2_name
          , usage_cleanaddress
          , zip_serial_name
          , formatted_type
          , zipcode_gubun_code
          , zipcode
          , ser_no
          , jibun_basic_address
          , jibun_detail_address
          , streetname_basic_address
          , streetname_detail_address
          , streetname_zipcode
          , streetname_manage_num
          , streetname_area_code
          , jiha_yn
          , building_major_num
          , building_minor_num
          , building_manage_num
          , streetname_eupmyun_seq
          , streetname_detail
          , zipcode_origin
          , zip_serial_name_origin
        ) {

        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C023406&QSL=F";
        var params    = "&form_name=" + form_name;
            params   += "&zip1_field_name=" + zipcode1_name;
            params   += "&zip2_field_name=" + zipcode2_name;
            params   += "&address1_field_name=" + address1_name;
            params   += "&address2_field_name=" + address2_name;
            params   += "&clean_address=" + usage_cleanaddress;
            params   += "&zip_serial_name=" + zip_serial_name;
            params   += "&functionName=none";
            params   += "&formatted_type=" + formatted_type;
            params   += "&zipcode_gubun_code=" + zipcode_gubun_code;
            params   += "&zipcode=" + zipcode;
            params   += "&ser_no=" + ser_no;
            params   += "&jibun_basic_address=" + jibun_basic_address;
            params   += "&jibun_detail_address=" + jibun_detail_address;
            params   += "&streetname_basic_address=" + streetname_basic_address;
            params   += "&streetname_detail_address=" + streetname_detail_address;
            params   += "&streetname_zipcode=" + streetname_zipcode;
            params   += "&streetname_manage_num=" + streetname_manage_num;
            params   += "&streetname_area_code=" + streetname_area_code;
            params   += "&jiha_yn=" + jiha_yn;
            params   += "&building_major_num=" + building_major_num;
            params   += "&building_minor_num=" + building_minor_num;
            params   += "&building_manage_num=" + building_manage_num;
            params   += "&streetname_eupmyun_seq=" + streetname_eupmyun_seq;
            params   += "&streetname_detail=" + streetname_detail;
            params   += "&zipcode_origin=" + zipcode_origin;
            params   += "&zip_serial_name_origin=" + zip_serial_name_origin;
        //window.open(caq.util.encodeURI(url+params),"popupZipcode",attribute);
        caq.popup.iFrameShow("popupZipcode",caq.util.encodeURI(url+params),address2_name);

      },

      /**
       * caq.popupZipcodeInqueryStreetNameTabMenu() : 우편번호조회 팝업페이지 오픈(도로명)
       * @param {Object} form_name                  : 폼이름(form)
       * @param {Object} zipcode1_name              : 우편번호1(text)
       * @param {Object} zipcode2_name              : 우편번호2(text)
       * @param {Object} address1_name              : 우편번호주소(text)
       * @param {Object} address2_name              : 상세주소(text)
       * @param {Object} usage_cleanaddress         : 정제주소사용여부(Y:정제, N:일반)
       * @param {Object} zip_serial_name            : 우편일련번호(선택사항)(hidden)
       * @param {Object} zipcode_gubun_code         : 주소표시구분코드 (hidden)
       * @param {Object} zipcode                    : 지번우편번호(hidden)
       * @param {Object} ser_no                     : 지번일련번호(hidden)
       * @param {Object} jibun_basic_address        : 지번기본주소(hidden)
       * @param {Object} jibun_detail_address       : 지번상세주소(hidden)
       * @param {Object} streetname_basic_address   : 도로기본주소(hidden)
       * @param {Object} streetname_detail_address  : 도로상세주소(hidden)
       * @param {Object} streetname_zipcode         : 도로명우편번호(hidden)
       * @param {Object} streetname_manage_num      : 도로명우편보조번호(hidden)
       * @param {Object} streetname_area_code       : 도로명구역코드(hidden)
       * @param {Object} jiha_yn                    : 도로명지하구분(hidden)
       * @param {Object} building_major_num         : 도로명건물본번호(hidden)
       * @param {Object} building_minor_num         : 도로명건물부번호(hidden)
       * @param {Object} building_manage_num        : 도로명건물관리번호(hidden)
       * @param {Object} streetname_eupmyun_seq     : 도로명읍면번호(hidden)
       * @param {Object} streetname_detail          : 도로명상세주소(hidden)
       */
      popupZipcodeInqueryStreetNameTabMenu : function(
            form_name
          , zipcode1_name
          , zipcode2_name
          , address1_name
          , address2_name
          , usage_cleanaddress
          , zip_serial_name
          , zipcode_gubun_code
          , zipcode
          , ser_no
          , jibun_basic_address
          , jibun_detail_address
          , streetname_basic_address
          , streetname_detail_address
          , streetname_zipcode
          , streetname_manage_num
          , streetname_area_code
          , jiha_yn
          , building_major_num
          , building_minor_num
          , building_manage_num
          , streetname_eupmyun_seq
          , streetname_detail
        ) {

        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C023406&cc=b037582:b038539&QSL=F";
        var params    = "&form_name=" + form_name;
            params   += "&zip1_field_name=" + zipcode1_name;
            params   += "&zip2_field_name=" + zipcode2_name;
            params   += "&address1_field_name=" + address1_name;
            params   += "&address2_field_name=" + address2_name;
            params   += "&clean_address=" + usage_cleanaddress;
            params   += "&zip_serial_name=" + zip_serial_name;
            params   += "&functionName=none";
            params   += "&zipcode_gubun_code=" + zipcode_gubun_code;
            params   += "&zipcode=" + zipcode;
            params   += "&ser_no=" + ser_no;
            params   += "&jibun_basic_address=" + jibun_basic_address;
            params   += "&jibun_detail_address=" + jibun_detail_address;
            params   += "&streetname_basic_address=" + streetname_basic_address;
            params   += "&streetname_detail_address=" + streetname_detail_address;
            params   += "&streetname_zipcode=" + streetname_zipcode;
            params   += "&streetname_manage_num=" + streetname_manage_num;
            params   += "&streetname_area_code=" + streetname_area_code;
            params   += "&jiha_yn=" + jiha_yn;
            params   += "&building_major_num=" + building_major_num;
            params   += "&building_minor_num=" + building_minor_num;
            params   += "&building_manage_num=" + building_manage_num;
            params   += "&streetname_eupmyun_seq=" + streetname_eupmyun_seq;
            params   += "&streetname_detail=" + streetname_detail;
        //window.open(caq.util.encodeURI(url+params),"popupZipcode",attribute);
        caq.popup.iFrameShow("popupZipcode",caq.util.encodeURI(url+params),address2_name);

      },

      /**
       * caq.popupZipcodeInqueryWithTypeStreetNameTabMenu() : 우편번호조회 팝업페이지 오픈(도로명)
       * @param {Object} form_name                  : 폼이름(form)
       * @param {Object} zipcode1_name              : 우편번호1(text)
       * @param {Object} zipcode2_name              : 우편번호2(text)
       * @param {Object} address1_name              : 우편번호주소(text)
       * @param {Object} address2_name              : 상세주소(text)
       * @param {Object} usage_cleanaddress         : 정제주소사용여부(Y:정제, N:일반)
       * @param {Object} zip_serial_name            : 우편일련번호(선택사항)(hidden)
       * @param {Object} formatted_type             : 표준화주소용(hidden)
       * @param {Object} zipcode_gubun_code         : 주소표시구분코드 (hidden)
       * @param {Object} zipcode                    : 지번우편번호(hidden)
       * @param {Object} ser_no                     : 지번일련번호(hidden)
       * @param {Object} jibun_basic_address        : 지번기본주소(hidden)
       * @param {Object} jibun_detail_address       : 지번상세주소(hidden)
       * @param {Object} streetname_basic_address   : 도로기본주소(hidden)
       * @param {Object} streetname_detail_address  : 도로상세주소(hidden)
       * @param {Object} streetname_zipcode         : 도로명우편번호(hidden)
       * @param {Object} streetname_manage_num      : 도로명우편보조번호(hidden)
       * @param {Object} streetname_area_code       : 도로명구역코드(hidden)
       * @param {Object} jiha_yn                    : 도로명지하구분(hidden)
       * @param {Object} building_major_num         : 도로명건물본번호(hidden)
       * @param {Object} building_minor_num         : 도로명건물부번호(hidden)
       * @param {Object} building_manage_num        : 도로명건물관리번호(hidden)
       * @param {Object} streetname_eupmyun_seq     : 도로명읍면번호(hidden)
       * @param {Object} streetname_detail          : 도로명상세주소(hidden)
       */
      popupZipcodeInqueryWithTypeStreetNameTabMenu : function(
            form_name
          , zipcode1_name
          , zipcode2_name
          , address1_name
          , address2_name
          , usage_cleanaddress
          , zip_serial_name
          , formatted_type
          , zipcode_gubun_code
          , zipcode
          , ser_no
          , jibun_basic_address
          , jibun_detail_address
          , streetname_basic_address
          , streetname_detail_address
          , streetname_zipcode
          , streetname_manage_num
          , streetname_area_code
          , jiha_yn
          , building_major_num
          , building_minor_num
          , building_manage_num
          , streetname_eupmyun_seq
          , streetname_detail
        ) {

        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C023406&cc=b037582:b038539&QSL=F";
        var params    = "&form_name=" + form_name;
            params   += "&zip1_field_name=" + zipcode1_name;
            params   += "&zip2_field_name=" + zipcode2_name;
            params   += "&address1_field_name=" + address1_name;
            params   += "&address2_field_name=" + address2_name;
            params   += "&clean_address=" + usage_cleanaddress;
            params   += "&zip_serial_name=" + zip_serial_name;
            params   += "&functionName=none";
            params   += "&formatted_type=" + formatted_type;
            params   += "&zipcode_gubun_code=" + zipcode_gubun_code;
            params   += "&zipcode=" + zipcode;
            params   += "&ser_no=" + ser_no;
            params   += "&jibun_basic_address=" + jibun_basic_address;
            params   += "&jibun_detail_address=" + jibun_detail_address;
            params   += "&streetname_basic_address=" + streetname_basic_address;
            params   += "&streetname_detail_address=" + streetname_detail_address;
            params   += "&streetname_zipcode=" + streetname_zipcode;
            params   += "&streetname_manage_num=" + streetname_manage_num;
            params   += "&streetname_area_code=" + streetname_area_code;
            params   += "&jiha_yn=" + jiha_yn;
            params   += "&building_major_num=" + building_major_num;
            params   += "&building_minor_num=" + building_minor_num;
            params   += "&building_manage_num=" + building_manage_num;
            params   += "&streetname_eupmyun_seq=" + streetname_eupmyun_seq;
            params   += "&streetname_detail=" + streetname_detail;
        //window.open(caq.util.encodeURI(url+params),"popupZipcode",attribute);
        caq.popup.iFrameShow("popupZipcode",caq.util.encodeURI(url+params),address2_name);

      },

      /**
       * caq.popupZipcodeInqueryWithTypeStreetNameLand() : 우편번호조회 팝업페이지 오픈(도로명)(부동산용)
       * @param {Object} form_name                  : 폼이름(form)
       * @param {Object} zipcode1_name              : 우편번호1(text)
       * @param {Object} zipcode2_name              : 우편번호2(text)
       * @param {Object} address1_name              : 우편번호주소(text)
       * @param {Object} address2_name              : 상세주소(text)
       * @param {Object} usage_cleanaddress         : 정제주소사용여부(Y:정제, N:일반)
       * @param {Object} zip_serial_name            : 우편일련번호(선택사항)(hidden)
       * @param {Object} formatted_type             : 표준화주소용(hidden)
       * @param {Object} zipcode_gubun_code         : 주소표시구분코드 (hidden)
       * @param {Object} zipcode                    : 지번우편번호(hidden)
       * @param {Object} ser_no                     : 지번일련번호(hidden)
       * @param {Object} jibun_basic_address        : 지번기본주소(hidden)
       * @param {Object} jibun_detail_address       : 지번상세주소(hidden)
       * @param {Object} streetname_basic_address   : 도로기본주소(hidden)
       * @param {Object} streetname_detail_address  : 도로상세주소(hidden)
       * @param {Object} streetname_zipcode         : 도로명우편번호(hidden)
       * @param {Object} streetname_manage_num      : 도로명우편보조번호(hidden)
       * @param {Object} streetname_area_code       : 도로명구역코드(hidden)
       * @param {Object} jiha_yn                    : 도로명지하구분(hidden)
       * @param {Object} building_major_num         : 도로명건물본번호(hidden)
       * @param {Object} building_minor_num         : 도로명건물부번호(hidden)
       * @param {Object} building_manage_num        : 도로명건물관리번호(hidden)
       * @param {Object} streetname_eupmyun_seq     : 도로명읍면번호(hidden)
       * @param {Object} streetname_detail          : 도로명상세주소(hidden)
       */
      popupZipcodeInqueryWithTypeStreetNameLand : function(
            form_name
          , zipcode1_name
          , zipcode2_name
          , address1_name
          , address2_name
          , usage_cleanaddress
          , zip_serial_name
          , formatted_type
          , zipcode_gubun_code
          , zipcode
          , ser_no
          , jibun_basic_address
          , jibun_detail_address
          , streetname_basic_address
          , streetname_detail_address
          , streetname_zipcode
          , streetname_manage_num
          , streetname_area_code
          , jiha_yn
          , building_major_num
          , building_minor_num
          , building_manage_num
          , streetname_eupmyun_seq
          , streetname_detail
        ) {

        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C024967&QSL=F";
        var params    = "&form_name=" + form_name;
            params   += "&zip1_field_name=" + zipcode1_name;
            params   += "&zip2_field_name=" + zipcode2_name;
            params   += "&address1_field_name=" + address1_name;
            params   += "&address2_field_name=" + address2_name;
            params   += "&clean_address=" + usage_cleanaddress;
            params   += "&zip_serial_name=" + zip_serial_name;
            params   += "&functionName=none";
            params   += "&formatted_type=" + formatted_type;
            params   += "&zipcode_gubun_code=" + zipcode_gubun_code;
            params   += "&zipcode=" + zipcode;
            params   += "&ser_no=" + ser_no;
            params   += "&jibun_basic_address=" + jibun_basic_address;
            params   += "&jibun_detail_address=" + jibun_detail_address;
            params   += "&streetname_basic_address=" + streetname_basic_address;
            params   += "&streetname_detail_address=" + streetname_detail_address;
            params   += "&streetname_zipcode=" + streetname_zipcode;
            params   += "&streetname_manage_num=" + streetname_manage_num;
            params   += "&streetname_area_code=" + streetname_area_code;
            params   += "&jiha_yn=" + jiha_yn;
            params   += "&building_major_num=" + building_major_num;
            params   += "&building_minor_num=" + building_minor_num;
            params   += "&building_manage_num=" + building_manage_num;
            params   += "&streetname_eupmyun_seq=" + streetname_eupmyun_seq;
            params   += "&streetname_detail=" + streetname_detail;
        //window.open(caq.util.encodeURI(url+params),"popupZipcode",attribute);
        caq.popup.iFrameShow("popupZipcode",caq.util.encodeURI(url+params),address2_name);

      },

      /**
       * caq.popupSmsTransfer(title_msg, sender_number, msg, guide, department_code, customer_code, mnrcvAcno, mnrcvBnkCd) : SMS발송 요청
       * @param {Object} title_msg       : 타이틀
       * @param {Object} sender_number   : 보내는 사람 전화번호
       * @param {Object} msg             : 메세지
       * @param {Object} guide           : 가이드
       * @param {Object} department_code : 코드
       * @param {Object} customer_code   : 코드
       * @param {Object} mnrcvAcno       : 계좌번호
       * @param {Object} mnrcvBnkCd      : 뱅킹 코드
       */
      popupSmsTransfer : function(title_msg, sender_number, msg, guide, department_code, customer_code, mnrcvAcno, mnrcvBnkCd){
        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C019695&QSL=F";
        var params    = "&title_msg="+title_msg+"&sender_number="+sender_number+"&msg="+msg+"&guide="+guide;
            params   += "&department_code="+department_code+"&customer_code="+customer_code+"&mnrcvAcno="+mnrcvAcno+"&mnrcvBnkCd="+mnrcvBnkCd;
        window.open(caq.util.encodeURI(url+params),"popupSms",attribute);
        //caq.popup.iFrameShow("popupSms",caq.util.encodeURI(url+params));
      },
      
      /**
       * TOBE SMS 발송관련 신규 스크립트 20200710
       * caq.popupSmsTransfer(title_msg, sender_number, msg, guide, department_code, customer_code, mnrcvAcno, mnrcvBnkCd, smsMsgId) : SMS발송 요청
       * @param {Object} title_msg       : 타이틀
       * @param {Object} sender_number   : 보내는 사람 전화번호
       * @param {Object} msg             : 메세지
       * @param {Object} guide           : 가이드
       * @param {Object} department_code : 코드
       * @param {Object} customer_code   : 코드
       * @param {Object} mnrcvAcno       : 계좌번호
       * @param {Object} mnrcvBnkCd      : 뱅킹 코드
       * @param {Object} smsMsgId      : 메시지생성코드
       */
      popupSmsTransfer : function(title_msg, sender_number, msg, guide, department_code, customer_code, mnrcvAcno, mnrcvBnkCd, smsMsgId){
        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C019695&QSL=F";
        var params    = "&title_msg="+title_msg+"&sender_number="+sender_number+"&msg="+msg+"&guide="+guide;
        params   += "&department_code="+department_code+"&customer_code="+customer_code+"&mnrcvAcno="+mnrcvAcno+"&mnrcvBnkCd="+mnrcvBnkCd+"&smsMsgId="+smsMsgId;
        window.open(caq.util.encodeURI(url+params),"popupSms",attribute);
        //caq.popup.iFrameShow("popupSms",caq.util.encodeURI(url+params));
      },      

      /**
       * caq.popupBranchInquery(form_name, branch_name, branch_code, branch_phonenumber) : 지점검색
       * @param {Object} form_name          : Fomm 태그 name
       * @param {Object} branch_name        : 지점명 input name
       * @param {Object} branch_code        : 지점코드 input name
       * @param {Object} branch_phonenumber : 지점전화번호 input name
       */
      popupBranchInquery : function(form_name, branch_name, branch_code, branch_phonenumber){
        var attribute = "width=550,height=500,toolbar=no,status=yes,menubar=no,scrollbars="+caq.util.getScrollbarsFlag()+",resizable=no,top=150,left=400";
        var url       = "/quics?page=C019694&QSL=F";
        var params    = "&form_name=" + form_name + "&branch_name=" + branch_name;
            params   += "&branch_code=" + branch_code+ "&branch_phonenumber=" + branch_phonenumber;
        //window.open(caq.util.encodeURI(url+params),"popupBranch",attribute);
        caq.popup.iFrameShow("popupBranch",caq.util.encodeURI(url+params),branch_name);
      },
      

      /**
       * caq.popupAutoResize(mWidth, mHeight) : 팝업창 자동 사이즈 조정
       * @param {Object} mWidth  : 최소 width
       * @param {Object} mHeight : 최소 height
       */
      popupAutoResize : function(mWidth, mHeight){

        $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); // 크롬 브라우저 분기

        var marginY      = 0;
        var pWidth       = 0;
        var pHeight      = 0;
        var parentStr    = "WPOP";
        var minWidth     = (mWidth===undefined)  ? 550 : mWidth;
        var minHeight    = (mHeight===undefined) ? 550 : mHeight;
        var childObj     = $("#"+parentStr+" > div");
        var initWidth    = 0;
        var initHeight   = 0;
        var errCloseFlag = ($("#errorClose").is("span") && $("#errorClose").css("display") != "none");

        // WPOP 자식 DIV의 height 값 계산
        initWidth = minWidth;
        childObj.each(function(){
          var marginBottom = 0;
          var marginDiv    = $(this).find("div");
          marginDiv.each(function(){
            var tempMargin = 0;
            try{
              tempMargin = parseInt($(this).css("margin-bottom").replace("px",""));
            }catch(e){}
            if(tempMargin<0)
              marginBottom += parseInt(tempMargin)*(-1);
            var tempMargin1 = 0;
            try{
              tempMargin1 = parseInt($(this).css("margin-top").replace("px",""));
            }catch(e){}
            if(tempMargin1<0)
              marginBottom += parseInt(tempMargin1)*(-1);
          });
          initHeight += ($(this).height() + marginBottom);
        });

        // 초기창 크기 설정
        if($.browser.msie){
          try{
            window.resizeTo(minWidth, minHeight);
          }catch(e){
            alert(msg.getMsg(caq.getLangType(),"MSG00019"));
            window.resizeTo(minWidth, minHeight);
          }
        }else{
          window.resizeTo(minWidth, minHeight);
        }

        var thisX      = parseInt(initWidth);
        var thisY      = parseInt(initHeight);
        var maxThisX   = minWidth;
        var maxThisY   = minHeight;

        // 브라우저별 분기
        if($.browser.msie){
          if($.browser.version=="6.0"){
            marginY = 30;
            if(errCloseFlag) marginY +=17;
          }else if($.browser.version=="7.0"){
            marginY = 30;
            if(errCloseFlag) marginY +=18; //40;
          }else if($.browser.version=="8.0"){
            marginY = 15;
            if(errCloseFlag) marginY +=33; //55;
          }else{
            marginY = 15;
            if(errCloseFlag) marginY +=33;
          }
        }else if($.browser.chrome){
          marginY = 15;
          $.browser.safari = false;
          if(errCloseFlag) marginY +=33;
        }else if($.browser.safari){
          marginY = 15;
          if(errCloseFlag) marginY +=32;
        }else if($.browser.opera){
          marginY = 15;
          if(errCloseFlag) marginY +=32;
        }else if($.browser.mozilla){
          marginY = 46;
          if(errCloseFlag) marginY +=15;
        }else{
          marginY = 0;
        }

        // 여백 계산
        if (thisX > maxThisX) {
          window.document.body.scroll = "yes";
          thisX = maxThisX;
        }

        if (thisY > maxThisY - marginY) {
          window.document.body.scroll = "yes";
          thisX += 19;
          thisY = maxThisY - marginY;
        }

        pWidth  = ( (thisX+10)      > minWidth  ) ? minWidth  : (thisX+10);
        pHeight = ( (thisY+marginY) > minHeight ) ? minHeight : (thisY+marginY);

        // 팝업창 리사이징
        if($.browser.msie){
          try{
            window.resizeTo(pWidth, pHeight);
          }catch(e){
            alert(msg.getMsg(caq.getLangType(),"MSG00019"));
            window.resizeTo(pWidth, pHeight);
          }
        }else{
          window.resizeTo(pWidth, pHeight);
        }

        // 화면 중앙으로 위치 변경
        var windowX = (screen.width-pWidth)/2;
        var windowY = (screen.height-pHeight)/2;
        if($.browser.msie){
          try{
            window.moveTo(windowX, windowY);
          }catch(e){
            alert(msg.getMsg(caq.getLangType(),"MSG00019"));
            window.moveTo(windowX, windowY);
          }
        }else{
          window.moveTo(windowX, windowY);
        }

      },

      /**
       * caq.popupAutoResizeMini(mWidth, mHeight) : 팝업창 자동 사이즈 조정(미니뱅킹용)
       * @param {Object} mWidth  : 최소 width
       * @param {Object} mHeight : 최소 height
       */
      popupAutoResizeMini : function(mWidth, mHeight){

        $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); // 크롬 브라우저 분기

        var marginY    = 0;
        var pWidth     = 0;
        var pHeight    = 0;
        var parentStr  = ".wrapAll";
        var minWidth   = (mWidth===undefined)  ? 520 : mWidth;
        var minHeight  = (mHeight===undefined) ? 625 : mHeight;

        // 초기창 크기 설정
        if($.browser.msie){
          try{
            window.resizeTo(minWidth, minHeight);
          }catch(e){
            alert(msg.getMsg(caq.getLangType(),"MSG00019"));
            window.resizeTo(minWidth, minHeight);
          }
        }else{
          window.resizeTo(minWidth, minHeight);
        }

        var thisX      = parseInt(minWidth);
        var thisY      = parseInt(minHeight);
        var maxThisX   = minWidth;
        var maxThisY   = minHeight;

        // 브라우저별 분기
        if($.browser.msie){
          if($.browser.version=="6.0"){
            marginY = 30;
          }else if($.browser.version=="7.0"){
            marginY = 30;
          }else if($.browser.version=="8.0"){
            marginY = 15;
          }else{
            marginY = 0;
          }
        }else if($.browser.chrome){
          marginY = 15;
        $.browser.safari = false;
        }else if($.browser.safari){
          marginY = 15;
        }else if($.browser.opera){
          marginY = 15;
        }else if($.browser.mozilla){
          marginY = 46;
        }else{
          marginY = 0;
        }

        // 여백 계산
        if (thisX > maxThisX) {
          window.document.body.scroll = "yes";
          window.document.body.scroll.overflow = "yes";
          thisX = maxThisX;
        }

        if (thisY > maxThisY - marginY) {
          window.document.body.scroll = "yes";
          window.document.body.scroll.overflow = "yes";
          thisX += 19;
          thisY = maxThisY - marginY;
        }

        pWidth  = ( (thisX+10)      > minWidth  ) ? minWidth  : (thisX+10);
        pHeight = ( (thisY+marginY) > minHeight ) ? minHeight : (thisY+marginY);

        // 팝업창 리사이징
        if($.browser.msie){
          try{
            window.resizeTo(pWidth, pHeight);
          }catch(e){
            alert(msg.getMsg(caq.getLangType(),"MSG00019"));
            window.resizeTo(pWidth, pHeight);
          }
        }else{
          window.resizeTo(pWidth, pHeight);
        }
      },

      /**
       * caq.popupIframeAutoResize(divId, mWidth, mHeight) : 팝업창 자동 사이즈 조정
       * @param {Object} divId   : 팝업 DIV ID
       * @param {Object} mWidth  : 최소 width
       * @param {Object} mHeight : 최소 height
       */
      popupIframeAutoResize : function(divId, mWidth, mHeight){
        var isParentFlag = false;
        var objForm      = null;
        try{
          objForm = $(parent.document).find("#"+divId);
          if(objForm.is("div")) isParentFlag = true;
        }catch(e){}
        if(isParentFlag){
          $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); // 크롬 브라우저 분기
          var marginY      = 0;
          var pWidth       = 0;
          var pHeight      = 0;
          var parentStr    = "WPOP";
          var minWidth     = (mWidth===undefined)  ? 550 : mWidth;
          var minHeight    = (mHeight===undefined) ? 550 : mHeight;
          var childObj     = $("#"+parentStr+" > div");
          var initWidth    = 0;
          var initHeight   = 0;
          var errCloseFlag = ($("#errorClose").is("span") && $("#errorClose").css("display") != "none");

          // WPOP 자식 DIV의 height 값 계산
          initWidth = minWidth;
          childObj.each(function(){
            var marginBottom = 0;
            var marginDiv    = $(this).find("div");
            marginDiv.each(function(){
              var tempMargin = 0;
              try{
                tempMargin = parseInt($(this).css("margin-bottom").replace("px",""));
              }catch(e){}
              if(tempMargin<0)
                marginBottom += parseInt(tempMargin)*(-1);
              var tempMargin1 = 0;
              try{
                tempMargin1 = parseInt($(this).css("margin-top").replace("px",""));
              }catch(e){}
              if(tempMargin1<0)
                marginBottom += parseInt(tempMargin1)*(-1);
            });
            initHeight += ($(this).height() + marginBottom);
          });

          // 초기창 크기 설정
          objForm.width(minWidth);
          objForm.height(minHeight);

          var thisX      = parseInt(initWidth);
          var thisY      = parseInt(initHeight);
          var maxThisX   = minWidth;
          var maxThisY   = minHeight;

          // 브라우저별 분기
          if($.browser.msie){
            if($.browser.version=="6.0"){
              $("#errorDiv").css("margin-bottom","0px");
              $("#errorDivIn").css("margin-bottom","0px");
              marginY = -25;
              if(errCloseFlag) marginY +=15;
            }else if($.browser.version=="7.0"){
              $("#errorDiv").css("margin-bottom","0px");
              $("#errorDivIn").css("margin-bottom","0px");
              marginY = -40;
              if(errCloseFlag) marginY +=30;
            }else if($.browser.version=="8.0"){
              marginY = -20;
              if(errCloseFlag) marginY +=10;
            }else{
              marginY = -20;
              if(errCloseFlag) marginY +=10;
            }
          }else if($.browser.chrome){
            marginY = -30;
            $.browser.safari = false;
            if(errCloseFlag) marginY +=20;
          }else if($.browser.safari){
            marginY = -30;
            if(errCloseFlag) marginY +=20;
          }else if($.browser.opera){
            marginY = -40;
            if(errCloseFlag) marginY +=30;
          }else if($.browser.mozilla){
            $("#errorDiv").css("margin-bottom","0px");
            $("#errorDivIn").css("margin-bottom","0px");
            marginY = -15;
            if(errCloseFlag) marginY +=5;
          }else{
            marginY = 0;
          }

          // 여백 계산
          if (thisX > maxThisX) {
            if(caq.util.isIOSFlag()||caq.util.isAndroidFlag()){
              thisX = thisX;
            }else{
              if($.browser.mozilla && errCloseFlag){
                window.document.body.scroll = "no";
              }else{
                window.document.body.scroll = "yes";
              }
              thisX = maxThisX;
            }
          }

          if (thisY > maxThisY - marginY) {
            if(caq.util.isIOSFlag()||caq.util.isAndroidFlag()){
              thisY = thisY;
            }else{
              if($.browser.mozilla && errCloseFlag){
                window.document.body.scroll = "no";
              }else{
                window.document.body.scroll = "yes";
              }
              thisX += 19;
              thisY = maxThisY - marginY;
            }
          }

          pWidth  = ( (thisX+10)      > minWidth  ) ? minWidth  : (thisX+10);

          if(caq.util.isIOSFlag()||caq.util.isAndroidFlag()){
            pHeight = (thisY+marginY);
          }else{
            pHeight = ( (thisY+marginY) > minHeight ) ? minHeight : (thisY+marginY);
          }

          // 팝업창 리사이징
          objForm.width(pWidth);
          objForm.height(pHeight);

        }else{
          //alert("부모창이 존재하지 않습니다.");
        }
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 공통 팝업 Iframe
// * 소  속 : 업무공통팀
// * 작성일 : 2011-11-15
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------
  caq.popup = function(){
    var _NEXT_TARGET_OBJID = "";
    return {
      /**
       * caq.popup.iFrameShow(objId,url,nextObjId,sWidth,sHeight,sZindex) : 팝업레이어 Iframe 보여주기
       * @param {Object} objId     : 팝업레이어 DIV ID
       * @param {Object} url       : Iframe의 src 속성값
       * @param {Object} nextObjId : 닫기 후 focus 될 DOM객체의 ID
       * @param {Object} sWidth    : 팝업레이어 Div width (예:550)
       * @param {Object} sHeight   : 팝업레이어 Div height (예:550)
       * @param {Object} sZindex   : 팝업레이어 Div z-index (예:10005)
       */
      iFrameShow : function(objId,url,nextObjId,sWidth,sHeight,sZindex){
        _NEXT_TARGET_OBJID = nextObjId;
        sWidth  = (sWidth  === undefined) ? 550   : sWidth;
        sHeight = (sHeight === undefined) ? 550   : sHeight;
        sZindex = (sZindex === undefined) ? 10003 : sZindex;
        var iframeDiv  = "<div id='"+objId+"' style='display:none;background-color:#fff;'>";
            iframeDiv += "  <iframe src='javascript:false;' id='"+objId+"-Iframe' name='"+objId+"-Iframe' title='"+objId+"-Iframe' frameborder='0' style='width:100%;height:100%;'></iframe>";
            iframeDiv += "</div>";
        $("body").append(iframeDiv);
        if($.browser.msie && $.browser.version=="6.0"){
          caq.popup.iFrameSubmit(url,objId+"-Iframe");
        }else{
          $("#"+objId).find("iframe").attr("src",url);
        }
        var targetObj = $("#"+objId);
        targetObj.dialog({
          width:sWidth, height:sHeight,
          modal:true, zIndex:sZindex,
          resizable:false, bgiframe:true,
          closeOnEscape:false,
          open: function(event, ui) {
            targetObj.prev().hide();
            targetObj.parent().css({"overflow":"hidden","padding":"0px","border":"3px solid #5f584c","background":"transparent"});
            targetObj.css({"width":sWidth,"height":"auto","overflow":"hidden","padding":"0px","border":"0px"});
          }
        });
      },

      /**
       * caq.popup.iFramemodalessShow(objId,url,nextObjId,sWidth,sHeight,sZindex) : 팝업레이어 Iframe 보여주기
       * @param {Object} objId     : 팝업레이어 DIV ID
       * @param {Object} url       : Iframe의 src 속성값
       * @param {Object} nextObjId : 닫기 후 focus 될 DOM객체의 ID
       * @param {Object} sWidth    : 팝업레이어 Div width (예:550)
       * @param {Object} sHeight   : 팝업레이어 Div height (예:550)
       * @param {Object} sZindex   : 팝업레이어 Div z-index (예:10005)
       */
      iFramemodalessShow : function(objId,url,nextObjId,sWidth,sHeight,sZindex){
        _NEXT_TARGET_OBJID = nextObjId;
        sWidth  = (sWidth  === undefined) ? 550   : sWidth;
        sHeight = (sHeight === undefined) ? 550   : sHeight;
        sZindex = (sZindex === undefined) ? 10003 : sZindex;
        var iframeDiv  = "<div id='"+objId+"' style='display:none;background-color:#fff;'>";
            iframeDiv += "  <iframe src='javascript:false;' id='"+objId+"-Iframe' name='"+objId+"-Iframe' frameborder='0' style='width:100%;height:100%;'></iframe>";
            iframeDiv += "</div>";
        $("body").append(iframeDiv);
        if($.browser.msie && $.browser.version=="6.0"){
          caq.popup.iFrameSubmit(url,objId+"-Iframe");
        }else{
          $("#"+objId).find("iframe").attr("src",url);
        }
        var targetObj = $("#"+objId);
        targetObj.dialog({
          width:sWidth, height:sHeight,
          modal:false, zIndex:sZindex,
          resizable:false, bgiframe:true,
          closeOnEscape:false,
          open: function(event, ui) {
            targetObj.prev().hide();
            targetObj.parent().css({"overflow":"hidden","padding":"0px","border":"3px solid #5f584c","background":"transparent"});
            targetObj.css({"width":sWidth,"height":"auto","overflow":"hidden","padding":"0px","border":"0px"});
          }
        });
      },
      
      /**
       * caq.popup.iFrameHide(objId) : 팝업레이어 Iframe 숨기기
       * @param {Object} objId : 팝업레이어 DIV ID
       */
      iFrameHide : function(objId){
        $("#"+objId).dialog("close");
/*추가 20171121 진원 IE9 버그 수정 start*/
        try{
            $("#"+objId)[0].removeChild($("#"+objId)[0].children[0]);
        } catch(e){ }
/*추가 20171121 진원 IE9 버그 수정 end*/
        $("#"+objId).remove();
        
        var tarObj = $("input[name='"+_NEXT_TARGET_OBJID+"']");
        if(tarObj != null && typeof tarObj != "undefined") {
					try{ 
						if(tarObj.is("input") && tarObj.prop("readonly")){
		          tarObj.removeAttr("readonly");
		          tarObj.focus();
		          tarObj.attr("readonly","readonly");
		          tarObj.blur();
		        }else{
		          tarObj.focus();
		        }
					} catch(e){ }
				}
      },
      
      /**
       * caq.popup.iFrameHideFocus(objId) : 팝업레이어 Iframe 숨기기
       * @param {Object} objId : 팝업레이어 DIV ID
       */
      iFrameHideFocus : function(objId){
        $("#"+objId).dialog("close");
        $("#"+objId).remove();
       
        var tarObj = $("input[name='"+_NEXT_TARGET_OBJID+"']");
        if(tarObj != null && typeof tarObj != "undefined") {
					try{ 
						if(tarObj.is("input") && tarObj.prop("readonly")){
		          tarObj.removeAttr("readonly");
		          tarObj.focus();
		          tarObj.attr("readonly","readonly");
		          tarObj.blur();
		        }else{
		          tarObj.focus();
		        }
					} catch(e){ }
				}
      },
      
      /**
       * caq.popup.iFrameSubmit(url,target) : 팝업레이어 IE 6.0 버젼
       * @param {Object} url    : 팝업레이어 URL
       * @param {Object} target : 팝업레이어 폼이름
       */
      iFrameSubmit : function(url,target){
        var tempStr    = decodeURI(url);
        var tempParams = tempStr.split("?");
        var sUrl       = tempParams[0];
        var sParams    = tempParams[1];
        var tempFrm  = "<form name='_FORM_"+target+"' id='_FORM_"+target+"' method='post' action='' target='"+target+"'>";
            tempFrm += caq.util.paramsToInput(sParams);
            tempFrm += "</form>";
        $("body").append(tempFrm);
        if($("#_FORM_"+target+" #page").is("input")){
          sUrl = sUrl +"?page="+ $("#_FORM_"+target+" #page").val();
          $("#_FORM_"+target+" #page").remove();
        }
        $("#_FORM_"+target).attr("action",sUrl);
        $("#_FORM_"+target).submit();
        $("#_FORM_"+target).remove();
      },

     /**
       * caq.popup.iMobileShow(objId,sParams,ccCompId) : 팝업레이어 Iframe 보여주기[모바일용]
       * @param {Object} objId     : 팝업레이어 DIV ID
       * @param {Object} sParams       : 파라미터
       * @param {Object} ccCompId       : CC처리할 컴포넌트ID
       */
      iMobileShow : function(objId,sParams,ccCompId){
        
          var   tempHtml  = "<form name='_FORM_"+objId+"' id='_FORM_"+objId+"' method='post' action='' target='"+objId+"'>";   
                  tempHtml += caq.util.paramsToInput(sParams);
                  tempHtml +=  '<div id='+objId+' class="popupLayer"></div>';
                  tempHtml += "</form>";
 
          $("#_FORM_"+objId).remove(); 
          $("body").append(tempHtml);
                    
          var successCall = function() {
		  $("#"+objId+" .btn_close").click(function(){
			  caq.mobile.popupLayerHide(objId);
			  $("#"+objId).remove();
			  return false;
		  });

		 caq.mobile.popupLayerShow(objId,"100%","100%",10003,true);
	    };
      
        CAR_doAjaxCC_layer("/quics?page=C022055&amp;cc=b028364:"+ccCompId, objId, successCall, null);
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 공통에러 자바스크립트
// * 소  속 : 업무공통팀
// * 작성일 : 2011-08-07
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------

  caq.error = function(){

    var OPEN_ERROR_HTML = "";

    return{

      /**
       * caq.error.closeDiv() : 공통에러영역 숨기기
       */
      closeDiv : function(){
        $("#errorDiv").hide();
      },

      /**
       * caq.error.setCloseBtn(mode) : 공통에러영역 닫기 버튼
       * @param mode : 설정모드 (1:javascript:onClose(),2:window.close())
       */
      setCloseBtn : function(mode){
        var strHref = "";
        if(mode=="1"){
          strHref = "javascript:onClose();";
        }else if(mode=="2"){
          strHref = "javascript:window.close();";
        }else{
          strHref = "javascript:void(0);";
        }
        $("#errorClose").find("a").attr("href",strHref);
      },

      /**
       * caq.error.setErrorDiv() : 정상 로직시 Error DIV 숨기기
       */
      setErrorDiv : function(){
        var tarObj = $("#errorDiv");
        if(tarObj.css("display")=="none"){
          OPEN_ERROR_HTML = tarObj.html();
          tarObj.empty();
        }
      },

      /**
       * caq.error.getErrorDiv() : 에러 발생시 Error Div 보여주기
       */
      getErrorDiv : function(){
        var tarObj = $("#errorDiv");
        if(tarObj.css("display")=="none"){
          tarObj.empty();
          tarObj.html(OPEN_ERROR_HTML);
        }
      },

      /**
       * caq.error.setErrorMsg(errCode, errMsg, errUrl, errUrlNm, errLinkTxt, errLinkUrl, errLinkImgUrl, errAlertFlag) : 공통에러영역 보여주기
       * @param errCode       : 에러코드
       * @param errMsg        : 에러메세지
       * @param errUrl        : 에러메세지를 보여준후 이동할 PageUrl
       * @param errUrlNm      : 에러메세지를 보여준후 이동할 Page명
       * @param errLinkTxt    : 고객용안내내용
       * @param errLinkUrl    : 고객용안내URL
       * @param errLinkImgUrl : 고객용안내이미지경로내용
       * @param errAlertFlag  : 에러메세지 보여주는 형태 true: alert 에러문구 보여줌, false: 스크린영역의 에러처리
       */
      setErrorMsg : function(errCode, errMsg, errUrl, errUrlNm, errLinkTxt, errLinkUrl, errLinkImgUrl, errAlertFlag){
        if(errAlertFlag){
          alert("["+errCode+"] "+errMsg);
        }else{
          caq.error.getErrorDiv();
          if(errMsg != ""){
            var newErrLnk    = "";
            var newImgErrLnk = "";
            $("#errMsg").html(errMsg);
            if(errCode != ""){
              $("#errCd").html("("+errCode+")");
              $("#errUl").show();
            }else{
              $("#errUl").hide();
            }
            if(errLinkUrl != ""){
              newErrLnk = '<a href="'+errLinkUrl+'">'+errLinkTxt+'</a>';
            }else{
              newErrLnk = errLinkTxt;
            }
            if(errLinkImgUrl != ""){
              newImgErrLnk = '<a href="'+errLinkUrl+'">'+errLinkImgUrl+'</a>';
            }else{
              newImgErrLnk = errLinkImgUrl;
            }
            $("#linkText").html(newErrLnk + " " + newImgErrLnk);

            if(errUrl != "") {
              $("#errorTransfer").show();
              $("#errorTransfer #goPage").html(errUrlNm);
              $("#errorTransferBtn").show();
              $("#errorTransferBtn").find("span a").attr("href", errUrl);
            }else{
              $("#errorTransfer").hide();
              $("#errorTransferBtn").hide();
            }
            if(errLinkUrl != ""){
              $("#errorTransfer").hide();
              $("#errorTransferBtn").hide();
            }
            $("#errorDiv").show();
            $("html").scrollTop(0);
            $("body").scrollTop(0);
          }else{
            $("#errorDiv").hide();
          }
        }
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 자동로그아웃 자바스크립트
// * 소  속 : 업무공통팀
// * 작성일 : 2011-08-07
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------

  caq.session = function(){
    return{
      /**
       * caq.session.doAjaxSessionExtension() : doAjaxCC 또는 doAjaxAction 호출 후 자동로그아웃 타임머 재실행
       */
      doAjaxSessionExtension : function(){
        try{
          session.doAjaxSessionExtension();
        }catch(e){}
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 공통유틸 자바스크립트
// * 소  속 : 업무공통팀
// * 작성일 : 2011-08-23
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------

  caq.util = function(){

    var OPEN_IS_ANDROID = false;
    var OPEN_IS_IOS     = false;
    var OPEN_IS_PAD     = false;

    return{

      /**
       * caq.util.isNumStr(value) : 숫자로 구성된 문자열 체크
       * @param  {Object} value : 검증 문자열
       * @return {boolean}
       */
      isNumStr : function (value){
        var i;
        var str = null;
        str = new String(value);
        if(str == null || str.length == 0) return false;
        for(ii = 0; ii < str.length; ii++){
          if(!caq.util.isInt(str.charAt(ii)))
          return false;
        }
        return true;
      },

      /**
       * caq.util.isInt(value) : 한 글자가 숫자인지 체크
       * @param  {Object} value : 검증 문자열
       * @return {boolean}
       */
      isInt : function(value){
        var j;
        var _intValue = "0123456789";
        for(j=0;j<_intValue.length;j++){
          if(value == _intValue.charAt(j)) return true;
        }
        return false;
      },

      /**
       * caq.util.isDate(yyyymmdd) : 날짜 유효성 체크(병합된 yyyymmdd 값)
       * @param  {Object} yyyymmdd : 검증 문자열
       * @return {boolean}
       */
      isDate : function(yyyymmdd){
        var isTrue = false;
        if (caq.util.isNumStr(yyyymmdd)) {
          var yyyy = eval(yyyymmdd.substring(0,4));
          var mm = eval(yyyymmdd.substring(4,6));
          var dd = eval(yyyymmdd.substring(6,8));
          if (caq.util.isYearMonthDay(yyyy,mm-1,dd))isTrue = true;
        } else if (yyyymmdd == "") {
          isTrue = false;
        }
        return isTrue;
      },

      /**
       * caq.util.isYearMonthDay(yyyy, mm, dd) : 날짜 유효성 체크(분리된 yyyy, mm, dd 값)
       * @param  {Object} yyyy : 검증 문자열
       * @param  {Object} mm   : 검증 문자열
       * @param  {Object} dd   : 검증 문자열
       * @return {boolean}
       */
      isYearMonthDay : function (yyyy, mm, dd){
        var isTrue = false;
        var iMaxDay = caq.util.getLastDayOfMonth(yyyy, mm);
        if ( yyyy == "" && mm == "" && dd == "" ) {
          isTrue = true;
        } else {
          if ( (yyyy >= 1901) && (yyyy <= 9999) && (mm >= 0) && (mm <= 11) && (dd >= 1) && (dd <= iMaxDay) )
            isTrue = true;
        }
        return isTrue;
      },

      /**
       * caq.util.getLastDayOfMonth(year, month) : 해당 년월의 마지막일 계산
       * @param {Object} year   : 연
       * @param {Object} month  : 월
       */
      getLastDayOfMonth : function(year, month) {
        var tempDay = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        if(((year %4 ==0) && (year%100!=0)) ||(year%400 ==0)) tempDay[1] = 29;
        else tempDay[1] = 28;
        return tempDay[month];
      },

      /**
       * caq.util.onDateInputChanged(obj,lang) : 날짜 형식 검증
       * @param {Object} obj   : 객체
       * @param {Object} lang  : 언어
       */
      onDateInputChanged : function(obj,lang){
        var strTemp = "";
        var strVal  = $(obj).val();
        $(obj).val(strVal.replace(/[^0-9]/g,""));
        if(strVal.length < 8) {
          strTemp = strVal;
          return;
        }
        if(strVal.length > 8) {
          if(0 == strTemp.length){
            strTemp = strVal.substring(0,8);
          }
          $(obj).val(strTemp);
          return;
        }
        if(false == caq.util.isDate(strVal)){
          alert(msg.getMsg(caq.getLangType(),"MSG00001"));
          $(obj).val(strTemp);
          strTemp="";
        }
      },

      /**
       * caq.util.onDateInputChanged_m(obj,lang) : 날짜 형식 검증 (모바일용)
       * @param {Object} obj   : 객체
       * @param {Object} lang  : 언어
       */
      onDateInputChanged_m : function(obj,lang){
        var strTemp = "";
        var strVal  = $(obj).val();
        $(obj).val(strVal.replace(/[^0-9]/g,""));
        if(strVal.length < 8) {
          strTemp = strVal;
          return;
        }
        if(strVal.length > 8) {
          if(0 == strTemp.length){
            strTemp = strVal.substring(0,8);
          }
          $(obj).val(strTemp);
          return;
        }
        if(false == caq.util.isDate(strVal)){
          alert(msg.getMsg(caq.getLangType(),"MSG00001"));
          $(obj).val(strTemp);
          strTemp="";
        }
      },

      /**
       * caq.util.getSelIdx(objId, selVal) : selctc box에서 selected Value의 index 추출
       * @param {Object} objId   : DOM객체 ID
       * @param {Object} selVal  : 선택된 Value
       */
      getSelIdx : function(objId, selVal){
        var ret = 0;
        var obj = $("#" + objId + " option");
        obj.each(function(idx){
          if( selVal == Number($(this).val()) ) ret = idx;
        });
        return ret;
      },

      /**
       * caq.util.formInputControl : 영문숫자만 가능하게 (onkeyup이벤트에서 호출)
       * @param {Object} objId : 체크 대상 element id
       * @param {Object} chkCase = 1 : 숫자만 입력
       *                           2 : 영문만 입력
       *                           3 : 영숫자만 입력
       *                           4 : 계좌번호 입력
       *                           5 : 이메일 입력
       */
      formInputControl : function(objId, chkCase){
        var tempObj = $("#"+objId);
        var regVal  = null;
        if (tempObj.prop("readonly")) return false;
        switch(chkCase){
          case 1:
            regVal = /[^0-9]/g;
          break;
          case 2:
            regVal = /[^a-zA-Z]/g;
          break;
          case 3:
            regVal = /[^a-zA-Z0-9]/g;
          break;
          case 4:
            regVal = /[^-0-9]/g;
          break;
          case 5:
            regVal = /[\ \!\@\#\$\%\^\&\*\(\)\+\=\|\\\~\[\]\{\}\:\;\"\'\<\>\/\?\`]/g;
          break;
          default:
            regVal = /[^a-zA-Z0-9]/g;
        }
        var idVal = tempObj.val();
        tempObj.val(idVal.replace(regVal,""));
      },

      /**
       * caq.util.onMoveNext(objId, nextObjId, maxLength) : maxLength인 경우 nextObjId로 focus 이동 (ex)onMoveNext('id', 'pwd', 8)

       * @param {Object} objId     : 입력 maxLength 조사할 element
       * @param {Object} nextObjId : maxLength 시 이동할 element
       * @param {Object} maxLength : maxLength 값
       */
      onMoveNext : function(objId, nextObjId, maxLength){
        if ($("#"+objId).val().length >= maxLength)
          $("#"+nextObjId).focus();
      },

      /**
       * caq.util.isSsno(sID) : 주민번호 검증
       * @param {Object} sID  : 주민번호 value
       */
      isSsno : function(sID){
        if (sID == null || sID == '') return false;
        if (sID.length != 13) return false;
        if (!caq.util.isNumStr(sID)) return false; // sID가 숫자가 아닐겨우 return
        if (sID.charAt(6) <= "4") { //내국인
          cBit = 0;
          sCode="234567892345";
          for(i=0;i<12;i++){
            cBit = cBit+parseInt(sID.substring(i,i+1))*parseInt(sCode.substring(i,i+1));
          }
          cBit=11-(cBit%11);
          cBit=cBit%10;
          if(parseInt(sID.substring(12,13))==cBit)
            return true;
          else
            return false;
        } else { // 외국인
          if((sID.charAt(6) == "5") || (sID.charAt(6) == "6"))
            birthYear = "19";
          else if ((sID.charAt(6) == "7") || (sID.charAt(6) == "8"))
            birthYear = "20";
          else if ((sID.charAt(6) == "9") || (sID.charAt(6) == "0"))
            birthYear = "18";
          else
            return false;

          birthYear  += sID.substr(0, 2);
          birthMonth  = sID.substr(2, 2) - 1;
          birthDate   = sID.substr(4, 2);
          birth       = new Date(birthYear, birthMonth, birthDate);
          if (birth.getYear() % 100 != sID.substr(0, 2) || birth.getMonth() != birthMonth || birth.getDate() != birthDate) {
            return false;
          }
          if (fgn_no_chksum(sID) == false)
            return false;
          else
            return true;
        }
      },

      /**
       * caq.util.isFrgnSsno(sID) : 외국인번호 검증
       * @param {Object} sID  : 외국인번호 value
       */
      isFrgnSsno : function (sID) {
        var sum = 0;
        var odd = 0;
        buf = new Array(13);
        for (i = 0; i < 13; i++)
          buf[i] = parseInt(reg_no.charAt(i));
        odd = buf[7]*10 + buf[8];
        if (odd%2 != 0)
          return false;
        if ((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9))
          return false;
        multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
        for (i = 0, sum = 0; i < 12; i++)
          sum += (buf[i] *= multipliers[i]);
        sum=11-(sum%11);
        if (sum>=10)
          sum-=10;
        sum += 2;
        if (sum>=10)
          sum-=10;
        if ( sum != buf[12])
          return false;
        else
          return true;
      },

      /**
       * caq.util.getByteLength(inputId) : 입력값의 바이트 길이를 리턴
       * @param {Object} inputId  : input ID
       */
      getByteLength : function(inputId) {
        var obj = $("#"+inputId);
        var byteLength = 0;
        for (var inx = 0; inx < obj.val().length; inx++) {
          var oneChar = escape(obj.val().charAt(inx));
          if ( oneChar.length == 1 ) {
            byteLength ++;
          } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 2;
          } else if (oneChar.indexOf("%") != -1) {
            byteLength += oneChar.length/3;
          }
        }
        return byteLength;
      },

      /**
       * caq.util.isNull(inputId) : 입력값이 NULL인지 체크
       * @param {Object} inputId  : input ID
       */
      isNull : function(inputId) {
        var obj = $("#"+inputId);
        if (obj.val() == null || obj.val() == "") {
          return true;
        }
        return false;
      },

      /**
       * caq.util.encodeURI(paramStr) : Get형태의 문자열의 한글처리
       * @param {Object} paramStr : Get형태의 파라미터 문자열 (예:&test1=테스트1&test2=테스트2)
       */
      encodeURI : function(paramStr){
        var returnStr = "";
        if($.browser.msie ||($.browser.mozilla && $.browser.version == 11)){
          returnStr = encodeURI(paramStr);
        }else{
          returnStr = paramStr;
        }
        return returnStr;
      },

      /**
       * caq.util.getEncodeURI(strUrl) : Get형태의 문자열의 한글처리
       * @param {Object} strUrl : Get형태의 파라미터 문자열 (예:/quics?page=XXXXX&test1=테스트1&test2=테스트2)
       */
      getEncodeURI : function(strUrl){
        return caq.util.encodeURI(strUrl);
      },

      /**
       * caq.util.paramsToInput(paramStr) : Get형태의 문자열을 input 태그로 변환
       * @param {Object} paramStr : Get형태의 파라미터 문자열 (예:&test1=테스트1&test2=테스트2)
       */
      paramsToInput : function (paramStr){
        var params     = paramStr.split("&");
        var returnHtml = "";
        $(params).each(function(i) {
          var param = $(params).get(i).split("=");
          var key   = $(param).get(0);
          var val   = $(param).get(1);
          if(!(key===undefined || val===undefined)){
            returnHtml += '<input type="hidden" name="'+key+'" id="'+key+'" value="'+val+'"/>\n';
          }
        });
        return returnHtml;
      },

      /**
       * caq.util.localtionFormSubmit(frmId, pageNo, params) : jQuery UI Dialog 숨기기
       * @param {Object} frmId  : form 객채 ID/Name
       * @param {Object} pageNo : quics 페이지번호 (예:C018924)
       * @param {Object} params : Get형태의 파라미터 문자열 (예:&test1=테스트1&test2=테스트2)
       */
      localtionFormSubmit : function(frmId, pageNo, params){
        var formHtml  = '<form id="'+frmId+'" name="'+frmId+'" method="post" action="/quics">';
            formHtml += '<input type="hidden" name="page" id="page" value="'+pageNo+'"/>\n';
            formHtml += caq.util.paramsToInput(params);
            formHtml += '</form>';
        $("#"+frmId).remove();
        $("body").append(formHtml);
        $("#"+frmId).submit();
      },

      /**
       * caq.util.setFormParameter(formId, params) : form태그에 input 설정
       * @param {Object} formId : Form ID
       * @param {Object} params : Get형태의 파라미터 문자열 (예:test1=테스트1&test2=테스트2)
       */
      setFormParameter : function(formId, params){
        var tarObj = $("#"+formId);
        if(tarObj.is("form")){
          tarObj.empty();
          tarObj.html(caq.util.paramsToInput("&"+params));
        }
      },

      /**
       * caq.util.dialogShow(divId, width, height, zIndex, flag) : jQuery UI Dialog 보여주기
       * @param {Object} divId  : DOM객체의 ID
       * @param {Object} width  : Dialog의 width
       * @param {Object} height : Dialog의 height
       * @param {Object} zIndex : Dialog의 Z-Index 값
       * @param {Object} flag   : Dialog의 Modal 여부
       */
      dialogShow : function(divId, width, height, zIndex, flag){
        var targetObj = $("#"+divId);
        targetObj.dialog({
          width:width,
          height:height,
          modal:flag,
          zIndex:zIndex,
          resizable:false,
          bgiframe:true,
          open: function(event, ui) {
            //$(".ui-dialog-titlebar").hide();
            targetObj.prev().hide();
            targetObj.parent().css({"overflow":"hidden","padding":"0px","border":"0px","background":"transparent"});
            targetObj.css({"width":width,"height":"auto","overflow":"hidden","padding":"0px","border":"0px"});
          }
        });
        if(caq.util.isPadFlag()) $(".listWrap2").css({"overflow":"no","height":"auto"});
      },

      /**
       * caq.util.dialogHide(divId) : jQuery UI Dialog 숨기기
       * @param {Object} divId  : DOM객체의 ID
       */
      dialogHide : function(divId){
        $("#"+divId).dialog("close");
      },

      /**
       * caq.util.dialogHideFocusObj(divId,focobjId) : jQuery UI Dialog 숨기기
       * @param {Object} divId  : DOM객체의 ID
       * @param {Object} focobjId : Focus를 줄 객체의 ID
       */
      dialogHideFocusObj : function(divId, focobjId){
        $("#"+divId).dialog("close");
        var fObj = $("#"+focobjId);
        if(fObj.prop("readonly")){
          fObj.removeAttr("readonly");
          fObj.focus();
          fObj.attr("readonly","readonly");
          fObj.blur();
        }else{
          fObj.focus();
        }

      },

      /**
       * caq.util.zindexToggle(jQueryObj, dZindex, cZindex) : z-index toggle
       * @param {Object} jQbj    : jQuery Obj
       * @param {Object} dZindex : 기본 z-index 값
       * @param {Object} cZindex : 변경 z-index 값
       */
      zindexToggle : function(jQbj, dZindex, cZindex){
        try{
          var zIndex = jQbj.css("z-index");
          if(!(zIndex===undefined)){
            if(zIndex==dZindex){
              jQbj.css("z-index", cZindex);
            }else{
              jQbj.css("z-index", dZindex);
            }
          }
        }catch(e){}
      },

      /**
       * caq.util.setZindex(jQueryObj, sZindex) : z-index 설정
       * @param {Object} jQbj    : jQuery Obj
       * @param {Object} sZindex : 설정 z-index 값
       */
      setZindex : function(jQbj, sZindex){
        try{
          var zIndex = jQbj.css("z-index");
          if(!(zIndex===undefined)){
            jQbj.css("z-index", sZindex);
          }
        }catch(e){}
      },

      /**
       * caq.util.getScrollbarsFlag() : scrollbars 속성값 가져오기
       */
      getScrollbarsFlag : function(){
        return ($.browser.mozilla || $.browser.opera || $.browser.safari) ? "yes" : "no";
      },

      /**
       * caq.util.isPadFlag() : iPad & Galaxys Tab 판단
       */
      isPadFlag : function(){
        return OPEN_IS_PAD;
      },

      /**
       * caq.util.isAndroidFlag() : 안드로이드 O/S 판단
       */
      isAndroidFlag : function(){
        return OPEN_IS_ANDROID;
      },

      /**
       * caq.util.isIOSFlag() : I O/S 판단
       */
      isIOSFlag : function(){
        return OPEN_IS_IOS;
      },

      /**
       * caq.util.setUserAgent() : UserAgent 설정
       */
      setUserAgent : function(){
        OPEN_IS_ANDROID = /android/.test(navigator.userAgent.toLowerCase());
        OPEN_IS_IOS     = /ipad|ipod|iphone/.test(navigator.userAgent.toLowerCase());
        OPEN_IS_PAD     = /android|ipad/.test(navigator.userAgent.toLowerCase());
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 공통 JSP태그 자바스크립트
// * 소  속 : 업무공통팀
// * 작성일 : 2011-08-23
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------

  caq.tag = function(){

    var idCal_m, idDate_m, valY_m, valM_m, valD_m;

    return{

      /**
       * caq.tag.contView(objId) : DOM객체를 보이고/숨기고
       * @param {Object} objId : DOM객체의 ID
       */
      contView : function(objId){
        caq.tag.contShow(objId);
      },

      /**
       * caq.tag.contShow(objId) : DOM객체를 보이고/숨기고
       * @param {Object} objId : DOM객체의 ID
       */
      contShow : function(objId){
        if($("#"+objId).css("display") == "none") $("._POPUP_LAYER").hide();
        var tempHtml = '<div id="'+objId+'_dialog" class="_TEMP_LAYER" style="display:none;"></div>';
        $("body").append(tempHtml);
        caq.util.dialogShow(objId+"_dialog", 426, 392, 10003, true);
        $("#"+objId+"_dialog").html($("#"+objId).html());
      },

      /**
       * caq.tag.contHide(objId) : DOM객체를 보이고/숨기고
       * @param {Object} objId : DOM객체의 ID
       */
      contHide : function(objId){
        caq.util.dialogHide(objId+"_dialog");
        $("#"+objId+"_dialog").remove();
      },
      
      /**
       * caq.tag.contHideFocusObj(objId,focobjId) : DOM객체를 보이고/숨기고
       * @param {Object} objId : DOM객체의 ID
       * @param {Object} focobjId : Focus를 줄 객체의 ID
       */
      contHideFocusObj : function(objId,focobjId){
        caq.util.dialogHide(objId+"_dialog");
        $("#"+objId+"_dialog").remove();
       
        var fObj = $("#"+focobjId);
        if(fObj.prop("readonly")){
          fObj.removeAttr("readonly");
          fObj.focus();
          fObj.attr("readonly","readonly");
          fObj.blur();
        }else{
          fObj.focus();
        }
        
      },

      /**
       * caq.tag.tdToggle(objId) : 자주쓰는계좌번호 그룹 보이고/숨기고, class를 추가/삭제
       * @param {Object} objId : DOM객체의 ID
       */
      tdToggle : function(objId){
        $("._TEMP_LAYER").find("#"+objId).toggle();
        $("._TEMP_LAYER").find("#img"+objId).toggleClass("open");
      },

      /**
       * caq.tag.tdToggle_m(objId) : 자주쓰는계좌번호 그룹 보이고/숨기고, class를 추가/삭제 (모바일용)
       * @param {Object} objId : DOM객체의 ID
       */
      tdToggle_m : function(objId){
        $("#"+objId).toggle();
        $("#h5"+objId).toggleClass("on");
        $("#img"+objId).toggleClass("on");
      },

      /**
       * caq.tag.onSelectChange(sBank, sAcnt, sAcntnm, sAcntnmn, sSelectId, sBankCdId, sName) : 자주쓰는계좌번호 선택시 화면에 값 설정
       * @param {Object} sBank     : 뱅킹코드
       * @param {Object} sAcnt     : 계좌번호
       * @param {Object} sAcntnm   : 입금자명
       * @param {Object} sAcntnmn  : 입금자설명
       * @param {Object} sSelectId : 입금계좌번호 필드명
       * @param {Object} sBankCdId : 입금은행 필드명
       * @param {Object} sName     : 입금계좌번호별명
       */
      onSelectChange : function(sBank, sAcnt, sAcntnm, sAcntnmn, sSelectId, sBankCdId, sName){
          caq.tag.onSelectChange(sBank, sAcnt, sAcntnm, sAcntnmn, sSelectId, sBankCdId, sName,'true');
      },
      
            /**
       * caq.tag.onSelectChange(sBank, sAcnt, sAcntnm, sAcntnmn, sSelectId, sBankCdId, sName) : 자주쓰는계좌번호 선택시 화면에 값 설정
       * @param {Object} sBank     : 뱅킹코드
       * @param {Object} sAcnt     : 계좌번호
       * @param {Object} sAcntnm   : 입금자명
       * @param {Object} sAcntnmn  : 입금자설명
       * @param {Object} sSelectId : 입금계좌번호 필드명
       * @param {Object} sBankCdId : 입금은행 필드명
       * @param {Object} sName     : 입금계좌번호별명
       */
      onSelectChange : function(sBank, sAcnt, sAcntnm, sAcntnmn, sSelectId, sBankCdId, sName,sSete2e){
        if('false'!=sSete2e) {
          try { vKpd.hideAccountKeypad(sSelectId); } catch(e){} // 마우스 입력기 사용 해제
        }
        $("#"+sSelectId).val(sAcnt);
        $("#"+sBankCdId).val(sBank);
        $("#"+sName).val(sAcntnmn);
        if('false'!=sSete2e) {
          try{ caq.security.setExtE2E(sSelectId, 1); }catch(e){}
        }
        caq.tag.contHideFocusObj("favAcct"+sSelectId,"favbtn"+sSelectId);
      },

      /**
       * caq.tag.onSelectChange_m(sBank, sAcnt, sAcntnm, sAcntnmn, sSelectId, sBankCdId, sName) : 자주쓰는계좌번호 선택시 화면에 값 설정 (모바일용)
       * @param {Object} sBank     : 뱅킹코드
       * @param {Object} sAcnt     : 계좌번호
       * @param {Object} sAcntnm   : 입금자명
       * @param {Object} sAcntnmn  : 입금자설명
       * @param {Object} sSelectId : 입금계좌번호 필드명
       * @param {Object} sBankCdId : 입금은행 필드명
       * @param {Object} sName     : 입금계좌번호별명
       */
      onSelectChange_m : function(sBank, sAcnt, sAcntnm, sAcntnmn, sSelectId, sBankCdId, sName){
        try { vKpd.hideAccountKeypad(sSelectId); } catch(e){} // 마우스 입력기 사용 해제
        $("#"+sSelectId).val(sAcnt);
        $("#"+sBankCdId).val(sBank);
        $("#"+sName).val(sAcntnmn);
        caq.mobile.popupLayerHide("favAcct"+sSelectId);
      },

      /**
       * caq.tag.onRegiAcnt(casei) : 입금지정계좌번호 등록
       * @param {Object} casei : 뱅킹코드
       */
      onRegiAcnt : function(casei) {
        var s_domain = window.location.host;
        if( s_domain.indexOf("cpb.kbstar.com") > -1 ){
          caq.util.localtionFormSubmit('locationFrm', 'C018924', '');
        } else {
          if (casei=="01") {
            var langType = caq.getLangType();
            var pageNo   = "C018924";
            if(langType=="ENG"){
              pageNo = "C020948";
            }else if(langType=="JPN"){
              pageNo = "C022550";
            }else if(langType=="CHN"){
              pageNo = "C022247";
            }
            caq.util.localtionFormSubmit('locationFrm', pageNo, '');
          } else if (casei=="02" || casei=="03") {
            caq.util.localtionFormSubmit('locationFrm', 'C017228', '');
          }
        }
      },

      /**
       * caq.tag.onRegiAcnt(casei) : 입금지정계좌번호 등록 (모바일용)
       * @param {Object} casei : 뱅킹코드
       */
      onRegiAcnt_m : function(casei) {
        if (casei == "01") {
          caq.util.localtionFormSubmit('locationFrm', 'C020220', '');
        } else if (casei == "02") {
          caq.util.localtionFormSubmit('locationFrm', 'C017217', '');
        }
      },

      /**
       * caq.tag.onFaccRegiAcnt(casei) : 자주쓰는입금계좌 등록
       * @param {Object} casei : 뱅킹코드
       */
      onFaccRegiAcnt : function(casei) {
        var s_domain = window.location.host;
        if( s_domain.indexOf("cpb.kbstar.com") > -1 ){
          caq.util.localtionFormSubmit('locationFrm', 'C018922', '');
        } else {
          if (casei == "01") {
            var langType = caq.getLangType();
            var pageNo   = "C018922";
            if(langType=="ENG"){
              pageNo = "C020946";
            }else if(langType=="JPN"){
              pageNo = "C022548";
            }else if(langType=="CHN"){
              pageNo = "C022245";
            }
            caq.util.localtionFormSubmit('locationFrm', pageNo, '');
          } else if (casei == "02") {
            caq.util.localtionFormSubmit('locationFrm', 'C017217', '');
          }
        }
      },

      /**
       * caq.tag.onFaccRegiAcnt(casei) : 자주쓰는입금계좌 등록 (모바일용)
       * @param {Object} casei : 뱅킹코드
       */
      onFaccRegiAcnt_m : function(casei) {
        if (casei == "01") {
          caq.util.localtionFormSubmit('locationFrm', 'C020078', '');
        } else if (casei == "02") {
          caq.util.localtionFormSubmit('locationFrm', 'C017217', '');
        }
      },

      /**
       * caq.tag.toggleCalendar(lang, idCal, idYear, idMonth, idDate)
       * @param {Object} lang    : 언어
       * @param {Object} idCal   : 달력 DIV ID
       * @param {Object} idYear  : 년 ID
       * @param {Object} idMonth : 월 ID
       * @param {Object} idDate  : 일 ID
       */
      toggleCalendar : function(lang, idCal, idYear, idMonth, idDate){
        var popupLayers = $("._POPUP_LAYER");
        var parentObj   = ($("#CP").is("div")) ? $("#CP") : ( ($("#WPOP").is("div")) ? $("#WPOP") : $(".wrapper > data") );
        var calendarTop = $("#"+idCal+"-top");
        var calendar    = $("#"+idCal);
            calendar.css("left",(calendarTop.offset().left - parentObj.offset().left) + "px");
        if(parentObj.attr("class") == "data"){
          calendar.css("top" ,(calendarTop.offset().top  - parentObj.offset().top)  + 45 + "px");
        }else{
          calendar.css("top" ,(calendarTop.offset().top  - parentObj.offset().top)  + 26 + "px");
        }
        if(calendar.css("display") == "none") {
          caq.tag.makeCalendar(lang, idCal, idYear, idMonth, idDate, Number($("#"+idYear).val()), Number($("#"+idMonth).val()), Number($("#"+idDate).val()));
          popupLayers.hide();
          calendar.show();
          caq.util.setZindex($(".footWrap"), "9997");
        } else {
          calendar.hide();
          caq.util.setZindex($(".footWrap"), "9999");
        }
      },

      /**
       * caq.tag.makeCalendar(lang, idCal, idY, idM, idD, valY, valM, valD)
       * @param {Object} lang  : 언어 (KOR,ENG)
       * @param {Object} idCal : 달력 DIV ID
       * @param {Object} idY   : 년 ID
       * @param {Object} idM   : 월 ID
       * @param {Object} idD   : 일 ID
       * @param {Object} valY  : 년 Value(Number Type)
       * @param {Object} valM  : 월 Value(Number Type)
       * @param {Object} valD  : 일 Value(Number Type)
       */
      makeCalendar : function(lang, idCal, idY, idM, idD, valY, valM, valD) {
        var calendar = $("#"+idCal);
        var valDD    = caq.util.getLastDayOfMonth(valY,valM-1) < valD ? caq.util.getLastDayOfMonth(valY,valM-1) : valD ; // 해당 년월에 valD가 없으면 막지막 날짜로 set
        var today    = new Date( valY , valM-1 , valDD );
        var year     = today.getFullYear();
        var nextyear = year +1;
        var lastyear = year -1;
        var month    = today.getMonth();
        var date     = today.getDate();
        var strMonth = month+1 < 10 ? '0' + (month+1) : (month+1) ;
        var day;

        var mSun     = msg.getMsg(caq.getLangType(),"MSG00002");
        var mMon     = msg.getMsg(caq.getLangType(),"MSG00003");
        var mTue     = msg.getMsg(caq.getLangType(),"MSG00004");
        var mWed     = msg.getMsg(caq.getLangType(),"MSG00005");
        var mThu     = msg.getMsg(caq.getLangType(),"MSG00006");
        var mFri     = msg.getMsg(caq.getLangType(),"MSG00007");
        var mSat     = msg.getMsg(caq.getLangType(),"MSG00008");
        var mYear    = msg.getMsg(caq.getLangType(),"MSG00009");
        var mMonth   = msg.getMsg(caq.getLangType(),"MSG00010");
        var mDay     = msg.getMsg(caq.getLangType(),"MSG00011");
        var mPrev    = msg.getMsg(caq.getLangType(),"MSG00012");
        var mNext    = msg.getMsg(caq.getLangType(),"MSG00013");
        var mConfirm = msg.getMsg(caq.getLangType(),"MSG00014");
        var mClose   = msg.getMsg(caq.getLangType(),"MSG00015");

        day = new Array (mSun,mMon,mTue,mWed,mThu,mFri,mSat);

        var firstOfMonth = new Date(year,month,1);
        var firstDay     = firstOfMonth.getDay();
        var lastDate     = caq.util.getLastDayOfMonth(year,month);
        var text         = "";
            text += "  <div style='z-index:10001;position:absolute;top:0px;right:0px;right:0px;left:0px;'>";
            text += "  <div class='calMove'>";
            text += "    <div class='period year'>";
            text += "      <button type='button' class='year_prev' style='cursor:pointer;' onclick=\"caq.tag.makeCalendar('"+lang+"','"+idCal+"','" + idY +"','"+idM+"','"+idD+"'," +lastyear+ "," +(Number(strMonth))+ ", " +date+ "); return false;\">"+mPrev+" "+mYear+"</button>";
            text += "      <strong>" + year + "</strong>" + mYear;
            text += "      <button type='button' class='year_next' style='cursor:pointer;' onclick=\"caq.tag.makeCalendar('"+lang+"','"+idCal+"','" + idY +"','"+idM+"','"+idD+"'," +nextyear+ "," +(Number(strMonth))+ ", " +date+ "); return false;\">"+mNext+" "+mYear+"</button>";
            text += "    </div>";
            text += "    <div class='period month'>";
            text += "      <button type='button' class='month_prev' style='cursor:pointer;' onclick=\"caq.tag.makeCalendar('"+lang+"','"+idCal+"','" + idY +"','"+idM+"','"+idD+"'," +year+ "," +(Number(strMonth)-1)+ ", " +date+ "); return false;\">"+mPrev+" "+mMonth+"</button>";
            text += "      <strong>" + strMonth + "</strong>" + mMonth;
            text += "      <button type='button' class='month_next' style='cursor:pointer;' onclick=\"caq.tag.makeCalendar('"+lang+"','"+idCal+"','" + idY +"','"+idM+"','"+idD+"'," +year+ "," +(Number(strMonth)+1)+ ", " +date+ "); return false;\">"+mNext+" "+mMonth+"</button>";
            text += "    </div>";
            text += "  </div>";
            text += "  <table class='calendarSmall'>";
            text += "    <caption>Calendar</caption>";
            text += "    <colgroup>";
            text += "      <col width=''/>";
            text += "    </colgroup>";
            text += "    <thead>";
            text += "      <tr>";
            text += "        <th scope='col' class='sun'>"+day[0]+"</th>";
            text += "        <th scope='col'>"+day[1]+"</th>";
            text += "        <th scope='col'>"+day[2]+"</th>";
            text += "        <th scope='col'>"+day[3]+"</th>";
            text += "        <th scope='col'>"+day[4]+"</th>";
            text += "        <th scope='col'>"+day[5]+"</th>";
            text += "        <th scope='col' class='sat'>"+day[6]+"</th>";
            text += "      </tr>";
            text += "    </thead>";
            text += "    <tbody>";

        var dayNum    = 1;
        var curCol    = 1;
        var weekcount = 0;
        for (var i=1; i<=Math.ceil((lastDate + firstDay)/7); i++) {
          text += "      <tr>";
          for (var j=1; j<=7; j++) {
            weekcount = weekcount+1;
            if(dayNum >lastDate) break;
            if(curCol < firstDay+1) {
              text += "        <td>&nbsp;</td>";
              curCol++;
            } else {
              if( dayNum == date ) {
                text += "        <td class='today'><a href='javascript:void(0);' onclick=\"caq.tag.setSelectYMD('"+idCal+"','"+idY+"','"+idM+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+"); return false;\">"+dayNum+"</a></td>";
              } else {
                switch(j) {
                  case 1 :
                    text += "        <td class='sun'><a href='javascript:void(0);' onclick=\"caq.tag.setSelectYMD('"+idCal+"','"+idY+"','"+idM+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+");return false;\">"+dayNum+"</a></td>";
                  break;
                  case 7 :
                    text += "        <td class='sat'><a href='javascript:void(0);' onclick=\"caq.tag.setSelectYMD('"+idCal+"','"+idY+"','"+idM+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+");return false;\">"+dayNum+"</a></td>";
                  break;
                  default :
                    text += "        <td><a href='javascript:void(0);' onclick=\"caq.tag.setSelectYMD('"+idCal+"','"+idY+"','"+idM+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+");return false;\">"+dayNum+"</a></td>";
                }
              }
              dayNum++ ;
            }
          }
          text += "      </tr>";
        }
        text += "    </tbody>";
        text += "  </table>";
        text += "  <p class='layerClose'><a href='javascript:void(0);' onclick=\"caq.tag.toggleCalendar('"+lang+"','"+idCal+"','"+idY+"','"+idM+"','"+idD+"');\">"+mClose+"</a></p>";
        text += "  </div>";

        if($.browser.msie){
          text += "  <iframe title='숨김프레임' src='javascript:false;' frameborder='0' style='z-index:10000;position:absolute;filter:alpha(opacity=00);width:103%;height:103%;top:-3px;right:0px;left:-3px;'></iframe>";
        }

        calendar.html(text);

        if(35 < weekcount){
          calendar.height("248");
        }else if(28 <weekcount){
          calendar.height("223");
        }else{
          calendar.height("223");
        }
      },

      /**
       * caq.tag.setSelectYMD(idCal, idYear, idMonth, idDate, valY, valM, valD) : 달력에서 선택한 년월일을 selbox에 set
       * @param {Object} idCal   : 달력 DIV ID
       * @param {Object} idYear  : 년 ID
       * @param {Object} idMonth : 월 ID
       * @param {Object} idDate  : 일 ID
       * @param {Object} valY    : 년 Value(Number Type)
       * @param {Object} valM    : 월 Value(Number Type)
       * @param {Object} valD    : 일 Value(Number Type)
       */
      setSelectYMD : function(idCal, idYear, idMonth, idDate, valY, valM, valD){
        var objY = $("#"+idYear);
        var objM = $("#"+idMonth);
        var objD = $("#"+idDate);
        var objC = $("#"+idCal);
        var defD = Number(valD);
        var str      = "";
        var lastDate = caq.util.getLastDayOfMonth( valY , (valM-1) ) ;
        var istr     = "";
        var selval   = "";
        var sStyle   = (/android/.test(navigator.userAgent.toLowerCase()))?"":"style='width:48px;'";
        str = str + "<select class=\"selbox\" title=\""+msg.getMsg(caq.getLangType(),"MSG00018")+"\" id=\"" + idDate + "\" name=\"" + idDate + "\" "+sStyle+">" ;
        for(var i=1; i<=lastDate; i++ ){
          istr   = i < 10 ? "0"+i : i ;
          selval = ( i == defD ) ? " selected=\"selected\" " : "";
          str    = str + "<option value=\"" + istr + "\" " + selval + ">" + istr + "</option>" ;
        }
        str = str + "</select>";
        $("#div_" + idDate).html(str);
        objY.find("option").eq(caq.util.getSelIdx(idYear, valY)).attr("selected", "selected").change();
        objM.find("option").eq(caq.util.getSelIdx(idMonth, valM)).attr("selected", "selected").change();
        objD.find("option").eq(caq.util.getSelIdx(idDate, valD)).attr("selected", "selected").change();
        objC.hide();
      },

      /**
       * caq.tag.setYearSelBox(objSelId, vMinYear, vMaxYear, vDefYear, idMonth, idDate, vDefDate) : 년 selbox 구성
       * @param {Object} objSelId  : DOM객체 ID
       * @param {Object} vMinYear  : 년 최소값
       * @param {Object} vMaxYear  : 년 최대값
       * @param {Object} vDefYear  : 선택된 년 value
       * @param {Object} idMonth   : 월 ID
       * @param {Object} idDate    : 일 ID
       * @param {Object} vDefDate  : 선택된 일 Value
       */
      setYearSelBox : function(objSelId, vMinYear, vMaxYear, vDefYear, idMonth, idDate, vDefDate){
        var minY   = Number(vMinYear);
        var maxY   = Number(vMaxYear);
        var defY   = Number(vDefYear);
        var selval = "";
        var sStyle   = (/android/.test(navigator.userAgent.toLowerCase())) ? "" : "style='width:63px;'";
        var str    = "";
            str    = str + "<select class=\"selbox\" title=\""+msg.getMsg(caq.getLangType(),"MSG00016")+"\" id=\"" + objSelId + "\" name=\"" + objSelId + "\" ";
            str    = str + "onchange=\"caq.tag.setDateSelBox('" + objSelId + "','" + idMonth + "', '" + idDate + "', '" + vDefDate + "')\" "+sStyle+">" ;
        for( var i=minY; i<=maxY; i++ ) {
            selval = ( i == defY ) ? " selected=\"selected\" " : "";
            str    = str + "  <option value=\"" + i + "\" " + selval + ">" + i + "</option>" ;
        }
        str = str + "</select>" ;
        $("#div_" + objSelId).html(str);
      },

      /**
       * caq.tag.setMonthSelBox(idYear, idMonth, idDate, vDefMonth, vDefDate) : 월 selbox 구성
       * @param {Object} idYear    : 년 ID
       * @param {Object} idMonth   : 월 ID
       * @param {Object} idDate    : 일 ID
       * @param {Object} vDefMonth : 선택된 월 value
       * @param {Object} vDefDate  : 선택된 일 value
       */
      setMonthSelBox : function(idYear, idMonth, idDate, vDefMonth, vDefDate){
        var defM   = Number(vDefMonth);
        var selval = "";
        var istr   = "";
        var sStyle = (/android/.test(navigator.userAgent.toLowerCase()))?"":"style='width:48px;'";
        var str    = "";
            str    = str + "<select class=\"selbox\" title=\""+msg.getMsg(caq.getLangType(),"MSG00017")+"\" id=\"" + idMonth +"\" name=\"" + idMonth +"\" ";
            str    = str + "onchange=\"caq.tag.setDateSelBox('" + idYear + "','" + idMonth + "', '" + idDate + "', '" + vDefDate + "')\" "+sStyle+">" ;
        for ( var i=1; i<=12; i++ ) {
            istr   = i<10 ? "0"+i : i ;
            selval = ( i == defM ) ? " selected=\"selected\" " : "" ;
            str    = str + "  <option value=\"" + istr + "\" " + selval + ">" + istr + "</option>" ;
        }
        str = str + "</select>" ;
        $("#div_" + idMonth).html(str);
      },

      /**
       * caq.tag.setDateSelBox(idYear, idMonth, idDate, vDefDate) : 일 selbox 구성
       * @param {Object} idYear    : 년 ID
       * @param {Object} idMonth   : 월 ID
       * @param {Object} idDate    : 일 ID
       * @param {Object} vDefDate  : 선택된 일 value
       */
      setDateSelBox : function (idYear, idMonth, idDate, vDefDate){
        var objY = $("#"+idYear);
        var objM = $("#"+idMonth);
        var objD = $("#"+idDate);
        var defD = (null != objD) ? defD = Number(objD.val()) : Number(vDefDate);
        var lastDate = caq.util.getLastDayOfMonth(objY.val(),(objM.val()-1)) ;
        var istr   = "";
        var selval = "";
        var sStyle = (/android/.test(navigator.userAgent.toLowerCase()))?"":"style='width:48px;'";
        var str    = "";
            str    = str + "<select class=\"selbox\" title=\""+msg.getMsg(caq.getLangType(),"MSG00018")+"\" id=\"" + idDate + "\" name=\"" + idDate + "\" "+sStyle+" >";
        for(var i=1; i<=lastDate; i++ ){
            istr   = i < 10 ? "0"+i : i;
            selval = ( i == defD ) ? " selected=\"selected\" " : "";
            str    = str + "  <option value=\"" + istr + "\" " + selval + ">" + istr + "</option>";
        }
        str = str + "</select>";
        $("#div_" + idDate).html(str);
      },
      
      
       /**
       * caq.tag.setYearSelBoxTitle(objSelId, sTitle, vMinYear, vMaxYear, vDefYear, idMonth, idDate, vDefDate) : 년 selbox 구성
       * @param {Object} objSelId  : DOM객체 ID
       * @param {Object} vMinYear  : Title태그 text
       * @param {Object} vMinYear  : 년 최소값
       * @param {Object} vMaxYear  : 년 최대값
       * @param {Object} vDefYear  : 선택된 년 value
       * @param {Object} idMonth   : 월 ID
       * @param {Object} idDate    : 일 ID
       * @param {Object} vDefDate  : 선택된 일 Value
       */
      setYearSelBoxTitle : function(objSelId, sTitle, vMinYear, vMaxYear, vDefYear, idMonth, idDate, vDefDate){
        var minY   = Number(vMinYear);
        var maxY   = Number(vMaxYear);
        var defY   = Number(vDefYear);
        var selval = "";
        var sStyle   = (/android/.test(navigator.userAgent.toLowerCase())) ? "" : "style='width:63px;'";
        var str    = "";
            str    = str + "<select class=\"selbox\" title=\""+sTitle+" "+msg.getMsg(caq.getLangType(),"MSG00016")+"\" id=\"" + objSelId + "\" name=\"" + objSelId + "\" ";
            str    = str + "onchange=\"caq.tag.setDateSelBox('" + objSelId + "','" + idMonth + "', '" + idDate + "', '" + vDefDate + "')\" "+sStyle+">" ;
        for( var i=minY; i<=maxY; i++ ) {
            selval = ( i == defY ) ? " selected=\"selected\" " : "";
            str    = str + "  <option value=\"" + i + "\" " + selval + ">" + i + "</option>" ;
        }
        str = str + "</select>" ;
        $("#div_" + objSelId).html(str);
      },

      /**
       * caq.tag.setMonthSelBoxTitle(idYear, sTitle, idMonth, idDate, vDefMonth, vDefDate) : 월 selbox 구성
       * @param {Object} vMinYear  : Title태그 text
       * @param {Object} idYear    : 년 ID
       * @param {Object} idMonth   : 월 ID
       * @param {Object} idDate    : 일 ID
       * @param {Object} vDefMonth : 선택된 월 value
       * @param {Object} vDefDate  : 선택된 일 value
       */
      setMonthSelBoxTitle : function(idYear, sTitle, idMonth, idDate, vDefMonth, vDefDate){
        var defM   = Number(vDefMonth);
        var selval = "";
        var istr   = "";
        var sStyle = (/android/.test(navigator.userAgent.toLowerCase()))?"":"style='width:48px;'";
        var str    = "";
            str    = str + "<select class=\"selbox\" title=\""+sTitle+" "+msg.getMsg(caq.getLangType(),"MSG00017")+"\" id=\"" + idMonth +"\" name=\"" + idMonth +"\" ";
            str    = str + "onchange=\"caq.tag.setDateSelBox('" + idYear + "','" + idMonth + "', '" + idDate + "', '" + vDefDate + "')\" "+sStyle+">" ;
        for ( var i=1; i<=12; i++ ) {
            istr   = i<10 ? "0"+i : i ;
            selval = ( i == defM ) ? " selected=\"selected\" " : "" ;
            str    = str + "  <option value=\"" + istr + "\" " + selval + ">" + istr + "</option>" ;
        }
        str = str + "</select>" ;
        $("#div_" + idMonth).html(str);

      },
 
      /**
       * caq.tag.setDateSelBoxTitle(idYear, sTitle, idMonth, idDate, vDefDate) : 일 selbox 구성
       * @param {Object} vMinYear  : Title태그 text
       * @param {Object} idYear    : 년 ID
       * @param {Object} idMonth   : 월 ID
       * @param {Object} idDate    : 일 ID
       * @param {Object} vDefDate  : 선택된 일 value
       */
      setDateSelBoxTitle : function (idYear, sTitle, idMonth, idDate, vDefDate){
        var objY = $("#"+idYear);
        var objM = $("#"+idMonth);
        var objD = $("#"+idDate);
        var defD = (null != objD) ? defD = Number(objD.val()) : Number(vDefDate);
        var lastDate = caq.util.getLastDayOfMonth(objY.val(),(objM.val()-1)) ;
        var istr   = "";
        var selval = "";
        var sStyle = (/android/.test(navigator.userAgent.toLowerCase()))?"":"style='width:48px;'";
        var str    = "";
            str    = str + "<select class=\"selbox\" title=\""+sTitle+" "+msg.getMsg(caq.getLangType(),"MSG00018")+"\" id=\"" + idDate + "\" name=\"" + idDate + "\" "+sStyle+" >";
        for(var i=1; i<=lastDate; i++ ){
            istr   = i < 10 ? "0"+i : i;
            selval = ( i == defD ) ? " selected=\"selected\" " : "";
            str    = str + "  <option value=\"" + istr + "\" " + selval + ">" + istr + "</option>";
        }
        str = str + "</select>";
        $("#div_" + idDate).html(str);
      },


       /**
       * caq.tag.setDivSelectText(objId, objText) : 시니어뱅킹 selectbox 대체용 DIV 컨트롤 함수
       * @param {Object} objId    : DOM객체 ID
       * @param {Object} objText  : text
       */
      setDivSelectText : function (objId,objText){
        $("#span_"+objId).text(objText);
        $("#"+objId).val(objText);
        $("#"+objId).change();
        $("#div_"+objId).removeClass("selectShow");
      },
      
       /**
       * caq.tag.setYearDivSelBoxTitle(objSelId, sTitle, vMinYear, vMaxYear, vDefYear, idMonth, idDate, vDefDate) : 년 selbox 구성
       * @param {Object} objSelId  : DOM객체 ID
       * @param {Object} vMinYear  : Title태그 text
       * @param {Object} vMinYear  : 년 최소값
       * @param {Object} vMaxYear  : 년 최대값
       * @param {Object} vDefYear  : 선택된 년 value
       * @param {Object} idMonth   : 월 ID
       * @param {Object} idDate    : 일 ID
       * @param {Object} vDefDate  : 선택된 일 Value
       */
      setYearDivSelBoxTitle : function (objSelId, sTitle, vMinYear, vMaxYear, vDefYear, idMonth, idDate, vDefDate){
        var minY   = Number(vMinYear);
        var maxY   = Number(vMaxYear);
        var defY   = Number(vDefYear);
        var str    = "";
            str    = str + "  <input type=\"hidden\" id=\""+objSelId+"\" name=\""+objSelId+"\" value=\""+vDefYear+"\" maxlength=\"4\" onchange=\"caq.tag.setDateDivSelBoxTitle('" + objSelId + "','" +sTitle +"','" + idMonth + "', '" + idDate + "', '" + vDefDate + "');\"/>";
            str    = str + "  <a href=\"\" class=\"btn\" id=\"a_btn_"+objSelId+"\" onclick=\"return false;\"><span id=\"span_"+objSelId+"\">"+vDefYear+"</span></a>";
						str    = str + "    <ul>";
        for( var i=minY; i<=maxY; i++ ) {
            str    = str + "<li><a href=\"\" onclick=\"caq.tag.setDivSelectText('"+objSelId+"','"+i+"');return false;\">"+ i +"</a></li>";
        }
						str    = str + "    </ul>";

				$("#a_btn_"+ objSelId).unbind();
        $("#div_" + objSelId).html(str);
			  $("#div_"+objSelId).attr("title",sTitle +" "+msg.getMsg(caq.getLangType(),'MSG00016'));
			  
           $("#a_btn_"+ objSelId).bind("click",function(){ 
                if (!$("#div_" + objSelId).hasClass("selectShow")) {
                    $("#div_" + objSelId).addClass("selectShow");
                } else {
                    $("#div_" + objSelId).removeClass("selectShow");
                }
           });

           $("#div_" + objSelId).bind("mouseleave",function(){
                $("#div_" + objSelId).removeClass("selectShow");
           });
      },

    
      /**
       * caq.tag.setMonthDivSelBoxTitle(idYear, sTitle, idMonth, idDate, vDefMonth, vDefDate) : 월 selbox 구성
       * @param {Object} vMinYear  : Title태그 text
       * @param {Object} idYear    : 년 ID
       * @param {Object} idMonth   : 월 ID
       * @param {Object} idDate    : 일 ID
       * @param {Object} vDefMonth : 선택된 월 value
       * @param {Object} vDefDate  : 선택된 일 value
       */
      setMonthDivSelBoxTitle : function (idYear, sTitle, idMonth, idDate, vDefMonth, vDefDate){
        var defM   = Number(vDefMonth);
        var selval = "";
        var istr   = "";

        var str    = "";
            str    = str + "  <input type=\"hidden\" id=\""+idMonth+"\" name=\""+idMonth+"\" value=\""+vDefMonth+"\" maxlength=\"2\" onchange=\"caq.tag.setDateDivSelBoxTitle('" + idYear + "','" +sTitle +"','" + idMonth + "', '" + idDate + "', '" + vDefDate + "');\"/>";
            str    = str + "  <a href=\"\" class=\"btn\" id=\"a_btn_"+idMonth+"\" onclick=\"return false;\"><span id=\"span_"+idMonth+"\">"+vDefMonth+"</span></a>";
						str    = str + "    <ul>";
        for ( var i=1; i<=12; i++ ) {
            istr   = i<10 ? "0"+i : i ;
						str    = str + "<li><a href=\"\" onclick=\"caq.tag.setDivSelectText('"+idMonth+"','"+istr+"');return false;\">"+ istr +"</a></li>";
        }
						str    = str + "    </ul>";
						
				$("#a_btn_"+ idMonth).unbind();
        $("#div_" + idMonth).html(str);
        $("#div_" + idMonth).attr("title",sTitle +" "+msg.getMsg(caq.getLangType(),'MSG00017'));
        
           $("#a_btn_"+ idMonth).bind("click",function(){ 
                if (!$("#div_" + idMonth).hasClass("selectShow")) {
                    $("#div_" + idMonth).addClass("selectShow");
                } else {
                    $("#div_" + idMonth).removeClass("selectShow");
                }
           });

           $("#div_" + idMonth).bind("mouseleave",function(){
                $("#div_" + idMonth).removeClass("selectShow");
           });
      },
      

      /**
       * caq.tag.setDateDivSelBoxTitle(idYear, sTitle, idMonth, idDate, vDefDate) : 일 selbox 구성
       * @param {Object} vMinYear  : Title태그 text
       * @param {Object} idYear    : 년 ID
       * @param {Object} idMonth   : 월 ID
       * @param {Object} idDate    : 일 ID
       * @param {Object} vDefDate  : 선택된 일 value
       */
      setDateDivSelBoxTitle : function (idYear, sTitle, idMonth, idDate, vDefDate){
        var objY = $("#"+idYear);
        var objM = $("#"+idMonth);
        var objD = $("#"+idDate);
        var defD = (null != objD) ? defD = Number(objD.val()) : Number(vDefDate);
        var lastDate = caq.util.getLastDayOfMonth(objY.val(),(objM.val()-1)) ;
        var istr   = "";
        var selval = "";
        
        var str    = "";
            str    = str + "  <input type=\"hidden\" id=\""+idDate+"\" name=\""+idDate+"\" value=\""+vDefDate+"\" maxlength=\"2\" />";
            str    = str + "  <a href=\"\" class=\"btn\" id=\"a_btn_"+idDate+"\" onclick=\"return false;\"><span id=\"span_"+idDate+"\">"+vDefDate+"</span></a>";
            
						str    = str + "    <ul>";
        for(var i=1; i<=lastDate; i++ ){
            istr   = i < 10 ? "0"+i : i;
            str    = str + "<li><a href=\"\" onclick=\"caq.tag.setDivSelectText('"+idDate+"','"+istr+"');return false;\">"+ istr +"</a></li>";
        }
        		str    = str + "    </ul>";

				$("#a_btn_"+ idDate).unbind();
        $("#div_" + idDate).html(str);
        $("#div_" + idDate).attr("title",sTitle +" "+msg.getMsg(caq.getLangType(),'MSG00018'));
        
        
           $("#a_btn_"+ idDate).bind("click",function(){ 
                if (!$("#div_" + idDate).hasClass("selectShow")) {
                    $("#div_" + idDate).addClass("selectShow");
                } else {
                    $("#div_" + idDate).removeClass("selectShow");
                }
           });

           $("#div_" + idDate).bind("mouseleave",function(){
                $("#div_" + idDate).removeClass("selectShow");
           });
      },
      
      /**
       * caq.tag.toggleInputCalendar(lang, idCal, idYear, idMonth, idDate) : input 달력 보이기/숨기기
       * @param {Object} lang    : 언어
       * @param {Object} idCal   : 달력 DIV ID
       * @param {Object} idYear  : 년 ID
       * @param {Object} idMonth : 월 ID
       * @param {Object} idDate  : 일 ID
       */
      toggleInputCalendar : function(lang, idCal, idDate){
        var popupLayers = $("._POPUP_LAYER");
        var parentObj   = ($("#CP").is("div")) ? $("#CP") : ( ($("#WPOP").is("div")) ? $("#WPOP") : $(".wrapper > .data") );
        var calendarTop = $("#"+idCal+"-top");
        var calendar    = $("#"+idCal);
            calendar.css("left",(calendarTop.offset().left - parentObj.offset().left) + "px");
        if(parentObj.attr("class") == "data"){
          calendar.css("top" ,(calendarTop.offset().top  - parentObj.offset().top)  + 45 + "px");
        }else{
          calendar.css("top" ,(calendarTop.offset().top  - parentObj.offset().top)  + 26 + "px");
        }

        if (calendar.css("display") == "none") {
          var strDate = $("#"+idDate).val();
          var year    = "";
          var month   = "";
          var date    = "";
          if(caq.util.isDate(strDate)){
            year  = strDate.substring(0,4);
            month = strDate.substring(4,6);
            date  = strDate.substring(6);
          }else{
            var today = new Date();
            year  = today.getFullYear();
            month = today.getMonth()+1;
            date  = today.getDate();
          }
          month = Number(month);
          caq.tag.makeInputCalendar(lang, idCal, idDate, year, month, date);
          popupLayers.hide();
          calendar.show();
          caq.util.setZindex($(".footWrap"), "9997");
        } else {
          calendar.hide();
          caq.util.setZindex($(".footWrap"), "9999");
        }
      },

      /**
       * caq.tag.makeInputCalendar(lang, idCal, idY, idM, idD, valY, valM, valD) : input 달력 생성
       * @param {Object} lang  : 언어 (KOR,ENG)
       * @param {Object} idCal : 달력 DIV ID
       * @param {Object} idY   : 년 ID
       * @param {Object} idM   : 월 ID
       * @param {Object} idD   : 일 ID
       * @param {Object} valY  : 년 Value(Number Type)
       * @param {Object} valM  : 월 Value(Number Type)
       * @param {Object} valD  : 일 Value(Number Type)
       */
      makeInputCalendar : function(lang, idCal, idD, valY, valM, valD) {
        var calendar = $("#"+idCal);
        var valDD    = caq.util.getLastDayOfMonth(valY,valM-1) < valD ? caq.util.getLastDayOfMonth(valY,valM-1) : valD;
        var today    = new Date( valY , valM-1 , valDD );
        var year     = today.getFullYear();
        var nextyear = year +1;
        var lastyear = year -1;
        var month    = today.getMonth();
        var date     = today.getDate();
        var strMonth = month+1 < 10 ? '0' + (month+1) : (month+1);
        var day;

        var mSun     = msg.getMsg(caq.getLangType(),"MSG00002");
        var mMon     = msg.getMsg(caq.getLangType(),"MSG00003");
        var mTue     = msg.getMsg(caq.getLangType(),"MSG00004");
        var mWed     = msg.getMsg(caq.getLangType(),"MSG00005");
        var mThu     = msg.getMsg(caq.getLangType(),"MSG00006");
        var mFri     = msg.getMsg(caq.getLangType(),"MSG00007");
        var mSat     = msg.getMsg(caq.getLangType(),"MSG00008");
        var mYear    = msg.getMsg(caq.getLangType(),"MSG00009");
        var mMonth   = msg.getMsg(caq.getLangType(),"MSG00010");
        var mDay     = msg.getMsg(caq.getLangType(),"MSG00011");
        var mPrev    = msg.getMsg(caq.getLangType(),"MSG00012");
        var mNext    = msg.getMsg(caq.getLangType(),"MSG00013");
        var mConfirm = msg.getMsg(caq.getLangType(),"MSG00014");
        var mClose   = msg.getMsg(caq.getLangType(),"MSG00015");

        day = new Array (mSun,mMon,mTue,mWed,mThu,mFri,mSat);

        var firstOfMonth = new Date(year,month,1);
        var firstDay     = firstOfMonth.getDay();
        var lastDate     = caq.util.getLastDayOfMonth(year,month);

        try{
          var text  = "";
              text += "  <div style='z-index:10001;position:absolute;top:0px;right:0px;right:0px;left:0px;'>";
              text += "  <div class='calMove'>";
              text += "    <div class='period year'>";
              text += "      <button type='button' class='year_prev' style='cursor:pointer;' onclick=\"caq.tag.makeInputCalendar('"+lang+"','"+idCal+"','"+idD+"'," +lastyear+ "," +(Number(strMonth))+ ", " +date+ "); return false;\">"+mPrev+" "+mYear+"</button>";
              text += "      <strong>" + year + "</strong>" + mYear;
              text += "      <button type='button' class='year_next' style='cursor:pointer;' onclick=\"caq.tag.makeInputCalendar('"+lang+"','"+idCal+"','"+idD+"'," +nextyear+ "," +(Number(strMonth))+ ", " +date+ "); return false;\">"+mNext+" "+mYear+"</button>";
              text += "    </div>";
              text += "    <div class='period month'>";
              text += "      <button type='button' class='month_prev' style='cursor:pointer;' onclick=\"caq.tag.makeInputCalendar('"+lang+"','"+idCal+"','"+idD+"'," +year+ "," +(Number(strMonth)-1)+ ", " +date+ "); return false;\">"+mPrev+" "+mMonth+"</button>";
              text += "      <strong>" + strMonth + "</strong>" + mMonth;
              text += "      <button type='button' class='month_next' style='cursor:pointer;' onclick=\"caq.tag.makeInputCalendar('"+lang+"','"+idCal+"','"+idD+"'," +year+ "," +(Number(strMonth)+1)+ ", " +date+ "); return false;\">"+mNext+" "+mMonth+"</button>";
              text += "    </div>";
              text += "  </div>";
              text += "  <table class='calendarSmall'>";
              text += "    <caption>Calendar</caption>";
              text += "    <colgroup>";
              text += "      <col width=''/>";
              text += "    </colgroup>";
              text += "    <thead>";
              text += "      <tr>";
              text += "        <th scope='col' class='sun'>"+day[0]+"</th>";
              text += "        <th scope='col'>"+day[1]+"</th>";
              text += "        <th scope='col'>"+day[2]+"</th>";
              text += "        <th scope='col'>"+day[3]+"</th>";
              text += "        <th scope='col'>"+day[4]+"</th>";
              text += "        <th scope='col'>"+day[5]+"</th>";
              text += "        <th scope='col' class='sat'>"+day[6]+"</th>";
              text += "      </tr>";
              text += "    </thead>";
              text += "    <tbody>";

          var dayNum    = 1;
          var curCol    = 1;
          var weekcount = 0;
          for (var i=1; i<=Math.ceil((lastDate + firstDay)/7); i++) {
            text += "      <tr>";
            for (var j=1; j<=7; j++) {
              weekcount = weekcount+1;
              if(dayNum >lastDate) break;
              if(curCol < firstDay+1) {
                text += "        <td>&nbsp;</td>";
                curCol++;
              } else {
                if( dayNum == date ) {
                  text += "        <td class='today'><a href='javascript:void(0);' onclick=\"caq.tag.setInputYMD('"+idCal+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+"); return false;\">"+dayNum+"</a></td>";
                } else {
                  switch(j) {
                    case 1 :
                      text += "        <td class='sun'><a href='javascript:void(0);' onclick=\"caq.tag.setInputYMD('"+idCal+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+");return false;\">"+dayNum+"</a></td>";
                    break;
                    case 7 :
                      text += "        <td class='sat'><a href='javascript:void(0);' onclick=\"caq.tag.setInputYMD('"+idCal+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+");return false;\">"+dayNum+"</a></td>";
                    break;
                    default :
                      text += "        <td><a href='javascript:void(0);' onclick=\"caq.tag.setInputYMD('"+idCal+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+");return false;\">"+dayNum+"</a></td>";
                  }
                }
                dayNum++ ;
              }
            }
            text += "      </tr>";
          }
          text += "    </tbody>";
          text += "  </table>";
          text += "  <p class='layerClose'><a href='javascript:void(0);' onclick=\"caq.tag.toggleInputCalendar('"+lang+"','"+idCal + "','"+idD+"');\">"+mClose+"</a></p>";
          text += "  </div>";

          if($.browser.msie){
            text += "  <iframe title='숨김프레임' src='javascript:false;' frameborder='0' style='z-index:10000;position:absolute;filter: alpha(opacity=00);width:103%;height:103%;top:-3px;right:0px;left:-3px;'></iframe>";
          }

          calendar.html(text);
          if(35 < weekcount){
            calendar.height("248");
          }else if(28 <weekcount){
            calendar.height("223");
          }else{
            calendar.height("223");
          }

        }catch(err){}
      },

      /**
       * caq.tag.setInputYMD(idCal, idDate, valY, valM, valD) : 달력에서 선택한 년월일을 input에 set
       * @param {Object} idCal  : DOM ID
       * @param {Object} idDate : 일 ID
       * @param {Object} valY   : 년 Value
       * @param {Object} valM   : 월 Value
       * @param {Object} valD   : 일 Value
       */
      setInputYMD : function(idCal, idDate, valY, valM, valD){
        var month = valM < 10 ? "0" + valM : String(valM);
        var day   = valD < 10 ? "0" + valD : String(valD);
        $("#"+idDate).val(String(valY) + String(month) + String(day)).change();
        $("#"+idCal).hide();
      },

      /**
       * caq.tag.inputCalendarShow_m(lang, idCal, idYear, idMonth, idDate) : input 달력 보이기 (모바일용)
       * @param {Object} lang    : 언어
       * @param {Object} idCal   : 달력 DIV ID
       * @param {Object} idYear  : 년 ID
       * @param {Object} idMonth : 월 ID
       * @param {Object} idDate  : 일 ID
       */
      inputCalendarShow_m : function(lang, idCal, idDate){
        var tempHtml = '<div id="'+idCal+'" style="display:none;"></div>';
        $("body").append(tempHtml);
        var calendar = $("#"+idCal);
        var strDate  = $("#"+idDate).val();
        var year     = "";
        var month    = "";
        var date     = "";
        if(caq.util.isDate(strDate)){
          year  = strDate.substring(0,4);
          month = strDate.substring(4,6);
          date  = strDate.substring(6);
        }else{
          var today = new Date();
          year  = today.getFullYear();
          month = today.getMonth()+1;
          date  = today.getDate();
        }
        month = Number(month);
        caq.tag.makeInputCalendar_m(lang, idCal, idDate, year, month, date);
        caq.mobile.popupLayerShow(idCal,"100%","100%",10003,true);
      },

      /**
       * caq.tag.inputCalendarHide_m(idCal) : input 달력 숨기기 (모바일용)
       * @param {Object} idCal   : 달력 DIV ID
       */
      inputCalendarHide_m : function(idCal){
        caq.mobile.popupLayerHide(idCal);
        $("#"+idCal).remove();
      },

      /**
       * caq.tag.makeInputCalendar_m(lang, idCal, idY, idM, idD, valY, valM, valD) : input 달력 생성 (모바일용)
       * @param {Object} lang  : 언어 (KOR,ENG)
       * @param {Object} idCal : 달력 DIV ID
       * @param {Object} idY   : 년 ID
       * @param {Object} idM   : 월 ID
       * @param {Object} idD   : 일 ID
       * @param {Object} valY  : 년 Value(Number Type)
       * @param {Object} valM  : 월 Value(Number Type)
       * @param {Object} valD  : 일 Value(Number Type)
       */
      makeInputCalendar_m : function(lang, idCal, idD, valY, valM, valD) {

        idCal_m   = idCal;
        idDate_m  = idD;
        valY_m    = valY;
        valM_m    = valM;
        valD_m    = valD;

        var calendar = $("#"+idCal);
        var valDD    = caq.util.getLastDayOfMonth(valY,valM-1) < valD ? caq.util.getLastDayOfMonth(valY,valM-1) : valD;
        var today    = new Date( valY , valM-1 , valDD );
        var year     = today.getFullYear();
        var nextyear = year +1;
        var lastyear = year -1;
        var month    = today.getMonth();
        var date     = today.getDate();
        var strMonth = month+1 < 10 ? '0' + (month+1) : (month+1);
        var day;
        if('KOR'==lang){
          day=new Array("일","월","화","수","목","금","토");
        }else{
          day=new Array ("S","M","T","W","T","F","S");
        }
        var firstOfMonth = new Date(year,month,1);
        var firstDay     = firstOfMonth.getDay();
        var lastDate     = caq.util.getLastDayOfMonth(year,month);

        try{
          var text  = "";
              text += "  <div class='layer_calendar'>";
              text += "    <div class='date_box'>";
              text += "      <a href='javascript:void(0);' class='prev' onclick=\"caq.tag.makeInputCalendar_m('"+lang+"','"+idCal+"','"+idD+"'," +lastyear+ "," +(Number(strMonth))+ ", " +date+ "); return false;\">전년도</a>";
              text += "        " + year + " ";
              text += "      <a href='javascript:void(0);' class='next' onclick=\"caq.tag.makeInputCalendar_m('"+lang+"','"+idCal+"','"+idD+"'," +nextyear+ "," +(Number(strMonth))+ ", " +date+ "); return false;\">다음년도</a>";
              text += "      <a href='javascript:void(0);' class='prev' onclick=\"caq.tag.makeInputCalendar_m('"+lang+"','"+idCal+"','"+idD+"'," +year+ "," +(Number(strMonth)-1)+ ", " +date+ "); return false;\">이전달</a>";
              text += "        " + strMonth + " ";
              text += "      <a href='javascript:void(0);' class='next' onclick=\"caq.tag.makeInputCalendar_m('"+lang+"','"+idCal+"','"+idD+"'," +year+ "," +(Number(strMonth)+1)+ ", " +date+ "); return false;\">다음달</a>";
              text += "    </div>";
              text += "    <table id='"+idCal+"-table'>";
              text += "      <thead>";
              text += "        <tr>";
              text += "          <th>"+day[0]+"</th>";
              text += "          <th>"+day[1]+"</th>";
              text += "          <th>"+day[2]+"</th>";
              text += "          <th>"+day[3]+"</th>";
              text += "          <th>"+day[4]+"</th>";
              text += "          <th>"+day[5]+"</th>";
              text += "          <th>"+day[6]+"</th>";
              text += "        </tr>";
              text += "      </thead>";
              text += "      <tbody>";

          var dayNum    = 1;
          var curCol    = 1;
          var weekcount = 0;
          for (var i=1; i<=Math.ceil((lastDate + firstDay)/7); i++) {
            text += "        <tr>";
            for (var j=1; j<=7; j++) {
              weekcount = weekcount+1;
              if(dayNum >lastDate) break;
              if(curCol < firstDay+1) {
                text += "          <td class='dis'>&nbsp;</td>";
                curCol++;
              } else {
                if( dayNum == date ) {
                  text += "          <td class='today'><a href='javascript:void(0);' onclick=\"caq.tag.selectDay_m(this,'"+idCal+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+"); return false;\">"+dayNum+"</a></td>";
                } else {
                  switch(j) {
                    default :
                      text += "          <td><a href='javascript:void(0);' onclick=\"caq.tag.selectDay_m(this,'"+idCal+"','"+idD+"',"+year+","+Number(strMonth)+","+dayNum+");return false;\">"+dayNum+"</a></td>";
                  }
                }
                dayNum++ ;
              }
            }
            text += "        </tr>";
          }
          text += "      </tbody>";
          text += "    </table>";
          text += "    <div class='btn'>";
          text += "      <a href='javascript:void(0);' class='btn04 btn_close' onclick=\"caq.tag.setInputYMD_m();\">확인</a>";
          text += "      <a href='javascript:void(0);' class='btn03 btn_close' onclick=\"caq.tag.inputCalendarHide_m('"+idCal+"');\">취소</a>";
          text += "    </div>";
          text += "  </div>";

          calendar.html(text);
          var tempHeight = 0;
          if(35 < weekcount){
            calendar.height("327");
          }else if(28 <weekcount){
            calendar.height("294");
          }else{
            calendar.height("294");
          }
        }catch(err){}
      },

      /**
       * caq.tag.selectDay_m(idCal, idDate, valY, valM, valD) : 달력에서 선택한 년월일을 전역 변수에 저장 (모바일용)
       * @param {Object} idCal  : DOM ID
       * @param {Object} idDate : 일 ID
       * @param {Object} valY   : 년 Value
       * @param {Object} valM   : 월 Value
       * @param {Object} valD   : 일 Value
       */
      selectDay_m : function(obj, idCal, idDate, valY, valM, valD){
        $("#"+idCal+"-table").find("td").removeClass("selected");
        $(obj).parent().addClass("selected");
        idCal_m   = idCal;
        idDate_m  = idDate;
        valY_m    = valY;
        valM_m    = valM;
        valD_m    = valD;
      },

      /**
       * caq.tag.setInputYMD_m() : 달력에서 선택한 년월일을 input에 set (모바일용)
       */
      setInputYMD_m : function(){
        var idCal  = idCal_m;
        var idDate = idDate_m;
        var valY   = valY_m;
        var valM   = Number(valM_m);
        var valD   = Number(valD_m);
	    var month = valM < 10 ? "0" + valM : String(valM);
        var day   = valD < 10 ? "0" + valD : String(valD);
        $("#"+idDate).val(String(valY) + String(month) + String(day)).change();
        caq.tag.inputCalendarHide_m(idCal);
      },

      /**
       * caq.tag.setFullPhone(idFull, idP1, idP2, idP3, mode) : 전화번호 set
       * @param {Object} idFull : DOM객체 ID
       * @param {Object} idP1   : 선택된 Value
       * @param {Object} idP2   : 선택된 Value
       * @param {Object} idP3   : 선택된 Value
       * @param {Object} mode   : 1 - 010-1234-5678
       *                          2 - 010)-1234-5678
       */
      setFullPhone : function (idFull, idP1, idP2, idP3, mode){
        objFull = $("#" + idFull);
        objP1   = $("#" + idP1);
        objP2   = $("#" + idP2);
        objP3   = $("#" + idP3);
        if(objP1.val()==""){
          objFull.val("");
          objP2.val("");
          objP3.val("");
        }else{
          switch(mode){
            case 1:
              objFull.val( objP1.val() + "-" + objP2.val() + "-" + objP3.val() );
            break;
            case 2:
              objFull.val( objP1.val() + ")" + objP2.val() + "-" + objP3.val() );
            break;
            default:
              objFull.val( objP1.val() + "-" + objP2.val() + "-" + objP3.val() );
          }
        }
      },

      /**
       * caq.tag.setFullEmail(idId, idAddr, idFull) : 전체이메일 주소 set
       * @param {Object} idId   : DOM ID
       * @param {Object} idAddr : 일 ID
       * @param {Object} idFull : 년 Value
       */
      setFullEmail : function(idId, idAddr, idFull){
        var objId   = $("#"+idId);
        var objAddr = $("#"+idAddr);
        var objFull = $("#"+idFull);
        if (objId.val() == "" && objAddr.val() == "") {
          objFull.val("");
        } else {
          objFull.val(objId.val() + "@" + objAddr.val());
        }
      },

      // 이메일 직접입력란 show hide
       /**
       * caq.tag.setEmailAddr(idSel, idTxt, incase) : 이메일 직접입력란 show hide
       * @param {Object} idId   : DOM ID
       * @param {Object} idAddr : 일 ID
       * @param {Object} idFull : 년 Value
       */
      setEmailAddr : function(idSel, idTxt, incase) {
        var objSel = $("#"+idSel);
        var objTxt = $("#"+idTxt);
        var selVal = objSel.val();
        if( selVal == "self" ) {
          objTxt.show()
          if( incase == 2 ){
            objTxt.val("");
            objTxt.focus();
          }
        } else {
          objTxt.val(objSel.val());
          objTxt.hide();
        }
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 공통 Popup Layer 자바스크립트 - 모바일용
// * 소  속 : 업무공통팀
// * 작성일 : 2011-09-16
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------

  caq.mobile = function(){

    var viewFlag = false;

    return{

      /**
       * caq.mobile.popupLayerShow(divId, width, height, zIndex, flag, top) : 팝업레이어 보여주기
       * @param {Object} divId  : 팝업레이어 객체
       * @param {Object} width  : 팝업레이어 가로 사이즈
       * @param {Object} height : 팝업레이어 세로 사이즈
       * @param {Object} zIndex : 팝업레이어 z-index
       * @param {Object} flag   : 팝업레이어 true:modal, false:일반
       * @param {Object} top    : 팝업레이어 top 위치 값
       */
      popupLayerShow : function(divId, width, height, zIndex, flag, top){
        top = (top === undefined || top =="" || top == null) ? "" : top;
        $(".keypad").hide();
        targetObj = $("#"+divId);
        targetObj.dialog({
          width:width,
          height:height,
          modal:flag,
          zIndex:zIndex,
          resizable:false,
          bgiframe:true,
          open: function(event, ui) {
            targetObj.hide();
            targetObj.prev().hide();
            //$(".ui-dialog-titlebar").hide();
            if(top==""){
              targetObj.parent().css({"overflow":"hidden","padding":"0px","border":"0px","background":"transparent","left":"0px"});
            }else{
              targetObj.parent().css({"overflow":"hidden","padding":"0px","border":"0px","background":"transparent","left":"0px","top":top});
            }
            targetObj.css({"width":"auto", "height":"auto", "overflow":"hidden", "padding":"0px"});
          }
        });
        targetObj.show();
        $(".wrapAll").find("a, input, select, textarea").attr("disabled",true);
      },

      /**
       * caq.mobile.popupLayerHide(divId) : 팝업레이어 숨기기
       * @param {Object} divId : 팝업레이어 객체
       */
      popupLayerHide : function(divId){
        $("#"+divId).dialog("close");
        $(".wrapAll").find("a, input, select, textarea").removeAttr("disabled");
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 공통 Session Timeout (미 로그인 시)
// * 소  속 : 업무공통팀
// * 작성일 : 2011-10-07
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------
  timer = function(){

    var opts = { 'second' : 60*10, 'url' : "http://www.kbstar.com" };
    var sTimerObj;
    var sTempSecond;
    return{

      /**
       * timer.init(second, url) : 타임머 초기화
       * @param {Object} second : 타임아웃 처리 초 ( 1초: 1, 10초 : 10, 10분 60*10)
       * @param {Object} url    : 타임아웃 후 이동 할 URL
       */
      init : function(second, url){
        opts.second = (second === undefined) ? opts.second : second;
        opts.url    = (url    === undefined) ? opts.url    : url;
        sTimerObj   = setInterval("timer.start()" ,1000);
        sTempSecond = opts.second;
      },

      /**
       * timer.start() : 타임머 동작
       */
      start : function(){
        if(sTempSecond == 0){
          clearInterval(sTimerObj);
          timer.goPage();
        }
        sTempSecond--;
      },

      /**
       * timer.goPage() : 페이지 이동
       */
      goPage : function(){
        location.href = opts.url;
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 글로벌 메세지 자바스크립트
// * 소  속 : 업무공통팀
// * 작성일 : 2011-09-22
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------
    msg = function(){

    var msgKOR = {
      "MSG00001" : "날짜 형식이 아닙니다.",
      "MSG00002" : "일",
      "MSG00003" : "월",
      "MSG00004" : "화",
      "MSG00005" : "수",
      "MSG00006" : "목",
      "MSG00007" : "금",
      "MSG00008" : "토",
      "MSG00009" : "년",
      "MSG00010" : "월",
      "MSG00011" : "일",
      "MSG00012" : "이전",
      "MSG00013" : "이후",
      "MSG00014" : "확인",
      "MSG00015" : "닫기",
      "MSG00016" : "년 선택",
      "MSG00017" : "월 선택",
      "MSG00018" : "일 선택",
      "MSG00019" : "처리중입니다."
    };

    var msgENG = {
      "MSG00001" : "Wrong format for date type",
      "MSG00002" : "S",
      "MSG00003" : "M",
      "MSG00004" : "T",
      "MSG00005" : "W",
      "MSG00006" : "T",
      "MSG00007" : "F",
      "MSG00008" : "S",
      "MSG00009" : "Y",
      "MSG00010" : "M",
      "MSG00011" : "D",
      "MSG00012" : "Prev",
      "MSG00013" : "Next",
      "MSG00014" : "Ok",
      "MSG00015" : "Close",
      "MSG00016" : "Select Year",
      "MSG00017" : "Select Month",
      "MSG00018" : "Select Day",
      "MSG00019" : "Loading"
    };

    var msgJPN = {
      "MSG00001" : "日付タイプの間違ったフォーマット",
      "MSG00002" : "日",
      "MSG00003" : "月",
      "MSG00004" : "火",
      "MSG00005" : "水",
      "MSG00006" : "木",
      "MSG00007" : "金",
      "MSG00008" : "土",
      "MSG00009" : "年",
      "MSG00010" : "月",
      "MSG00011" : "日",
      "MSG00012" : "い-ぜん",
      "MSG00013" : "い-ご",
      "MSG00014" : "確認する",
      "MSG00015" : "閉じる",
      "MSG00016" : "年選択",
      "MSG00017" : "月選択",
      "MSG00018" : "日選択",
      "MSG00019" : "Loading"
    };

    var msgCHN = {
      "MSG00001" : "日期类型的格式错误",
      "MSG00002" : "日",
      "MSG00003" : "月",
      "MSG00004" : "火",
      "MSG00005" : "水",
      "MSG00006" : "木",
      "MSG00007" : "金",
      "MSG00008" : "土",
      "MSG00009" : "年",
      "MSG00010" : "月",
      "MSG00011" : "日",
      "MSG00012" : "以前",
      "MSG00013" : "以后",
      "MSG00014" : "确认",
      "MSG00015" : "关闭",
      "MSG00016" : "年 选择",
      "MSG00017" : "月 选择",
      "MSG00018" : "日 选择",
      "MSG00019" : "Loading"
    };

    return {
      /**
       * msg.getMsg(sLangType, sMsgCode) : 언어별 메세지 가져오기
       * @param {Object} sLangType : 언어코드 (KOR,ENG,JPN,CHN)
       * @param {Object} sMsgCode  : 메세지 코드
       */
      getMsg : function(sLangType, sMsgCode){
        var sMsg = "";
        switch(sLangType){
          case "KOR" : sMsg = eval("msgKOR."+sMsgCode); break;
          case "ENG" : sMsg = eval("msgENG."+sMsgCode); break;
          case "JPN" : sMsg = eval("msgJPN."+sMsgCode); break;
          case "CHN" : sMsg = eval("msgCHN."+sMsgCode); break;
          default    : sMsg = eval("msgKOR."+sMsgCode); break;
        }
        return sMsg;
      },

      /**
       * msg.setErrMsg(sKey, sValues) : 언어별 메세지 설정
       * @param {Object} sKey     : 메세지 코드 (예: MSG00001)
       * @param {Object} sValues  : 메세지 배열 (예: new Array("한글","English","日本語","中国") 단, 해당 순서에 영향이 있다.)
       */
      setMsg : function(sKey, sValues){
        msgKOR[sKey] = sValues[0];
        msgENG[sKey] = sValues[1];
        msgJPN[sKey] = sValues[2];
        msgCHN[sKey] = sValues[3];
      }

    }
  }();

//-----------------------------------------------------------------------------------------------------------------------
// * 업무공통 자동로그아웃 자바스크립트
// * 소  속 : 업무공통팀
// * 작성일 : 2011-08-07
// * 작성자 : 김장락
//-----------------------------------------------------------------------------------------------------------------------

  session = function(){

    var mobileSiteName   = "omweb";
    var miniSiteName     = "omini";
    var oTalk            = "otalk";
    var oSenior          = "osenior";
    var sDivId           = "autoLogoutDiv";
    var sTimeId          = "timeViewTarget";
    var sTextDiv         = "_TEXT_DIV";
    var sTextInDiv       = "_TEXT_IN_DIV";
    var sTimeText        = "_TIME_TEXT";
    var sAutoExtend      = "_AUTO_EXTEND";
    var viewFlag         = true;
    var cViewFlag        = true;
    var startSecond      = 9.95*60;   // 자동로그아웃 time 변경
    var tempSecond     = 9.95*60;  // 자동로그아웃 time 변경
    var viewSecond       = 60;
    var sTimerHtmlText   = "";
    var sLangType        = "";
    var sSiteName        = "";
    var sLogoutPage      = "";
    var sAutoLogoutPage  = "";
    var sAutoExtendFlag  = false;
    var sTimerLayerText  = "<div id='"+sTextDiv+"' style='z-index:10010;position:absolute;left:0px;top:0px;width:30px;height:30px;' onmouseover='$(\"#"+sTextInDiv+"\").show();' onmouseout='$(\"#"+sTextInDiv+"\").hide();'>";
        sTimerLayerText += "  <div id='"+sTextInDiv+"' style='display:none;padding:0px 10px;z-index:10011;position:absolute;border:#fbc302 2px solid;background:#fff;left:2px;top:2px;'>";
        sTimerLayerText += "    <span id='"+sTimeText+"'></span><br/><span id='"+sAutoExtend+"'></span>";
        sTimerLayerText += "  </div>";
        sTimerLayerText += "</div>";
    //로그아웃 잔여시간 확인 
    var hTimeId = "h_time";


    return{

      /**
       * session.setAutoExtendFlag(flag) : 로그인자동연장 설정
       *  @param {Object} flag : (true:설정, false:취소)
       */
      setAutoExtendFlag : function(flag){
        sAutoExtendFlag = flag;
      },

      /**
       * session.getAutoExtendFlag() : 자동로그인연장 값 가져오기
       */
      getAutoExtendFlag : function(){
        return sAutoExtendFlag;
      },

      /**
       * session.setTimeText() : 자동 로그아웃 되기 까지 남은 시작 보여주기
       */
      setTimeText : function(timeText){
        $("#"+sTimeId).text(timeText);
      },

      /**
       * session.showMessage() : 자동 로그아우스 팝업레이어 보여주기
       */
      showMessage : function(){
        if(viewFlag){
          $("body").append(sTimerHtmlText);
          if(sSiteName==mobileSiteName){
            session.show(sDivId, 344, 300, 10006, true, true);
          }else if(sSiteName==oTalk){
            session.show(sDivId, 550, 'auto', 10006, true, false);
          } else if(sSiteName==oSenior){
            session.show(sDivId, 410, 360, 10006, true, false);
          }else{
            if(sLangType=="ENG"){
              session.show(sDivId, 356, 337, 10006, true, false);
            }else{
              session.show(sDivId, 356, 307, 10006, true, false);
            }
          }
          viewFlag = false;
          $("#autoLogoutDiv").attr("tabindex",-1).focus();
        }
      },

      /**
       * session.clearMessage() : 자동 로그아웃 팝업 레이어 삭제
       */
      clearMessage : function(){
        if(sSiteName==mobileSiteName){
          session.hide(sDivId, true);
        }else{
          session.hide(sDivId, false);
        }
        $("#"+sDivId).remove();
        $("#"+sTextDiv).remove();
        clearInterval(sTimerObj);
        tempSecond = startSecond;
        viewFlag   = true;
        cViewFlag  = true;;
      },

      /**
       * session.showAutoExtend(str) : 로그인자동연장 화면 View
       *  @param {Object} flag : 보여주기 구분
       */
      showAutoExtend : function(flag){
        if(flag && !cViewFlag){
          var now = new Date();
          var viewText = "Extend Login Time : "+now.toLocaleTimeString()+"<br/>";
          var tObj = $("#"+sAutoExtend);
          tObj.html(tObj.html()+viewText);
        }
      },

      /**
       * session.startLoginTimeout() : 세션 타임 체크 9분 후 로그인 연장 및 로그아웃 레이어 팝업 출력
       */
      startLoginTimeout : function(){
        if(tempSecond <= viewSecond){
          if(session.getAutoExtendFlag()){
            session.extend();
            session.showAutoExtend(true);
          }else{
            session.showMessage();
            session.setTimeText(parseInt(tempSecond%60));
          }
          if(tempSecond == 0){
            session.goToPage(sAutoLogoutPage);
          }
        }
        session.countTimer(false);
      },

      /**
       * session.countTimer(flag) : 남은시간 계산하기
       *  @param {Object} flag : 타임머 보여주기 플래그
       */
      countTimer : function(flag) {
        if(cViewFlag && flag) {
          $("body").append(sTimerLayerText);
          cViewFlag = false;
        }
        if(flag){
          var tempText = session.zeroToText(parseInt(tempSecond/60))+":"+session.zeroToText(parseInt(tempSecond%60));
          $("#"+sTimeText).html(tempText);
        }
        
        if($("#"+hTimeId) != undefined){
          var tempText = session.zeroToText(parseInt(tempSecond/60))+":"+session.zeroToText(parseInt(tempSecond%60));
          $("#"+hTimeId).html(tempText);        
        }
        tempSecond--;
      },

      /**
       * session.zeroToText(n) : 한자리를 두자리 문자열로 변환
       *  @param {Object} n : 문자
       */
      zeroToText : function(n) {
        return n>9 ? n : "0"+n;
      },

      /**
       * session.logout(callback) : 로그아웃 실행
       *  @param {Object} callback : 콜백함수 (로그아웃 결과만 리턴)
       */
      logout : function(callback){
        $.ajax({
          type : "post",
          url  : "/quics?asfilecode=527752",
          success : function(data, status){
            var flag = (status=="error")? false : true;
            if(window[callback]){
              window[callback](flag);
            }
          },
          error : function(data, status, err){
            var flag = (status=="error")? false : true;
            if(window[callback]){
              window[callback](flag);
            }
          }
        });
      },

      /**
       * session.sessionTimerStart(langType, siteName, logoutPage, autoLogoutPage, autoExtendFlag) : 자동 로그아웃 타임머 실행
       *  @param {Object} langType       : 언어코드 (KOR,ENG,JPN,CHN...)
       *  @param {Object} siteName       : 사이트코드 (obank,omweb,omini...)
       *  @param {Object} logoutPage     : 로그아웃 실행 후 이동 될 페이지
       *  @param {Object} autoLogoutPage : 자동로그아웃 실행 후 이동 될 페이지
       *  @param {Object} autoExtendFlag : 자동로그인 설정
       */
      sessionTimerStart : function(langType, siteName, logoutPage, autoLogoutPage, autoExtendFlag){
        sLangType       = (langType       === undefined) ? ""    : langType;
        sSiteName       = (siteName       === undefined) ? ""    : siteName;
        sLogoutPage     = (logoutPage     === undefined) ? ""    : logoutPage;
        sAutoLogoutPage = (autoLogoutPage === undefined) ? ""    : autoLogoutPage;
        sAutoExtendFlag = (autoExtendFlag === undefined) ? false : autoExtendFlag;
        sTimerHtmlText  = session.getPopupLayerText(sLangType,sSiteName,sLogoutPage);
        sTimerObj       = setInterval("session.startLoginTimeout()" ,1000);
      },

      /**
       * session.extend() : 자동로그아웃 세션 연장
       */
      extend : function(){
        $.ajax({
          type : "post",
          url  : "/quics?asfilecode=548634&QSL=F",
          success : function(msg){
            try{
              session.clearMessage();
              session.sessionTimerStart(sLangType, sSiteName, sLogoutPage, sAutoLogoutPage, sAutoExtendFlag);
            }catch(e){}
          },
          error : function(data, status, err){
            try{
              session.clearMessage();
              session.goToPage(sAutoLogoutPage);
            }catch(e){}
          }
        });
      },

      /**
       * session.doAjaxSessionExtension() : doAjaxCC 또는 doAjaxAction 호출 후 자동로그아웃 타임머 재실행
       */
      doAjaxSessionExtension : function(){
        try{
          session.clearMessage();
          session.sessionTimerStart(sLangType, sSiteName, sLogoutPage, sAutoLogoutPage, sAutoExtendFlag);
        }catch(e){}
      },

      /**
       * session.goToPage(paramUrl) : 자동 로그
       */
      goToPage : function(paramUrl){
        try{
          session.clearMessage();
          window.location.href = paramUrl;
        }catch(e){}
      },

      /**
       * session.show(divId, width, height, zIndex, flag, isMobile) : jQuery UI Dialog 보여주기
       * @param {Object} divId    : DOM객체의 ID
       * @param {Object} width    : Dialog의 width
       * @param {Object} height   : Dialog의 height
       * @param {Object} zIndex   : Dialog의 Z-Index 값
       * @param {Object} flag     : Dialog의 Modal 여부
       * @param {Object} isMobile : Dialog의 모바일여부
       */
      show : function(divId, width, height, zIndex, flag, isMobile){
        if(isMobile) $(".keypad").hide();
        var targetObj = $("#"+divId);
        targetObj.dialog({
          width:width,
          height:height,
          modal:flag,
          zIndex:zIndex,
          resizable:false,
          bgiframe:true,
          closeOnEscape:false,
          open: function(event, ui) {
            targetObj.prev().hide();
            targetObj.parent().css({"overflow":"hidden","padding":"0px","border":"0px","background":"transparent"});
            if(isMobile) targetObj.parent().css("left","0px");
            targetObj.css({"width":width,"height":height,"overflow":"hidden","padding":"0px","border":"0px"});
            $("#autoLogoutInDiv").css("z-index",zIndex+1);
            $("#autoLogoutIframe").css("z-index",(zIndex));
            location.href = "#AutoLogOut";
            if(sSiteName==oTalk){
              $("._z_index_").css("z-index",zIndex);
            }
          }
        });
        if(isMobile){
          $(".wrapAll").find("a, input, select, textarea").attr("disabled",true);
        }
      },

      /**
       * session.hide(divId, isMobile) : jQuery UI Dialog 숨기기
       * @param {Object} divId    : DOM객체의 ID
       * @param {Object} isMobile : Dialog의 모바일여부
       */
      hide : function(divId, isMobile){
        $("#"+divId).dialog("close");
        if(isMobile){
          $(".wrapAll").find("a, input, select, textarea").removeAttr("disabled");
        }
      },

      /**
       * session.getPopupLayerText(sLangType, sSiteName, sLogoutPage) : 자동 로그아웃 팝업레이어 HTML
       *  @param {Object} sLangType    : 언어코드 (KOR,ENG,JPN,CHN...)
       *  @param {Object} sSiteName    : 사이트코드 (obank,omweb,omini...)
       *  @param {Object} sLogoutPage  : 로그아웃 실행 후 이동 될 페이지
       */
      getPopupLayerText : function(sLangType, sSiteName, sLogoutPage){
        var sTimeOutMsg  = "";
        switch(sLangType){
          case "KOR":
            switch(sSiteName){
              case mobileSiteName:  // 모바일 뱅킹
                sTimeOutMsg += "<div id='autoLogoutDiv' class='popupLayer' style='position:relative;'>";
                sTimeOutMsg += "  <div class='conbox' style='position:relative;width:320px;height:276px;margin:0px;'>";
                sTimeOutMsg += "    <div class='autologout_box'>";
                sTimeOutMsg += "      <h3>자동 로그아웃 안내</h3>";
                sTimeOutMsg += "      <span>자동 로그아웃 남은 시간</span>";
                sTimeOutMsg += "      <strong id='timeViewTarget'></strong>&nbsp;초";
                sTimeOutMsg += "    </div>";
                sTimeOutMsg += "    <ul class='list_type01'>";
                sTimeOutMsg += "      <li><span class='poi_gray'>고객님의 안전한 금융거래 보호를 위해 로그인 후 약 10분동안 이용이 없어 자동로그인이됩니다.</span></li>";
                sTimeOutMsg += "      <li><span class='poi_gray'>로그인 시간을 연장하려면<br />로그인 연장하기 버튼을 클릭하여 주십시오.</span></li>";
                sTimeOutMsg += "    </ul>";
                sTimeOutMsg += "    <div class='btn_c2'>";
                sTimeOutMsg += "      <a href='javascript:void(0);' class='btn01' onclick='session.extend();'>로그인 연장하기</a>";
                sTimeOutMsg += "      <a href='javascript:void(0);' class='btn02' onclick='session.goToPage(\""+sLogoutPage+"\");'>지금 로그아웃</a>";
                sTimeOutMsg += "    </div>";
                sTimeOutMsg += "  </div>";
                sTimeOutMsg += "</div>";
              break;
              case miniSiteName:  // 미니뱅킹
                sTimeOutMsg += "<div id='autoLogoutDiv' style='position:relative;'>";
                sTimeOutMsg += "  <div id='autoLogoutInDiv' class='layerType autoLogout' style='position:relative;width:310px;height:264px;'>";
                sTimeOutMsg += "    <div class='tit_autologout'>";
                sTimeOutMsg += "      <h1>자동로그아웃안내</h1>";
                sTimeOutMsg += "      <span>자동 로그아웃 남은시간</span>";
                sTimeOutMsg += "      <em id='timeViewTarget'></em>&nbsp;초";
                sTimeOutMsg += "    </div>";
                sTimeOutMsg += "    <ul class='list_type1'>";
                sTimeOutMsg += "      <li>고객님의 안전한 금융거래 보호를 위해 로그인 후 약 10분 동안 이용이 없어 자동로그아웃됩니다.</li>";
                sTimeOutMsg += "      <li>로그인 시간을 연장하시려면 <strong>로그인 연장하기</strong>버튼을 클릭하여 주십시오.</li>";
                sTimeOutMsg += "    </ul>";
                sTimeOutMsg += "    <div class='btnArea'>";
                sTimeOutMsg += "      <span class='btn large action'><input type='button' value='로그인 연장하기' onclick='session.extend();'/></span>";
                sTimeOutMsg += "      <span class='btn large'><input type='button' value='지금 로그아웃' onclick='session.goToPage(\""+sLogoutPage+"\");'/></span>";
                sTimeOutMsg += "    </div>";
                sTimeOutMsg += "  </div>";
                sTimeOutMsg += "  <div id='autoLogoutIframe' style='width:100%;height:100%;'>";
                sTimeOutMsg += "    <iframe title='hidden frame' src='javascript:false;' frameborder='0' style='position:absolute;filter: alpha(opacity=00);width:100%;height:100%;top:0px;right:0px;left:0px;'></iframe>";
                sTimeOutMsg += "  </div>";
                sTimeOutMsg += "</div>";
              break;
              case oTalk:  // 드림톡
                sTimeOutMsg += "<div id='autoLogoutDiv' style='position:relative;'>";
                sTimeOutMsg += "  <div id='autoLogoutInDiv' style='position:relative;width:550px;height:268px;'>";
                sTimeOutMsg += "    <div id='layer_common' class='_z_index_'>";
                sTimeOutMsg += "      <h3>자동 로그아웃 안내</h3>";
                sTimeOutMsg += "      <div class='con'>";
                sTimeOutMsg += "        <div class='secret'>";
                sTimeOutMsg += "          <strong class='poi_blue'>자동 로그아웃 남은 시간 : </strong> <strong class='poi_org'><span id='timeViewTarget'></span></strong>";
                sTimeOutMsg += "          <p class='mt10 f_14'>고객님의 안전한 금융거래를 위해 로그인 후 약 10분동안<br /> 이용이 없어 자동 로그아웃됩니다.<br /><br />";
                sTimeOutMsg += "            <strong class='poi_gray03'>로그인 시간을 연장하시겠습니까?</strong>";
                sTimeOutMsg += "          </p>";
                sTimeOutMsg += "        </div>";
                sTimeOutMsg += "        <div class='btn' style='display:block;'>";
                sTimeOutMsg += "          <a href='javascript:void();' onclick='javascript:session.extend();'><img src='https://oimg1.kbstar.com/img/talk/btn_b_extention.gif' alt='연장하기' /></a>";
                sTimeOutMsg += "          <a href='javascript:void();' onclick='javascript:session.goToPage(\""+sLogoutPage+"\");'><img src='https://oimg1.kbstar.com/img/talk/btn_b_logout.gif' alt='로그아웃' /></a>";
                sTimeOutMsg += "        </div>";
                sTimeOutMsg += "      </div>";
                sTimeOutMsg += "    </div>";
                sTimeOutMsg += "  </div>";
                sTimeOutMsg += "  <div id='autoLogoutIframe' style='width:100%;height:100%;'>";
                sTimeOutMsg += "    <iframe title='hidden frame' src='javascript:false;' frameborder='0' style='position:absolute;filter: alpha(opacity=00);width:100%;height:100%;top:0px;right:0px;left:0px;'></iframe>";
                sTimeOutMsg += "  </div>";
                sTimeOutMsg += "</div>";
              break;
              case oSenior:  // 시니어
	        	    sTimeOutMsg += "<div id='autoLogoutDiv' style='position:relative;'>";
	        	    sTimeOutMsg += "    <div id='autoLogoutInDiv' class='layerType autoLogout' style='position:absolute;width:402px;height:302px;'>";
	        	    sTimeOutMsg += "        <div class='layerSize01'>";
	        	    sTimeOutMsg += "            <div class='layerHeader'>";
	        	    sTimeOutMsg += "                <h1><img src='https://oimg1.kbstar.com/img/osenior/layout/logo03.gif' alt='KB국민은행' /></h1>";
	        	    sTimeOutMsg += "            </div>";
	        	    sTimeOutMsg += "            <div class='layerCont'>";
	        	    sTimeOutMsg += "                <div class='autoLogoutInfo'>";
	        	    sTimeOutMsg += "                    <h2>자동 로그아웃 안내</h2>";
	        	    sTimeOutMsg += "                    <dl>";
	        	    sTimeOutMsg += "                        <dt>자동 로그아웃 남은 시간</dt>";
	        	    sTimeOutMsg += "                        <dd><em id='timeViewTarget'></em>초</dd>";
	        	    sTimeOutMsg += "                    </dl>";
	        	    sTimeOutMsg += "                </div>";
	        	    sTimeOutMsg += "                <div class='popBoxType03 mgt15'>";
	        	    sTimeOutMsg += "                    <ul class='cmt01'>";
	        	    sTimeOutMsg += "                        <li>고객님의 안전한 금융거래 보호를 위해 로그인 후<br /><strong class='ptxt01'>약 10분</strong> 동안 이용이 없어 <strong>자동 로그아웃</strong> 됩니다.</li>";
	        	    sTimeOutMsg += "                        <li>로그인 시간을 연장하시려면 로그인 연장하기 <br />버튼을 클릭하여 주십시오.</li>";
	        	    sTimeOutMsg += "                    </ul>";
	        	    sTimeOutMsg += "                </div>";
	        	    sTimeOutMsg += "            </div>";
	        	    sTimeOutMsg += "            <div class='btnCnt mgt16'>";
	        	    sTimeOutMsg += "                <a href='#none' class='btnType02' onclick='session.extend();'><span>로그인 연장하기</span></a>";
	        	    sTimeOutMsg += "                <a href='#none' class='btnType01' onclick='session.goToPage(\""+sLogoutPage+"\");'><span>지금 로그아웃</span></a>";
	        	    sTimeOutMsg += "            </div>";
	        	    sTimeOutMsg += "        </div>";
	        	    sTimeOutMsg += "    </div>";
	        	    sTimeOutMsg += "    <div id='autoLogoutIframe' style='width:100%;height:100%;'>";
                sTimeOutMsg += "        <iframe title='hidden frame' src='javascript:false;' frameborder='0' style='position:absolute;filter: alpha(opacity=00);width:100%;height:100%;top:0px;right:0px;left:0px;'></iframe>";
                sTimeOutMsg += "    </div>";
        	      sTimeOutMsg += "</div>";     	   
             break;
              default:            // 인터넷뱅킹
                sTimeOutMsg += "<div id='autoLogoutDiv' style='position:relative;'>";
								sTimeOutMsg += "  <a name='AutoLogOut' id='AutoLogOut' title='자동로그아웃안내' class='blind' style='text-decoration:none;cursor:default !important;'></a>";
                sTimeOutMsg += "  <div id='autoLogoutInDiv' class='layerType autoLogout' style='position:relative;width:310px;height:264px;'>";
                sTimeOutMsg += "    <div class='tit_autologout'>";
                sTimeOutMsg += "      <h1>자동로그아웃안내</h1>";
                sTimeOutMsg += "      <span>자동 로그아웃 남은시간</span>";
                sTimeOutMsg += "      <em id='timeViewTarget'></em>&nbsp;초";
                sTimeOutMsg += "    </div>";
                sTimeOutMsg += "    <ul class='list_type1'>";
                sTimeOutMsg += "      <li>고객님의 안전한 금융거래 보호를 위해 로그인 후 약 10분 동안 이용이 없어 자동로그아웃됩니다.</li>";
                sTimeOutMsg += "      <li>로그인 시간을 연장하시려면 <strong>로그인 연장하기</strong>버튼을 클릭하여 주십시오.</li>";
                sTimeOutMsg += "    </ul>";
                sTimeOutMsg += "    <div class='btnArea'>";
                sTimeOutMsg += "      <span class='btn large action'><input type='button' value='로그인 연장하기' onclick='session.extend();'/></span>";
                sTimeOutMsg += "      <span class='btn large'><input type='button' value='지금 로그아웃' onclick='session.goToPage(\""+sLogoutPage+"\");'/></span>";
                sTimeOutMsg += "    </div>";
                sTimeOutMsg += "  </div>";
                sTimeOutMsg += "  <div id='autoLogoutIframe' style='width:100%;height:100%;'>";
                sTimeOutMsg += "    <iframe title='hidden frame' src='javascript:false;' frameborder='0' style='position:absolute;filter: alpha(opacity=00);width:100%;height:100%;top:0px;right:0px;left:0px;'></iframe>";
                sTimeOutMsg += "  </div>";
                sTimeOutMsg += "</div>";
              break;
            }
            break;
          case "ENG":
            sTimeOutMsg += "<div id='autoLogoutDiv' style='position:relative;'>";
            sTimeOutMsg += "  <div id='autoLogoutInDiv' class='layerType autoLogout' style='position:relative;width:310px;height:294px;'>";
            sTimeOutMsg += "    <div class='tit_autologout'>";
            sTimeOutMsg += "      <h1>Auto logout Guide</h1>";
            sTimeOutMsg += "      <span>Remaining time to automatic logout</span>";
            sTimeOutMsg += "      <em id='timeViewTarget'></em>&nbsp;Seconds";
            sTimeOutMsg += "    </div>";
            sTimeOutMsg += "    <ul class='list_type1'>";
            sTimeOutMsg += "      <li>You are to be automatically logged out to protect your transactions as you have been inactive for 10 minutes.</li>";
            sTimeOutMsg += "      <li>To extend the session time, please click <strong>Extend login</strong> button.</li>";
            sTimeOutMsg += "    </ul>";
            sTimeOutMsg += "    <div class='btnArea'>";
            sTimeOutMsg += "      <span class='btn large action'><input type='button' value='Extend Login' onclick='session.extend();'/></span>";
            sTimeOutMsg += "      <span class='btn large'><input type='button' value='Logout Now' onclick='session.goToPage(\""+sLogoutPage+"\");'/></span>";
            sTimeOutMsg += "    </div>";
            sTimeOutMsg += "  </div>";
            sTimeOutMsg += "  <div id='autoLogoutIframe' style='width:100%;height:100%;'>";
            sTimeOutMsg += "    <iframe title='hidden frame' src='javascript:false;' frameborder='0' style='position:absolute;filter: alpha(opacity=00);width:100%;height:100%;top:0px;right:0px;left:0px;'></iframe>";
            sTimeOutMsg += "  </div>";
            sTimeOutMsg += "</div>";
          break;
          case "JPN":
            sTimeOutMsg += "<div id='autoLogoutDiv' style='position:relative;'>";
            sTimeOutMsg += "  <div id='autoLogoutInDiv' class='layerType autoLogout' style='position:relative;width:310px;height:264px;'>";
            sTimeOutMsg += "    <div class='tit_autologout'>";
            sTimeOutMsg += "      <h1>自動ログアウトの案内</h1>";
            sTimeOutMsg += "      <span>自動ログアウトの残り時間</span>";
            sTimeOutMsg += "      <em id='timeViewTarget'></em>&nbsp;秒";
            sTimeOutMsg += "    </div>";
            sTimeOutMsg += "    <ul class='list_type1'>";
            sTimeOutMsg += "      <li>顧客様の安全な金融取引保護のために、ログイン後に約10分間利用がないので、自動ログアウトされます。</li>";
            sTimeOutMsg += "      <li>ログイン時間を延長したい場合は、ログイン延長ボタンをクリックしてください。</li>";
            sTimeOutMsg += "    </ul>";
            sTimeOutMsg += "    <div class='btnArea'>";
            sTimeOutMsg += "      <span class='btn large action'><input type='button' value='ログインの延長' onclick='session.extend();'/></span>";
            sTimeOutMsg += "      <span class='btn large'><input type='button' value='今ログアウト' onclick='session.goToPage(\""+sLogoutPage+"\");'/></span>";
            sTimeOutMsg += "    </div>";
            sTimeOutMsg += "  </div>";
            sTimeOutMsg += "  <div id='autoLogoutIframe' style='width:100%;height:100%;'>";
            sTimeOutMsg += "    <iframe title='hidden frame' src='javascript:false;' frameborder='0' style='position:absolute;filter: alpha(opacity=00);width:100%;height:100%;top:0px;right:0px;left:0px;'></iframe>";
            sTimeOutMsg += "  </div>";
            sTimeOutMsg += "</div>";
          break;
          case "CHN":
            sTimeOutMsg += "<div id='autoLogoutDiv' style='position:relative;'>";
            sTimeOutMsg += "  <div id='autoLogoutInDiv' class='layerType autoLogout' style='position:relative;width:310px;height:264px;'>";
            sTimeOutMsg += "    <div class='tit_autologout'>";
            sTimeOutMsg += "      <h1>自动安全退出指南</h1>";
            sTimeOutMsg += "      <span>自动安全退出剩余时间</span>";
            sTimeOutMsg += "      <em id='timeViewTarget'></em>&nbsp;秒";
            sTimeOutMsg += "    </div>";
            sTimeOutMsg += "    <ul class='list_type1'>";
            sTimeOutMsg += "      <li>为确保客户金融交易安全，登录后10分钟内未使用服务将自动安全退出。</li>";
            sTimeOutMsg += "      <li>若要延长登录时间，请点击<strong>延长登录</strong>按钮。</li>";
            sTimeOutMsg += "    </ul>";
            sTimeOutMsg += "    <div class='btnArea'>";
            sTimeOutMsg += "      <span class='btn large action'><input type='button' value='延长登录' onclick='session.extend();'/></span>";
            sTimeOutMsg += "      <span class='btn large'><input type='button' value='立即安全退出' onclick='session.goToPage(\""+sLogoutPage+"\");'/></span>";
            sTimeOutMsg += "    </div>";
            sTimeOutMsg += "  </div>";
            sTimeOutMsg += "  <div id='autoLogoutIframe' style='width:100%;height:100%;'>";
            sTimeOutMsg += "    <iframe title='hidden frame' src='javascript:false;' frameborder='0' style='position:absolute;filter: alpha(opacity=00);width:100%;height:100%;top:0px;right:0px;left:0px;'></iframe>";
            sTimeOutMsg += "  </div>";
            sTimeOutMsg += "</div>";
          break;
        }
        return sTimeOutMsg;
      }
    }
  }();

//-----------------------------------------------------------------------------------------------------------------------