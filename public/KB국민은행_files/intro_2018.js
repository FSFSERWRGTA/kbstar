/* *************************************************************
* 강제세션종료 - www.kbstar.com 도메인에서 호출할때만 기존처럼 초기화
************************************************************* */
if( document.domain.indexOf("www.kbstar.com") > 0 )
{
	document.cookie = 'QSID=; path=/ ; domain=kbstar.com;expires=Fri, 31 Dec 1999 23:59:59 GMT;';
	document.cookie = 'SID =; path=/ ; domain=kbstar.com;expires=Fri, 31 Dec 1999 23:59:59 GMT;';
}

/* *************************************************************
* 뱅크타운
************************************************************* */
var simple_page = null;

function go_simple(str) {
	if (simple_page !== null) {
		simple_page.close();
		setTimeout('dowin(' + str + ')', 1000);
	} else {
		dowin(str);
	}
}

function dowin(str) {
	simple_page = window.open('', 'newopen', 'width=665,height=510,top=30,left=30,scrollbars=yes,resizable=no');

	document.simple_page.open_next_page.value = str;
	document.simple_page.target = "newopen";
	document.simple_page.submit();
}

/* *************************************************************
* POP NOTICE
************************************************************* */
//쿠키설정
function setOpenCookie(name, value, expiredays) {
	var today = new Date();
	today.setDate(today.getDate() + expiredays);
	document.cookie = name + '=' + escape(value) + '; domain=kbstar.com; path=/; expires=' + today.toGMTString() + ';';
}

//X일간 닫음 쿠키값 세팅
function setWWWOpenCookie(name, value, expiredays) {
  var today = new Date();

  today.setDate(today.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) + '; domain=www.kbstar.com; path=/; expires=' + today.toGMTString() + ';';
}

//X일간 닫음 쿠키값 가져오기
function getWWWCookie(name) {
  value = document.cookie.match(new RegExp(name + '=([^;]+)'));
  if(value) return value[1];
}

//X일간 팝업창 닫음
function closeOpenPopupWin(popupId,cookieName,notOpenToday) {
	// noOpenToday가 0이아니면  쿠키설정
	if (notOpenToday !== 0) {
		// 체크박스가 체크되었을때만 쿠키저장.
		if ($('#checkbox_' + popupId).attr('checked') === 'checked') {
			//setOpenCookie(cookieName, "checked", notOpenToday);
			setWWWOpenCookie(cookieName, "checked", notOpenToday);
		}

		$('#pid_' + popupId).remove();
	} else {
		$('#pid_' + popupId).remove();
	}
}

/* *************************************************************
* 빠른메뉴 가계부
************************************************************* */
function moneybook() {
	if (!$.browser.msie) {
		alert('MS 윈도우즈 익스플로러 환경에서 이용하실 수 있습니다.');

		return;
	} else {
		var popWin = window.open('https://omoney.kbstar.com/quics?page=C019315&amp;QSL=F', 'book_popup', 'scrollbars=yes,width=960,height=740,left=0,top=0');

		popWin.focus();
	}
}

/* *************************************************************
* 새창 여는 함수(scrollbars=yes)
************************************************************* */
function openPopup(url, tit, w, h) {
	openWin(url, tit, w, h);
}

function openWin(url, winName, sizeW, sizeH) {
	var nLeft = screen.width/2 - sizeW/2 ;
	var nTop  = screen.height/2 - sizeH/2 ;
	var popWinName = winName.replace(/ /gi, '');

	opt = ',toolbar=no,menubar=no,location=no,status=no,scrollbars=yes';
	window.open(url, popWinName, 'left=' + nLeft + ',top=' +  nTop + ',width=' + sizeW + ',height=' + sizeH  + opt);
}

/* *************************************************************
 * 통합검색 : 폼 서브밋
 ************************************************************* */
function TopTotalSearchFormSearch() {
	var form=document.TopTotalSearchForm;
	var srh_word = removeSChar(form.검색어.value);

	if (srh_word === '' || srh_word === '검색어를 입력하세요') {
		alert('검색할 단어를 입력하여 주십시오.');

		return;
	}

	form.검색어.value = srh_word;
	form.submit();
}

/* *************************************************************
 * 통합검색 : 문자열
 ************************************************************* */
function removeSChar(str) {
	var s = ["[" , "'" , "\\" , '"'  , "#" , "(" , ")" , "@" , ";" , "=" , "*"  ,"+" , "]" ,"<" ,">"] ;

	for (var i=0, len = s.length; i < len; i++) {
		str =  str.split(s[i]).join('');
	}

	return str;
}

/* *************************************************************
 * 통합검색 : 폼체크
 ************************************************************* */
