var checkCC = false;
var checkAction=false;
var checkEJC = false;
var checkMobile = false;
var checkPhoneAcc = false;
var checkTwoChannelAcc = false;

function setCheckEJC(flag) {
	checkEJC=flag;
}
function setCheckMobile(flag) {
	checkMobile=flag;
}
function setPhoneAcc() {
	checkPhoneAcc=true;
}
function setTwoChannelAcc() {
       checkTwoChannelAcc=true;
}
function parseQuicsURL(uURL) {
	var strHref=uURL;
	var pageId ="" ;
	if(strHref.indexOf("page=") > -1 ) {
		var strQueryString=strHref.substring(strHref.indexOf("page=")+5);
		
		if(strQueryString.indexOf("&") >-1 ) {
			pageId=strQueryString.substring(0,strQueryString.indexOf("&"));
		} else {
			if(strQueryString.indexOf("#") >-1 ) {
				pageId=strQueryString.substring(0,strQueryString.indexOf("#"));
			} else {
				pageId=strQueryString;
			}
		}
	} else {
		//window.location.href=uURL;
	}
	return pageId;
}
function getElement(id) { 
      if(document.all) return document.all(id); 
      if(document.getElementById) return document.getElementById(id); 
}
function replaceAmp(org) {
	var result=org.replace(/&amp;/g,'&');
	return result;
}
function doAjaxCC(frm) { 
    	var frmName = frm.name;
    	doAjaxCC4Name(frm , frmName);
}
function doAjaxCC4Name(frm , frmName) { 
	  if(checkCC==true) {
	    alert('요청하신 업무를 처리 중입니다. 잠시만 기다려 주세요.');
	    return;
	  }
	  checkCC=true;
	  
	  if(typeof($ASTX2_KB_CUSTOM) != 'undefined' && $ASTX2_KB_CUSTOM.getIsE2E(frm)) {
		  $ASTX2.getE2EData(
				frm,
				function onSuccess(data) {
					$ASTX2.setE2EData(frm, data, false);
					doAjaxCC4Name_biz(frm , frmName);
				},
				function onFailure() {
					checkCC=false;
					alert($ASTX2_CUST.getErrorMessage($ASTX2.getLastError()));
				}
		  );
	  } else {
		  doAjaxCC4Name_biz(frm , frmName);
	  }
}
function doAjaxCC4Name_biz(frm , frmName) {
  	var cURL = replaceAmp(frm.action);
	var asisURL=parseQuicsURL(window.location.href);
	var tobeURL=parseQuicsURL(cURL);
	
	if(asisURL=='' || asisURL != tobeURL) {
	    checkCC=false;
	    frm.action=cURL;
	    frm.submit();
	    return;
	}  else {
			var strHref=cURL;
			if(strHref.indexOf('cc=') > -1 ) {
				var strQueryString=strHref.substring(strHref.indexOf('cc=')+3);
				var cc ;
				if(strQueryString.indexOf('&') >-1 ) {
					cc=strQueryString.substring(0,strQueryString.indexOf('&'));
				} else {
					if(strQueryString.indexOf("#") >-1 ) {
						cc=strQueryString.substring(0,strQueryString.indexOf("#"));
					} else {
						cc=strQueryString;
					}
				}
				if(cc != '' ) {
					if(strQueryString.indexOf(';') >-1 ) {
	    					checkCC=false;
	    					frm.action=cURL;
	    					frm.submit();
	    					return;
					} else  {
						var aParam=cc.split(':');
						var ccDiv=aParam[0];
						if(getElement(ccDiv)==null) {
								 //alert(ccDiv+'해당 DIV영역이 없습니다.');
								frm.action=cURL;
								frm.submit();
								checkCC=false;
								return;
						}				
						var ccUrl=aParam[1];
						doAjaxCCProcess(cURL,ccDiv,ccUrl,frmName,frm);
					}
				} else {
					checkCC=false;
					// alert("URL에 Component Change(cc) 가 없습니다.\n 다시 확인하여 주시기 바랍니다.");
					frm.action=cURL;
					frm.submit();
				}
			} else {
				checkCC=false;
				frm.action=cURL;
				frm.submit();
			}
	}
}
function doAjaxAction(frm,callback,isLoadingBar) { 
    var frmName = frm.name;
    doAjaxAction4Name(frm , callback, frmName, isLoadingBar);
}
function noticeConn() {
	if(checkMobile==true) {
     window.location.href="/common/html/oMobileNotice.html";
  } else {
   	window.location.href="/common/html/oNotice.html";
  }
}
function exceptionAjax(x, textStatus, errorThrown) {
   noticeConn();
}
function doAjaxAction4Name(frm,callback,frmName,isLoadingBar) {
	if(checkAction == true ) {
		alert("요청하신 업무를 처리 중입니다. 잠시만 기다려 주세요.");
		return;
	}
	
	checkAction=true;
	if(isLoadingBar!=false){
		showLoadingBar();
	}
	removeQSSL();
  
	if(typeof($ASTX2_KB_CUSTOM) != 'undefined' && $ASTX2_KB_CUSTOM.getIsE2E(frm)) {
		$ASTX2.getE2EData(
				frm,
				function onSuccess(data) {
					$ASTX2.setE2EData(frm, data, false);
					doAjaxAction4Name_biz(frm,callback,frmName,isLoadingBar);
				},
				function onFailure() {
					if(isLoadingBar!=false){
						hiddenLoadingBar();
					}
					checkAction=false;
					alert($ASTX2_CUST.getErrorMessage($ASTX2.getLastError()));
				}
		);
	} else {
		doAjaxAction4Name_biz(frm,callback,frmName,isLoadingBar);
	}
}
function doAjaxAction4Name_biz(frm,callback,frmName,isLoadingBar) {
	  var callback_method = callback;
	  var strHref=replaceAmp(frm.action);
	  //parameterStart = '/quics?';
	  //startInt = strHref.indexOf(parameterStart)+parameterStart.length;
	  //endInt = strHref.length;
	  //var parameter = strHref.substr(startInt,endInt);
	  try{ SecukeyTypeInsertForm(frm) }catch(e){}
	  var dataString = $('[name='+frmName+']').serialize();
	  var Rtype;
	  if(strHref.indexOf('RType=') > -1 ) {
			var strQueryString=strHref.substring(strHref.indexOf('RType=')+6);
		
			if(strQueryString.indexOf('&') >-1 ) {
				Rtype=strQueryString.substring(0,strQueryString.indexOf("&"));
			}else{
				Rtype=strQueryString;
			}		
	  }else{
		  Rtype='json';
	  }

	  $.ajax({
	    type: 'POST',
	    url: strHref,
	    contentType: 'application/x-www-form-urlencoded;  charset=utf-8',
	    data: dataString,
	    dataType: Rtype,
	    timeout: 180000,
	    success: function(data) {
			  if(isLoadingBar!=false){
			    hiddenLoadingBar();
			  }
	      caq.session.doAjaxSessionExtension();
	      if(Rtype=='json'){
	      	if(data.msg.common.status=='F'){
	      		var error_code = data.msg.common.errorcode;
	           var error_msg = data.msg.common.errormessage;
	      		caq.error.setErrorMsg(error_code, error_msg, '', '', '', '','',false);
	            checkAction=false;
	      		return;
	      	}
	      }
	      if(Rtype=='xml'){
	      	if(($(data).find("fld[key='status']").text())=='F'){
	      		var error_code = $(data).find("fld[key='errorcode']").text();
	             var error_msg = $(data).find("fld[key='errormessage']").text(); 
	      		caq.error.setErrorMsg(error_code, error_msg, '', '', '', '','',false);
	             checkAction=false;
	      		return;
	      	}
	      }     
	      if(window[callback_method]){
	          window[callback_method](data);
	      }else{
	      	//alert("callback_method error");
	    	  noticeConn();
	      }
	      checkAction=false;
	    } ,
	    error: function(xhr, textStatus, errorThrown) {
			  if(isLoadingBar!=false){
			    hiddenLoadingBar();
			  }
	      checkAction=false;
	     exceptionAjax(xhr, textStatus, errorThrown);
	    }
	  });	
}



