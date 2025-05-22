/* **********************************************************************
	* GNB / FOOTER
********************************************************************** */
$(document).ready(function() {
	////////////////////////////////////////
	// 레이아웃 : Navigation GNB
	////////////////////////////////////////
	var navGnb = (function(){
		var gnb_timer = null;

		return {
			init: function(){
				var self = this;

				//이벤트설정
				$('.nav-gnb > li > a').bind('focus mouseover', function(ev){
					$('.nav-gnb > li').removeClass('on');
					$(this).parent('li').addClass('on');
				});

				//하위메뉴 타임연장
				$('.nav-snb > li a')
					.bind('focus', function(ev){clearTimeout(gnb_timer);})
					.bind('blur', function(ev){gnb_timer = setTimeout(function(){
						$('.nav-gnb > li').removeClass('on');
					},600);});

				//마우스이벤트
				$(document).bind('mouseover.naviGnb', function(e){
					if (!$(e.target).closest('#uiNavGnb').length) {
						$('.nav-gnb > li').removeClass('on');
					}
				});
			}
		};
	}());

	navGnb.init();

	////////////////////////////////////////
	// 레이아웃 : FOOTER 셀렉트
	////////////////////////////////////////
	var navFooter = (function(){
		var footer_timer = null;

		return {
			init: function(){
				var self = this;

				//이벤트설정
				$('.info-group .list > li > a').bind('focus mouseover', function(ev){
					$('.info-group .list > li').removeClass('on');
					$(this).parent('li').addClass('on');
				});

				//하위메뉴 타임연장
				$('.info-group .list > li a')
					.bind('focus', function(ev){clearTimeout(gnb_timer);})
					.bind('blur', function(ev){gnb_timer = setTimeout(function(){
						$('.info-group .list > li').removeClass('on');
					},600);});

				//마우스이벤트
				$(document).bind('mouseover.naviGnb', function(e){
					if (!$(e.target).closest('#navFooterGroup').length) {
						$('.info-group .list > li').removeClass('on');
					}
				});
			}
		};
	}());

	navFooter.init();

	////////////////////////////////////////
	// 레이아웃 : 초기 UI스크립트 호출
	////////////////////////////////////////
	setTimeout(function(){
		uiIntroSetting();
	},600);
	////////////////////////////////////////
});

