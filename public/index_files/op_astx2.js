var $ASTX2_KB =
{
	secureMode : null,
	setSecureMode : function(arg){this.secureMode=arg;},
	getSecureMode : function(){return this.secureMode;},
	
	vmMode : null,
	setVmMode : function(arg){this.vmMode=arg;},
	getVmMode : function(){return this.vmMode;},	
		
	netizen : null,
	setNetizen : function(func){this.netizen = func;},
	getNetizen : function(){return this.netizen;},
	
	npEfdWCtrlInitLoginLog : null,
	setnpEfdWCtrlInitLoginLog : function(func){this.npEfdWCtrlInitLoginLog = func;},
	getnpEfdWCtrlInitLoginLog : function(){return this.npEfdWCtrlInitLoginLog;},
	
	npEfdWCtrlInitTransLog : null,
	setnpEfdWCtrlInitTransLog : function(func){this.npEfdWCtrlInitTransLog = func;},
	getnpEfdWCtrlInitTransLog : function(){return this.npEfdWCtrlInitTransLog;},
	
	npEfdWCtrlGetLoginLog : null,
	setnpEfdWCtrlGetLoginLog : function(func){this.npEfdWCtrlGetLoginLog = func;},
	getnpEfdWCtrlGetLoginLog : function(){return this.npEfdWCtrlGetLoginLog;},
	
	npEfdWCtrlGetTransLog : null,
	setnpEfdWCtrlGetTransLog : function(func){this.npEfdWCtrlGetTransLog = func;},
	getnpEfdWCtrlGetTransLog : function(){return this.npEfdWCtrlGetTransLog;},	
	
	securekey : null,
	setSecurekey : function(func){this.securekey = func;},
	getSecurekey : function(){return this.securekey;},
	
	astxLoading : false,
	setAstxLoading : function(bool){this.astxLoading = bool;},
	getAstxLoading : function(){return this.astxLoading;},
	
	init : function(checkInstall) {
		
		if(checkInstall=='' || checkInstall=='0') {
			$ASTX2_KB_CUSTOM.removeActiveXObject();
		}
		
		if(checkInstall=='') {
			
			if(typeof(setCheckEJC)=="function" && typeof(showLoadingBar)=="function" && typeof(hiddenLoadingBar)=="function" && typeof(checkEJC)=="boolean") {
				$ASTX2_KB.setAstxLoading(true);
				setCheckEJC(true);
				showLoadingBar();
			}
			
		  	$ASTX2.init(
			  		function onSuccess() {
						$ASTX2_KB.setSecureMode("ASTX2");
						
						$ASTX2_KB.initSuccess();
						
						$ASTX2_KB_CUSTOM.createAstxForm('0');
						var frm = document.getElementById('frmAstxInstallCheck');
						var callback = 'astxInstallCheckCallback';
						doAjaxAction(frm,callback,false);
			  		},
			  		function onFailure() {
						$ASTX2_KB.setSecureMode("ACTIVEX");
						$ASTX2_KB.initFailure();
			  		}
		  	);
		} else if(checkInstall == '0') {
			if($ASTX2_KB_CUSTOM.isFormE2E() || $ASTX2_KB_CUSTOM.isFormPcLog()) {
			  	$ASTX2.init(
				  		function onSuccess() {
							$ASTX2_KB.setSecureMode("ASTX2");
							$ASTX2_KB.initSuccess();								
				  		},
				  		function onFailure() {
							$ASTX2_KB.setSecureMode("ACTIVEX");
							$ASTX2_KB.initFailure();
				  		}
			  	);
			}
		} else {
			$ASTX2_KB.setSecureMode("ACTIVEX");
			
			if($ASTX2_KB_CUSTOM.isFormPcLog()) {
				$ASTX2_KB_CUSTOM.setPcLog(false);	
			}
		}
	},
	initSuccess : function() {
		if($ASTX2_KB_CUSTOM.isWinOS()) {
			
  					$ASTX2_KB.setVmMode(false);
  					
  					$(document).find('form').each(function(){
  						if($(this).find('input[name=e2e_data1]').length > 0) {
  							
  							var arrE2EInputId = [];
  							$(this).find(':input').each(function(){
  								if(typeof($(this).attr('e2e_type')) != 'undefined' && $(this).attr('e2e_type') != null) {
  									arrE2EInputId.push(parseFloat($(this).attr('e2e_inputid')));
  								}
  							});
  							
  							var arrE2EInputIdMax = Math.max.apply(Math,arrE2EInputId);
  							$(this).find(':input').each(function(){
  								
  								if(typeof($(this).attr('e2e_type')) != 'undefined' && $(this).attr('e2e_type') != null) {
  									$ASTX2.clearE2EText($(this)[0]);
  									
  									if($(this).attr('e2e_type') < 0) {
  										arrE2EInputIdMax++;
  										$(this).attr('e2e_type',1);
  										$(this).attr('e2e_inputid',arrE2EInputIdMax);
  									}
  								}
  							});
  							
  							$(this).find('input[name=e2e_data1]').remove();
  						}
  					});
  					
  					if($ASTX2_KB_CUSTOM.isFormE2E()) {
  				
  						$ASTX2.setE2EAllExceptInputs();
  						$ASTX2.initE2E(null,function(onSuccess) {
  							if(onSuccess) {
  								
  							  if($ASTX2_KB_CUSTOM.checkKeyboard() == false){
  							  		//키보드보안 구동중이 아닌 경우
  							  		$ASTX2_KB.setVmMode(true);
  							  		
					  					$(document).find('form').each(function(){
					  						$(this).find(':input').each(function(){
					  							$(this).removeAttr("e2e_inputid");
					  							$(this).removeAttr("e2e_type");
					  							$(this).removeAttr("e2e_inputtype");
					  						});
					  						
					  						$(this).find('input[name=e2e_data1]').remove();
					  						
                        if(typeof(npVCtrl)!="undefined") npVCtrl.isAbsoluteUse = function(){return true};
					  						if(typeof(vKpd)!="undefined") {
					  							var KEYPAD_FORM_NAME = $(this).attr('name');
					  							
					  							$("input[id^='KEYPAD_USEYN_']").each(function(){
					  								var KEYPAD_CHECKBOX_ID = $(this).val();
					  								vKpd.setCheck(KEYPAD_FORM_NAME, KEYPAD_CHECKBOX_ID, true);
					  							});
					  						}
					  					});  							  		
  							  		
  							  		return;
  							  } 								
  								
  								initIncaKeyPad();
  								$ASTX2_KB_CUSTOM.setE2ENumber();
  								$ASTX2_KB_CUSTOM.initE2EFormSubmit();
  							} else {
  								alert($ASTX2_CUST.getErrorMessage($ASTX2.getLastError()));
  							}
  						});
  					}  					
		}

		if($ASTX2_KB_CUSTOM.isFormPcLog()) {
			$ASTX2_KB_CUSTOM.setPcLog(true);
		}
	},
	initFailure : function() {
		if($ASTX2_KB.getSecurekey() != null) $ASTX2_KB.getSecurekey()();
		
		if($ASTX2_KB.getNetizen() != null) $ASTX2_KB.getNetizen()();
		
		if($ASTX2_KB_CUSTOM.isFormPcLog()) {
			$ASTX2_KB_CUSTOM.setPcLog(false);	
		}
		
		$ASTX2_KB_CUSTOM.createAstxForm($ASTX2.getLastError());
		var frm = document.getElementById('frmAstxInstallCheck');
		var callback = 'astxInstallCheckCallback';
		doAjaxAction(frm,callback,false);
	},
	initDoCC : function() {
		
		if($ASTX2_KB_CUSTOM.isWinOS()) {
			if($ASTX2_KB.getSecureMode() == null) {
				
				if($ASTX2_KB_CUSTOM.isFormE2E() || $ASTX2_KB_CUSTOM.isFormPcLog()) {
					
					$ASTX2_KB_CUSTOM.removeActiveXObject();
					
				  	$ASTX2.init(
					  		function onSuccess() {
								$ASTX2_KB.setSecureMode("ASTX2");
								$ASTX2_KB.initSuccess();
					  		},
					  		function onFailure() {
								$ASTX2_KB.setSecureMode("ACTIVEX");
								$ASTX2_KB.initFailure();
								SetExtE2EFields();
					  		}
				  	);
				}else{
					try{ SetExtE2EFields(); }catch(e){}
				}
				
			}else if($ASTX2_KB.getSecureMode() == "ASTX2") {
				$ASTX2_KB.initSuccess();
			} else {
				try{ SetExtE2EFields(); }catch(e){}
			}
		} else {
			try{ SetExtE2EFields(); }catch(e){}
		}
	}
};

