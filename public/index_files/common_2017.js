/**
 * <U PLEATE> UI Dev Team
 *
 * @namespace OBANK
 * @author Joe Seung Woon
 * @create 170731
 */

var OBANK = window.OBANK || {};

OBANK = (function(global, App, $) {
	'use strict';

	/** 생성자 */
	App.constructor = 'OBANK';

	/**
	 * App.namespace
	 * @description - 네임스페이스 모듈 생성
	 * @param {String} ns_str - 네임스페이스 모듈명
	 * @return {Object} 생성된 네임스페이스 객체 모듈
	 */
	App.namespace = function(ns_str) {
		var parts = ns_str.split('.'),
			parent = App;

		if (parts[0] === App.constructor) { parts = parts.slice(1); }

		for (var i = 0, max = parts.length; i < max; i++) {
			if (typeof parent[parts[i]] === 'undefined') { parent[parts[i]] = {}; }
			parent = parent[parts[i]];
		}

		return parent;
	};

	/** 모듈 초기화 */
	App.namespace('Commons'); // 공통
	App.namespace('SectionMain'); // 섹션메인
	App.namespace('AccountSrch'); // 조회
	App.namespace('IntegrateTransfer'); // 이체

	/**
	 * App.Commons.MorderninzMsie
	 * @description - IE 모던 브라우저 클래스 분기
	 */
	App.Commons.MorderninzMsie = function() {
		if ($.browser.msie) {
			switch ($.browser.version) {
				case '7.0': // 인트라넷 환경 대응
					$('html').addClass('ie7');
					break;
				case '8.0': // 운영 모던 환경 대응
					$('html').addClass('ie8');
					break;
			}
		}
	};

	/**
	 * App.Commons.Utils
	 * @description - 유틸 기능
	 */
	App.Commons.Utils = {
		/**
		 * isFunction
		 * @description - Function 타입형 확인
		 * @param {Function} func - 함수형
		 * @return {Boolean} 불린값
		 */
		isFunction : function(func) {
			return (Object.prototype.toString.call(func) === '[object Function]')? true : false;
		},
		/**
		 * isObject
		 * @description - Object 타입형 확인
		 * @param {Object} func - 객체형
		 * @return {Boolean} 불린값
		 */
		isObject : function(func) {
			return (Object.prototype.toString.call(func) === '[object Object]')? true : false;
		}
	};

	/**
	 * App.Commons.Plugins
	 * @description - jQuery 커스텀 확장 플러그인
	 */
	App.Commons.Plugins = function() {
		/**
		 * $.fn.placeholder
		 * @description - XHTML 플레이스홀더
		 */
		$.fn.placeholder = function() {
			$(this)
				.bind('focus', function() {
					var $this = $(this);

					($this.val() === $this.attr('data-placeholder'))? $this.removeClass('placeholder').val('') : $this.removeClass('placeholder');
				})
				.bind('blur', function() {
					var $this = $(this);

					if ($this.val() === $this.attr('data-placeholder') || $this.val() === '') { $this.addClass('placeholder').val($this.attr('data-placeholder')); }
				})
				.blur();
		};

		/**
		 * $.fn.progressRolling
		 * @description - 비주얼 롤링 > 바로가기 버튼 진행바 모션
		 */
		$.fn.progressRolling = function() {
			return $(this).each(function() {
				var _this = $(this),
					viewTarget = _this.find('.mVisualList > li'),
					ctl_container = _this.find('.roll_controller_container .roll_controller_box'),
					ctl_arr_container = _this.find('.roll_controller_arrow_box .roll_control_arrow_btn');
				var selectNum = 0,
					interval = 0,
					interval_time = 4000,
					isPlay = true;

				if (viewTarget.length <= 1) { return; }

				function toRoll() {
					viewTarget.each(function() {
						var $this = $(this),
							$progressStatus = $this.find('.btn_go>.progress>.stts');

						$progressStatus.stop().css('left', '-100%');

						if ($this.index() === selectNum) {
							$progressStatus.stop().animate({left:0}, interval_time, function() {
								complete(this);
							});
						}
					});

					if (isPlay) {
						clearInterval(interval);
						interval = setInterval(interval_fun, interval_time);
					}
				}

				function complete(selector) {
					if ($(selector).css('left') === 0) { $(selector).stop().css('left', '-100%'); }
				}

				function interval_fun() {
					if (_this.is(':hidden') ) {
						toStop();

						return;
					}

					(selectNum >= viewTarget.length - 1)? selectNum = 0 : selectNum++;

					toRoll();
				}

				function toStop() {
					isPlay = false;

					clearInterval(interval);
					viewTarget.find('.btn_go>.progress>.stts').stop().css('left', '-100%');
				}

				function toPlay() {
					isPlay = true;

					viewTarget.find('.btn_go>.progress>.stts').stop().animate({left:0}, interval_time);
					interval = setInterval(interval_fun, interval_time);
				}

				ctl_arr_container.find('.btnLeft a').bind('click', function(e) {
					e.preventDefault();

					selectNum--;

					if (selectNum < 0) { selectNum = viewTarget.length - 1; }

					toStop();
				});

				ctl_arr_container.find('.btnRight a').bind('click', function(e) {
					e.preventDefault();

					selectNum++;

					if (selectNum >= viewTarget.length) { selectNum = 0; }

					toStop();
				});

				ctl_container.find('.list>a').bind('click', function(e) {
					e.preventDefault();

					if (selectNum === $(this).parent().index()) { return false; }

					selectNum = $(this).parent().index();

					ctl_container.find('.btn_stop').click();
				});

				ctl_container.find('.btn_stop').bind('click', function(e) {
					e.preventDefault();

					toStop();
				});

				ctl_container.find('.btn_play').bind('click', function(e) {
					e.preventDefault();

					toPlay();
				});

				interval = setInterval(interval_fun, interval_time);
				toRoll();
			});
		};

		/**
		 * $.fn.recommendRolling
		 * @description - 비주얼 롤링 > 추천상품
		 */
		$.fn.recommendRolling = function(opt) {
			var $this = $(this);

			return $this.each(function() {
				var controller = $this.find(opt.contorller);
				var $chooseAge = $this.find('.choose_age'),
					$visualSlide = $this.find('.visual_slide'),
					$prodListWrap = $this.find('.prod_list_wrap');

				function move(selector) {
					for (var i = 0, len = selector.find('li').length; i < len; i++) {
						selector.find('li').eq(i).delay(i * 250).animate({opacity: 1}, 1000);
					}

					$visualSlide.children('div.on').find('.effect').delay(800).animate({opacity: 1}, 2500);
				}

				function prev(e) {
					e.preventDefault();

					var $chooseAgeActiveItem = $this.find('.choose_age li.on');
					var visualSlideActiveIndex = 0;

					if ($chooseAgeActiveItem.prev('li').length === 0) { return false; }

					$chooseAgeActiveItem.removeAttr('title').removeClass('on').prev('li').attr('title', '선택됨').addClass('on');
					$visualSlide.children('div.on').removeClass('on').prev('div').addClass('on').children('.effect').stop().css('opacity', 0);

					visualSlideActiveIndex = $visualSlide.children('div.on').index();

					$prodListWrap.find('li').stop().end().eq(visualSlideActiveIndex).show().find('li').stop().css('opacity', 0);
					move($prodListWrap.eq(visualSlideActiveIndex));
				}

				function next(e) {
					e.preventDefault();

					var $chooseAgeActiveItem = $this.find('.choose_age li.on');
					var visualSlideActiveIndex = 0;

					if ($chooseAgeActiveItem.next('li').length === 0) { return false; }

					$chooseAgeActiveItem.removeAttr('title').removeClass('on').next('li').attr('title', '선택됨').addClass('on');
					$visualSlide.children('div.on').removeClass('on').next('div').addClass('on').children('.effect').stop().css('opacity', 0);

					visualSlideActiveIndex = $visualSlide.children('div.on').index();

					$prodListWrap.find('li').stop().end().eq(visualSlideActiveIndex).show().find('li').stop().css('opacity', 0);
					move($prodListWrap.eq(visualSlideActiveIndex));
				}

				$chooseAge.find('a').bind('click', function(e) {
					e.preventDefault();

					var $this = $(this),
						target = $this.attr('href'),
						$chooseAgeItem = $this.parent('li'),
						chooseAgeItemIndex = $chooseAgeItem.index();

					$chooseAgeItem.attr('title', '선택됨').addClass('on').siblings('li').removeAttr('title').removeClass('on');
					$visualSlide.children('div.on').removeClass('on').end().children('div').eq(chooseAgeItemIndex).addClass('on').children('.effect').stop().css('opacity', 0);
					$prodListWrap.find('li').stop();
					$(target).find('li').css('opacity', 0);
					move($prodListWrap.eq(chooseAgeItemIndex));
				});

				controller.find('.prev').click(prev);
				controller.find('.next').click(next);
			});
		};

		/**
		 * $.fn.recommendLinkSliderRolling
		 * @description - 비주얼 롤링 > 추천상품 > 대출상품 자동롤링
		 */
		$.fn.recommendLinkSliderRolling = function(opt) {
			var $this = $(this);

			return $this.each(function() {
				var $prodListWrap = $this.find('.prod_list_wrap');
				var timer = 0;
				var SPEED = 5000;

				function rolling() {
					var $linkSliderActiveItem = $prodListWrap.find('.prod_list>li .linkSliderList').children('li.on');
                    var nextIndex = ($linkSliderActiveItem.next('li').length === 0)? 0 : $prodListWrap.find('.prod_list>li .linkSliderList').find('li').index($linkSliderActiveItem.next('li'));

                    start(nextIndex);
				}

				function start(_index) {
					$prodListWrap.find('.prod_list>li .linkSliderList').children('li').removeClass('on').eq(_index).addClass('on');

                    stop();
                    timer = setTimeout(rolling, SPEED);
					$('.linkSliderBtn#linkSliderStop').show(); // 2017-12-15
					$('.linkSliderBtn#linkSliderPlay').hide(); // 2017-12-15
				}

				function stop() {
					clearTimeout(timer);

					if (timer > 0) { timer = 0; }
					$('.linkSliderBtn#linkSliderStop').hide(); // 2017-12-15
					$('.linkSliderBtn#linkSliderPlay').show(); // 2017-12-15
				}

				$('#personalizedData a.naviBtn').die('click').live('click', function(e) {
					if (typeof e.originalEvent === 'undefined') {
						return false;
					}

					var $this = $(this);
					var clickIndex = $this.closest('ul').find('a.naviBtn').index($this);

					start(clickIndex);
                });

				$('#personalizedData .linkSliderBtn').die('click').live('click', function(e) { //접근성 수정(play,stop 추가)
					switch ($(this)[0].id) {
						case 'linkSliderPlay':
							start(0);
						break;
						case 'linkSliderStop':
							stop();
						break;
					}
				});

				start(0);
			});
		};

		/**
		 * $.fn.selectCombo_2015
		 * @description - 공통 푸터 > 콤보박스
		 */
		$.fn.selectCombo_2015 = function() {
			return $(this).each(function() {
				var _this = $(this);

				_this.find('.select_combo_open a').bind('click', function(e) {
					e.preventDefault();
				});
			});
		};
	};

	/**
	 * App.Commons.TabsMenu
	 * @description - 탭메뉴
	 */
	App.Commons.TabsMenu = function(options) {
		/**
		 * TabsMenu
		 * @description - 공통 : 탭메뉴
		 * @param {Object} options.tabsMenu - DOM 셀렉터 [탭메뉴]
		 * @param {Object} options.tabsCont - DOM 셀렉터 [탭 컨텐츠]
		 */
		function TabsMenu(options) {
			this.tabsMenu = options.tabsMenu;
			this.tabsCont = options.tabsCont;

			this.evtListener();
		}

		// 공통 : 탭메뉴 확장 - 이벤트 핸들러
		TabsMenu.prototype.evtListener = function() {
			var _that = this;

			_that.tabsMenu.find('a').bind('click', function(e) {
				e.preventDefault();

				var $this = $(this),
					target = $this.attr('href');

				$this.attr('title', '선택됨').parent('li').addClass('on').siblings('li').removeClass('on').children('a').attr('title', '');
				_that.tabsCont.hide();
				$(target).show();
			});

			_that.tabsMenu.find(':radio').bind('change', function() {
				var $this = $(this),
					target = $this.data('target');

				$this.parent('li').attr('title', '선택됨').siblings('li').attr('title', '').children(':radio').attr('checked', false);
				$this.attr('checked', true);

				_that.tabsCont.hide();
				$(target).show();
			});
		};

		new TabsMenu(options);
	};

	/**
	 * App.SectionMain.Taxes
	 * @description - 섹션메인 > 공과금
	 */
	App.SectionMain.Taxes = function() {
		function Taxes() {
			this.$btnAbleInfo = $('#btnAbleInfo>a');

			this.evtListener();
		}

		Taxes.prototype.evtListener = function() {
			this.$btnAbleInfo.bind('click', function(e) {
				e.preventDefault();

				var $this = $(this),
					target = $this.attr('href');

				$this.parent('p').toggleClass('on');
				$(target).toggle();
			});
		};

		new Taxes();
	};

	/**
	 * App.AccountSrch.AccountToggle
	 * @description - 전체계좌 조회 > 전계좌 : 아코디언 토글 메뉴
	 * @param {Object} cb - Object 타입을 요청 받으면 콜백 함수 응답
	 *
	 * @callback requestObjectCallback
	 * @param {Function} Object.expand - 개별 펼치기 콜백함수
	 * @param {Function} Object.fold - 개별 접기 콜백함수
	 * @param {Function} Object.expandAll - 전체 펼치기 콜백함수
	 * @param {Function} Object.foldAll - 전체 접기 콜백함수
	 */
	App.AccountSrch.AccountToggle = function(cb) {
		function AccountToggle() {
			this.$toggleBtn = $('.accountToggle');
			this.$toggleBtnAll = $('.accountToggleAll');
			this.toggleAllFlag = false;

			this.evtListener(cb);
		}

		AccountToggle.prototype.evtListener = function(cb) {
			var _that = this;

			this.$toggleBtn.bind('click', function(e) {
				e.preventDefault();

				var $this= $(this),
					target = $this.data('toggle-target'),
					$accountListHead = $this.parents('.accountList_head'),
					$toggleWrap = (target)? $(target) : $accountListHead.next('.toggleWrap');

				if ($toggleWrap.is(':hidden')) { // 펼치기
					$this.text('리스트 감추기').removeClass('open');
					$accountListHead.removeClass('line').children('a.info_lypop').show().end().children('.accountList_info').show();
					$toggleWrap.show();

					if ($('.infoMenu').length > 0) {
						$.each($('.infoMenu'), function(index, elem) {
							$('#' + $(elem).find(':radio:checked')[0].id).change();
						});
					}

					if (cb && App.Commons.Utils.isObject(cb)) { cb.expand({detail: $toggleWrap}); }
				} else { // 접기
					$this.text('리스트 펼치기').addClass('open');
					$accountListHead.addClass('line').children('a.info_lypop').hide().end().children('.accountList_info').hide();
					$toggleWrap.hide();

					if ($('.infoMenu').length > 0) { $this.closest('.accountList').find('.tip').hide(); }
					if (cb && App.Commons.Utils.isObject(cb)) { cb.fold({detail: $toggleWrap}); }
				}

				if ($('.accountToggle.open').length === 0) {
					_that.toggleAllFlag = true;

					_that.$toggleBtnAll.text('기본계좌보기');
				} else {
					_that.toggleAllFlag = false;

					_that.$toggleBtnAll.text('전체계좌보기');
				}
			});

			this.$toggleBtnAll.bind('click', function(e) {
				e.preventDefault();

				var $accountWraps = $('.accountWrap'),
					$accountListHeads = $('.accountList_head'),
					$toggleWraps = $('.toggleWrap');

				if (!_that.toggleAllFlag) { // 전체 펼치기
					_that.toggleAllFlag = true;

					$(this).text('기본계좌보기');
					_that.$toggleBtn.text('리스트 감추기').removeClass('open');
					$accountListHeads.removeClass('line').children('a.info_lypop').show().end().children('.accountList_info').show();
					$toggleWraps.show();

					if (cb && App.Commons.Utils.isObject(cb)) { cb.expandAll({details: $toggleWraps}); }
				} else { // 전체 접기
					_that.toggleAllFlag = false;

					$('html, body').animate({scrollTop: $('.contentWrap').offset().top}, 200);
					$(this).text('전체계좌보기');

					$.each($accountWraps, function(index, elem) {
						var $elem = $(elem),
							$accountListHead = $elem.children('.accountList_head'),
							$toggleBtn = $accountListHead.children('.accountToggle'),
							$toggleWrap = $accountListHead.next('.toggleWrap');

						if (!$elem.hasClass('account_default')) {
							$toggleBtn.text('리스트 펼치기').addClass('open');
							$accountListHead.addClass('line').children('a.info_lypop').hide().end().children('.accountList_info').hide();
							$toggleWrap.hide();
						}
					});

					if (cb && App.Commons.Utils.isObject(cb)) { cb.foldAll({details: $toggleWraps}); }
				}
			});
		};

		new AccountToggle();
	};

	/**
	 * App.IntegrateTransfer.SelectInfoBox
	 * @description - 통합 이체 : 추가정보입력
	 */
	App.IntegrateTransfer.SelectInfoBox = function() {
		function SelectInfoBox() {
			this.$infoMenu = $('.infoMenu');
			this.$infoMenuRadio = this.$infoMenu.find(':radio');

			this.evtListener();
		}

		SelectInfoBox.prototype.evtListener = function() {
			this.$infoMenuRadio.bind('change', function() {
				var $this = $(this),
					dataIinfomenu = $this.closest('.infoMenu').data('infomenu'),
					dataTarget = $this.data('infomenu-target'),
					$target = $('[data-infomenu-cont=' + dataTarget + ']');

				$this.siblings(':radio').attr('checked', false);
				$this.attr('checked', true);

				(dataIinfomenu)? $('[data-infomenu-group=' + dataIinfomenu + ']').hide() : $('[data-infomenu-cont]').hide();
				if (dataTarget || $target.length > 0) { $target.show(); }
			});
		};

		new SelectInfoBox();
	};

	/** DOM Content Loaded */
	$(function() {
		App.Commons.MorderninzMsie();
		App.Commons.Plugins();
		$('.headerWrap').append('<span class="shadow"></span>');
		$('.text_placeholder').placeholder();
		$('.mainVisual_area').progressRolling();
		$('.recommend_top_wrap').eq(0).recommendRolling({contorller: '.slide_controller'}).recommendLinkSliderRolling({contorller: '.slide_controller'});
		$('.select_combo_2015').selectCombo_2015();
	});

	/** 모듈 반환 */
	return {
		CommonsTabsMenu: App.Commons.TabsMenu, // 탭메뉴
		SectionMainTaxes: App.SectionMain.Taxes, // 메인 > 공과금
		AccountSrchAccountToggle: App.AccountSrch.AccountToggle, // 전계좌 : 아코디언 토글 메뉴
		IntegrateTransferSelectInfoBox: App.IntegrateTransfer.SelectInfoBox // 통합 이체 : 추가정보입력
	};
})(window, OBANK, jQuery);