/* **********************************************************************
	초기호출 스크립트
********************************************************************** */
function uiIntroSetting(){
	////////////////////////////////////////
	// 컨텐츠 : 상단슬라이더
	////////////////////////////////////////
	$(".wrap-visual").moveContents({
		effect : 'show',
		autoStop : true,
		eventEl : ".area-control > ul > li > a",
		conEl : ".area-con > ul > li",
		changeTimer : 5000,
		changeCallBack : function(a){
			$('.wrap-visual').attr('class','wrap-visual active'+(a*1+1));
		}
	});

	////////////////////////////////////////
	// 컨텐츠 : 브랜드스토리 레이어호출
	////////////////////////////////////////
	$('.ui-btn-brand').bind('click',function(ev){
		ev.preventDefault();
		var brand_html = '';

		brand_html +='<div id="uiBrandStory" class="pop-section">';
		brand_html +='	<div class="header">';
		brand_html +='		<h2>KB브랜드 스토리</h2>';
		brand_html +='		<button type="button" class="ui-close">KB브랜드 스토리 닫기</button>';
		brand_html +='	</div>';
		brand_html +='	<div class="content wrap-story">';
		brand_html +='		<div class="area-con">';
		brand_html +='			<ul>';
		brand_html +='				<li class="brand1">';
		brand_html +='					<span class="img"></span>';
		brand_html +='					<span>KB는 바른 금융을 지향합니다.</span>';
		brand_html +='				</li>';
		brand_html +='				<li class="brand2">';
		brand_html +='					<span class="img"></span>';
		brand_html +='					<span>KB는 금융자산을 지켜드립니다.</span>';
		brand_html +='				</li>';
		brand_html +='				<li class="brand3">';
		brand_html +='					<span class="img"></span>';
		brand_html +='					<span>KB가 희망을 드립니다.</span>';
		brand_html +='				</li>';
		brand_html +='				<li class="brand4">';
		brand_html +='					<span class="img"></span>';
		brand_html +='					<span>KB와 준비하면 미래가 있습니다.</span>';
		brand_html +='				</li>';
		brand_html +='				<li class="brand5">';
		brand_html +='					<span class="img"></span>';
		brand_html +='					<span>늘 곁에, 더 가까이 KB국민은행</span>';
		brand_html +='				</li>';
		brand_html +='			</ul>';
		brand_html +='		</div>';
		brand_html +='		<div class="area-control">';
		brand_html +='			<button class="ui-btn before">이전</button>';
		brand_html +='			<button class="ui-btn next">다음</button>';
		brand_html +='			<div>';
		brand_html +='				<ul>';
		brand_html +='					<li><a href="#">KB브랜드 스토리1 자세히보기</a></li>';
		brand_html +='					<li><a href="#">KB브랜드 스토리2 자세히보기</a></li>';
		brand_html +='					<li><a href="#">KB브랜드 스토리3 자세히보기</a></li>';
		brand_html +='					<li><a href="#">KB브랜드 스토리4 자세히보기</a></li>';
		brand_html +='					<li><a href="#">KB브랜드 스토리5 자세히보기</a></li>';
		brand_html +='				</ul>';
		brand_html +='				<button class="ui-btn play off">자동재생시작</button>';
		brand_html +='				<button class="ui-btn stop">자동재생멈춤</button>';
		brand_html +='			</div>';
		brand_html +='		</div>';
		brand_html +='	</div>';
		brand_html +='</div>';

		$('body').append(brand_html);
		$plugin.popmodal($('#uiBrandStory'),{
			modal_ajax : true,
			overlay : false,
			load_display : true,
			selector_return : '#uiBtnBrand',
			position_auto : false,
			scroll_doc_class : 'on-brand',
			callback_load : function(){
				$("#uiBrandStory .wrap-story").moveContents({
					effect : 'show',
					eventEl : ".area-control ul > li > a",
					conEl : ".area-con > ul > li",
					changeTimer : 5000,
					changeCallBack : function(a){
						$('#uiBrandStory .wrap-story').attr('class','wrap-story active'+(a*1+1));
					}
				});
			}
		});
	});

	////////////////////////////////////////
	// 컨텐츠 : 인사이트 슬라이더
	////////////////////////////////////////
	$(".main-con3 .wrap-slider").moveContents({
		effect : 'slide',
		autoStop : true,
		addContain : 'on-slider',
		slideValue : '335',
		slideView : 3,
		slideRepeat : true,
		slideAction : true,
		eventEl : ".area-control > ul > li > a",
		conEl : ".area-con > ul > li"
	});

	////////////////////////////////////////
	// 컨텐츠 : 소비자권익보호 토글
	////////////////////////////////////////
	$plugin.togglecon($('.toggle-area'),{
		toggle_type : 'toggle',
		selector : '.toggle-area',
		selector_btn : '.ui-toggle',
		txt_state : true
	});
}

/* **********************************************************************
	동적페이지 추가용
********************************************************************** */
function dataProcessing(data){
	return data.split('<body>')[1].split('<script')[0];
}

