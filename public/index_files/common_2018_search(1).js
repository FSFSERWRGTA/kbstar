/***********************************************
* 온로드 실행 함수
************************************************/
;(function($){
	$(function() {

		var totalSearch = (function(){
			var wrapper = '.ui-search-auto',
			search_str = wrapper + ' .input-holder input[type="text"]',
			search_flag1 = wrapper + ' input[name="auto_flag"]',
			search_flag2 = wrapper + ' input[name="auto_save"]',
			search_select = wrapper + ' .area-auto .list a',
			btn_close = wrapper + ' .ui-close',
			btn_reset = wrapper + ' .btn-icon1.ic4',
			btn_submit = wrapper + ' .btn-icon1.ic3';

			return {
				init: function(){
					var self = this;

					$('.ui-search-auto').attr("data-search", "auto");
					$('.ui-search-auto').attr("data-search-auto", "on");
					$('.ui-search-auto').attr("data-search-save", "on");
					$('.ui-search-auto').attr("data-search-mode", "1");

					//검색어입력필드
					$(search_str)
						.live('focus', function(ev){
							//ev.preventDefault();
							self.showArea();
						})
						.live('focus keyup', function(ev){
							//ev.preventDefault();
							if($(this).val()) $(wrapper).attr('data-search-mode', '2');
							else $(wrapper).attr('data-search-mode', '1');
						});

					//자동완성 ON/OFF
					$(search_flag1).live('click',function(){
						$(wrapper).attr('data-search-auto', $(this).val());
					});

					//자동저장 ON/OFF
					$(search_flag2).live('click',function(){
						$(wrapper).attr('data-search-save', $(this).val());
					});

					//닫기버튼
					$(btn_close).live('click',function(){
						self.hideArea();
					});

					//초기화버튼
					$(btn_reset).live('click',function(){
						$(search_str).val('');
						//self.hideArea();
					});

					//자동완성 추천검색어 선택
					$(search_select).live('click',function(){
						$(search_str)
							.addClass('valueon')
							.val($(this).text());
						self.hideArea();
					});

					//PLADEHOLDER 기능
					$('#gnb_2015 .input-holder input').each(function(){
						if($(this).val()!=""){
							$(this).addClass("valueon");
							$(this).parents('.input-holder').addClass('del-on');
						}
						else{
							$(this).removeClass("valueon");
							$(this).parents('.input-holder').removeClass('del-on');
						}
					});

					$('#gnb_2015 .input-holder input')
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
						$('[aria-describedby="'+$(this).attr('id')+'"]').focus();
					});
				},
				chgMode : function(modevalue){

				},
				showArea: function(ev){
					$(wrapper).addClass('active');
				},
				hideArea : function(){
					$(wrapper).removeClass('active');
				}
			};
		}());

		totalSearch.init();

	});
})(jQuery);