function doAjaxActionForCallback(frm,callback,isLoadingBar) { 
    var frmName = frm.name;
    doAjaxAction4NameForCallback(frm , callback,frmName,isLoadingBar);
}
function doAjaxAction4NameForCallback(frm,callback,frmName,isLoadingBar) {
	if(checkAction == true ) {
		alert("요청하신 업무를 처리 중입니다. 잠시만 기다려 주세요.");
		return;
	}

	checkAction=true;
	if (isLoadingBar!=false) {
		showLoadingBar();
	}
	removeQSSL();
  
	if(typeof($ASTX2_KB_CUSTOM) != 'undefined' && $ASTX2_KB_CUSTOM.getIsE2E(frm)) {
		$ASTX2.getE2EData(
				frm,
				function onSuccess(data) {
					$ASTX2.setE2EData(frm, data, false);
					doAjaxAction4NameForCallback_biz(frm,callback,frmName,isLoadingBar);
				},
				function onFailure() {
					checkAction=false;
					if(isLoadingBar!=false){
						hiddenLoadingBar();
					}
					alert($ASTX2_CUST.getErrorMessage($ASTX2.getLastError()));
				}
		);		
	} else {
		doAjaxAction4NameForCallback_biz(frm,callback,frmName,isLoadingBar);
	}
}
function doAjaxAction4NameForCallback_biz(frm,callback,frmName,isLoadingBar) {
	  var callback_method = callback;
	  var strHref=replaceAmp(frm.action);
	  //parameterStart = '/quics?';
	  //startInt = strHref.indexOf(parameterStart)+parameterStart.length;
	  //endInt = strHref.length;
	  //var parameter = strHref.substr(startInt,endInt);
	  try{ SecukeyTypeInsertForm(frm) }catch(e){}
	  var dataString = $('[name='+frmName+']').serialize();
	  var Rtype;
	  if(strHref.indexOf('RType=') > -1 ) {
			var strQueryString=strHref.substring(strHref.indexOf('RType=')+6);
			if(strQueryString.indexOf('&') >-1 ) {
				Rtype=strQueryString.substring(0,strQueryString.indexOf("&"));
			}else{
				Rtype=strQueryString;
			}		
	  }else{
		  Rtype='json';
	  }
	  
	  $.ajax({
		    type: 'POST',
		    url: strHref,
		    contentType: 'application/x-www-form-urlencoded;  charset=utf-8',
		    data: dataString,
		    dataType: Rtype,
		    timeout: 180000,
		    success: function(data) {
		      caq.session.doAjaxSessionExtension();
		      if(window[callback_method]){
		          window[callback_method](data);
		      }else{
		        //alert("callback_method 에러");
		    	  noticeConn();
		      }
		      checkAction=false;
				  if(isLoadingBar!=false){
				    hiddenLoadingBar();
				  }
		    } ,
		    error: function(xhr, textStatus, errorThrown) {
		      checkAction=false;
			  if(isLoadingBar!=false){
				  hiddenLoadingBar();
			  }
		     exceptionAjax(xhr, textStatus, errorThrown);
		    }
	  });	
}
function doAjaxCCProcess(frmAction,baseCompId,chgCompId,frmName,frm) {
  parameterStart = "/quics?";
  startInt = frmAction.indexOf(parameterStart)+parameterStart.length;
  endInt = frmAction.length;
  var parameter = frmAction.substr(startInt,endInt);
  try{ SecukeyTypeInsertForm(frm) }catch(e){}
  var dataString = $('[name='+frmName+']').serialize();
  showLoadingBar();
  removeQSSL();
  $.ajax({
    type: 'POST',
    url: '/quics?chgCompId='+chgCompId+'&baseCompId='+baseCompId+'&'+parameter,
    contentType: "application/x-www-form-urlencoded;  charset=UTF-8",
    data: dataString,
    dataType: 'html',
    timeout: 180000,
    success: function(data) {
      caq.session.doAjaxSessionExtension();
      hiddenLoadingBar();
      checkCC=false;
      doCompChg(baseCompId, chgCompId, data,frm);
    } ,
    error: function(xhr, textStatus, errorThrown) {
      checkCC=false;
      hiddenLoadingBar();
      exceptionAjax(xhr, textStatus, errorThrown);
    }
  });	
}
function getResult(data) {
    var divStart = "<div id=\"result\">";
    var divEnd = "</div><!-- result -->";
    var startInt = data.indexOf(divStart)+divStart.length;
    var endInt = data.indexOf(divEnd);
    var content = data.substr(startInt, (endInt - startInt)); 
    return content;	
}
function getHtml(html,divId) {
		var content = "";
    var divStart = "<!-- " + divId + " START -->";
    var divEnd = "<!-- " + divId + " END -->";
    if( html.indexOf(divStart) == -1 ) {
    	content = getHtmlBySelf(html,divId);
  	} else {
    	var startInt = html.indexOf(divStart)+divStart.length;
    	var endInt = html.indexOf(divEnd);
    	content = html.substr(startInt, (endInt - startInt));
  	}
    return content;	
}
function getHtmlBySelf(html,divId) {
		var content = "";
    var divStart = "<div id=\"" + divId + "\">";
    var divEnd = "</div><!-- " + divId + " -->";
    if( html.indexOf(divStart) > -1 ) {
    	var startInt = html.indexOf(divStart)+divStart.length;
    	var endInt = html.indexOf(divEnd);
    	content = html.substr(startInt, (endInt - startInt));
  	}
    return content;	
}
function doCompChg(baseCompId, chgCompId, data, frm) {
  var $content = $(data);
  var resultVal = getResult(data);
  var ary = new Array();
  ary = eval("("+resultVal+")");
  if (ary.result=="view") {
  	if(baseCompId == chgCompId) {
  		$('#'+baseCompId).html(getHtmlBySelf(data,chgCompId));
  	} else {
      $('#'+baseCompId).html(getHtml(data,chgCompId));
      }
    if(checkMobile==false) {
       location.href = '#CP';
    } else {
       $("html").scrollTop(0);
       $("body").scrollTop(0);
    }
    caq.error.setErrorDiv();
    
    if(typeof($ASTX2_KB_CUSTOM) != 'undefined') {
    	try{$ASTX2_KB.initDoCC();}catch(e){}	
    }else{
    	try{ SetExtE2EFields(); }catch(e){}	
    }
    
  } else if(ary.result=="action") {
  	var str=ary.message;
  	if(str!=null && str!="") {
      frm.action=str;
  		frm.submit();
  	}
  } else if(ary.result=="error") {
  	alert(ary.message);
    noticeConn();
  }else { 
  	//alert("기타 에러"+ary.message);
   noticeConn();
  }
}
function showLoadingBar() {
      if(checkMobile==false){
      	if(checkPhoneAcc==false){
	        $("html").scrollTop(0);
	        $("body").scrollTop(0);
	        var logdingImg = (checkEJC) ? "s_loading_ENG_n.gif" : "loading2_n.gif";
	        var logdingTxt = (checkEJC) ? "Loading" : "처리중입니다";
	        var tempHtml   = '<div id="loading" class="Loading" style="margin:0px auto;text-align:center;">';
	            tempHtml  += '  <img id="loading_img" src="https://oimg1.kbstar.com/img/ocommon/'+logdingImg+'" alt="'+logdingTxt+'" style="background-color:#fff;border:1px solid #ccc;" />';
	            tempHtml  += '</div>';
	        $("body").append(tempHtml);
	        var bWidth    = $(window).width()-10;
	        var bHeight   = $(window).height();
	        var iHeight   = (bHeight-116)/2;
	        var targetObj = $("#loading");
	        targetObj.dialog({
	          width:bWidth, height:bHeight,
	          modal:true, zIndex:10005,
	          resizable:false, bgiframe:true,
	          closeOnEscape:false,
	          open: function(event, ui) {
	            $(".ui-dialog-titlebar").hide();
	            targetObj.parent().css({"overflow":"hidden","padding":"0px","border":"0px","background":"transparent","left":"0"});
	            targetObj.css({"width":"100%","height":bHeight,"overflow":"hidden","padding":"0px","border":"0px"});
	            if($.browser.msie){
	              $("html").css("overflow-x","hidden");
	              $("html").css("overflow-y","hidden");
	            }
	          }
	        });
	        $("#loading_img").css("margin-top",iHeight);
	        location.href = "#loading";
      	} else {
	        $("html").scrollTop(0);
	        $("body").scrollTop(0);
	        var logdingImg ="";
	        if(checkTwoChannelAcc==false){
	             logdingImg = "loading_callok.gif";//(checkEJC) ? "s_loading_ENG.gif" : "loading2.gif";
	        }else{
	             logdingImg = "loading_eng2.gif";
	        }
	        var logdingTxt = "전화승인서비스 요청중 입니다";//(checkEJC) ? "Loading" : "처리중입니다";
	        var tempHtml   = '<div id="loading" class="Loading" style="margin:0px auto;text-align:center;">';
	            tempHtml  += '  <img id="loading_img" src="https://oimg1.kbstar.com/img/ocommon/'+logdingImg+'" alt="'+logdingTxt+'" style="background-color:#fff;border:1px solid #ccc;" />';
	            tempHtml  += '</div>';
	        $("body").append(tempHtml);
	        var bWidth    = $(window).width()-10;
	        var bHeight   = $(window).height();
	        var iHeight   = (bHeight-116)/2;
	        var targetObj = $("#loading");
	        targetObj.dialog({
	          width:bWidth, height:bHeight,
	          modal:true, zIndex:10005,
	          resizable:false, bgiframe:true,
	          closeOnEscape:false,
	          open: function(event, ui) {
	            $(".ui-dialog-titlebar").hide();
	            targetObj.parent().css({"overflow":"hidden","padding":"0px","border":"0px","background":"transparent","left":"0"});
	            targetObj.css({"width":"100%","height":bHeight,"overflow":"hidden","padding":"0px","border":"0px"});
	            if($.browser.msie){
	              $("html").css("overflow-x","hidden");
	              $("html").css("overflow-y","hidden");
	            }
	          }
	        });
	        $("#loading_img").css("margin-top",iHeight);
	        location.href = "#loading";
      		checkPhoneAcc = false;
             checkTwoChannelAcc = false;

      	}
      } else {
        var logdingImg = (checkEJC) ? "s_loading_ENG_n.gif" : "loading2_n.gif";
        var logdingTxt = (checkEJC) ? "Loading" : "처리중입니다";
        var tempHtml   = '<div id="loading" class="Loading">';
            tempHtml  += '  <p><img src="https://oimg1.kbstar.com/img/ocommon/'+logdingImg+'" alt="'+logdingTxt+'"/></p>';
            tempHtml  += '</div>';
        $("body").append(tempHtml);
        var targetObj = $("#loading");
        targetObj.dialog({
          width:220, height:116,
          modal:true, zIndex:10005,
          resizable:false,
          closeOnEscape:false,
          open: function(event, ui) {
            $(".ui-dialog-titlebar").hide();
            targetObj.parent().css({"overflow":"hidden","padding":"0px"});
            targetObj.css({"width":220,"height":116,"overflow":"hidden","padding":"0px","border":"0px"});
          }
        });
      }
   
}
function hiddenLoadingBar(){
      var targetObj = $("#loading");
      targetObj.dialog("close");
      targetObj.remove();
      if(checkMobile==false){
        if($.browser.msie){
          $("html").css("overflow-x","auto");
          $("html").css("overflow-y","auto");
        }
      }
}
var cur1DepIdx,cur2DepIdx;