var $ASTX2_KB_CUSTOM =
{
	checkKeyboard : function(){
			//키보드보안 서비스 상태 확인 추가
		$ASTX2.checkService($ASTX2_CONST.SERVICE_AK, fnCallback);
		
		function fnCallback (param) {
			if( param['service'] == $ASTX2_CONST.SERVICE_AK ) {
					if ( param['result'] != $ASTX2_CONST.ERROR_SUCCESS ) {
						 //키보드보안 구동되지 않은 상태
							return false;
			   }
			   else{
			  	 		return true;
			  }
			}
		} 	
 
	},
	
	setPcLog : function(isSuccess) {

		if($ASTX2_KB_CUSTOM.isFormPcLog()){
			if(isSuccess) {
				
				$ASTX2.getPCLOGData(
						null,
						function onSuccess(data) {
							
							$(document).find('form').each(function(index){
								var frmObj=$(this);
								$(this).find('input[type=hidden]').each(function(){
									if($(this).attr('name')=='i_login_seculog_form' || $(this).attr('name')=='i_trans_seculog_form' || $(this).attr('name')=='isLogInitPage'){

										$ASTX2.setPCLOGData(frmObj[0], data);
										$ASTX2_KB_CUSTOM.createAstxElement(frmObj[0], "i_astx_yn", "Y");
										
										if(typeof(npEfdsCtrl) !="undefined" && typeof(npEfdsCtrl.GetLoginLog)=="function") {
											$ASTX2_KB.setnpEfdWCtrlGetLoginLog(npEfdsCtrl.GetLoginLog);
											npEfdsCtrl.GetLoginLog = new Function("return;");
										}
										if(typeof(npEfdsCtrl) !="undefined" && typeof(npEfdsCtrl.GetTransLog)=="function") {
											$ASTX2_KB.setnpEfdWCtrlGetTransLog(npEfdsCtrl.GetTransLog);
											npEfdsCtrl.GetTransLog = new Function("return;");
										}						
										
										$ASTX2_KB_CUSTOM.setUseAstxPcService(frmObj[0],true);
										
										
									}
								});
								
							});

						}, 
						function onFailure() {
                            return false;
						}
				);
				
			} else {
				$(document).find('form').each(function(index){
					var frmObj=$(this);
					$(this).find('input[type=hidden]').each(function(){
						if($(this).attr('name')=='i_login_seculog_form' || $(this).attr('name')=='i_trans_seculog_form' || $(this).attr('name')=='isLogInitPage'){
							if(frmObj[0].elements.namedItem("i_login_seculog_form") != null) {
								if($ASTX2_KB.getnpEfdWCtrlInitLoginLog() != null) $ASTX2_KB.getnpEfdWCtrlInitLoginLog()();
							}
							
							if(frmObj[0].elements.namedItem("i_trans_seculog_form") != null) {
								if($ASTX2_KB.getnpEfdWCtrlInitTransLog() != null) $ASTX2_KB.getnpEfdWCtrlInitTransLog()();
							}
							
							$ASTX2_KB_CUSTOM.setUseAstxPcService(frmObj[0],false);
						}
					});
				});	
			}
		}
	},
	getIsE2E : function(obj) {
		var rtnVal=false;

		$(obj).find(':input').each(function(){
			if(typeof($(this).attr('e2e_inputid')) != 'undefined' && $(this).attr('e2e_inputid') != null && $(this).attr('e2e_inputid') > 0) {
				rtnVal = true;
				return false;
			}
		});
		
		return rtnVal;
	},
	setE2ENumber : function() {
		var regExp = new Array();
		regExp[0] = /filterInputData\(\[0\-9\]/gi;
		regExp[1] = /filterInputData\(\[0\-9\-\]/gi;
		regExp[2] = /caq.util.formInputControl\(\,1/gi;
		regExp[3] = /caq.util.formInputControl\(\,4/gi;
		regExp[4] = /uf_PwdNumberChk\(/gi;
		regExp[5] = /uf_NumberChk\(/gi;
		regExp[6] = /uf_NumberChkPre\(/gi;
		regExp[7] = /keyAction\(/gi;
		regExp[8] = /onlyNumber\(/gi;
		regExp[9] = /keyNumericDash\(/gi;
		regExp[10] = /chkNum\(/gi;
		regExp[11] = /keyNumeric\(/gi;

		$(document).find(':input').each(function(){
			var func = new Array();
			func[0] = $(this).attr('onkeypress');
			func[1] = $(this).attr('onkeyup');
			func[2] = $(this).attr('onblur');
			
			if(typeof($(this).attr('e2e_inputid')) != 'undefined' && $(this).attr('e2e_inputid') != null && $(this).attr('e2e_inputid') > 0) {
				for(var i=0;i<func.length;i++) {
					if(typeof(func[i]) != "undefined") {
						var s = func[i].replace(/(\s*)/g,'');
							s = s.replace(/\'/g,'');
							s = s.replace($(this).attr('id'),'');
						
						for(var j=0;j<regExp.length;j++) {
							if(s.match(regExp[j]) != null) {
								$(this).attr('e2e_inputtype','1');
								return;
							}
						}
					}
				}
			}
		});
	},
	setUseAstxPcService : function(frmObj,isbool) {
		var obj = frmObj.elements.namedItem("isLogInitPage");
		
		if(obj != null) {
			if (isbool && typeof(callAstLogger)=="function"){
				if(obj != null) obj.value="ASTX";

				callAstLogger();
			}				
			if (!isbool && typeof(callIncaLogger)=="function"){
				if(obj != null) obj.value="INCA";

				callIncaLogger();
			}			
		}
	},
	createAstxElement : function(frmObj, elmId, val) {
		var obj = frmObj.elements.namedItem(elmId);
		var elm;
		if(obj != null) {
			elm = obj; 
		} else {
			elm = document.createElement('input');
			elm.id = elmId;
			elm.name = elmId;
			elm.type = 'hidden';
			
			frmObj.appendChild(elm);			
		}
		
		if(typeof(val) != 'undefined') elm.value = val;
	},
	createAstxForm : function(val) {
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
	},
	isFormE2E : function() {
		var rtnVal=false;
		
		$(document).find('form').each(function(){
			$(this).find('input[type=password]').each(function(){
				rtnVal = true;
				return false;
			});
			$(this).find("input[id^='KEYPAD_USEYN_']").each(function(){
				rtnVal = true;
				return false;
			});
		});
		
		return rtnVal;
	},
	isFormE2EData1 : function(obj) {
		var rtnVal=false;

		$(obj).find('input[type=hidden]').each(function(){
			if($(this).attr('name')=='e2e_data1') {
				rtnVal = true;
				return false;
			}
		});
		
		return rtnVal;
	},
	isFormPcLog : function() {
		var rtnVal=false;
		
		$(document).find('form').each(function(index){
			$(this).find('input[type=hidden]').each(function(){
				if($(this).attr('name')=='i_login_seculog_form' || $(this).attr('name')=='i_trans_seculog_form' || $(this).attr('name')=='isLogInitPage'){
					rtnVal = true;
					return false;
				}
			});
		});
		
		return rtnVal;
	},
	removeActiveXObject : function() {
		if(typeof(scskiscomplete)=="function") {
			$ASTX2_KB.setSecurekey(scskiscomplete);
			scskiscomplete = new Function("return;");
		}

		if(typeof(initNetizenFirewall)=="function") {
			$ASTX2_KB.setNetizen(initNetizenFirewall);
			initNetizenFirewall = new Function("return;");
		}
		
		if(typeof(npEfdsCtrl) != "undefined") {
			if(typeof(npEfdsCtrl.InitLoginLog)=="function") {
				$ASTX2_KB.setnpEfdWCtrlInitLoginLog(npEfdsCtrl.InitLoginLog);
				npEfdsCtrl.InitLoginLog = new Function("return;");
			}
			if(typeof(npEfdsCtrl.InitTransLog)=="function") {
				$ASTX2_KB.setnpEfdWCtrlInitTransLog(npEfdsCtrl.InitTransLog);
				npEfdsCtrl.InitTransLog = new Function("return;");
			}
		}
	},
	isWinOS: function() {
		if(navigator.platform.indexOf("Win32") != -1 || navigator.platform.indexOf("Win64") != -1 ) {
			return true;
		}

		return false;
	},
	initE2EFormSubmit : function() {
			$('form').submit(function(e){
					e.preventDefault();
					
					if(e.target.onsubmit == null) {
						var _form = this;
						var _method = this.method;
						var _action = this.action;
						var _target = this.target;
						var _targetChange = "";
						
						if($ASTX2_KB_CUSTOM.isWinOS() && $ASTX2_KB_CUSTOM.getIsE2E(_form) && $ASTX2_KB.getVmMode()==false) {
					  		  $ASTX2.getE2EData(
					  				  	_form,
					    				function onSuccess(data) {
					    					$ASTX2.setE2EData(_form, data, true);

					    					_targetChange = this.target;
					    					
					    					if(_target != _targetChange) {
					    						this.target = _target;
					    						_form.submit();
					    						this.target = _targetChange;
					    					} else {
					    						alert($ASTX2_CUST.getErrorMessage($ASTX2.getLastError()));
					    					}

					    				},
					    				function onFailure() {
					    					alert($ASTX2_CUST.getErrorMessage($ASTX2.getLastError()));
					    				}
					  		  );
						} else {
							_form.submit();	
						}
					}
				});
				
				var astxExecuteSubmit = new Array();
				$(document).find('form').each(function(i){
					var formObj = $(this)[0];
					var formName = $(this).attr('name');
					var formTarget = "";
					var formChangeTarget = "";
					
					astxExecuteSubmit[i] = document[formName].submit;
					
					document[formName].submit = function(){
						
						if($ASTX2_KB_CUSTOM.isWinOS() && $ASTX2_KB_CUSTOM.getIsE2E(formObj) && $ASTX2_KB.getVmMode()==false) {
							
						formTarget = document[formName].target;
							
				  		  $ASTX2.getE2EData(
				  				  	document[formName],
				    				function onSuccess(data) {
				    					$ASTX2.setE2EData(document[formName], data, true);
				    					
				    					if(formTarget != document[formName].target) {
				    						formChangeTarget = document[formName].target;
				    						document[formName].target = formTarget;
				    						
				    						astxExecuteSubmit[i].apply(document[formName]);
				    						
				    						document[formName].target = formChangeTarget;
				    					} else {
				    						astxExecuteSubmit[i].apply(document[formName]);
				    					}
				    				},
				    				function onFailure() {
				    					alert($ASTX2_CUST.getErrorMessage($ASTX2.getLastError()));
				    				}
				  		  );				
							
						} else {
							astxExecuteSubmit[i].apply(document[formName]);	
						}
						
						return false;
					};
				});  
	}
};

function initIncaKeyPad() {
	if(typeof(vKpd)!="undefined") {
		$(document).find('form').each(function(){
			var KEYPAD_FORM_NAME = $(this).attr('name');

			$(this).find("input[id^='KEYPAD_USEYN_']").each(function(){
				
				var KEYPAD_CHECKBOX_ID = $(this).val();
				
				var KEYPAD_INPUT_ = new Array();
				KEYPAD_INPUT_[0] = $(this).attr('id').replace(/_USEYN_/g,'_INPUT_');
				KEYPAD_INPUT_[1] = $(this).attr('id').replace(/_USEYN_/g,'_INPUT_')+"0";
				KEYPAD_INPUT_[2] = $(this).attr('id').replace(/_USEYN_/g,'_INPUT_')+"1";
				
				for(var i=0;i<KEYPAD_INPUT_.length;i++) {
					var inputID = $("input[id='"+KEYPAD_INPUT_[i]+"']").val();
					if($("input[id='"+inputID+"']").val()=="") {
						vKpd.setCheck(KEYPAD_FORM_NAME, KEYPAD_CHECKBOX_ID, false);
						break;
					}
				}
				
				var KEYPAD_INPUT_ID = $("input[id='"+KEYPAD_INPUT_[0]+"']").val();
				var $KEYPAD_INPUT = $("input[id='"+KEYPAD_INPUT_ID+"']");
				
				if($KEYPAD_INPUT.attr('type') == "text" && $KEYPAD_INPUT.attr('e2e_type')==0) {
					if(typeof(caq) != 'undefined' && typeof(caq.security) != 'undefined' && typeof(caq.security.setExtE2E) == 'function') {
						$ASTX2.addE2EObject($KEYPAD_INPUT[0]);
					}else{
						vKpd.findElement(KEYPAD_INPUT_ID, KEYPAD_FORM_NAME).readOnly = false;
					}
				}	

			});
		});
		$ASTX2.resetE2E();
	}
}

function checkSecureKeyState() {
	if($ASTX2_KB_CUSTOM.isWinOS()) {
		if($ASTX2_KB.getSecureMode()=="ASTX2" && $ASTX2_KB.getVmMode()==false) {
			return true;
		}else if($ASTX2_KB.getSecureMode()=="ACTIVEX") {
			try {
				if(document.secukey.STATE() == '2' || document.secukey.INI7E2ESTATE() == '1'){ 
					return false;
				} else if(document.secukey.STATE() == '1' || document.secukey.STATE() == '106'){ 
					return true;
				}
			} catch(e) {
				return false;
			}
		}else{
			try {
				var obj = new ActiveXObject('SCSK3.SCSK3Ctrl.1');
				
				if(obj) {
					return true;
				}else{
					return false;
				}
			}catch(e){
				return false;
			}
		}
	}

	return false;
}

function astxInstallCheckCallback(data) {
	if(data.msg.servicedata.resultCode !="" && data.msg.servicedata.resultCode !="0" && data.msg.servicedata.resultCode !="103") {
		
		var astxErrorCode = data.msg.servicedata.resultCode*1;
		
		$(document).find('form').each(function(){
			$(this).find(':input').each(function(){
				$(this).removeAttr("e2e_inputid");
				$(this).removeAttr("e2e_type");
				$(this).removeAttr("e2e_inputtype");
			});
			
			$(this).find('input[name=e2e_data1]').remove();
			if(typeof(npVCtrl)!="undefined") npVCtrl.isAbsoluteUse = function(){return false};
			if(typeof(vKpd)!="undefined") {
				var KEYPAD_FORM_NAME = $(this).attr('name');
				
				$("input[id^='KEYPAD_USEYN_']").each(function(){
					var KEYPAD_CHECKBOX_ID = $(this).val();
					vKpd.setCheck(KEYPAD_FORM_NAME, KEYPAD_CHECKBOX_ID, checkSecureKeyState());
				});
			}
		});
		
		if($ASTX2_KB_CUSTOM.isWinOS()) {
			alert($ASTX2_CUST.getErrorMessage(astxErrorCode));	
		}
	}
	
	if($ASTX2_KB.getAstxLoading()) {
		$ASTX2_KB.setAstxLoading(false);
		if(typeof(setCheckEJC)=="function" && typeof(showLoadingBar)=="function" && typeof(hiddenLoadingBar)=="function" && typeof(checkEJC)=="boolean") {
			setCheckEJC(false);
			hiddenLoadingBar();
		}
	}
}

function setKeypadReadOnly(inputId, formId, time) {
	window.setTimeout(function(){vKpd.findElement(inputId, formId).readOnly = true;}, time);
}

$(function(){
	
	$(document).bind('vkpd-useyn-on',function(param) {
		if($ASTX2_KB_CUSTOM.isWinOS() && typeof($ASTX2_KB) != 'undefined' && $ASTX2_KB.getSecureMode()=="ASTX2" && $ASTX2_KB.getVmMode()==false) {
			
			for(var i=0;i<param.name.length;i++){
				var time = (i+1)*100;
				
				if($("input[id='"+param.name[i]+"']").attr('type') == "text") {
					if(typeof(caq) != 'undefined' && typeof(caq.security) != 'undefined' && typeof(caq.security.setExtE2E) == 'function') {
						$ASTX2.subE2EObject(document.getElementById(param.name[i]));
						setKeypadReadOnly(param.name[i],param.form,time);
					}					
				} else {
					$ASTX2.subE2EObject(document.getElementById(param.name[i]));
					setKeypadReadOnly(param.name[i],param.form,time);
				}
			}
			$ASTX2.resetE2E();
		}
	});
	$(document).bind('vkpd-useyn-off',function(param) {
		if($ASTX2_KB_CUSTOM.isWinOS() && typeof($ASTX2_KB) != 'undefined' && $ASTX2_KB.getSecureMode()=="ASTX2" && $ASTX2_KB.getVmMode()==false) {
			for(var i=0;i<param.name.length;i++){
				if($("input[id='"+param.name[i]+"']").attr('type') == "text") {
					if(typeof(caq) != 'undefined' && typeof(caq.security) != 'undefined' && typeof(caq.security.setExtE2E) == 'function') {
						$ASTX2.addE2EObject(document.getElementById(param.name[i]));
					}					
				} else {
					$ASTX2.addE2EObject(document.getElementById(param.name[i]));
				}
			}
			$ASTX2.resetE2E();
		}
	});
});