/* **********************************************************************
	nameSpace nameSpace 생성
********************************************************************** */
;(function(window, $){
	'use strict';

	var global = "$newutils", nameSpace = "KBOBANK.utils", nameSpaceRoot = null;

	function createNameSpace(identifier, module){
		var win = window, name = identifier.split('.'), p, i = 0;

		if(!!identifier){
			for (i = 0; i < name.length; i += 1){
				if(!win[ name[ i ] ]){
					if(i === 0){
						win[ name[ i ] ] = {};
						nameSpaceRoot = win[ name[ i ] ];
					} else {
						win[ name[ i ] ] = {};
					}
				}
				win = win[ name[ i ] ];
			}
		}
		if(!!module){
			for (p in module){
				if(!win[ p ]){
					win[ p ] = module[ p ];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return win;
	}

	if(!!window[ global ]){
		throw new Error("already exists global!> " + global);
	}

	/* ---------------------------------------------------------------------------
		namespace KBOBANK.utils
		* 네임스페이스 생성
		* method namespace
		* memberof KBOBANK.utils
		* param {Object} identifier 구분자
		* param {Object} module 네임스페이스 하위로 생성 할 객체
		* return createNameSpace
		* example
			$newutils.namespace('a.b.c', {
				functionA: function(){
					console.log("call a!");
				},
				functionB: function {
					console.log("call b!");
				}
			});

			a.b.c.functionA(); // call a!
			a.b.c.functionB(); // call b!
	--------------------------------------------------------------------------- */
	window[ global ] = createNameSpace(nameSpace, {
		namespace : function(identifier, module){
			return createNameSpace(identifier, module);
		}
	});
})(window, jQuery);

var frontend;
var $zoom_value = "120";

/* **********************************************************************
	KBOBANK.common
	* frontend 초기화
	* @memberof KBOBANK.common
********************************************************************** */
;(function(window, $) {
	'use strict';
	frontend = $newutils.namespace('KBOBANK.common', {

		/* ---------------------------------------------------------------------------
			레이아웃 : 네비게이션
		--------------------------------------------------------------------------- */
		uiNav : function(){
			/* 퀵메뉴 열고닫기 토글 */
			$plugin.togglecon($('#uiNavAside'),{
				toggle_type : 'toggle',
				selector_btn : '.ui-btn',
				class_open : "close",
				callback_change : function(){
					if($('#uiNavAside').hasClass('close')) var state = "close";
					else var state = "open";
					setUiCookie('uiQuickFlag', state, 365);
				}
			});

			if(getUiCookie('uiQuickFlag')=="close"){
				$('#uiNavAside').addClass('close');
			}

			/* 최근본상품 토글 */
			$plugin.togglecon($('.nav-aside .menu3'),{
				toggle_type : 'toggle',
				selector_btn : ' > a',
				txt_state : true,
				txt_state_open : "열기",
				txt_state_close : "닫기"
			});
		},

		/* ---------------------------------------------------------------------------
			레이아웃 : 화면확대축소
		--------------------------------------------------------------------------- */
		uiZoom : function(){
			/* 기본 */
			var $btn_zoom1 = $('#uiZoomBtn1');
			var $btn_zoom2 = $('#uiZoomBtn2');

			//초기상태설정
			if($('#uiNavAside').length){
				if(getUiCookie('uiFontFlag')=="ON"){
					$('#uiZoomOn').prop('checked',true);
					$('#uiZoomOff').prop('checked',false);
					setUiFont(true);
				}else{
					$('#uiZoomOn').prop('checked',false);
					$('#uiZoomOff').prop('checked',true);
					setUiFont(false);
				}
			}

			//설정변경 이벤트
			$('input[name="ui_zoom"]').live("click", function(ev) {
				if($('input[name="ui_zoom"]:checked').attr('id')=="uiZoomOn"){
					setUiCookie('uiFontFlag', 'ON', 365);
					setUiFont(true);
				}else{
					setUiCookie('uiFontFlag', 'OFF', 365);
					setUiFont(false);
				}
			});
		},

		/* ---------------------------------------------------------------------------
			레이아웃 : 스크롤이동에 따른 UI컨트롤
		--------------------------------------------------------------------------- */
		uiFixed : function(){
			var $btn_top_btn = $('a[href="#HEADER"]');

			$btn_top_btn.live('click',function(ev){
				//ev.preventDefault();
				$('html, body').animate({scrollTop : 0},200);
			});

			$('.ui-motion-scroll').addClass('ready');

			$('.ui-motion-scroll').each(function(index){
				var motion_el = $(this);
				if($(window).height() - ($(this).offset().top - $(window).scrollTop()) > 0){
					motion_el.removeClass('ready').addClass("load");
				}
			});

			$(window).scroll(function(e){
				$('.ui-motion-scroll').each(function(index){
					if($(window).height() - ($(this).offset().top - $(window).scrollTop()) > 0){
						$(this).removeClass('ready').addClass("load");
					}
				});
			});
		},

		/* ---------------------------------------------------------------------------
			공통UI : Placeholder
		--------------------------------------------------------------------------- */
		setPlaceholder : function(){
			$('.input-holder input, .input-holder textarea').each(function(){
				if($(this).val()!=""){
					$(this).addClass("valueon");
					$(this).parents('.input-holder').addClass('del-on');
				}
				else{
					$(this).removeClass("valueon");
					$(this).parents('.input-holder').removeClass('del-on');
				}

				$(this).attr('aria-describedby',$(this).next('span').attr('id'));
			});

			$('.input-holder input, .input-holder textarea')
				.live('focus', function(){
					if(!$(this).parent().hasClass('autofocus')) $(this).addClass("valueon");
					else{
						if($(this).val()!="") $(this).addClass("valueon");
					}
				})
				.live('blur', function(){
					$(this).parent().removeClass('autofocus');
					if($(this).val()=="") $(this).removeClass("valueon");
					else $(this).addClass("valueon");
				})
				.live('keyup', function(){
					$(this).parent().removeClass('autofocus');
					$(this).addClass("valueon");

					if($(this).val()=="") $(this).parents('.input-holder').removeClass('del-on');
					else $(this).parents('.input-holder').addClass('del-on');
				});

			//초기화버튼
			$('.btn-icon1.ic4').live('click',function(){
				$(this).parents('fieldset').find('.input-holder').removeClass('del-on');
				$(this).parents('fieldset').find('.input-holder').find('input[type="text"]').val('').focus();
			});

			$('.input-holder > span').live('click', function(){
				if($('[aria-describedby="'+$(this).attr('id')+'"]').length) $('[aria-describedby="'+$(this).attr('id')+'"]').focus();
				else $(this).prev('input').focus();
			});
		},

		/* ---------------------------------------------------------------------------
			공통UI : 폼객체 스타일 디버깅
		--------------------------------------------------------------------------- */
		setFormCheck : function(){
			/* 체크박스, 라디오버튼 : 스타일 초기화 */
			$('input[type="checkbox"], input[type="radio"]').each(function(){
				if($(this).is(':checked')) $('label[for="'+$(this).attr('id')+'"]').addClass('checked');
				else $('label[for="'+$(this).attr('id')+'"]').removeClass('checked');
			});

			/* 체크박스, 라디오버튼 : 이벤트 스타일설정 */
			$('input[type="checkbox"], input[type="radio"]').bind('click', function(){
				var $that = $(this);
				if($that.attr("readonly")){
					return false;
				}else{
					if ($that.is('[type="checkbox"]')) {
						if($that.prop('checked')) $('label[for="'+$that.attr('id')+'"]').addClass('checked');
						else $('label[for="'+$that.attr('id')+'"]').removeClass('checked');
					} else if ($that.is('[type="radio"]')) {
						$('input[name="'+ $that.attr('name') +'"]').each(function() {
							if ($(this).attr('id') == $that.attr('id')) $('label[for="'+$(this).attr('id')+'"]').addClass('checked');
							else $('label[for="'+$(this).attr('id')+'"]').removeClass('checked');
						});
					}
				}
      });
      
      /* 2021-01-28 웹 접근성 추가 */
      $('.label-icon1 input[type="radio"], .label-toggle1 input[type="radio"]').bind('keypress', function(e) {
        if(e.keyCode === 13 || e.keyCode === 32) {
          if($(this).attr('checked') === false) {
            $(this).attr('checked', true);
            $(this).next().addClass('checked');
            $(this).siblings('input').attr('checked', false);
            $(this).siblings('input').next().removeClass('checked');
          } else {
            $(this).attr('checked', false);
            $(this).next().removeClass('checked');
            $(this).siblings('input').attr('checked', true);
            $(this).siblings('input').next().addClass('checked');
          }
          $(this).siblings('input').focus();
        } else {
          return false;
        }
      })
		},

		/* ---------------------------------------------------------------------------
			공통UI : 폼객체 : 보기모드변경
		--------------------------------------------------------------------------- */
		setFormMode : function(){
			$('.label-icon1 input[type="radio"]').bind('click',function(){
				if($(this).val()=="mode1"){
					$('#'+$(this).attr('name')).removeClass('mode2').addClass('mode1');
					$('.ui-mode-view').removeClass('mode2').addClass('mode1');
					
					$('.label-icon1').removeClass('mode2').addClass('mode1'); // 2019-01-24
					
				}else{
					$('#'+$(this).attr('name')).removeClass('mode1').addClass('mode2');
					$('.ui-mode-view').removeClass('mode1').addClass('mode2');
					
					$('.label-icon1').removeClass('mode1').addClass('mode2'); // 2019-01-24
				}

				//$('.area-tooltip1.open').find('.ui-close').trigger('click');
      });
      
      /* 2021-01-28 웹 접근성 추가 */
      $('.label-icon1 input[type="radio"]').bind('keypress', function(e) {
        if(e.keyCode === 13 || e.keyCode === 32) {
          if($(this).val()=="mode2"){
            $('#'+$(this).attr('name')).removeClass('mode2').addClass('mode1');
            $('.ui-mode-view').removeClass('mode2').addClass('mode1');
            
            $('.label-icon1').removeClass('mode2').addClass('mode1');
            
          }else{
            $('#'+$(this).attr('name')).removeClass('mode1').addClass('mode2');
            $('.ui-mode-view').removeClass('mode1').addClass('mode2');
            
            $('.label-icon1').removeClass('mode1').addClass('mode2');
          }
        } else {
          return false;
        }
			})
			$('.label-toggle1 input[type="radio"]').bind('keypress', function(e) {
				if(e.keyCode === 13 || e.keyCode === 32) {
					if($(this).val()=="on") {
						$('.info-summary1').removeClass('on');
					} else {
						$('.info-summary1').addClass('on');
					}
				}
			})

			// 라디오 마우스 드래그 버그
			$('.label-icon1 input[type="radio"], .label-toggle1 input[type="radio"]').bind('mousedown', function() {
				return false;
			});
			$('.label-icon1 input[type="radio"], .label-toggle1 input[type="radio"]').bind('mouseup', function() {
				$(this).focus();
			});

			/* for ie  (2019-01-30)*/
			$('.gecko .label-icon1').bind('focusin',function(){
				$('.label-icon1').addClass('focusin').removeClass('focusout') 
			});
			
			$('.gecko .label-icon1').bind('focusout',function(){
				$('.label-icon1').addClass('focusout').removeClass('focusin') 
			});
			
		},

		/* ---------------------------------------------------------------------------
			공통UI : 툴팁호출
		--------------------------------------------------------------------------- */
		setToolTip : function(){

			/* 툴팁 : 토글형 */
			$plugin.togglecon($('.area-tooltip1'),{
				toggle_type : 'toggle',
				selector_group : true,
				selector_group_parent : true,
				selector : '#CP',
				selector_con : '.area-tooltip1',
				selector_btn : '.ui-btn',
				selector_close : '.ui-close',
				doc_click : true,
				callback_change : function(el){
					if(el.this_wrapper.hasClass('open')){
						el.this_wrapper.parents('ul > li').addClass('load');
					}else{
						el.this_wrapper.parents('ul > li').removeClass('load');
					}
				}
			});

			/* 툴팁 : 툴팁형 */
			$('dl.pop-modal1').not('.data-t1').not('.data-t2').each(function(){
				$plugin.popmodal($('#'+$(this).attr('id')+''),{
					overlay : false,
					//load_only : true,
					position_target : true,
					auto_focus_el : false,
					doc_click : true,
					selector : '#CP'
				});
			});
		},

		/* ---------------------------------------------------------------------------
			공통UI : 알람호출
		--------------------------------------------------------------------------- */
		setAlarm : function(){
			/* 계좌목록내 알림레이어 */
			$('.list-data1 dl.pop-modal1[class*="data-t"]').each(function(){
				$plugin.popmodal($('#'+$(this).attr('id')+''),{
					overlay : false,
					position_auto : false,
					auto_focus_el : false,
					//load_only : true,
					doc_click : true,
					callback_load : function(el, elvar){
						el.pop.parent('li').addClass('load');
						if(el.pop_ev.parent('div').prev('div').find('a').length<2){
							el.pop.parent('li').addClass('btn-min');
						}
					},
					callback_after : function(el){
						el.pop.parent('li').removeClass('load');
						el.pop.parent('li').removeClass('btn-min');
					}
				});
			});

			/* 정보영역내 알림레이어 */
			$('.info-summary2 .area-modal1 .pop-modal1').each(function(){
				$plugin.popmodal($('#'+$(this).attr('id')+''),{
					overlay : false,
					position_auto : false,
					auto_focus_el : false
				});
			});
		},

		/* ---------------------------------------------------------------------------
			공통 기능 : 객체순서변경
		--------------------------------------------------------------------------- */
		MoveList : function(idvalue, indexnum, mode){
			var list_data = $('#'+idvalue).find('>li');

			if(((mode=="first" || mode=="before") && indexnum<1) || ((mode=="next" || mode=="last") && indexnum==list_data.length-1)){
				alert("더이상 이동이 불가능합니다.");
				return false;
			}

			var move_el = list_data[indexnum];

			switch (mode){
				//맨위로
				case "first" :
					$('#'+idvalue).prepend(list_data[indexnum]);
				break;

				//위로
				case "before" :
					//list_data[indexnum-1].before(list_data[indexnum]);
					list_data[indexnum].parentNode.insertBefore(list_data[indexnum], list_data[indexnum].previousElementSibling);
				break;

				//다음
				case "next" :
					//list_data[indexnum+1].after(list_data[indexnum]);
					list_data[indexnum].parentNode.insertBefore(list_data[indexnum].nextElementSibling, list_data[indexnum]);
				break;

				//마지막
				case "last" :
					$('#'+idvalue).append(list_data[indexnum]);
				break;
			}

			var move_to = $(move_el).position().top;
			if(move_to<=$(move_el).outerHeight()) move_to = 0;

			//$('#'+idvalue).parents('.ui-list-order').scrollTop(move_to);
			$('#'+idvalue).parents('.ui-list-order').animate({scrollTop : move_to},200);
		},

		/* ---------------------------------------------------------------------------
			init setMotionEvent : 이벤트효과
		--------------------------------------------------------------------------- */
		setMotionEvent : function(){
			var over_timer = null;
			$('.list-data1 > ul > li > div a')
				//.live('mouseover', function(ev){
				.mouseover(function(ev){
					ev.preventDefault();
					$('.list-data1 > ul > li').removeClass('active');
					clearTimeout(over_timer);
					$(this).parents('.list-data1 > ul > li').addClass('active');
				})
				//.live('focus', function(ev){clearTimeout(over_timer);})
				//.live('mouseout', function(ev){over_timer = setTimeout(function(){
				.mouseout(function(ev){over_timer = setTimeout(function(){
					$(ev.target).parents('.list-data1 > ul > li').removeClass('active');
				},100);});
		},

		/* ---------------------------------------------------------------------------
			init debug : 디버깅용
		--------------------------------------------------------------------------- */
		initDebug : function(){
			//LP유무에 따른 디버깅용 body클래스설정
			if($('#LP').length) $('body').addClass('page-sub');
			else $('body').addClass('page-main');

			setUiMideaSize();
			$(window).resize(function(e){
				setUiMideaSize();
			});
		},

		/* ---------------------------------------------------------------------------
			init reload : 동적생성 컨텐츠중 재호출이 필요한 함수
		--------------------------------------------------------------------------- */
		initReload : function(){

		},

		/* ---------------------------------------------------------------------------
			init : onload
		--------------------------------------------------------------------------- */
		init: function() {
			/* body addClass : 디버깅용 */
			if($.browser.name == 'msie') $('body').addClass("msie "+$.browser.className);
			else $('body').addClass($.browser.name);

			frontend.uiNav();
			frontend.uiZoom();
			frontend.uiFixed();
			frontend.setFormCheck();
			frontend.setPlaceholder();
			frontend.setFormMode();
			frontend.setToolTip();
			frontend.setAlarm();
			frontend.setMotionEvent();
			frontend.initDebug();
			loadFrameLayer();
			//setFrameLayer('_layerPosition8',true);
		}
	});
	$(document).ready(frontend.init);
})(window, jQuery);

function setUiMideaSize(){
	$('body').removeClass('uiHeightMin');
	$('body').removeClass('uiHeightMiddle');

	if($(window).height()<=700){
		$('body').addClass('uiHeightMin');
	}else if($(window).height()<=870){
		$('body').addClass('uiHeightMiddle');
	}else{
	}

	if($(window).width()<1190){
		$('body').addClass('uiWidthMin');
	}else{
		$('body').removeClass('uiWidthMin');
	}
}

/* **********************************************************************
	쿠키설정
********************************************************************** */
function setUiCookie(cName, cValue, cDay){
	var expire = new Date();
	expire.setDate(expire.getDate()+cDay);
	cookies = cName + '=' + escape(cValue) + '; domain=kbstar.com; path=/';
	if(typeof cDay != "undefined") cookies += '; expires=' + expire.toGMTString() + ';';
	document.cookie = cookies;
}

function getUiCookie( cName ){
	cName = cName + "=";
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';

	if(start != -1){
		start += cName.length;
		var end = cookieData.indexOf(';',start);
		if(end == -1) end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}

	return unescape(cValue);
}

/* **********************************************************************
	큰글씨설정
********************************************************************** */
function setUiFont(flag){
	if(flag){
		if($.browser.name=="chrome" || $.browser.className=="msie8"){
			document.body.style.zoom = $zoom_value+'%';
			$('body').addClass("zoomOn");
		}
		else $('body').addClass("zoomIn");
	}else{
		if($.browser.name=="chrome" | $.browser.className=="msie8"){
			document.body.style.zoom = "100%";
			$('body').removeClass("zoomOn");
		}
		else $('body').removeClass("zoomIn");
	}
}

/* ******************************************************************************************************
	* setFrameLayer(idvalue, replace)
	* 아이프레임 리사이징(레이어아이디, 위치조절여부)
	- 레이어높이 : 컨텐츠 높이 / 최대높이는 부모창의 윈도우사이즈 높이-60(60은 기본여백)
****************************************************************************************************** */
function setFrameLayer(idvalue,replace){
	setTimeout(function(){
		//레이어높이설정
		var iframe_height = $(document).height();
		if(iframe_height > $(top.window).height()-60) iframe_height = $(top.window).height()-60;
		$('#'+idvalue,top.document).css('height',iframe_height);

		//세로가운데정렬
		if(replace){
			var reposition = $(top.window).scrollTop() + (($(top.window).height()-iframe_height)/2);
			//console.log("스크롤사이즈 : "+$(top.window).scrollTop());
			//console.log("윈도우세로 : "+$(top.window).height());
			//console.log("레이어높이 : "+iframe_height);
			//console.log("포지션 : "+ reposition);
			$('#'+idvalue,top.document).parents('.ui-dialog').css('top',reposition);
		}
	},50);
}

/* **********************************************************************
	아이프레임 리사이징 : 테스트용
********************************************************************** */
function loadFrameLayer(){
	if(self==top){
		//console.log("---------------------------");
		//console.log("페이지");
		//console.log("---------------------------");
	}else{
		//console.log("---------------------------");
		//console.log("아이프레임");
		$('body').addClass('iframe');
		$('iframe',top.document).each(function(){
			if($(this).parent('div.ui-dialog-content').attr('id')){
				var layerID = $(this).parent('div.ui-dialog-content').attr('id');
				setFrameLayer(layerID,true);
			}
		});
		//console.log("---------------------------");
	}
}

/* **********************************************************************
	PUBLISH PLUGIN  : popmodal
	* 레이어팝업
********************************************************************** */
;(function(window, $){
	'use strict';
	var short = '$plugin';

	window[short] = window['$newutils'].namespace('KBOBANK.plugins', {
		popmodal : function(element, options){
			var version = "0.0.1",
				pluginName = "publish.popmodal",
				methods = {},
				el = element,
				el_idvalue = element.attr('id'),
				el_ev = $('[href="#'+el_idvalue+'"]'),
				length = el.size(),
				pops = [],
				popmodals,
				defaults = {
					mode : 'web',
					modal_ajax : false,
					modal_type : 'modal',
					overlay : true,
					overlay_click : false,
					doc_click : false,
					class_overlay : 'modal-overlay',
					class_open : "open",
					selector_close : '.ui-close',
					selector_return : false,
					remove_flag : false,
					position_top : null,
					position_auto : true,
					position_target : false,
					load_display : false,
					load_img : false,
					load_animation : false,
					load_only : false,
					load_only_expect : false,
					scroll_doc : true,
					drag_flag : false,
					auto_focus : true,
					auto_focus_el : true,
					callback_before: null,
					callback_load : null,
					callback_after: null
				};
			if (length < 1) return;
			if (length > 1){
				el.each(function(i, tar){
					pops.push(window[short].popmodal($(tar), options));
				});
				return pops;
			}
			if (el.data(pluginName)) return;

			/* ---------------------------------------------------------------------------
				popmodal.init : 초기화
			--------------------------------------------------------------------------- */
			methods.init = function(){
				methods.initVars();
				methods.initEvent();
				//methods.validation();
			};

			/* ---------------------------------------------------------------------------
				popmodal.initVars : 변수 초기화
			--------------------------------------------------------------------------- */
			methods.initVars = function(){
				el.options = $.extend({}, defaults, options);
				el.vars = {
					id : pluginName + "-" + new Date().getTime(),
					pop : null,
					pop_ev : null,
					pop_close : null,
					popWidth : null,
					popHeight : null,
					modal : null,
					modalTop : null,
					active : false,
					overflow : null
				};
			};

			/* ---------------------------------------------------------------------------
				popmodal.initEvent : 이벤트 초기화
			--------------------------------------------------------------------------- */
			methods.initEvent = function(){
				var outputEvent = new Object();
				for(var temp in el){
					if(temp.indexOf("output") == 0 && $.isFunction(el[temp])){
						outputEvent[temp] = el[temp];
					}
				}

				el.bind(outputEvent);

				el.vars.pop = $("#"+el_idvalue);

				$('a[href="#'+el_idvalue+'"], button[data-btn-modal="#'+el_idvalue+'"]').live("click.popmodal", function(event) {
					event.preventDefault();

					if($(this).tagName=="BUTTON") var href = $(this).attr("data-btn-modal");
					else var href = el_ev.filter("a").attr("href") || el_ev.find("a").attr("href");

					if(!methods.display()){
						el.vars.pop_ev = $(this);

						if (typeof el.options.callback_before === 'function'){
							if(!el.options.callback_before.call(el, el.vars)) return;
						}
						methods.pop();
					}else{
						methods.popHide();
						el.vars.pop_ev = $(this);
						methods.pop();
					}
				});

				if(el.options.load_display){
					if (typeof el.options.callback_before === 'function'){
						if(!el.options.callback_before.call(el, el.vars)){
							return;
						}
					};
					methods.popCall();
				}
			};

			/* ---------------------------------------------------------------------------
				popmodal.validation : href 값에 대한 element 유효성 검사.
			--------------------------------------------------------------------------- */
			methods.validation = function(){
				if (el.options.validation === false){
					return;
				}
				var href = el.filter("a").attr("href") || el.find("a").attr("href");
				if (!!href){
					if ($(href).size() < 1){
					alert("popmodal - validation error!");
					throw new Error("popmodal - not found popup: " + href);
					}
				} else {
					alert("popmodal - validation error!");
					throw new Error("popmodal - not found HTML Tag: a");
				}
			};

			/* ---------------------------------------------------------------------------
				popmodal.pop : 팝업 호출
			--------------------------------------------------------------------------- */
			methods.pop = function(){
				//변수설정
				el.vars.overflow = $("body").css("overflow");
				el.vars.popWidth = el.vars.pop.width();
				el.vars.popHeight = el.vars.pop.height();
				el.vars.active = true;

				if(el.options.load_only){
					popmodals.each(function(index){
						if(popmodals[index]!=el && !popmodals[index].options.load_only_expect){
							$(popmodals[index].vars.pop_ev).removeClass(popmodals[index].options.class_open);
							popmodals[index].vars.pop_ev = null;
							popmodals[index].outputClose();
						}
					});
				}

				//레이어팝업 오픈시 툴팁닫기(임시)
				$('.area-tooltip1.open').find('.ui-close').trigger('click');

				//레이어팝업 호출
				methods.popShow();

				//브라우저 리사이즈시
				$(window).resize(function(){
					methods.setResize();
				});
			};
			/* ---------------------------------------------------------------------------
				popmodal.pop : 기본설정호출
			--------------------------------------------------------------------------- */
			methods.popCall = function(){
				el.vars.pop = el;
				if(el.options.selector_return) el.vars.pop_ev = $(el.options.selector_return);
				methods.pop();
			};
			/* ---------------------------------------------------------------------------
				popmodal.popShow : 레이어오픈
			--------------------------------------------------------------------------- */
			methods.popShow = function(){
				if(el.options.load_only_expect){
					$('body').addClass('ui-banner-open');
				}

				if(el.options.load_animation){
					el.vars.pop.slideDown(function(){
						$(this).addClass(el.options.class_open);
					});
				}else{
					el.vars.pop.addClass(el.options.class_open);
				}

				//임시추가
				frontend.initReload();

				if(el.vars.pop_ev!=null) el.vars.pop_ev.addClass(el.options.class_open);
				methods.setResize();

				//모달생성
				methods.modalCreate();

				//닫기버튼 이벤트 설정
				if (!!el.options.selector_close){
					el.vars.pop_close = el.find(el.options.selector_close);
					el.vars.pop_close.unbind("click.popmodal").bind("click.popmodal", function(event){
						event.preventDefault();
						methods.close();
					});
				}

				//닫기실행시 포커스 설정
				if(el.options.auto_focus){
					if(el.options.auto_focus_el){
						el.vars.pop_close.eq(0).focus();
					}else{
						$(el.vars.pop).attr({'tabindex' : 0}).delay(600).focus();
					}
				}

				//바닥페이지 스크롤설정
				if(!el.options.scroll_doc) $('body').bind('touchmove.Modal', function(e){e.preventDefault()});

				//이미지로드 후 레이어팝업 포지션 재설정시
				if(el.options.load_img){
					el.vars.pop.find("img").load(function(){
						methods.setResize();
					});
				}

				//여백 닫기설정
				if(el.options.doc_click){
					$(document).bind('click.'+el.vars.pop.attr('id'),function(ev){
						if(!$(ev.target).closest("#"+el.vars.pop.attr('id')).length && !$(ev.target).closest(el.vars.pop_ev).length){
							$('#'+el.vars.pop.attr('id')).trigger("outputClose2");
						}
					});
				}

				//로드 콜백함수 실행
				if (typeof el.options.callback_load === 'function'){
					el.options.callback_load.call(el, el.vars);
				};
			};
			/* ---------------------------------------------------------------------------
				popmodal.setResize : 레이어 리사이즈
			--------------------------------------------------------------------------- */
			methods.setResize = function(){
				if(el.options.position_auto){
					var browser_width = $(window).width();
					var browser_height = $(window).height();
					var layer_width = el.vars.pop.outerWidth();
					var layer_height = el.vars.pop.outerHeight();
					var margin_left = Math.floor(layer_width /2) * (-1) + 'px';
					var position_top = $(window).scrollTop() + ((browser_height-layer_height)/2);
					var position_left = null;

					var margin_left = (-1)*(layer_width/2);

					if(browser_height<=layer_height) position_top = $(window).scrollTop()+50;

					if($(document).height()<=layer_height){
						$('.wrapper').css({
							height : layer_height + 100+"px"
						}).addClass('modal-on');
					}

					if(el.options.position_top) position_top  = el.options.position_top + $(window).scrollTop();
					//position_top  = el.options.position_top;

					if(el.options.mode=="mobile"){
						el.vars.pop.css({
							"top" : position_top
						});
					}else{
						if(el.options.position_target){
							position_top = el.vars.pop_ev.offset().top + el.vars.pop_ev.outerHeight(),
							position_left = el.vars.pop_ev.offset().left;

							if(el.options.selector){
								position_top -= $(el.options.selector).offset().top;
								position_left -= $(el.options.selector).offset().left;
							}

							//테스트용
							var this_margin = el.vars.pop.css('marginLeft').replace('px','')*1;
							if(position_left + this_margin < 0) position_left = this_margin*(-1);

							if(el.options.selector){
								if(position_left + el.vars.pop.outerWidth(true)>$(el.options.selector).outerWidth(true)){
									position_left = $(el.options.selector).outerWidth(true) - el.vars.pop.outerWidth(true);
								}
							}

							//화면확대기능에 따른 위치 재설정
							if($('body').hasClass('zoomIn')){
								if($.browser.name=="chrome" || $.browser.className=="msie8"){

								}else{
									position_top = position_top * (100/$zoom_value);
									position_left = position_left * (100/$zoom_value);
								}
							}

							el.vars.pop.css({
								"top" : position_top,
								"left" : position_left
							});
						}else{
							if(el.options.selector){
								position_top -= $(el.options.selector).offset().top;
								position_left -= $(el.options.selector).offset().left;
							}

							el.vars.pop.css({
								"top" : position_top,
								"marginLeft" : margin_left
							});
						}
					}

				}
			};
			/* ---------------------------------------------------------------------------
				el.outputClose : 외부호출 : 팝업 닫기 실행
			--------------------------------------------------------------------------- */
			el.outputClose = function(){
				methods.popHide();
			};
			/* ---------------------------------------------------------------------------
				el.outputClose : 외부호출 : 팝업 닫기 실행
			--------------------------------------------------------------------------- */
			el.outputClose2 = function(){
				el.vars.pop_ev.removeClass(el.options.class_open);
				el.vars.pop_ev = null;
				methods.popHide();
			};
			/* ---------------------------------------------------------------------------
				el.outputOpen : 외부호출 : 팝업 열기 실행
			--------------------------------------------------------------------------- */
			el.outputOpen = function(etarget){
				if(etarget){
					if(etarget.tagName=="SPAN") etarget = $(etarget).parent();
					el.vars.pop_ev = $(etarget);
				}
				methods.popCall();
			};
			/* ---------------------------------------------------------------------------
				el.outputResize : 외부호출 : 팝업 리사이징
			--------------------------------------------------------------------------- */
			el.outputResize = function(etarget){
				methods.setResize();
			};
			/* ---------------------------------------------------------------------------
				el.openCheck : 레이어 오픈체크
			--------------------------------------------------------------------------- */
			el.openCheck = function(){
				return methods.display();
			};
			methods.display = function(){
				return el.vars.active;
			};
			/* ---------------------------------------------------------------------------
				popmodal.close : 팝업 닫기
			--------------------------------------------------------------------------- */
			methods.close = function(){
				if (typeof el.options.callback_after === 'function'){
					el.options.callback_after.call(el, el.vars);
				};
				methods.popHide();
			};
			/* ---------------------------------------------------------------------------
				popmodal.popHide : 레이어닫기설정
			--------------------------------------------------------------------------- */
			methods.popHide = function(){
				$(window).unbind("resize.popmodal");

				if(el.options.load_only_expect){
					$('body').removeClass('ui-banner-open');
				}

				if (!!el.vars.pop){
					if(el.options.load_animation){
						el.vars.pop.slideUp(function(){
							$(this).removeClass(el.options.class_open);
						});
					}else{
						el.vars.pop.removeClass(el.options.class_open);
					}
					if(el.vars.pop_ev!=null) el.vars.pop_ev.removeClass(el.options.class_open);
				}

				if(popmodals){
					popmodals.each(function(index){
						if(popmodals[index].hasClass('pop-tooltip') && popmodals[index].hasClass('open')){
							popmodals[index].outputClose();
						}
					});
				}

				methods.modalRemove();

				if (!!el.vars.this_close){
					el.vars.this_close.unbind("click.popmodal");
				}

				if($('.wrapper').hasClass('modal-on')){
					$('.wrapper').css({
						height : ''
					}).removeClass('modal-on');
				}

				if(el.options.remove_flag){
					el.vars.pop.remove();
				}

				el.vars.active = false;

				if(!!el.vars.pop_ev) el.vars.pop_ev.focus();

				if(!el.options.scroll_doc) $('body').unbind('touchmove.Modal');

				//여백 닫기설정
				if(el.options.doc_click){
					$(document).unbind('click.'+el.vars.pop.attr('id'));
				}
			};
			/* ---------------------------------------------------------------------------
				popmodal.modalCreate : 모달생성
			--------------------------------------------------------------------------- */
			methods.modalCreate = function(zindex){
				if (!!el.options.overlay){
					var id = el_idvalue + "Overlay";
					if(!el.vars.modal){
						var modal_el = $('<div id="' + id + '" class="'+el.options.class_overlay+'"></div>')
						el.before(modal_el);
						el.vars.modal = modal_el;

						var overlay_height = $(document).height();
						if($(window).height()<=el.vars.pop.outerHeight()) overlay_height = overlay_height+100;

						el.vars.modal = el.vars.modal.css({
							"width" : $(document).width(),
							"height" : $(document).height(),
							"zIndex" : el.vars.pop.css("z-index")
						});

						if(el.options.overlay_click){
							el.vars.modal.bind("click.popmodal", function(event){
								methods.close();
							});
						}
					}
				}
			};
			/* ---------------------------------------------------------------------------
				popmodal.modalRemove : 모달삭제
			--------------------------------------------------------------------------- */
			methods.modalRemove = function(){
				if (!!el.vars.modal){
					el.vars.modal.unbind("click.popmodal");
					el.vars.modal.remove();
					el.vars.modal = null;
				}
			};

			methods.init();

			popmodals = $(document).data(pluginName);
			if (!popmodals){
				popmodals = $([]);
			}

			if ($.inArray(el, popmodals) === -1){
				popmodals.push(el);
			}
			$(document).data(pluginName, popmodals);
			el.data(pluginName, el);
			return el;
		}
	});
})(window, jQuery);

/* **********************************************************************
	PUBLISH PLUGIN  : togglecon
	* 디스플레이 변경UI
********************************************************************** */
;(function(window, $){
	'use strict';
	var short = '$plugin';

	window[short] = window['$newutils'].namespace('KBOBANK.plugins', {
		togglecon : function(element, options){
			var version = "0.0.1",
				pluginName = "publish.togglecon",
				methods = {},
				el = element,
				length = el.size(),
				toggles = [],
				togglecons,
				defaults = {
					toggle_type : 'toggle',
					aria_flag : false,
					selector : "",
					selector_group : false,
					selector_group_parent : false,
					selector_btn : '.ui-toggle-btn',
					selector_con : '.ui-toggle-con',
					selector_close : '.ui-toggle-close',
					class_open : "open",
					event_btn_flag : false,
					auto_scroll : false,
					auto_focus : false,
					load_animation : false,
					doc_click : false,
					txt_state : false,
					txt_state_open : "펼치기",
					txt_state_close : "접기",
					callback_before : null,
					callback_change : null,
					callback_close : null,
					callback_after : null
				};

			if (length < 1) return;
			if (length > 1){
				el.each(function(i, tar){
					toggles.push(window[short].togglecon($(tar), options));
				});
				return toggles;
			}
			if (el.data(pluginName)) return;

			/* ---------------------------------------------------------------------------
				togglecon.init : 초기화
			--------------------------------------------------------------------------- */
			methods.init = function(){
				methods.initVars();
				methods.initEvent();
			};

			/* ---------------------------------------------------------------------------
				togglecon.initVars : 변수초기화
			--------------------------------------------------------------------------- */
			methods.initVars = function(){
				el.options = $.extend({}, defaults, options);
				el.vars = {
					this_group : null,
					this_wrapper : null,
					this_btn : null,
					this_con : null,
					this_close : null
				};
			};

			/* ---------------------------------------------------------------------------
				togglecon.initEvent : 이벤트초기화
			--------------------------------------------------------------------------- */
			methods.initEvent = function(){
				var outputEvent = new Object();
				for(var temp in el){
					if(temp.indexOf("output") == 0 && $.isFunction(el[temp])){
						outputEvent[temp] = el[temp];
					}
				}

				el.bind(outputEvent);
				el.vars.this_wrapper = el;

				//로드 콜백함수 실행
				if (typeof el.options.callback_load === 'function'){
					el.options.callback_load.call();
				};

				/* 이벤트설정 */
				$(el.find(el.options.selector_btn)).unbind('click.togglecon').bind('click.togglecon', function(event) {
					event.preventDefault();
					el.vars.this_btn = $(this);

					if(el.options.selector_con=="#href") el.vars.this_con = $(this).attr("href");
					else el.vars.this_con = el.find(el.options.selector_con);

					if(el.options.toggle_type=="form"){
						if($(this).val()=="Y") methods.conShow();
						else methods.conHide();
					}else{
						if(!el.vars.this_wrapper.hasClass(el.options.class_open) || el.options.toggle_type=="tab") methods.conShow();
						else methods.conHide();
					}

					//콜백함수 : change
					if (typeof el.options.callback_change === 'function'){
						el.options.callback_change.call(el, el.vars);
					};
				});

				//컨텐츠내 닫기 기능설정
				if (!!el.options.selector_close){
					el.vars.this_close = el.vars.this_wrapper.find(el.options.selector_close);
					el.vars.this_close.bind("click.togglecon", function(event){
						event.preventDefault();
						methods.conHide();
						$(el.vars.this_btn).focus();
					});
				}

				//여백 닫기설정
				if(el.options.doc_click){
					var el_id = el.find(el.options.selector_con);
					$(document).bind('click.toggleArea',function(ev){
						if(!$(ev.target).closest(el.vars.this_wrapper).length){
							methods.conHide();
						}
					});
				}

				//접근성개선
				if(el.options.aria_flag && el.options.toggle_type=='tab'){
					el.vars.this_wrapper.parent().attr('role','tablist');
					$(el.find(el.options.selector_btn)).each(function(){
						$(this).parent('li').attr('role','tab');
						if($(this).parent('li').hasClass(el.options.class_open)){
							$(this).parent('li').attr('aria-selected',true);
							$(this).attr('title',"선택됨");
						}
						$($(this).attr('href')).attr('role','tabpanel');
					});
				}

				//초기상태 텍스트 설정
				if(el.options.txt_state){
					if(el.vars.this_wrapper.hasClass(el.options.class_open)){
						$(el.find(el.options.selector_btn)).each(function(){
							if($(this).attr('title')) $(this).attr('title',$(this).attr('title').replace(el.options.txt_state_open,el.options.txt_state_close));
							else $(this).attr('title',el.options.txt_state_close);
							$(this).html($(this).html().replace(el.options.txt_state_open,el.options.txt_state_close));
						});
					}else{
						$(el.find(el.options.selector_btn)).each(function(){
							if($(this).attr('title')) $(this).attr('title',$(this).attr('title').replace(el.options.txt_state_close,el.options.txt_state_open));
							else $(this).attr('title',el.options.txt_state_open);
							$(this).html($(this).html().replace(el.options.txt_state_close,el.options.txt_state_open));
						});
					}
				}
			};

			/* ---------------------------------------------------------------------------
				togglecon.conShow : 컨텐츠열기
			--------------------------------------------------------------------------- */
			methods.conShow = function(){

				//토글 그룹형일경우 : 자기자신 오픈시 동일레벨 셀렉터 닫힘
				if(el.options.selector_group){
					if(el.options.selector_group_parent) $(el.options.selector).find(el.options.selector_con).removeClass(el.options.class_open);
					el.vars.this_wrapper.siblings().removeClass(el.options.class_open);

					if(el.options.txt_state){
						el.vars.this_wrapper.siblings().find(el.options.selector_btn).each(function(){
							if($(this).attr('title')) $(this).attr('title',$(this).attr('title').replace(el.options.txt_state_close,el.options.txt_state_open));
							$(this).html($(this).html().replace(el.options.txt_state_close,el.options.txt_state_open));
						});
					}
				}

				if(el.options.load_animation){
					el.vars.this_wrapper.slideDown(function(){
						$(this).addClass(el.options.class_open);
					});
				}else{
					el.vars.this_wrapper.addClass(el.options.class_open);
				}

				if(el.options.event_btn_flag) el.vars.this_btn.addClass(el.options.class_open);

				//열림상태 텍스트변경
				if(el.options.txt_state){
					if(el.vars.this_btn.attr('title')) el.vars.this_btn.attr('title',el.vars.this_btn.attr('title').replace(el.options.txt_state_open,el.options.txt_state_close));
					el.vars.this_btn.html(el.vars.this_btn.html().replace(el.options.txt_state_open,el.options.txt_state_close));
				}

				//컨텐츠 상태 설정
				if(el.options.selector_con=="#href"){
					$(el.vars.this_con).addClass(el.options.class_open);
					if(el.options.aria_flag){
						el.vars.this_btn.parent('li').attr('aria-selected',true);
						el.vars.this_btn.attr('title','선택됨');
					}
					el.vars.this_wrapper.siblings().find(el.options.selector_btn).each(function(){
						$($(this).attr('href')).removeClass(el.options.class_open);
						if(el.options.aria_flag){
							$(this).parent().attr('aria-selected',false);
							$(this).attr('title','');
						}
					});
				}

				//위치설정
				if(el.options.position_target){
					el.vars.this_con.css({
						"top" : el.vars.this_btn.offset().top + el.vars.this_btn.outerHeight(),
						"left" : el.vars.this_btn.offset().left - el.vars.this_con.outerWidth() + el.vars.this_btn.outerWidth()
					});
				}

				//컨텐츠내 닫기 기능설정
				if (!!el.options.selector_close){
					el.vars.this_close = el.vars.this_wrapper.find(el.options.selector_close);
					el.vars.this_close.bind("click.togglecon", function(event){
						event.preventDefault();
						methods.conHide();
						$(el.vars.this_btn).focus();
					});
				}

				//컨텐츠영역 자동스크롤여부
				if(el.options.auto_scroll){
					if(el.options.toggle_type == "toggle") var scroll_value = $(el).offset().top;
					else var scroll_value = $(el.vars.this_con).offset().top;
					$('html,body').delay(100).animate({scrollTop : scroll_value},600);
				}

				//콜백함수 : after
				if (typeof el.options.callback_after === 'function'){
					el.options.callback_after.call(el, el.vars);
				};
			};
			/* ---------------------------------------------------------------------------
				togglecon.conHide : 컨텐츠닫기
			--------------------------------------------------------------------------- */
			methods.conHide = function(){
				if(el.options.load_animation){
					el.vars.this_wrapper.slideDown(function(){
						$(this).removeClass(el.options.class_open);
					});
				}else{
					el.vars.this_wrapper.removeClass(el.options.class_open);
				}

				if(el.options.event_btn_flag) el.vars.this_btn.removeClass(el.options.class_open);

				//열림상태 텍스트변경
				if(el.options.txt_state){
					if(el.vars.this_btn.attr('title')) el.vars.this_btn.attr('title',el.vars.this_btn.attr('title').replace(el.options.txt_state_close,el.options.txt_state_open));
					el.vars.this_btn.html(el.vars.this_btn.html().replace(el.options.txt_state_close,el.options.txt_state_open));
				}

				//컨텐츠 상태 설정
				if(el.options.selector_con=="#href"){
					$(el.vars.this_con).removeClass(el.options.class_open);
				}

				//이벤트초기화
				if (el.vars.this_close){
					el.vars.this_close.unbind("click.togglecon");
				}

				//여백 닫기설정
				/*
				if(el.options.doc_click){
					$(document).unbind('click.toggleArea');
				}
				*/

				//콜백함수 : change
				if (typeof el.options.callback_close === 'function'){
					el.options.callback_close.call(el, el.vars);
				};
			};

			/* ---------------------------------------------------------------------------
				el.outputClose : 외부호출 : 열기실행
			--------------------------------------------------------------------------- */
			el.outputOpen = function(indexvalue){
				if(el.options.selector_con=="#href") el.vars.this_con = el.find(el.options.selector_btn).attr('href');
				else el.vars.this_con = el.find(el.options.selector_con);
				methods.conShow();
			};

			/* ---------------------------------------------------------------------------
				el.outputClose : 외부호출 : 열기실행
			--------------------------------------------------------------------------- */
			el.outputClose = function(indexvalue){
				el.vars.this_con = el.find(el.options.selector_con);
				methods.conHide();
			};

			methods.init();

			togglecons = $(document).data(pluginName);

			if (!togglecons){
				togglecons = $([]);
			}

			if ($.inArray(el, togglecons) === -1){
				togglecons.push(el);
			}
			$(document).data(pluginName, togglecons);
			el.data(pluginName, el);
			return el;
		}
	});
})(window, jQuery);