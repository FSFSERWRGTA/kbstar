/***********************************************
	PUBLISH PLUGIN  : moveContents
	* 슬라이드용
************************************************/
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

						if($(this).hasClass(opts.onClass)) $(this).attr('aria-hidden', false);
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

						// 무한 반복이 아닐 때 2021-01-27
						if (opts.slideRepeat === false && opts.effect === "show") {
							if($contSelIndex >= $contConCnt-1) {
								$btnNext.attr('disabled', true).addClass('disabled')
							} else if ($contSelIndex <= 0) {
								$btnPrev.attr('disabled', false).removeClass('disabled');
							}
						}
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
				}else if (opts.slideRepeat === false && opts.effect === "show"){
					// 무한반복이 아닐 때 2021-01-27
						$btnPrev.attr('disabled', false).removeClass('disabled');
						if($contSelIndex>=$contConCnt-(1*opts.slideView)) {
						$btnNext.attr('disabled', true).addClass('disabled')
					}
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
				}else if (opts.slideRepeat === false && opts.effect === "show"){
					// 무한반복이 아닐 때 2021-01-27
					$btnNext.attr('disabled', false).removeClass('disabled');
					if($contSelIndex<=0) {
						$btnPrev.attr('disabled', true).addClass('disabled')
					}
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
					// 무한 반복이 아닐 때 2021-01-27
					if(opts.slideRepeat === false && opts.effect === "show") {
						if($contSelIndex >= $contConCnt -1) {
							$btnNext.attr('disabled', true).addClass('disabled');
							$btnPrev.attr('disabled', false).removeClass('disabled');
						} else if ($contSelIndex <= 0) {
							$btnPrev.attr('disabled', true).addClass('disabled');
							$btnNext.attr('disabled', false).removeClass('disabled');
						} else {
							$btnPrev.attr('disabled', false).removeClass('disabled');
							$btnNext.attr('disabled', false).removeClass('disabled');
						}
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
								console.log(opts.slideView*opts.slideValue, new_position)
								$(this).stop().animate({"left":new_position}, opts.aniTimer, opts.easing, function(){
									if(new_position < 0 || new_position >= opts.slideView*opts.slideValue) $(this).addClass('disabled').attr('aria-hidden',true);
									if($(this).hasClass(opts.onClass)) $(this).attr('aria-hidden', false);
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
		slideRepeat : true,
		slideAction : true,
		conEvent : "click",
		changeCallBack : null,
		conCallBack : null,
		eventReturn : false
	};

})(jQuery);