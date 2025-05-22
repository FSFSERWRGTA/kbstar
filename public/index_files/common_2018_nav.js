/***********************************************
* 온로드 실행 함수
************************************************/
;(function($){
	$(function() {

		/* 레이아웃 : Primary Navigation */
		var primaryNavi = (function(){
			var wrapper = $('.wrapAll'),
			menu_active1,
			menu_active2,
			nav_timer = null;

			return {
				init: function(){
					var self = this;

					////////////////////////////////////////
					// 메뉴구조 초기세팅
					////////////////////////////////////////
					$('.nav-snb > li.active .submenu').each(function(){
						if($(this).find('ul ul ul').length>0){
							$(this).parent('.cate').addClass('group');
							$(this).find('>ul>li').addClass('cate');
							$(this).find('>ul>li>div').addClass('submenu');
						}
					});

					if($('.nav-snb > li.active.group').length>0) wrapper.addClass('on-snbsub');

					menu_active1 = $('.nav-snb > li.active').eq(0);
					menu_active2 = menu_active1.find('> .submenu > ul > li.active').eq(0);
					menu_active1.addClass('on');
					menu_active2.addClass('on');

					////////////////////////////////////////
					// HEADER 고정 초기세팅
					////////////////////////////////////////
					var $base_scroll = 0;

					if($('#uiNavMenu').length){
						$base_scroll = $('#uiNavMenu').offset().top;
					}

					$(window).scroll(function(e){
						//윈도우 스크롤
						if($(window).scrollTop()>$base_scroll) $('body').addClass('scrolling');
						else $('body').removeClass('scrolling');
					});

					////////////////////////////////////////
					// 메뉴구조 : 이벤트설정
					////////////////////////////////////////
					//1차메뉴 이벤트설정(그룹형제외)
					$('.nav-snb li.cate:not(.active.group) > a')
						.bind('focus mouseover', function(ev){
							//ev.preventDefault();
							$('.nav-snb li.cate').removeClass('on').removeClass('open');
							$(this).parent('li').addClass('on').addClass('open');
							if($(this).parents('.nav-snb li').length>1) $(this).parents('.nav-snb li').addClass('on');
							wrapper.addClass('open-menu');
						})
						.bind('mouseover', function(ev){
							if($.browser.className=="msie8"){
								$('html,body').animate({scrollTop : 1},0);
							}
						})
						.bind('focus', function(ev){clearTimeout(nav_timer);})
						.bind('blur', function(ev){nav_timer = setTimeout(function(){
							$('.nav-snb li.cate').removeClass('on').removeClass('open');
							wrapper.removeClass('open-menu');
						},600);});

					//1차메뉴 이벤트설정(그룹형)
					$('.nav-snb li.cate.group > a')
						.bind('focus mouseover', function(ev){
							clearTimeout(nav_timer);
							$('.nav-snb li.cate').removeClass('on').removeClass('open');
							wrapper.removeClass('open-menu');
						})

					//하위메뉴 타임연장
					$('.nav-snb li:not(.cate) > a')
						.bind('focus', function(ev){clearTimeout(nav_timer);})
						.bind('blur', function(ev){nav_timer = setTimeout(function(){
							$('.nav-snb li.cate').removeClass('on').removeClass('open');
							wrapper.removeClass('open-menu');
							menu_active1.addClass('on');
							menu_active2.addClass('on');
						},600);});

					//마우스이벤트
					$(document).bind('mouseover.primaryNavi', function(e){
						if (!$(e.target).closest('#uiNavMenu').length) {
							$('.nav-snb li.cate').removeClass('on').removeClass('open');
							wrapper.removeClass('open-menu');
							menu_active1.addClass('on');
							menu_active2.addClass('on');
						}
					});
				}
			};
		}());

		primaryNavi.init();

	});
})(jQuery);