(function($){
	$.fn.snb = function(){
		return $(this).each(function(){

			var $this = $(this);
			var isOpenType = $this.hasClass('snbType2');
			var aLen = $this.find('a').size();
                  var min2DepW = 140;

			if(isOpenType){				
				$this.find('ul').wrap('<div class="dep2Wrap"></div>');
				$this.find('a.activated').next().find('ul').show();
                        cur1DepIdx = $('>li>a.activated',$this).parent().index();
                        cur2DepIdx = $('ul a.activated',$this.children('li').eq(cur1DepIdx)).parent().index();
			}

 			if(!isOpenType){
 				$(this).find('ul').css('width',function(){					
 					var curVal = parseInt($(this).prev().css('width'))+15;
 					return (min2DepW>curVal) ? min2DepW+'px' : curVal +'px';
 				});
 			}

			$('>li>a',this).bind('focusin mouseenter',function(){
				if(isOpenType){
					$('>li>a.activated',$this).removeClass('activated')
				}
				$(this).parent().siblings('li').css('z-index',0).end().css('z-index','9999');
				$this.find('ul').hide();
				$('>li>a.on',$this).removeClass('on')
				$(this).addClass('on');
				if($(this).next().size() > 0){	
					if(isOpenType){
						$(this).next().find('ul').show();
					} else {
						$(this).next().show();
					}
				}
			});	
			$('>li>a',this).bind('focusout mouseleave',function(){				
				$(this).parent().css('z-index',0);				
			});	

			$('>li',this).bind('mouseleave',function(){
				$('ul',this).hide();
				$('>a',this).removeClass('on');
				if(isOpenType){
					if(cur1DepIdx >= 0) $('>li:eq('+cur1DepIdx+')>a',$this).addClass('activated').next().find('ul').show();
				}				
			});

			if(isOpenType){
				$('>li:eq('+cur1DepIdx+') ul a',$this)
					.bind('focusin mouseenter',function(){						
						$(this).parent().siblings().find('a.activated').removeClass('activated');
					})
					.bind('focusout',function(){						
						$this.find('.dep2Wrap:eq('+cur1DepIdx+') li:eq('+cur2DepIdx+') a').addClass('activated');
						
					})
					.closest('ul').bind('mouseleave',function(){
                                    if(cur2DepIdx >= 0) $this.find('.dep2Wrap:eq('+cur1DepIdx+') li:eq('+cur2DepIdx+') a').addClass('activated');
					})
			}

			$this.find('a').eq(aLen-1).bind('focusout',function(){
				$('>li>a.on',$this).removeClass('on');
				$(this).mouseleave();				
			});	

		});
	}
	$.fn.lnb = function(){
		return $(this).each(function(){
			var $this = $(this);
			var aLen = $this.find('a').length;			
			$('>li:not(.on)>a',this).bind('focusin mouseenter',function(){
				$('>li.on li.on',$this).addClass('hold');				
				$(this).parent().siblings('li:not(.on)').css('z-index',0).end().css('z-index','9999');
				$(this).parent().siblings('li:not(.on)').find('ul').hide();		
				if($(this).next().size() > 0){					
					$(this).next().show();
				}					
			});
			$('>li.on a',this).bind('focusin',function(){	
				$('>li.on li.on',$this).removeClass('hold');	
				$this.children('li:not(.on)').find('ul').hide();	
			});
			$this.find('a').eq(aLen-1).bind('focusout',function(){
				$('>li.on li.on',$this).removeClass('hold');
				$(this).mouseleave()
				
			});
			$('>li:not(.on)',this)			
			.bind('mouseenter',function(){
				$('>li.on li.on',$this).addClass('hold');
				$('>a',this).addClass('instance');
			})
			.bind('mouseleave',function(){
				$('>li.on li.on',$this).removeClass('hold');
				$('>a',this).removeClass('instance');
				$(this).find('ul').hide()
			})
			.each(function(){$(this).find('li').last().addClass('last')})						
		});
	}
	$(function(){
		$('#lnb').lnb();
		$('#snb').snb();
	});
})(jQuery);
function addFavorate(obj){	
	$(obj).toggleClass('on');
	$('#afMng').show();
	$('.h_addFavorate').bind('click',function(e){
		e.stopPropagation();
	})
	$(document).bind('click',function(){
		$('#afMng').hide();
		$(obj).removeClass('on');
	});
	$('.h_logout a').bind('focusin',function(){		
		$('#afMng').hide();
		$(obj).removeClass('on');
	})
}
function addFavorCP(e){
	var event  = window.event || e;
	if($.browser.msie){		
		event.cancelBubble = "true";
	} else {
		event.stopPropagation();
	}
	addFavorate('#addLauncher');
	$('#setFavorLauncher').trigger('click');
	
}
function setAddFolder(){
	$('#newFolder').show();	
}
function allSvcLauncher(){
	$('#allSvcList').show().bind('mouseleave',function(){
		$(this).hide();
	}).find('a:last').bind('focusout',function(){
		$('#allSvcList').hide();
	});
}
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();
  function setPng24(obj) { 
    obj.width=obj.height=1; 
    obj.className=obj.className.replace(/\bpng24\b/i,''); 
    obj.style.filter = 
    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');" 
    obj.src='';  
    return ''; 
} 

 /*
$(function(){
	$('.clauseBox iframe').each(function(){		
		var url = this.src;
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPad/i))) {
		  $(this).parent().css({maxHeight:'200px',overflow:'hidden'});
         $(this).parent().after('<div style="border-top:1px solid #dcdcdc;padding:10px;zoom:1;text-align:center"><span class="btn large"><a href="'+url+'&amp;QSL=F" target="_blank">약관 자세히 보기</a></span></div>');
		}
	});	
});
*/