/* **********************************************************************
	PUBLISH PLUGIN  : moveContents
	* 슬라이드용
********************************************************************** */
(function($) {

	$.fn.moveContents = function(options){
		return this.each(function(){
			var opts = $.extend({}, $.fn.moveContents.defaults, options || {});
			options = options || {};
			var $cont = $(this);																		//이동컨텐츠 전체 element
			var $contEventEl = opts.iconFlag? $cont.find(opts.eventEl) : null;			//클릭이벤트 element
			var $contEventCon = $cont.find(opts.conEl);										//실제 변경컨텐츠 element
			var $contConCnt = $contEventCon.length;										//변경컨텐츠갯수
			var $contSelIndex = opts.defaultIndex;												//현재선택된 컨텐츠의 index값
			var $contTimer = null;																	//오토플레이 시간변수
			var $btnWrapper = $cont.find(opts.btnWrapper);								//버튼컨트롤러 영역
			var $btnPrev = $cont.find(opts.btnPrev);											//이전버튼
			var $btnNext = $cont.find(opts.btnNext);											//다음버튼
			var $btnPlay = $cont.find(opts.btnPlay);											//사용자컨트롤 플레이버튼
			var $btnStop = $cont.find(opts.btnStop);											//사용자컨트롤 정지버튼
			var $moveMode = true;																//오토플레이 slide시 자동변경 방향
			var $playMode = true;																	//사용자 컨트롤러에 의한 애니메이션 상태
			var $oldSelIndex;																			//선택된 컨텐츠 이전 선택 index값
			var $iconMode;																			//아이콘클릭이벤트일때만 true

			if(opts.slideValue){
				var $slideValue = opts.slideValue;
			}
			else{
				if(opts.slideFor=="left" || opts.slideFor=="right") var $slideValue = $contEventCon.eq(0).outerWidth();
				else var $slideValue = $contEventCon.eq(0).outerHeight();
			}

			if(opts.addContain) $cont.addClass(opts.addContain);

			/*********************************************************
			//컨텐츠갯수가 복수일때 이벤트 설정(하나일때는 아이콘 버튼 미출력)
			**********************************************************/
			if($contConCnt>1){

				/* 디스플레이 초기화 - effect : slide */
				if(opts.effect=="slide"){
					$contEventCon.each(function(){
						var new_position = newPosition($(this));
						switch(opts.slideFor)
						{
							case "right":
							$(this).css({"right":new_position});
							break;

							case "top":
							$(this).css({"top":new_position});
							break;

							case "bottom":
							$(this).css({"bottom":new_position});
							break;

							default:
							$(this).css({"left":new_position});
							break;
						}

						if(new_position >= 0 && new_position < opts.slideView*opts.slideValue) $(this).removeClass('disabled').attr('aria-hidden',false);
						else $(this).addClass('disabled').attr('aria-hidden',true);

						if($contEventEl) $contEventEl.eq($contSelIndex).addClass(opts.onClass);
					});

				/* 디스플레이 초기화 - effect : show , fade */
				}else{
					$cont.each(function(){

						if(opts.effect=="fade"){
							$contEventCon.hide();
							$contEventCon.eq($contSelIndex).show();
						}else{
							$contEventCon.removeClass(opts.onClass);
							$contEventCon.eq($contSelIndex).addClass(opts.onClass);
						}

						if($contEventEl) $contEventEl.eq($contSelIndex).addClass(opts.onClass);
					});
				}

				/* 아이콘버튼 디스플레이 */
				if(opts.iconFlag) displayIcon();

				/* 이동버튼(이전,다음) 디스플레이 및 이벤트설정*/
				if(opts.btnFlag){
					moveContentsBtn();
					if($contConCnt>opts.slideView){
						//$btnNext.bind("click",function(){ if(!$(this).hasClass(opts.btnNextOff)) moveIndexPlus();});
						//$btnPrev.bind("click",function(){ if(!$(this).hasClass(opts.btnPrevOff)) moveIndexMinus();});
						$btnNext.bind("click",function(){
							autoPlayStop();
							moveIndexPlus();
						});
						$btnPrev.bind("click",function(){
							autoPlayStop();
							moveIndexMinus();
						});
					}
				}else{
					$btnPrev.hide();
					$btnNext.hide();
				}

				/* $contEventEl 이벤트설정 */
				if(opts.iconFlag){
					$contEventEl.bind(opts.iconFlagEvent,function(){
						autoPlayStop();
						$moveMode = $contEventEl.index($(this))-$contSelIndex>0? true : false;
						$iconMode=true;
						$oldSelIndex = $contSelIndex;
						$contSelIndex = $contEventEl.index($(this));
						moveContentsAnimation();
						return opts.eventReturn;
					});
				}else{
					if($contEventEl) $contEventEl.hide();
				}

				/* delayTimer에 의한 자동애니메시션 설정*/
				if($playMode && opts.autoPlay) setTimeout(callAnimation,opts.delayTimer);

				/* 플레이 컨트롤러 설정 */
				if(opts.controlFlag){
					$btnPlay.bind("click",function(){
						autoPlayStart();
					});
					$btnStop.bind("click",function(){
						autoPlayStop();
					});

					if(opts.autoPlay){
						$btnPlay.addClass('off');
						$btnStop.removeClass('off');
					}else{
						$btnPlay.removeClass('off');
						$btnStop.addClass('off');
					}
				}

				/* 컨텐츠 내부 포커스시 자동재생멈춤 */
				if(opts.autoStop){
					$contEventCon.find('a').bind('focus',function(){
						autoPlayStop();
					});

					$contEventCon.find('button').bind('focus',function(){
						autoPlayStop();
					});
				}

				/* 콜백함수설정 */
				if(opts.conCallBack){
					$contEventCon.bind("click",function(){
						$contEventCon.removeClass("sel");
						$(this).addClass("sel");
						opts.conCallBack();
					});
				}
			}else{
				if($contEventEl) $contEventEl.hide();
				$btnWrapper.hide();
			}

			/********************************************************
			//다음컨텐츠보기
			********************************************************/
			function moveIndexPlus(){
				$moveMode = true;
				$oldSelIndex = $contSelIndex;
				$contSelIndex++;
				if(opts.slideRepeat){
					if($contSelIndex>$contConCnt-1) $contSelIndex=0;
				}else{
					if($contSelIndex>$contConCnt-(1*opts.slideView)) $contSelIndex=0;
				}
				moveContentsAnimation();
			}

			/*********************************************************
			//이전컨텐츠보기
			*********************************************************/
			function moveIndexMinus(){
				$moveMode = false;
				$oldSelIndex = $contSelIndex;
				$contSelIndex--;
				if(opts.slideRepeat){
					if($contSelIndex<0) $contSelIndex = $contConCnt-1;
				}else{
					if($contSelIndex<0) $contSelIndex = $contConCnt-(1*opts.slideView);
				}
				moveContentsAnimation();
			}

			/********************************************************
			//자동재생 시작
			********************************************************/
			function autoPlayStart(){
				$playMode = true;
				$contTimer = setTimeout(moveIndexPlus,opts.changeTimer);
				$btnPlay.addClass('off');
				$btnStop.removeClass('off');
			}

			/********************************************************
			//자동재생 멈춤
			********************************************************/
			function autoPlayStop(){
				$playMode = false;
				clearTimeout($contTimer);
				$btnPlay.removeClass('off');
				$btnStop.addClass('off');
			}

			/*********************************************************
			//오토플레이 호출 함수
			*********************************************************/
			function callAnimation(){
				clearTimeout($contTimer);
				$contTimer = setTimeout(moveIndexPlus,opts.changeTimer);
			}

			/*********************************************************
			//아이콘버튼 디스플레이함수
			*********************************************************/
			function displayIcon(){
				$contEventCon.each(function(){
					if($contEventCon.index($(this))!=$contSelIndex){
						$contEventEl.eq($contEventCon.index($(this))).removeClass(opts.onClass).attr('title','');
						if(opts.onImage){
							$contEventEl.eq($contEventCon.index($(this))).find('img').attr('src', function() {return $(this).attr("src").replace("_on", "_off");});
						}
					}else{
						$contEventEl.eq($contEventCon.index($(this))).addClass(opts.onClass).attr('title','선택됨');
						if(opts.onImage){
							$contEventEl.eq($contEventCon.index($(this))).find('img').attr('src', function() {return $(this).attr("src").replace("_off", "_on");});
						};
					}
				});
			}

			/*********************************************************
			//버튼 디스플레이 설정 함수
			*********************************************************/
			function moveContentsBtn(){
				if(opts.btnFlagDisabled){
					if($contSelIndex<1 && !opts.btnFlagAll) $btnPrev.addClass(opts.btnPrevOff);
					else $btnPrev.removeClass(opts.btnPrevOff);

					if($contSelIndex+opts.slideView>=$contConCnt && !opts.btnFlagAll) $btnNext.addClass(opts.btnNextOff);
					else $btnNext.removeClass(opts.btnNextOff);
				}else{
					if($contSelIndex<1 && !opts.btnFlagAll) $btnPrev.hide();
					else $btnPrev.show();

					if($contSelIndex>=$contConCnt-1 && !opts.btnFlagAll) $btnNext.hide();
					else $btnNext.show();
				}
			}

			/*********************************************************
			//선택된 index에 따른 새 위치값 계산
			*********************************************************/
			function newPosition(obj){
				var value = $contEventCon.index(obj) - $contSelIndex;
				if(opts.slideRepeat && !$iconMode){
					if($moveMode){
						if(value>=opts.slideView) value = value - $contConCnt;
						if(value<-1) value = value + $contConCnt;
					}else{
						if(value>opts.slideView) value = value - $contConCnt;
						if(value<=(-1)*($contConCnt-opts.slideView)) value = value + $contConCnt;
					}
				}
				value = value * $slideValue;
				return value;
			}

			/*********************************************************
			//Animation - effect : show일때
			*********************************************************/
			function moveAni_show(){
				$contEventCon.each(function(){

					if($contSelIndex==$contEventCon.index($(this))) $(this).addClass(opts.onClass);
					else $(this).removeClass(opts.onClass);

					if($contEventCon.index($(this))!=$contSelIndex) $(this).removeClass(opts.onClass);
					else $(this).addClass(opts.onClass);
				});
			}

			/*********************************************************
			//Animation -effect : fade일때
			*********************************************************/
			function moveAni_fade(){
				$contEventCon.each(function(){

					if($contSelIndex==$contEventCon.index($(this))) $(this).addClass(opts.onClass);
					else $(this).removeClass(opts.onClass);

					if($contEventCon.index($(this))!=$contSelIndex) $(this).fadeOut(opts.aniTimer);
					else $(this).fadeIn(opts.aniTimer);
				});
			}

			/*********************************************************
			//Animation - effect : slide일때
			*********************************************************/
			function moveAni_slide(){

				/* 슬라이드반복설정일때 애니메이션 효과를 위한 시작위치 재설정 */
				if(opts.slideRepeat){
					$contEventCon.each(function(){
						var value = Number($(this).css(opts.slideFor).replace("px",""))/$slideValue;
						if($moveMode){
							if(value<0) value = value + $contConCnt;
						}
						else{
							if(value>=opts.slideView) value = value - $contConCnt;
						}
						value = value*$slideValue;
						$(this).css(opts.slideFor,value);
					});
				}

				$contEventCon.removeClass('disabled').attr('aria-hidden',false);

				/* 새위치설정 */
				$contEventCon.each(function(){

					var new_position = newPosition($(this));

					if($contSelIndex==$contEventCon.index($(this))) $(this).addClass(opts.onClass);
					else $(this).removeClass(opts.onClass);

					switch(opts.slideFor)
					{
						case "right":
							if(opts.slideAction){
								$(this).stop().animate({"right":new_position}, opts.aniTimer, opts.easing, function(){
									if(new_position < 0 || new_position >= opts.slideView*opts.slideValue) $(this).addClass('disabled').attr('aria-hidden',true);
								});
							}else $(this).stop().css({"right":new_position});
						break;

						case "top":
							if(opts.slideAction){
								$(this).stop().animate({"top":new_position}, opts.aniTimer, opts.easing, function(){
									if(new_position < 0 || new_position >= opts.slideView*opts.slideValue) $(this).addClass('disabled').attr('aria-hidden',true);
								});
							}else $(this).stop().css({"top":new_position});
						break;

						case "bottom":
							if(opts.slideAction){
								$(this).stop().animate({"bottom":new_position}, opts.aniTimer, opts.easing, function(){
									if(new_position < 0 || new_position >= opts.slideView*opts.slideValue) $(this).addClass('disabled').attr('aria-hidden',true);
								});
							}else $(this).stop().css({"bottom":new_position});
						break;

						default:
							if(opts.slideAction){
								$(this).stop().animate({"left":new_position}, opts.aniTimer, opts.easing, function(){
									if(new_position < 0 || new_position >= opts.slideView*opts.slideValue) $(this).addClass('disabled').attr('aria-hidden',true);
								});
							}else $(this).stop().css({"left":new_position});
						break;
					}
				});
			}

			/*********************************************************
			//컨텐츠 디스플레이 함수
			*********************************************************/
			function moveContentsAnimation(){

				clearTimeout($contTimer);

				switch(opts.effect)
				{
					case "fade":
					moveAni_fade();
					break;

					case "slide":
					moveAni_slide();
					break;

					default:
					moveAni_show();
					break;
				}

				//아이콘버튼 재설정
				if(opts.iconFlag) displayIcon();

				//이동버튼출력 재설정
				if(opts.btnFlag) moveContentsBtn();

				//오토플레이 재설정
				if(opts.autoPlay && $playMode) callAnimation();

				//콜백함수
				if(opts.changeCallBack){
					return opts.changeCallBack($contSelIndex);
				}

				$iconMode = false;
			}
		});
	};

	$.fn.moveContents.defaults = {
		eventEl : ">ul a",
		conEl : ">div",
		defaultIndex : 0,
		addContain : null,
		onClass : "on",
		onImage : false,
		iconFlag : true,
		iconFlagEvent : "click",
		btnFlag : true,
		btnFlagAll : false,
		btnFlagDisabled : true,
		btnWrapper : '.area-control',
		btnPrev : ".ui-btn.before",
		btnNext : ".ui-btn.next",
		btnPrevOff : "btn-off",
		btnNextOff : "btn-off",
		autoPlay : true,
		autoStop : false,
		delayTimer : 0,
		changeTimer : 5000,
		controlFlag : true,
		btnPlay : ".ui-btn.play",
		btnStop : ".ui-btn.stop",
		effect : "fade",
		easing : "linear",
		aniTimer : 600,
		slideFor : "left",
		slideValue : null,
		slideView : 1,
		slideRepeat : false,
		slideAction : true,
		conEvent : "click",
		changeCallBack : null,
		conCallBack : null,
		eventReturn : false
	};

})(jQuery);

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
					modal_ajax : true,
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
					scroll_doc_class : 'popopen',
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
						if(!el.options.callback_before.call(el, el.vars)) return;
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
				//오픈
				if(el.options.load_animation){
					el.vars.pop.slideDown(function(){
						$(this).addClass(el.options.class_open);
					});
				}else{
					el.vars.pop.addClass(el.options.class_open);
				}

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
				else{
					if(el.options.scroll_doc_class) $('body').addClass(el.options.scroll_doc_class);
				}

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
				else{
					if(el.options.scroll_doc_class) $('body').removeClass(el.options.scroll_doc_class);
				}

				//여백 닫기설정
				if(el.options.doc_click){
					$(document).unbind('click.'+el.vars.pop.attr('id'));
				}

				//동적레이어일경우 레이어삭제
				if(el.options.modal_ajax) methods.popRemove();
			};

			/* ---------------------------------------------------------------------------
				popmodal.popHide : 팝업삭제
			--------------------------------------------------------------------------- */
			methods.popRemove = function(){
				el.vars.pop.remove();
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
					if(el.options.toggle_type == "toggle") var scroll_value = $(el.options.selector).offset().top;
					else var scroll_value = $(el.vars.this_con).offset().top;
					$('html,body').animate({scrollTop : scroll_value},600);
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