function valCheck(valueId) {
	var isNotEmpty = false;
	var chkValue = $(valueId).val();

	if ($.trim(chkValue) === '') {
		alert('검색할 단어를 입력하여 주십시오.');
		$(valueId).focus();
	} else {
		isNotEmpty = true;
	}

	return isNotEmpty;
}

/* *************************************************************
 * 통합검색 : 인기어 클릭 시
 ************************************************************* */
function search(pword) {
	var form=document.TopTotalSearchForm;
	$('#TopTotalSearchForm #검색어').addClass("valueon");
	form.검색어.value = removeSChar(pword);
	TopTotalSearchFormSearch();
}

/* *************************************************************
 * 통합검색 : 지점안내
 ************************************************************* */
function goBranchInq(valUrl, valueId, selectId) {
	var form = document.gnbBranchSearchForm;

	if (valCheck(valueId)) {
		if ('C016505' === valUrl) {
			form.gnbSearchData1.value = $(valueId).val();
		} else if ('C016506' === valUrl) {
			form.gnbSearchData2.value = $(valueId).val();
		}

		form.선택검색번호.value = $(selectId).val();
		form.action = 'https://obank.kbstar.com/quics?page=' + valUrl+'&amp;QSL=F';
		form.submit();
	} else {
		return;
	}
}

/* *************************************************************
 * 통합검색 : 통합검색 레이어 열기
 ************************************************************* */
function searchOpen(){
	$('.wrapAll').addClass('on-search');
	$("#search_container_2018").addClass('open');
}

/* *************************************************************
 * 통합검색 : 통합검색 레이어 닫기
 ************************************************************* */
function searchClose() {
	$('.wrapAll').removeClass('on-search');
	$("#search_container_2018").removeClass('open');
	$('#headArea a[href="#search_container_2018"]').focus();
}

/* *************************************************************
 * 통합검색 : 기본UI
 ************************************************************* */
$(function() {
	//통합검색 열기버튼 이벤트 설정
	$('#headArea a[href="#search_container_2018"]').live('click',function(ev){
		ev.preventDefault();
		searchOpen();
	});

	//통합검색 닫기버튼 이벤트 설정
	$('#headArea #search_container_2018 .ui-close').live('click',function(ev){
		ev.preventDefault();
		searchClose();
	});

	//PLADEHOLDER 기능
	$('.input-holder input, .input-holder textarea')
		.live('focus', function(){
			$(this).addClass("valueon");
		})
		.live('blur', function(){
			if($(this).val()=="") $(this).removeClass("valueon");
			else $(this).addClass("valueon");
		})
		.live('keyup', function(){
			$(this).addClass("valueon");

			if($(this).val()=="") $(this).parents('.input-holder').removeClass('del-on');
			else $(this).parents('.input-holder').addClass('del-on');
		});

		$('.input-holder input').each(function(){
			$(this).attr('aria-describedby',$(this).next('span').attr('id')).attr("autocomplete","off");
		});

	//PLACEHOLDER 텍스트 클릭이벤트
	$('.input-holder > span').live('click', function(){
		if($('[aria-describedby="'+$(this).attr('id')+'"]').length) $('[aria-describedby="'+$(this).attr('id')+'"]').focus();
		else $(this).prev('input').focus();
	});

	//초기화버튼
	$('#TopTotalSearchForm .ui-reset').live('click',function(){
		$(this).parents('fieldset').find('.input-holder').removeClass('del-on');
		$(this).parents('fieldset').find('.input-holder').find('input[type="text"]').val('').focus();
	});

	//검색버튼
	$('#TopTotalSearchForm .ui-submit').live('click',function(){
		TopTotalSearchFormSearch();
	});

	//검색어입력필드 : 엔터처리
	$('#TopTotalSearchForm #검색어').bind('keyup', function(e) {
		if (e.keyCode === 13) { TopTotalSearchFormSearch(); }
	});
});

/* *************************************************************
 * 인증센터 : 개인/기업 
 ************************************************************* */
//<![CDATA[
	$(function() {
		$('.certMenu_2020 .h_cert a').bind('mouseover focus', function(){
			$(this).addClass('on');
			$(this).siblings('.cert_submenu').show();
		})
		$('.certMenu_2020 .h_cert').bind('mouseleave', function(){
			$('.certMenu_2020 .h_cert a').removeClass('on');
			$('.cert_submenu').hide();
		})
		$('.cert_submenu a:last-child').focusout(function(){
			$('.certMenu_2020 .h_cert a').removeClass('on');
			$('.cert_submenu').hide();
		})
		
		$('.certMenu_2020 .h_cert').bind('keydown',function(e){
			if(e.keyCode == 9 && e.shiftKey){
				e.preventDefault();
				$('.cert_submenu').hide();
				$(this).prev().find('a').focus()
			}
		})
	});
//]]>
