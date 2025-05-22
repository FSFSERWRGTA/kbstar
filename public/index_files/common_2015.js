$(document).ready(function(){
	$(".wrapAll").css("position","relative");
	$(".wrapAll").css("z-index","9000");

	/* safari font */
	var is_safari = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") == -1 ;
	if(is_safari){
		$("body").addClass("sa_font");
	};
	/*skip navigetion*/
	$("#skipNav a").click(function(e){
		var url = $(this).attr("href");
		url = url.slice(1,url.length);
		document.getElementById(url).tabIndex = -1;
		document.getElementById(url).focus();
		return false;
	});
	
	$.fn.rolling_auto_2015 = function(opt){
		
		$(this).each(function(){
			var option = opt;
			var _this = $(this);
			var controller = $(option.contorller);
			var list_con = _this.find(".siteLinkArea ul");
			var move_w = list_con.children().eq(1).width() + px_to_numver(list_con.children().eq(0).css("margin-left"));
			var restore_pos = option.startPoseX;
			var move_x = -move_w + restore_pos;
			var interval = setInterval(next,3000);
			var is_move = false;
			
			controller.find(".prev").click(prev)
			controller.find(".stop").click(stop);
			controller.find(".play").click(play);
			controller.find(".next").click(next);
			
			function prev(){
				if(is_move) return;
				prevMove();
			}
			function play(){
				controller.find(".play").prepend(controller.find(".readonly").detach());
				interval = setInterval(next,3000);
			}
			function stop(){
				controller.find(".stop").prepend(controller.find(".readonly").detach());
				clearInterval(interval);
			}
			function next(){
				if(is_move) return;
				nextMove();
			}
			
			function prevMove(){
				is_move = true;
				var flist = list_con.children().eq(list_con.children().length-1).detach();
				list_con.css("left",move_x);
				list_con.prepend(flist);
				list_con.animate({
					"left":restore_pos
				},1000,'easeOutExpo',function(){
						is_move = false;
					}
				);
			}
			function nextMove(){
				is_move = true;
				list_con.animate({
					"left":move_x
				},1000,'easeOutExpo',function(){
						var flist = list_con.children().eq(0).detach();
						list_con.append(flist);
						list_con.css("left",restore_pos);
						is_move = false;
					}
				);
			};
			function px_to_numver(str){
				var arr = str.split("px");
				return Number(arr[0]);
			}
		});
		
	};
	/* 자동 롤링 : 퇴직연금 */
	$('.siteLinkWrap').rolling_auto_2015({contorller:".slideControllerArea" , startPoseX:-7});

	/*menu all show,hide*/
	$.fn.menu_all_2015 = function(){
		
		var _this = $(this);
		var eff = 'easeInExpo';
		var isFirst = true;
		
		//iframe 배경 투명
		$("#ifr_menuAll").attr("allowTransparency","true");
		$("#menu_all_2015 .btn_menu").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			//return;			
			$('body').addClass("scrollRemove");
			$('body').attr("scroll","no");
			
			if(isFirst){
				// 페이지변경 서비스전체보기_2018
				$("#ifr_menuAll").attr("src","/quics?page=C060281");
				isFirst = false;
			}
			
			_this.css("display","block");
			_this.animate({
				"right":"0"
			},700,'easeInExpo',function(){
				}
			);
			$("#menu_all_con_2015").focus();
		});
		
		$(window).resize(function(){
			var w = $(window).width()/2 - 450;
			if(w < 50) w=50;
			$(".menuAllArea_2015 .menuAllWrapper_2015 .logo").css("left",w);
		});
		$(window).resize();
		
		$(".all_menu_close_btn").bind("click focusout",function(){
			_this.animate({
				"right":"-100%"
			},700,'easeOutExpo',function(){
					$('body').removeClass("scrollRemove");
					$('body').attr("scroll","yes");
					_this.css("display","none");
					$("#ifr_menuAll").attr("src","");
					// 매번 다시 그리기
					isFirst = true;
				}
			);
			$("#menu_all_2015 .btn_menu").focus();
		});
	};
	
	$("#menu_all_con_2015").menu_all_2015();
	
	/* menu all content */
	$.fn.allMenuCntArea_2015 = function(){

		if(!$(".allMenuCntArea_2015").length) return;
		$("#ifr_menuAll").height(screen.height-50);
		
		var isScrollEl;
		var _this = $(this);

		function init(){
			win_resize_lsn();
			var initScroll = _this.find(".tabList.on").index();
			if(initScroll != _this.find(".tabList").length-1){
				addScroll(_this.find(".tabList.on").find("li.on .list_scroll_box"));
			}else{
				addScroll(_this.find(".tabList.on").find(".list_scroll_box"));
			}
		};
		function win_resize_lsn(){
			_this.find(".tabList").find(".list_scroll_box").height($(window).height()-170);
			var w = $(window).width()/2 -500 ;
			if(w<0) w = 0;
			$(".allMenuCntArea_2015 .tabList .tabCnt").css("left",w)
		};
		$(window).resize(win_resize_lsn);

		init();

		_this.find(">ul>li>h2>a").bind("click focusin",click_lsn);
		function click_lsn(e){
			_this.find(">ul>li").each(function(){
				$(this).removeClass("on");
			});
			$(this).parent().parent().addClass("on");

			if($(this).parent().parent().index() != $(this).parents(".allMenuCntArea_2015").find(".tabList").length-1){
				addScroll($(this).parent().parent().find("li.on .list_scroll_box"));
			}else{
				addScroll($(this).parent().parent().find(".list_scroll_box"));
			}
			e.preventDefault();
		};


		_this.find(".tabCnt>li>h3>a").bind("click",click_sub_lsn);
		function click_sub_lsn(e){
			if($(this).parent().siblings(".list_scroll_box").length == false){
				var target = $(this).attr("target");
				var link = $(this).attr("href");
				if(target != "_blank"){
					window.top.change_link_2015(link,target);
					e.preventDefault();
				}
				e.stopPropagation();
				return;
			}
			var idx = $(this).parents(".tabList").index();
			_this.find(".tabCnt").eq(idx).find(">li").each(function(){
				$(this).removeClass("on");
			});
			$(this).parent().parent().addClass("on");
			addScroll($(this).parent().parent().find(".list_scroll_box"));
			e.preventDefault();
		};

		function addScroll(target){
			if(isScrollEl){
				isScrollEl.mCustomScrollbar("destroy");
			};
			target.mCustomScrollbar({
				keyboard:{
					enable:true,
					scrollType:"stepless",
					scrollAmount:"auto"
				},
				mouseWheel:{scrollAmount:300}
			});
			isScrollEl = target;
		};
	};
	$(".allMenuCntArea_2015").allMenuCntArea_2015();
	
	/* event main rolling */
	$.fn.eventMainRolling = function(){
		return $(this).each(function(){
			var selectNum = 0;
			var _this = $(this);
			var t_li = _this.find('.mVisualList');
			var viewTarget = _this.find('.mVisualList > li');
			var isMove = false;
			var article_width = viewTarget.eq(1).outerWidth(true);
			t_li.width(article_width * viewTarget.length);
			var ran = Math.floor(Math.random()*viewTarget.length+1);
			t_li.prepend(viewTarget.eq(ran).detach());
			viewTarget.css("float","left");
			viewTarget.removeClass("last");
			_this.find('.mVisualList > li').last().addClass("last");
			
			if(viewTarget.length <= 2) {
				$(".roll_control_arrow_btn").css("display","none");
				return;
			};
			
			var viewNum = viewTarget.length;
			var effect_time = 1000;
			var arrowClick = false;
			
			var ctl_arr_container = _this.find(".roll_controller_arrow_box .roll_control_arrow_btn");
			
			function shuffle(num){
				var arr = [];
				for(var i=0; i<num;i++){
					arr.push(i);
				};
				var len = arr.length;
				var i = len*2;
				while(i>0){
					var idx1 = Math.floor(Math.random()*len);
					var idx2 = Math.floor(Math.random()*len);
					if(idx1 == idx2) continue;
					var temp = arr[idx1];
					arr[idx1] = arr[idx2];
					arr[idx2] = temp;
					i--;
				}
				return arr;
			}
			
			function toRoll(){
				isMove = true;
				var tx = -(selectNum * article_width);
				if(selectNum == viewNum-1){
					tx = -(selectNum-1) * article_width;
				}
				t_li.stop().animate({left: tx},effect_time/2,function(){
					isMove = false;
				});
				
				if(selectNum == 0){
					ctl_arr_container.find(".btnLeft").addClass("off");
					ctl_arr_container.find(".btnRight").removeClass("off");
				}else if(selectNum == viewNum-2){
					ctl_arr_container.find(".btnLeft").removeClass("off");
					ctl_arr_container.find(".btnRight").addClass("off");
				}else{
					ctl_arr_container.find(".btnLeft").removeClass("off");
					ctl_arr_container.find(".btnRight").removeClass("off");
				};
			};
			
            // 접근성 스와이프 초점영역 수정 240513
            viewTarget.find("a").bind("focus", function() {
    			selectNum = $(this).closest('li').index();
    			toRoll();
			});
            
			ctl_arr_container.find(".btnRight a").bind("click",function(e){
				e.preventDefault();
				if(selectNum >= viewTarget.length-2 || isMove == true){
					return;
				}
				selectNum++;
				toRoll();
			});
			ctl_arr_container.find(".btnLeft a").bind("click",function(e){
				e.preventDefault();
				if(selectNum <= 0 || isMove == true){
					return;
				}
				selectNum--;
				toRoll();
			});
			toRoll();
		});
	};
	$(".eventVisual_area").eventMainRolling();
	
	/* main rolling */
	$.fn.mainFadeRolling = function(){
		return $(this).each(function(){
			var selectNum = 0;
			var _this = $(this);
			var t_li = _this.find('.mVisualList');
			var viewTarget = _this.find('.mVisualList > li');
			
			if(viewTarget.length <= 1) {
				viewTarget.css("display","block");
				return;
			}
			
			viewTarget.css("position","absolute");
			var viewNum = viewTarget.length;
			var interval;
			var interval_time = 4000;
			var effect_time = 1000;
			var isPlay = true;
			var arrowClick = false;
						
			function toRoll(){
				_this.find(".roll_controller_container .list").each(function(){
					$(this).removeClass("on").find('.readonly').remove(); /* 2016 접근성 개선*/
					$(this).find(".readonly").css("display","none");
					if($(this).index() == selectNum){
						$(this).addClass("on").find("a").prepend('<span class="readonly">현재 선택 메뉴</span>'); /* 2016 접근성 개선*/
					};
				});
				viewTarget.each(function(){
					$(this).stop()
					$(this).animate({opacity:0},effect_time/2,complete);
					if($(this).index() == selectNum){
						$(this).addClass("on");
						$(this).css("display","block");
						$(this).stop().animate({opacity:1},effect_time,complete);
					};
					
				});
				if(isPlay){
					clearInterval(interval);
					interval = setInterval(interval_fun,interval_time);
				};
			};
			function complete(){
				if($(this).css("opacity") == 0){
					$(this).removeClass("on");
					$(this).css("display","none");
				}
			}
			
			function interval_fun(){
				if(_this.css("display") == "none" ){
					toStop();
					return;
				}
				if(selectNum >= viewTarget.length-1){
					selectNum = 0;
				}else{
					selectNum++;
				}
				toRoll();
			}
			
			function toStop(){
				isPlay = false;
				clearInterval(interval);
				ctl_container.find(".ctl_btn li").removeClass("on");
				ctl_container.find(".ctl_btn li").eq(1).addClass("on");
			}
			function toPlay(){
				isPlay = true;
				interval = setInterval(interval_fun,interval_time);
				ctl_container.find(".ctl_btn li").removeClass("on");
				ctl_container.find(".ctl_btn li").eq(0).addClass("on");
			}
			var ctl_container = _this.find(".roll_controller_container .roll_controller_box");
			ctl_container.find(".ctl_box").empty();
			
			for(var i=0; i<viewNum; i++){
				var tit = viewTarget.eq(i).find('.visualDetail dt img').attr("alt");
				var $tagli = $('<li class="list"></li>');
				var $taga = $('<a href="#"><span>' + tit + '</span></a>'); /* 2016 접근성 개선 */
				//var $taga = $('<a href="#"><span class="readonly" style="display:none">현재 선택 : </span>' + tit + '</a>');
				$tagli.append($taga);
				
				ctl_container.find(".ctl_box").append($tagli);
				$taga.bind("click",function(e){
					
					if(selectNum == $(this).parent().index() && arrowClick == false) return;
					selectNum = $(this).parent().index();
					toRoll();
					e.preventDefault();
				});
			};
			
			var ctl_arr_container = _this.find(".roll_controller_arrow_box .roll_control_arrow_btn");
			
			ctl_arr_container.find(".btnRight a").bind("click",function(e){
				e.preventDefault();
				selectNum++;
				if(selectNum >= viewTarget.length){
					selectNum = 0;
				};
				arrowClick = true;
				ctl_container.find(".ctl_box a").eq(selectNum).trigger("click");
				arrowClick = false;
				toStop();
			});
			ctl_arr_container.find(".btnLeft a").bind("click",function(e){
				e.preventDefault();
				selectNum--;
				if(selectNum < 0){
					selectNum = viewTarget.length-1;
				};
				arrowClick = true;
				ctl_container.find(".ctl_box a").eq(selectNum).trigger("click");
				arrowClick = false;
				toStop();
			});
			ctl_container.find(".btn_stop").bind("click",function(e){
				toStop();
				e.preventDefault();
			});
			ctl_container.find(".btn_play").bind("click",function(e){
				toPlay();
				e.preventDefault();
			});
			interval = setInterval(interval_fun,interval_time);
			toRoll();
			
		});
	};
	$(".mainVisual_area").mainFadeRolling();
	
	/* default rolling */
	$.fn.showRollingContent_2015 = function(option){
		var opt = {};
		opt.inEffect = "fadeIn";
		opt.outEffect = "fadeOut";
		opt.effectTime = 500;
		opt = $.extend(opt,option);
		
		return $(this).each(function(){
			var _this = $(this);
			
			_this.find(">li>a").bind("click",function(e){
				/* 롤링이 아니거나 더보기 버튼일 경우 */
				if($(this).hasClass("no_roll") || $(this).hasClass("txt_vMore")){
					return;
				}
				
				_this.find(">li").each(function(){
					if($(this).hasClass("on")){
						$(this).removeClass("on");
						$(this).find('>ul')[opt.outEffect](0);
					}	
				});
				
				var readOnly ;
				
				if(_this.find("li>a > .readonly").length){
					readOnly = _this.find(">li>a > .readonly").remove();
					readOnly = $("<span class='readonly'>현재선택</span>");
				}else if(_this.find("table").length){
					readOnly = _this.find(">li>a > .readonly").remove();
					readOnly = $("<span class='readonly'>현재선택</span>");
				}else{
					readOnly = _this.find(".readonly").detach();
				}
				
				$(this).prepend(readOnly);
				$(this).parent().addClass("on");
				
				var list = $(this).siblings("ul");
				
				var ex = $(this).siblings(".customerNotice");
				if(ex.length){
					_this.find(".customerNotice").css("display","none");
					ex.css("display","block");
				}
				
				if(list.find(">li").length){
					list.find('>li')[opt.outEffect](0);
					list.find('>li').each(function(idx){
						var _t = $(this);
						_t[opt.outEffect](0);
						_t[opt.inEffect](idx*300);
					});
				}else{
					list.find('>ul')[opt.outEffect](0);
					list.find('>ul')[opt.inEffect](0);
				}
				
				_this.trigger("tab_change",$(this).parent().index());
				e.preventDefault();
			});
			
			_this.find(">li>a").eq(0).trigger("click");
			
		});
	};
	
	/* onClickJS 실행*/
	$(".onClickJS").showRollingContent_2015();
	/* verticalTab 실행*/
	$(".verticalTab").showRollingContent_2015();
	/* tabArea_2015 실행*/
	$(".tabArea_2015 > ul").showRollingContent_2015();
	/* linkSliderList 실행*/
	$(".linkSliderList").showRollingContent_2015();
	/* tab_area 실행*/
	$(".tab_area > ul").showRollingContent_2015();
	
	
	/* default tab */
	$.fn.default_tab_2015 = function(){
		return $(this).each(function(){
			var _this = $(this);
			_this.find(".tabTitle > a").bind("click",function(e){
				
				_this.find(".tabTitle >a").each(function(){
					$(this).toggleClass("on");
					$(this).parent().siblings('.tabCnt').toggleClass("on");
				});
				var readOnly = _this.find(".readonly").detach();
				$(this).prepend(readOnly);
				e.preventDefault();
			});
			
		});
	};
	/* default_tab_2015 실행*/
	$(".noticeTabArea").default_tab_2015();
	
	/* front select */
	$.fn.front_select_combo_2015 = function(){
		return $(this).each(function(){
			var _this = $(this);
			_this.css("z-index","1");
			$('.select_combo_box',_this).css("z-index","1");
			$('.select_combo_box',_this).css("top","0px");
			
			var readOnlyTit = (_this.parent().find("label.tit").length > 0 ? _this.parent().find("label.tit").eq(0).text() + " 목록" : "링크");
			
			var init_select = $('.select_txt',_this).text();
			
			_this.find('.select_combo_box a').each(function(){
				if($(this).text() == init_select){
					$(this).parent().addClass("on");
					return;
				}
			})
			
			_this.bind("click",function(e){
				$(this).find(".select_txt").removeClass("default");
				
				//열려있는 콤보 초기화
				$(".front_select_combo_2015").each(function(){
					if($(this) != _this && $(this).find('.select_combo_open').hasClass("select_focus")){
						select_cancle($(this));
					};
				});
				
				if( $('.select_combo_open',_this).hasClass("select_focus") ){
					$('.select_combo_open',_this).removeClass("select_focus");
					$('.select_combo_open .readonly',_this).text(readOnlyTit + " 열기");
					_this.find('.select_combo_box').css("display","none");
				} else {
					$('.select_combo_open',_this).addClass("select_focus");
					$('.select_combo_open .readonly',_this).text(readOnlyTit + " 닫기");
					_this.find('.select_combo_box').css("display","block");
				};
				_this.css("z-index","9999");
				$('.select_combo_box',_this).css("z-index","9999");
				e.stopPropagation();
			});
			
			_this.find(".select_combo_box a").bind("click",function(e){
				var txt = $(this).text();
				_this.find(".select_txt").text(txt);
				_this.find(".select_combo_open a").focus();
				$(this).parent().siblings().removeClass("on");
				$(this).parent().addClass("on");
				select_cancle(_this);
				e.preventDefault();
				e.stopPropagation();
			});
			
			
			$(document).click(function(e){
				select_cancle(_this);
			});
			
			function select_cancle(target){
				target.find('.select_combo_open .readonly').text(readOnlyTit + " 열기");
				target.find('.select_combo_open').removeClass("select_focus");
				target.find('.select_combo_box').css("z-index","1");
				target.css("z-index","1");
				target.find('.select_combo_box').css("display","none");
			}
			
		});
	};
	$(".front_select_combo_2015").front_select_combo_2015();
	
	/* inp radio box */
	$.fn.inp_radio_box_2015 = function(){
		return $(this).each(function(){
			var _this = $(this);
			_this.find(".radio_list").find("input[type=radio]").bind("click",radio_check_skin);
			
			function radio_check_skin(){
				var n = _this.find("input[type=radio]:checked").parent().index();
				_this.find(".radio_list").removeClass("on")
				_this.find(".radio_list").eq(n).addClass("on")
				main_text_change();
			}
			/* only main */
			function main_text_change(){
				var change_target = _this.siblings(".calculatorArea");
				change_target.removeClass("default");
				if(!change_target.length) return;
				var n = _this.find("input[type=radio]:checked").parent().index();
				if(n==0){
					change_target.find(".mthAmount .tit").text("월납입액" + " (원)");
					change_target.find(".period .tit").text("기간 (개월)");
				}else if(n==1){
					change_target.find(".mthAmount .tit").text("만기목표금액" + " (원)");
					change_target.find(".period .tit").text("목표기간 (개월)");
				}
			}
			/* // only main */
			_this.find("input[type=radio]:checked").parent().addClass("on");
			
		});
	};
	$(".inp_radio_box_2015").inp_radio_box_2015();
	
	/* inp check box */
	$.fn.inp_check_box_2015 = function(){
		return $(this).each(function(){
			var _this = $(this);
			_this.find(".check_list").find("input[type=checkbox]").bind("click",check_box_skin);
			
			function check_box_skin(){
				_this.find(".check_list").toggleClass("on")
			}
			_this.find("input[type=checkbox]:checked").parent().addClass("on");
		});
	};
	$(".inp_check_box_2015").inp_check_box_2015();

	
	/* 메인 input color */
	$.fn.main_inp_color_2015 = function(){
		$(this).find("input[type=text]").focusin(function(){
			$(this).removeClass("default");
		});
	}
	$(".calculatorArea").main_inp_color_2015();
	
	/* footer select */
	$.fn.selectCombo_2015 = function(){
		return $(this).each(function(){
			var _this = $(this);
			var h = $('.select_combo_box',_this).height();
			if($('.select_combo_box',_this).hasClass("up")){
				$('.select_combo_box',_this).css("top",-h);
			}else{
				$('.select_combo_box',_this).css("top",h);
			};
			_this.bind("mouseenter",function(e){
				open_lsn();
			});
			_this.find(".select_combo_open a").bind("click hover",function(e){
				if( $(this).hasClass("select_focus") ){
					close_lsn();
				} else {
					open_lsn();
				};
			});
			_this.bind("mouseleave",function(e){
				close_lsn();
			});
			function open_lsn() {
                $('.select_combo_open', _this).addClass('select_focus');
                $('.select_combo_open .readonly',_this).text($('.select_combo_open>a>span:eq(0)',_this).text() + ' 목록 닫기');
                _this.find('.select_combo_box').show();
                _this.bind('keydown', key_lsn);
                _this.parents('.footWrap_2015').css('zIndex', 9000);
            }
 
            function close_lsn() {
                _this.find('.select_combo_open').removeClass('select_focus');
                _this.find('.select_combo_open .readonly').text($('.select_combo_open>a>span:eq(0)',_this).text() + ' 목록 열기');
                _this.find('.select_combo_box').hide();
                _this.unbind('keydown');
                _this.find('.select_combo_open a').focus();
                _this.parents('.footWrap_2015').css('zIndex', 0);
            };
 
			function key_lsn(e){
				
				var kCode;
				if(e.keyCode){
					kCode = e.keyCode;
				}else{
					kCode = e.charCode;
				}
				if(kCode == "13"){
					return;
				}
				var temp = _this.find(".select_combo_box a:focus");
				
				if(kCode == "38"){
					temp.parent().prev().find("a").focus();
				}else if(kCode=="40"){
					if(!_this.find(".select_combo_box a:focus").length){
						_this.find(".select_combo_box a").eq(0).focus();
						temp = _this.find(".select_combo_box a:focus");
						e.preventDefault();
						return;
					}
					if(_this.find(".select_combo_box a:focus").parent().index() == _this.find(".select_combo_box a").length-1){
						e.preventDefault();
						return;
					}
					temp.parent().next().find("a").focus();
				}else if(kCode == "9"){
					close_lsn();
				}
				e.preventDefault();
			};
		});
	};
	
	$(".select_combo_2015").selectCombo_2015();
	
	/*gnb*/
	$.fn.gnb_2015 = function(){		
		return $(this).each(function(){			
			var $this = $(this);			
			var aLen = $this.find('>li').size();
			
			$this.find('>li>h3>a').bind('focusin mouseenter',function(){
				if($(this).hasClass("btn_gnb_search")) return;
				
				$(this).closest('li').siblings('li').css('z-index',0).end().css('z-index','9950');
				$this.find('div.dep2').hide();
				$('>li>h3>a.on',$this).removeClass('on');
				$(this).addClass('on');
				if($(this).parent().next().size() > 0){	
					$(this).parent().next().show();
				}
			});
			$this.find('>li:not(.search)').bind('mouseleave',function(){
				$('div.dep2',$this).hide();
				$('>h3>a',this).removeClass('on');								
				$(this).css('z-index','0');
			});
			$this.find('>li>h3>a').bind('focusout',function(){
				$('>li>h3>a.on',$this).removeClass('on');
			});
			$this.find('>li').eq(aLen-1).find('>h3>a').bind('focusin',function(){
				$this.find(".dep2").hide();
			});
		});
	};
	$('.gnbWrap_2015 #gnb_2015').gnb_2015();
	
	
	/*snb search*/
	$.fn.gnb_search = function(){
		var _this = $(this);
		var target = $(this).parent().siblings("#search_container_2015");
		var eff = 'easeInExpo';
		
		target.find(".tab_search").focus();
		$(this).bind('click',function(e){
			_this.parent().parent().css("z-index","9999");
			target.slideDown(700,eff);

			e.preventDefault();
		});
		target.find(".btn_close").bind('click focusout',function(){
			target.slideUp(700,eff);
			_this.parent().css("z-index","0");
			_this.focus();
		});
		
		$(window).resize(resize_lsn);
		
		function resize_lsn(){
			var w = $(window).width();
			var tleft;
			if(w <= 1000){
				tleft = 1000 -200;
			}else{
				tleft = w - 200;
			}
			if(tleft>1400){
				tleft = w/2 + (980/2) + 100;
			}
			target.find(".btn_close").css("left",tleft);
		}
		resize_lsn();
		target.find(".radio_list").find("input[type=radio]").bind("click",radio_check_skin);
		
		function radio_check_skin(){
			target.find(".radio_list").removeClass("on")
			$(this).parent().addClass("on");
			
			target.find(".select_info").css("display","none");
			$(this).parent().parent().siblings(".select_info").css("display","block");
		};
	};
	$(".btn_gnb_search").gnb_search();
	
	/*snb*/
	$.fn.snb_2015 = function(){
		var _this = $(this);
		
		//서브 높이 맞추기
		$(".cate_sub", this).each(function(idx){

			var snb_type = "normal";
			$(this).css("display","block");
			var sp = 5;
			if(_this.hasClass("biz_type")){
				sp = 5;
				snb_type= "biz";
			}
			if(_this.hasClass("cert_type")){
				snb_type = "cert";
			}
			var list = $(this).find(">ul>li");
			var temp_arr = [0];
			var temp_sp = 0;

			list.each(function(n){
				var h = $(this).height();
				if(temp_arr[temp_sp] < h) {
					temp_arr[temp_sp] = h;
				}
				if(n%sp == sp-1){
					temp_arr.push(0);
					temp_sp++;
				};
			});

			temp_sp = 0;
			list.each(function(n){
				$(this).height(temp_arr[temp_sp]);
				if(n%sp == sp-1){
					temp_sp++;
					if(sp == 4 && snb_type=="normal"){
						//$(this).css("padding-right","30px");
					}
				}
				if(n%sp == 0 && sp == 4 && snb_type=="normal"){
					//$(this).css("padding-left","30px");
				}
			});
			$(this).find('ul').outerHeight($(this).innerHeight())
			$(this).css("display","none");
		});
		//높이 맞추기 끝
		
		var _other_menu;
		if(_this.siblings(".other_snb_2015").length){
			_other_menu = _this.siblings(".other_snb_2015").detach();
			_other_menu.bind('focusin mouseenter',function(){
				$(this).parents(".cate_sub").css("display","block");
				var idx = $(this).parent().parent().index();
				if($(this).parents(".cate_sub").length){
					$("#RENO_2015 .headerWrap").addClass("bg_white");
				}
				active_menu(idx);
				
			});
			_other_menu.bind('focusout mouseleave',function(){
				$(this).parents(".cate_sub").css("display","none");
				active_menu(nav_on_idx);
			});
			
			_this.append(_other_menu);
		};

			_this.bind('focusout', function() {/*접근성수정 1+*/
			setTimeout(function() {
				if (!$(':focus').closest('#snb_2015' ).length) {
					_this.find('.cate_sub').hide();
				}
			}, 150);
		});
		
        var isSnbView = false;
        var timeTarget;
        var setTimeVar ;
		$('.cate',this).each(function(){
			$('> a',this).bind('focusin mouseenter',function(){
                
                _this.find('.cate_sub').hide();/*접근성수정 2+*/
				timeTarget = $(this);
                if(isSnbView){
                    viewTimeSnb();
                }else{
                    setTimeVar = setTimeout(viewTimeSnb,150);
                }
				
			});

			$('> a',this).bind('focusout',function(){/*접근성수정 3*/
				isSnbView = true;
                clearTimeout(setTimeVar);
			});

            _this.bind('mouseleave',function(){
                isSnbView = false;
                clearTimeout(setTimeVar);
            });

			$('> a',this).bind('mouseleave',function(){				
				view_cate_sub();
				active_menu(nav_on_idx);
				$("#RENO_2015 .headerWrap").removeClass("bg_white");
				view_cate_sub();
			});

			$('> .cate_sub > ul , > .cate_sub > .other_box',this).bind('focusin mouseenter',function(){
				var idx = $(this).parent().parent().index();
				active_menu(idx);
				$("#RENO_2015 .headerWrap").addClass("bg_white");
				view_cate_sub(idx);
			});
			$('> .cate_sub > ul , > .cate_sub > .other_box',this).bind('mouseleave',function(){	
				active_menu(nav_on_idx);
				$("#RENO_2015 .headerWrap").removeClass("bg_white");
				view_cate_sub();
			});
		});
        
		function view_cate_sub(tn){
			_this.find(".cate_sub").each(function(){
				if(tn !=null){
					var n = $(this).parent().index();
					if(tn == n){
						$(this).css("display","block");
					}else{
						$(this).css("display","none");
					};
						
				}else{
					$(this).css("display","none");
				}
			})
		};
		
        function viewTimeSnb(){
            if(!isSnbView){
                isSnbView = true;
                timeTarget.siblings(".cate_sub").fadeIn(300);
            }else{
                timeTarget.siblings(".cate_sub").css("display","block");
            }
            
            var idx = timeTarget.parent().index();
            if(timeTarget.siblings(".cate_sub").length){
                $("#RENO_2015 .headerWrap").addClass("bg_white");
            }
            active_menu(idx);

            /* 공인인증센터 보조메뉴 */
            if(timeTarget.siblings(".cate_sub").length && _other_menu !=null){
                timeTarget.siblings(".cate_sub").append(_other_menu);
                _other_menu.css("display","block");
            }
        }
        
		var nav_on_idx = $(this).find(".cate a.activated").parent().index();
		
		function active_menu(idx){
			_this.find('.cate').each(function(index){
				$(this).find(">a").removeClass("activated");
				if(index == idx){
					$(this).find(">a").addClass("activated");
				}
			});

		};
		function resize_cate_sub(){
			$(".cate_sub", _this).each(function(idx){
				var w = $(window).width();
				var sw = 980;
				$(this).width(w).css("left",-($(this).width() - sw)/2);
			});
			
			$(".other_snb_2015").css("left",$(window).width()/2 + 230);
		};
		$(window).resize(resize_cate_sub);
		resize_cate_sub();
	};
	$('#snb_2015').snb_2015();

		
	/*lnb*/
	$.fn.lnb_2015 = function(){
		return $(this).each(function(){
			var $this = $(this);
			var aLen = $this.find('a').length;	
			
			$('>li:last-child',this).addClass("last");
			
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
				
				var athis = $(this);
				if($(this).find("ul").length){
					$('>a',this).addClass('instance');
				}
			})
			.bind('mouseleave',function(){
				$('>li.on li.on',$this).removeClass('hold');
				$('>a',this).removeClass('instance');
				$(this).find('ul').hide()
			})
			.each(function(){$(this).find('li').last().addClass('last')})						
		});
	};
	$('.lnb').lnb_2015();
	
	/*toggle view*/
	$.fn.toggle_view_2015 = function(){
		return $(this).each(function(){
			var _this = $(this);
			_this.find(".btn_more").bind("click",function(e){
				$(".money_ban").css("display","none");
				$(".money_rate_detail").css("display","block");
				e.preventDefault();
			});
			_this.find(".btn_close").bind("click",function(e){
				$(".money_ban").css("display","block");
				$(".money_rate_detail").css("display","none");
				e.preventDefault();
			});
		});
	};
	$(".money_rate_2015").toggle_view_2015();
	
	/* all menu link */
	window.change_link_2015 = function(link,target){
		window.location.href = link;
	};
});