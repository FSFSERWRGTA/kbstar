// 전체 스크립트 엄격 모드 구문
'use strict';

//즉시 실행
(function(w) {

  //ie11 관련 Array 노드 적용
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  if (!Object.fromEntries) {
    Object.fromEntries = function (obj) {
      var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array

      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }

      return resArray;
    };
  };

  // Production steps of ECMA-262, Edition 5, 15.4.4.19
  if (!Array.prototype.map) {

    Array.prototype.map = function(callback, thisArg) {

      var T, A, k;

      if (this == null) {
        throw new TypeError(' this is null or not defined');
      }

      // 1. Let O be the result of calling ToObject passing the |this|
      //    value as the argument.
      var O = Object(this);

      // 2. Let lenValue be the result of calling the Get internal
      //    method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;

      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 1) {
        T = thisArg;
      }

      // 6. Let A be a new array created as if by the expression new Array(len)
      //    where Array is the standard built-in constructor with that name and
      //    len is the value of len.
      A = new Array(len);

      // 7. Let k be 0
      k = 0;

      // 8. Repeat, while k < len
      while (k < len) {

        var kValue, mappedValue;

        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal
        //    method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {

          // i. Let kValue be the result of calling the Get internal
          //    method of O with argument Pk.
          kValue = O[k];

          // ii. Let mappedValue be the result of calling the Call internal
          //     method of callback with T as the this value and argument
          //     list containing kValue, k, and O.
          mappedValue = callback.call(T, kValue, k, O);

          // iii. Call the DefineOwnProperty internal method of A with arguments
          // Pk, Property Descriptor
          // { Value: mappedValue,
          //   Writable: true,
          //   Enumerable: true,
          //   Configurable: true },
          // and false.

          // In browsers that support Object.defineProperty, use the following:
          // Object.defineProperty(A, k, {
          //   value: mappedValue,
          //   writable: true,
          //   enumerable: true,
          //   configurable: true
          // });

          // For best browser support, use the following:
          A[k] = mappedValue;
        }
        // d. Increase k by 1.
        k++;
      }

      // 9. return A
      return A;
    };
  }

  // Production steps of ECMA-262, Edition 5, 15.4.4.14
  // Reference: https://es5.github.io/#x15.4.4.14
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
      "use strict";
      var k;

      // 1. Let o be the result of calling ToObject passing
      //    the this value as the argument.
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let lenValue be the result of calling the Get
      //    internal method of o with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = o.length >>> 0;

      // 4. If len is 0, return -1.
      if (len === 0) {
        return -1;
      }

      // 5. If argument fromIndex was passed let n be
      //    ToInteger(fromIndex); else let n be 0.
      var n = fromIndex | 0;

      // 6. If n >= len, return -1.
      if (n >= len) {
        return -1;
      }

      // 7. If n >= 0, then Let k be n.
      // 8. Else, n<0, Let k be len - abs(n).
      //    If k is less than 0, then let k be 0.
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 9. Repeat, while k < len
      for (; k < len; k++) {
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the
        //    HasProperty internal method of o with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        //    i.  Let elementK be the result of calling the Get
        //        internal method of o with the argument ToString(k).
        //   ii.  Let same be the result of applying the
        //        Strict Equality Comparison Algorithm to
        //        searchElement and elementK.
        //  iii.  If same is true, return k.
        if (k in o && o[k] === searchElement)
          return k;
      }
      return -1;
    };
  }

  /**
   * 빈값 여부 체크
   * @param str
   * @returns {boolean}
   */
  function isEmpty(str) {
    return typeof str === "undefined" || str === null || str === "";
  }

  /**
   * Map to Object Convert
   * @param inputMap
   * @returns {{}}
   */
  function mapToObj(inputMap) {
    let obj = {};
    inputMap.forEach(function(value, key){
      obj[key] = value
    });
    return obj;
  }

  var configMap = new Map();
  var setMap = new Map();
  var userSetMap = new Map();
  var eventSetMap = new Map();
  var linkSetMap = new Map();
  var searchKeyword = '';
  var _sendMethod = '';
  var _sendTimeout = 0;

  /**
   * 쿠키 정보 생성 요청
   * @param key
   * @param value
   * @param expiredDay
   */
  function setCookie(key, value, expiredDay) {
    var expired = new Date();
    expired.setTime(expired.getTime() + (expiredDay * 24 * 60 * 60 * 1E3));
    var cookieValue = encodeURIComponent(value) + '; path=/' + ((isEmpty(expiredDay)) ? '' : '; ' + 'expires=' + expired.toUTCString());
    document.cookie = key + '=' + cookieValue;
  }

  /**
   * 세션정보 저장 쿠키 생성
   * @param key
   * @param value
   * @param expiredMinute
   */
  function setSessionCookie(key, value, expiredMinute) {
    var expired = new Date();
    expired.setTime(expired.getTime() + (expiredMinute * 60 * 1E3));
    var cookieValue = encodeURIComponent(value) + '; path=/' + ((isEmpty(expiredMinute)) ? '' : '; ' + 'expires=' + expired.toUTCString());
    document.cookie = key + '=' + cookieValue;
  }

  /**
   * 쿠키 정보 요청
   * @param cname
   * @returns {string}
   */
  function getCookie(key) {
    var name = key + '=';
    var cookieData = document.cookie;
    var cStart = cookieData.indexOf(name);
    var value = '';
    if(cStart !== -1){
      cStart += name.length;
      var cEnd = cookieData.indexOf(';', cStart);
      if (cEnd === -1) cEnd = cookieData.length;
      value = cookieData.substring(cStart, cEnd);
    }
    return decodeURIComponent(value);
  }

  /**
   * 쿠키 정보 삭제 요청
   * @param key
   */
  function deleteCookie(key, value){
    setCookie(key,value, -1);
  }

  /**
   * sessionId 생성
   */
  /*function getSessionId() {
    var ma_date = new Date();
    var ma_timestamp = ma_date.getTime();
    if (isEmpty(getCookie('m_suid'))) {
      setSessionCookie('m_suid',ma_timestamp,30);
    } else {
      ma_timestamp = getCookie('m_suid');
      setSessionCookie('m_suid',ma_timestamp,30);
    }
    return getCookie('m_suid');
  }*/

  function setSearchKeyword(keyword) {
    searchKeyword = keyword
    event('search', '', '', '')
  }
  //EventTag 함수 구현
  //자동 수집 이벤트 및 추천 이벤트
  //eventLabel optional
  function event( eventType, eventCategory, eventLabel, eventAttribute ) {
    //"_m_analytics_off"이 존재할 경우, 수집서버 off
    if( !isEmpty(getCookie("_m_analytics_off")) ){
      return; //수집서버 off
    }

    if (configMap.has('client_id')) {
      var params = getDefaultLog();
      params = params + '&user_attribute=' + encodeURIComponent(JSON.stringify(mapToObj(userSetMap)));
      params = params + '&event_type=' + encodeURIComponent(eventType);
      params = params + '&event_category=' + encodeURIComponent(eventCategory);
      params = params + '&event_label=' + encodeURIComponent(eventLabel);
      // 개별 설정된 검색 키워드가 있을 경우
      if (eventType == 'search' && searchKeyword != '') {
        params = params + '&search_term=' + encodeURIComponent(searchKeyword);
      } else {
        params = params + '&search_term=' + encodeURIComponent(decodeURIComponent(getSearchParam(location.search)));
      }
      params = params + '&_oaid=' + encodeURIComponent(decodeURIComponent(getCookie('_wp_uid')));
      /*var regex = new RegExp('(first_visit|session_start|scroll|click|file_download|view_search_results)');
      /!* 자동 수집 이벤트 여부 확인 *!/
      if (regex.test(eventType)) {

      } else {

      }*/
      //기본설정값 최초 Event Map에 저장
      setMap.forEach(function(value, key) {
        eventSet(key,value);
      });

      if(typeof eventAttribute == "string" && eventAttribute!=""){  var eventAttributeObj = JSON.parse(eventAttribute); for (var key in eventAttributeObj) { eventSet(key,eventAttributeObj[key]);} }
      else { for (var key in eventAttribute) { eventSet(key,eventAttribute[key]); }  }

      params = params + '&event_attribute=' + encodeURIComponent(JSON.stringify(mapToObj(eventSetMap)));
      eventSetMap.clear();

      if((typeof w.tg360_tag_script!= "undefined") && (w.tg360_tag_script._sendMethod === "api" || w.tg360_tag_script._sendMethod === "API" )){
        loadLogScriptXhr(params);
      }else{
        loadLogScript(params);
      }

    } else {
      console.log('client_id 값이 설정되지 않았습니다.');
    }
  }

  /**
   * 문자열이 url 정보인지 여부 확인
   * @param url
   * @returns {string|*}
   */
  function isUrl(url) {
    var regExp = new RegExp(/(http(s)?:\/\/|www.)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi);
    return regExp.test(url);
  }

  /**
   * url에서 파일 확장자 포함 여부 확인
   * @param url
   * @returns {boolean}
   */
  function isFileExtension(url) {
    var fileRegexp = new RegExp('\\.(pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma)$');
    var extension = url.substring(url.lastIndexOf('.'), url.length);
    return fileRegexp.test(extension);
  }

  /**
   * a link 클릭시 실행 함수
   * 파일 확장자 및 타 사이트로 이동 여부 확인
   * 도메인 정보를 통하여 이탈 클릭 OR 파일 다운로드 이벤트 판별
   * link url이 파일 정보를 가지고 있는 여부를 확인 후 이탈여부를 확인한다.
   * @param event
   */
  function linkEvent(e) {
    //이벤트 중지 제거 필요
    var link = e.target;

    //domain 정보 확인
    if (isUrl(link.href)) {
      //url 문자열에 파일 확장자가 포함된경우
      linkSetMap.set('link_classes',link.className);
      linkSetMap.set('link_domain',new URL(link.href).host);
      linkSetMap.set('link_id',link.id);
      linkSetMap.set('link_text',link.text);
      linkSetMap.set('link_url',link.href);
      if (isFileExtension(link.href)) {
        linkSetMap.set('file_extension',link.href.substr(link.href.lastIndexOf('.')+1,link.href.length));
        linkSetMap.set('file_name',link.href.substring(link.href.lastIndexOf('/')+1,link.href.lastIndexOf('.')));
        //파일 다운로드 로그 실행
        event('file_download','','', mapToObj(linkSetMap));
      } else {
        //1.url 문자열에 파일 확장자가 포함되지않은경우
        //2.location url 이 a link url 의 domain 정보가 다른경우 이탈
        var domain = new URL(link.href);
        if (document.location.host !== domain.host) {
          linkSetMap.set('outbound','true');
          //이탈 로그 실행
          event('click','','', mapToObj(linkSetMap));
        }
      }
    }
  }

  /**
   * clientId 설정 config
   * @param key
   * @param value
   */
  function config(key, value) {
    configMap.set(key, value);
  }

  /**
   * 추가적인 설정 정보
   * @param key
   * @param value
   */
  function set(key, value) {
    setMap.set(key, value);
  }

  /**
   * 사용자 설정 정보
   * @param key
   * @param value
   */
  function userSet(key, value) {
    userSetMap.set(key, value);
  }

  /**
   * 사용자 연령대 설정 정보
   * @param key
   * @param value
   */
  function userAgeToRangeSet(key, value) {
    var aGroup = "a99";
    if(14 <= value && value <=19){aGroup = "a10";}
    else if(20 <= value && value <=24) {aGroup = "a20";}
    else if(25 <= value && value <=29) {aGroup = "a25";}
    else if(30 <= value && value <=34) {aGroup = "a30";}
    else if(35 <= value && value <=39) {aGroup = "a35";}
    else if(40 <= value && value <=44) {aGroup = "a40";}
    else if(45 <= value && value <=49) {aGroup = "a45";}
    else if(50 <= value && value <=54) {aGroup = "a50";}
    else if(55 <= value && value <=59) {aGroup = "a55";}
    else if(60 <= value && value <=65) {aGroup = "a60";}

    userSetMap.set(key, aGroup);
  }

  /**
   * 설정값과 이벤트 값의 중복 제거를 위한 임시 사용 Map
   * @param key
   * @param value
   */
  function eventSet(key, value) {
    eventSetMap.set(key, value);
  }

  /**
   * url 주소 기준으로 search 파라미터 값을 기준으로 검색어 추출
   * @param url
   * @returns {string}
   */
  function getSearchParam(url) {
    var paramRegexp = new RegExp('^(q|s|search|query|keyword|searchWord)$');
    //var url = '?searchWord=%ED%85%8C%EC%8A%AC%EB%9D%BC&etag1=002_A002_E093&etag2=0&etag3=0&etag4=501';
    var resultValue = '';
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      if (paramRegexp.test(key)){
        resultValue = value;
      }
    });
    return resultValue;
  }

  /**
   * 세션 시작 시간 및 세션 아이디값을 설정 한다.
   * @param key
   * @param value
   * @param minitue
   */
  function sessionCookie(key, value, minitue) {
    var cookie = getCookie(key);
    if (isEmpty(cookie)) {
      setSessionCookie(key,value,minitue);
    } else {
      setSessionCookie(key,cookie,minitue);
    }
  }

  /**
   * 기본 수집 parameter 설정
   * @returns {string}
   */
  function getDefaultLog() {

    var sessionTime = new Date().getTime();
    //세션 아이디값 설정
    sessionCookie('m_sid','|' + sessionTime, 30);
    sessionCookie('m_s_start',sessionTime, 30);

    var params = '?';
    configMap.forEach(function(value, key) {
      if (key === 'client_id') {
        params = params + 'client_id=' + encodeURIComponent(value);
      }
    });

    configMap.forEach(function(value, key) {
      if (key === 'isCookie') {
        params = params + '&isCookie=' + encodeURIComponent(value);
      }
    });

    if (configMap.has('page_location') && configMap.has('page_referrer')) {
      configMap.forEach(function(value, key) {
        if (key === 'page_location') {
          params = params + '&page_location=' + encodeURIComponent(value);
        } else if (key === 'page_referrer') {
          params = params + '&page_referrer=' + encodeURIComponent(value);
        }
      });
    } else {
      params = params + '&page_location=' + encodeURIComponent(document.location);
      params = params + '&page_referrer=' + encodeURIComponent(document.referrer);
    }
    params = params + '&session_id=' + encodeURIComponent(getCookie('m_sid'));
    params = params + '&session_start=' + encodeURIComponent(getCookie('m_s_start'));
    params = params + '&language=' + encodeURIComponent(navigator.language.split('-')[0]);
    params = params + '&country=' + encodeURIComponent(navigator.language.split('-')[1]);
    params = params + '&page_title=' + encodeURIComponent(document.title);
    params = params + '&screen_resolution=' + encodeURIComponent(w.screen.width + 'X' + w.screen.height);
    params = params + '&_m_uid=' + encodeURIComponent(getCookie('_m_uid'));

    return params;
  }

  /**
   * provider api 서버 호출
   * @param params
   */
  function loadLogScript(params) {
    var tagUrl = 'https://wan.kbdmp.com/provider';
    var onScript = document.createElement('script');
    onScript.setAttribute('id','tg360degree');
    onScript.src = tagUrl + params;
    onScript.async = true;
    document.getElementsByTagName('head')[0].appendChild(onScript);

    onScript.addEventListener("load", function(event) {
      // TG360(WP) Cookie sync
      var TG360_COOKIE_KEY = '_M_CS[T]';
      if (isEmpty(getCookie(TG360_COOKIE_KEY))) {
        var syncUrl = "https://altg.widerplanet.com/delivery/moleculeid?dest=";
        syncUrl += encodeURIComponent("https://wan.kbdmp.com/cookiesync?nid=tg360&uid={OAID}");

        var onImg = document.createElement('img');
        onImg.src = syncUrl;
        onImg.setAttribute('style', "display:none;");
        document.body.appendChild(onImg);

        setCookie(TG360_COOKIE_KEY, 1, 7);
      }
    });

  }
  function loadLogScriptXhr(params){
    var tagUrl = 'https://wan.kbdmp.com/provider';
    var xhr = new XMLHttpRequest();

    xhr.open('GET', tagUrl + params, true);

    if((typeof w.tg360_tag_script!= "undefined") && (w.tg360_tag_script._sendTimeout > 0 )){ xhr.timeout = w.tg360_tag_script._sendTimeout;}
    else{ xhr.timeout = 3000;}

    xhr.onload = function(){
      //console.log("DMP provider ok");
    }
    xhr.ontimeout = function(){
      //console.log("DMP provider Timeout");
    }
    xhr.withCredentials = true;

    xhr.send();
  }

  /**
   * 기본 정보 수집 실행
   */
  function init() {
    if (configMap.has('client_id')) {
      event('page_view', '', '', '');
    }
  }

  function setSendMethod(m){
    w.tg360_tag_script._sendMethod = m;
  }
  function setTimeout(t){
    if(typeof t == 'number'){
      setSendMethod('api');
      w.tg360_tag_script._sendTimeout = t;
    }
  }
  function init_app(t) {

    if(typeof t == 'number'){ setTimeout(t); }
    else{ setTimeout(3000)}

    if (configMap.has('client_id')) {
      event('page_view', '', '', '');
    }
  }

  /**
   * script 정의   * @type {{init: init, set: set, event: event, config: config, userSet: userSet}}
   */
  w.tg360_tag_script = {
    //설정 매개변수
    config: config,
    set: set,
    userSet: userSet,
    userAgeToRangeSet: userAgeToRangeSet,
    event: event,
    setSearchKeyword: setSearchKeyword,
    //실행
    init: init,
    sendMethod: setSendMethod,
    timeout: setTimeout,
    init_app: init_app
  }

  if (!w.ma) {
    w.ma = w.tg360_tag_script;
  }

  //--------------------------------------------------------------------
  var aTagNodeList;
  document.onreadystatechange = function () {

    if (document.readyState === 'loading') {

    }

    if (document.readyState === 'interactive') {

    }

    if (document.readyState === 'complete') {

      /**
       * 쿠키 삭제
       * scroll로 인한 컨텐츠 정보 조회 결과 초기화
       */
      deleteCookie('m_contents','true');

      /**
       * a link 클릭 이벤트 기능 추가
       * 이탈 link click Event 함수 구현
       * 파일다운로드 link click Event 함수 구현
       * (pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma)
       * @type {NodeListOf<HTMLElementTagNameMap[string]>}
       */
      aTagNodeList = document.querySelectorAll('a');
      aTagNodeList.forEach(function(alink) {
        alink.addEventListener('click', linkEvent, {
        });
      });

      /**
       * scroll 컨텐츠 이벤트 체크
       */
      document.addEventListener('scroll', function(){
        var height = document.documentElement.scrollHeight;
        var top = document.documentElement.scrollTop;
        var scroll = height * 80 / 100;

        if (scroll > top) {
          if (isEmpty(getCookie('m_contents'))) {
            setCookie('m_contents','true',1);
            event('scroll','','','');
          }
        }
      });
    }

  }

  //로그 확인
  function log(message) {
    console.log(message);
  }
})(window);