$(function() {
$('.clauseBox iframe').each(function(){		
		var url = this.src;
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPad/i))) {
			$(this).parent().css({maxHeight:'200px',overflow:'hidden'});
			if($('html').attr('lang') == 'ko'){
				$(this).parent().after('<div style="border-top:1px solid #dcdcdc;padding:10px;zoom:1;text-align:center"><span class="btn large"><a href="'+url+'" target="_blank">약관 자세히 보기</a></span></div>');
			} else {
				$(this).parent().after('<div style="border-top:1px solid #dcdcdc;padding:10px;zoom:1;text-align:center"><span class="btn large"><a href="'+url+'" target="_blank">Details</a></span></div>');
			}
		}		
	});
});

/////////////////////////////////////////////////////
function getSSLCookie( name ){
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break;
	}
	return "";
}
function setSSLCookie( name, value, expiredays ) {
  var today = new Date();
  today.setDate( today.getDate() + expiredays );		
  document.cookie = name + "=" + escape( value ) + "; domain=kbstar.com; path=/; expires=" + today.toGMTString() + ";";
}
function removeSSLCookie( name, value ) {
  var today = new Date();
  today.setDate( today.getDate() -1);		
  document.cookie = name + "=" + escape( value ) + "; domain=kbstar.com; path=/; expires=" + today.toGMTString() + ";";
}
function removeQSSL() {
	var clockEnd;
 var startday = new Date();
  clockEnd = startday.getTime();
  removeSSLCookie('QSTTL',clockEnd);
}
function checkQSSL() {
  var clockStart;
  var clockEnd;
  var sslTime='';
  var startday = new Date();
  clockStart = startday.getTime();
  sslTime = getSSLCookie('QSTTL');
  if(BrowserDetect.browser =='Opera' || BrowserDetect.browser =='Chrome'){
  	return;
  }
  if(sslTime == ""){
  }else if((clockStart - sslTime) < 0){
  	clockEnd = startday.getTime();
  	setSSLCookie('QSTTL',clockEnd,'1');
    removeSSLCookie('QSID','');
    window.location.href=window.location.href;
  }else if((clockStart - sslTime) > 60000){
  	clockEnd = startday.getTime();
  	setSSLCookie('QSTTL',clockEnd,'1');
    removeSSLCookie('QSID','');
    window.location.href=window.location.href;
  }else{
    clockEnd = startday.getTime();
  	removeSSLCookie('QSTTL',clockEnd);
  }
}
$(document).ready(function() {
  var clockEnd;
  var startday = new Date();
  clockEnd = startday.getTime();
  removeSSLCookie('QSTTL',clockEnd);
});
$(window).unload(function() {
  var clockStart;
  var clockEnd;
  var startday = new Date();
  clockEnd = startday.getTime();
  if(BrowserDetect.browser =='Opera' || BrowserDetect.browser =='Chrome'){
  	return;
  }
	if(window.opener == null || window.opener == 'undefined' ) {
		setSSLCookie('QSTTL',clockEnd,'1');
	} 
});
checkQSSL();
/////////////////////////////////////////////////////
jQuery(function(){
	var tab = $('.listTab');
	tab.removeClass('jsOff');
	tab.attr('class', "listTab m1");
	tab.css('height', tab.find('>ul>li>ul:visible').height()+40);
	
		
	function onSelectTab(){
		var t = $(this);
		tab.attr('class', "listTab");
		var myClass = t.parent('li').attr('class');
		

		// $("."+myClass+ " img").css('border','1px solid red');
		
		t.parents('.listTab:first').attr('class', 'listTab '+myClass);
		tab.css('height', t.next('ul').height()+40);
		//t.find("img").css('border','1px solid red');
		/* $("#img1").attr("src",$("#img1").attr("src").replace('on','off'));
		$("#img2").attr("src",$("#img2").attr("src").replace('on','off'));
		$("#img3").attr("src",$("#img3").attr("src").replace('on','off')); */
		
		
		var ul_length = tab.find('ul').size()-1;

//t.find("img").css('border','1px solid red');
for(var k=1; k <= ul_length ; k++){
var img_id = "#img"+k;
$(img_id).attr("src",$(img_id).attr("src").replace('on','off'));

}


		
		t.find("img").attr("src",t.find("img").attr("src").replace('off','on')); 
	
		return false;
				
	}
	
	
	
	tab.find('>ul>li>a').click(onSelectTab).focus(onSelectTab)
	
});

//2020-12-10  인증센터 툴팁 추가 
$(function() {
	$('.certMenu_2020 .h_cert a, .certMenu_2020 .h_btn a').bind('mouseover focus', function(){
		$(this).addClass('on');
    	$(this).siblings('.cert_submenu').show();
	})
	$('.certMenu_2020 .h_cert, .certMenu_2020 .h_btn').bind('mouseleave', function(){
		$('.certMenu_2020 .h_cert a').removeClass('on');
		$('.cert_submenu').hide();
	})
	$('.cert_submenu a:last-child').focusout(function(){
		$('.certMenu_2020 .h_cert a, .certMenu_2020 .h_btn a').removeClass('on');
		$('.cert_submenu').hide();
	})
});