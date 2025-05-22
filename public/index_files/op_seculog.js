/*
 ***************************************************************************
 * 통합 설치 페이지
 ***************************************************************************
 */
var _SITE_InstallPage	= "C023664";
if(_SITE_SystemLang == "ENG"){
	_SITE_InstallPage = "C025001";
}else if(_SITE_SystemLang == "CHN"){
	_SITE_InstallPage = "C024999";
}else if(_SITE_SystemLang == "JPN"){
	_SITE_InstallPage = "C025000";
}else{
	_SITE_InstallPage = "C023664";
}
if (document.location.host.indexOf("csw.kbstar.com") > 0) {
	//미니뱅킹 통합설치페이지
	//_SITE_InstallPage = "/quics?page=C025241&P_name=Delfino";
	_SITE_InstallPage = "C025241";
}

var npEfds = {};
npEfds.types = {ALL:1, LOGIN:2, TRANS:3,
	DH_INCA:1, DH_AHNLAB:2, DH_KINGS:3,
	SK_INCA:1, SK_KINGS:3, SK_SOFTCAMP:4, SK_SOFTFORUM:5, 
	USING:1, INSTALL:2, CHECK:3
};

/*
 ***************************************************************************
 * nProtect Efds Configuration
 ***************************************************************************
 */
npEfds.config = {
//	sitehash : "e26d",
	sitehash : "a36de156ff917c29a40f30d4fe8a831fad1b0c61",		//국민은행
	minversion : {
		win : "2010,06,28,01",
		linux : "1.0.0",
		mac : "1.0.1"
	},
	dhack : npEfds.types.DH_INCA,
	secukey : npEfds.types.SK_SOFTCAMP
};

/*
 ***************************************************************************
 * nProtect Efds Policy
 ***************************************************************************
 */
npEfds.policy = {
//	RltvUrlRealIP : "http://www.nprotect.com/v6/log_trans/ipchecker.php",
	RltvUrlRealIP : "https://obank1.kbstar.com/quics?asfilecode=532070",
	Borun : "1",
	TimeOut : "1000",
	ExceptDnsIP : "",
	LanInfoMaxCount : "3",
	UsbInfoMaxCount : "3",
	ForceNatIP : "3",
	SecuPatch : "KB837009,KB887219,KB911562,KB925902",
	installpage : "/quics?page=" + _SITE_InstallPage + "&amp;P_name=SecuLog&amp;QSL=F&amp;url=" + encodeURIComponent(window.location.href),
	pluginsVersion : "2011,10,12,2",	//windows
	pluginsVersionMac : "2011.11.22",	//mac
	isPrUse : "N" //Linux, Mac일경우 이용PC반드시 사용  [Y] : 리눅스, 맥, Win IE 외, [N] : IE   , [M] : 모바일
};

npEfds.package = {
	winpack : {
		iepack : {
			objectid : "npEfdsWCtrl",
			classid : "clsid:63A7D575-8E63-464E-947B-57D5A6773D79",
//			SetupURL : "/slm/app/npEfdsWCtrl.cab#Version=2010,11,26,2",
			UpdateURL : "https://download.kbstar.com/security/nprotect/op_seculog",
			UpdateVersion : "2011,11,23,1|2011,11,24,1|2010.11.10.1",
			UpdateFiles : "npEfdsWPlugin.dll|npLogCollectorw.dll|npEfdsWCtrlUnInst.exe",
			SetupFile : "npEfdsWCtrlSetup.exe",
			//SetupFile : "npEfdsWCtrlSetup_Web.exe",		// 타브라우져의 플러그인은 적용안됨
			HashCharSet : "1",
			width:0,
			height:0
		},
		noneiepack : {
			objecttype : "application/npEfdsWPlugin",
			objectid : "npEfdsPlugin",
//			SetupURL : "https://my.kbstar.com/qcs/openapi/download/security/nprotect/seculog/npEfdsWCtrlSetup.exe",
			SetupURL : "https://download.kbstar.com/security/nprotect/op_seculog/npEfdsWCtrlSetup.exe",
			UpdateURL : "https://download.kbstar.com/security/nprotect/op_seculog",
			UpdateVersion : "2011,11,24,1|2010.11.10.1",
			UpdateFiles : "npLogCollectorw.dll|npEfdsWCtrlUnInst.exe",
			SetupFile : "npEfdsWCtrlSetup.exe",
			//SetupFile : "",
			HashCharSet : "1",
			width:0,
			height:0
		}
	},
	lnxpack : {
		objecttype : "application/x-npefdsplugin",
		objectid : "npEfdsPlugin",
		SetupURL : "",
		UpdateURL : "https://download.kbstar.com/security/nprotect/op_seculog/LogCollector",
		UpdateVersion : "1.0.1",
		UpdateFiles : "libnplc.so",
		SetupFile : "",
		HashCharSet : "2",
		width:0,
		height:0
	},
	macpack : {
		objecttype : "application/x-npefdsplugin",
		objectid : "npEfdsPlugin",
		SetupURL : "",
		UpdateURL : "https://download.kbstar.com/security/nprotect/op_seculog/nplogcollector",
		UpdateVersion : "1.0.2",  //2011.10.18
		UpdateFiles : "nplogcollector",
		SetupFile : "",
		HashCharSet : "1",
		width:0,
		height:0
	}
};
npEfds.define = {
	ie : navigator.appName == 'Microsoft Internet Explorer' || (navigator.appName == "Netscape" && navigator.userAgent.indexOf("Trident") >= 0) && (navigator.userAgent.toLowerCase().indexOf("phone os") < 0),
	ff : (navigator.userAgent.indexOf('Mozilla')==0) && (navigator.appName=='Netscape') && (navigator.userAgent.indexOf('Navigator') > -1)==false && (navigator.userAgent.lastIndexOf('Firefox') > -1),
	ns : (navigator.userAgent.lastIndexOf('Gecko') > -1) && (navigator.userAgent.indexOf('Navigator') > -1),
	sf : (navigator.userAgent.lastIndexOf('Safari') != -1) && (navigator.userAgent.lastIndexOf('Chrome') != -1)==false,
	op : (navigator.userAgent.lastIndexOf('Opera') != -1),
	cr : (navigator.userAgent.match('Chrome') == 'Chrome') && (navigator.userAgent.match('Safari')=='Safari'),
	win : (navigator.platform.toLowerCase().indexOf('win') != -1) && (navigator.userAgent.toLowerCase().indexOf("phone os") < 0),
	win64 : (navigator.platform.toLowerCase().indexOf('win64') != -1),
	win9x : (navigator.userAgent.indexOf('Windows 98')!=-1) || (navigator.userAgent.indexOf('Win98') != -1) || (navigator.userAgent.indexOf('Windows ME') != -1) || (navigator.userAgent.indexOf('Windows NT 4.0') != -1),
	mac : (navigator.userAgent.indexOf('Mac') != -1),
	lnx64 : ((navigator.userAgent.indexOf('Linux') != -1) && (navigator.userAgent.toLowerCase().indexOf('x86_64') != -1)),
	lnx32 : ((navigator.userAgent.indexOf('Linux') != -1) && ((navigator.userAgent.toLowerCase().indexOf('i386') != -1) || (navigator.userAgent.toLowerCase().indexOf('i686') != -1))),
	lnx : (navigator.userAgent.indexOf('Linux') != -1),
	and : (navigator.userAgent.match('Android')=='Android'),
	iph : (navigator.userAgent.match('iPhone')=='iPhone'),
	ipo : (navigator.userAgent.match('iPod')=='iPod'),
	ipa : (navigator.userAgent.match('iPad')=='iPad'),
	mob : (navigator.platform == 'Windows Mobile') || (navigator.userAgent.toLowerCase().indexOf("phone os") > 0)
};

/*
 ***************************************************************************
 * nProtect Efds Object
 ***************************************************************************
 */
var npEfdsObject = null;
var npEfdsWCtrlInstall = false;
npEfds.init = function(activemode){
	if(typeof(__define_seculog__) != "undefined" && __define_seculog__) return;
	if(typeof(npEfdsWCtrlInstall) != "undefined" && npEfdsWCtrlInstall) return;
	__define_seculog__ = true;
	npEfdsWCtrlInstall = false;
	
	if(typeof(activemode)=="undefined" || activemode==null || activemode=="") activemode = npEfds.types.USING;
	if(npEfds.define.and || npEfds.define.iph || npEfds.define.ipo || npEfds.define.ipa || npEfds.define.mob ){
		npEfds.policy.isPrUse = "M";
		return;
	}
	if(npEfds.define.win64 ){
		return;
	}
	if (npEfds.define.win) {
		var slm_UserAgent = navigator.userAgent;
			
		if(npEfds.define.ie && npEfds.define.win9x == false) {
			if(typeof(document.npEfdsPlugin) == "undefined" || document.npEfdsPlugin == null) {
				var html = "";
//				if(activemode == npEfds.types.USING){
					html += "<object id=\""+npEfds.package.winpack.iepack.objectid+"\" classid=\""+npEfds.package.winpack.iepack.classid+"\" width=\""+npEfds.package.winpack.iepack.width+"\" height=\""+npEfds.package.winpack.iepack.height+"\">\n";
//				} else {
//					html += "<object id=\""+npEfds.package.winpack.iepack.objectid+"\" classid=\""+npEfds.package.winpack.iepack.classid+"\" codebase=\""+npEfds.package.winpack.iepack.SetupURL+"\" width=\""+npEfds.package.winpack.iepack.width+"\" height=\""+npEfds.package.winpack.iepack.height+"\">";
//				}
				html += "<param name = \"UpdateURL\" value=\""+npEfds.package.winpack.iepack.UpdateURL+"\" />\n";
				html += "<param name = \"UpdateVersion\" value=\""+npEfds.package.winpack.iepack.UpdateVersion+"\" />\n";
				html += "<param name = \"UpdateFiles\" value=\""+npEfds.package.winpack.iepack.UpdateFiles+"\" />\n";
				html += "<param name = \"SetupFile\" value=\""+npEfds.package.winpack.iepack.SetupFile+"\" />\n";
				html += "<param name = \"HashCharSet\" value=\""+npEfds.package.winpack.iepack.HashCharSet+"\" />\n";

				html += "<param name = \"RltvUrlRealIP\" value=\""+npEfds.policy.RltvUrlRealIP+"\" />\n";
				html += "<param name = \"TimeOut\" value="+npEfds.policy.TimeOut+" />\n";
				html += "<param name = \"LanInfoMaxCount\" value="+npEfds.policy.LanInfoMaxCount+" />\n";
				html += "<param name = \"UsbInfoMaxCount\" value="+npEfds.policy.UsbInfoMaxCount+" />\n";
				html += "<param name = \"ForceNatIP\" value="+npEfds.policy.ForceNatIP+" />\n";
				html += "<param name = \"SetSecuPatch\" value=\""+npEfds.policy.SecuPatch+"\" />\n";
				html += "<param name = \"ExceptDnsIP\" value=\""+npEfds.policy.ExceptDnsIP+"\" />\n";
				html += "<param name = \"Borun\" value="+npEfds.policy.Borun+" />\n";
				html += "<param name = \"PluginsVersion\" value="+npEfds.policy.pluginsVersion+" />\n";
				html += "</object>";
				
				var body = document.getElementsByTagName("body")[0];
				var oSpan = document.createElement("span");

				with (oSpan.style){
					position = "absolute";
					left     = -1;
					top      = -1;
					width    = 0;
					height   = 0;
				}
				
				oSpan.innerHTML = html;
				body.appendChild(oSpan);
			}
			if(document.npEfdsWCtrl != null && document.npEfdsWCtrl.object != null){
				npEfdsObject = document.npEfdsWCtrl;
				npEfdsWCtrlInstall = true;
			}
		} else if(npEfds.define.ff || npEfds.define.cr || npEfds.define.sf || npEfds.define.op){
			var pluginCount = navigator.mimeTypes.length;
			var pluginName;
			var pluginFound = false;
			var pluginDescription;
		
			for(var i=0; i < pluginCount; i++) {
				pluginName = navigator.mimeTypes[i].type;
				if(pluginName.toLowerCase() == "application/npEfdsWPlugin".toLowerCase()) {
					pluginDescription = navigator.mimeTypes[i].description;
					pluginDescription = pluginDescription.substring(14, pluginDescription.length);
					if(pluginDescription  >= npEfds.policy.pluginsVersion){
						pluginFound = true;
						break;
					}
				}
			}

			if(pluginFound == true){
				npEfds.policy.isPrUse = "Y";
				if(typeof(document.npEfdsPlugin) == "undefined" || document.npEfdsPlugin == null) {
					var body = document.getElementsByTagName("body")[0];
					var obj = document.createElement("embed");
					obj.setAttribute("type", npEfds.package.winpack.noneiepack.objecttype);
					obj.setAttribute("id", npEfds.package.winpack.noneiepack.objectid);
					obj.setAttribute("name", npEfds.package.winpack.noneiepack.objectid);
					obj.setAttribute("UpdateURL", npEfds.package.winpack.noneiepack.UpdateURL);
					obj.setAttribute("SetupURL", npEfds.package.winpack.noneiepack.SetupURL);
					obj.setAttribute("UpdateVersion", npEfds.package.winpack.noneiepack.UpdateVersion);
					obj.setAttribute("UpdateFiles", npEfds.package.winpack.noneiepack.UpdateFiles);
					obj.setAttribute("HashCharSet", npEfds.package.winpack.noneiepack.HashCharSet);
					obj.setAttribute("width", npEfds.package.winpack.noneiepack.width+"px");
					obj.setAttribute("height", npEfds.package.winpack.noneiepack.height+"px");

					obj.setAttribute("RltvUrlRealIP", npEfds.policy.RltvUrlRealIP);
					obj.setAttribute("TimeOut", npEfds.policy.TimeOut);
					obj.setAttribute("SetSecuPatch", npEfds.policy.SecuPatch);
					obj.setAttribute("Borun", npEfds.policy.Borun);
					obj.setAttribute("ExceptDnsIP", npEfds.policy.ExceptDnsIP);
					obj.setAttribute("LanInfoMaxCount", npEfds.policy.LanInfoMaxCount);
					obj.setAttribute("UsbInfoMaxCount", npEfds.policy.UsbInfoMaxCount);
					obj.setAttribute("ForceNatIP", npEfds.policy.ForceNatIP);
					obj.setAttribute("PluginsVersion", npEfds.policy.pluginsVersion);
					body.appendChild(obj);

				}

				if(document.npEfdsPlugin != null){						
					npEfdsObject = document.npEfdsPlugin;
					npEfdsWCtrlInstall = true;
				}
			}
		}


    var isSkip = false;
    if (navigator.userAgent.match(/Edge/i)){
      isSkip = true;
    } else if (navigator.userAgent.indexOf('Chrome') >=0) {
        var index = navigator.userAgent.lastIndexOf("Chrome")+"Chrome".length+1;
        var tmp = navigator.userAgent.substring(index);
        var version = tmp;
        index = tmp.indexOf(" ");
        if (index > 0) version = tmp.substring(0, index);
        //alert(version);
        
	      var versionInt = parseInt(DC_browserInfo.version);
	      if (versionInt >= 44) {
	        //alert(versionInt);
         isSkip = true;
	      } 
	    }
	    
    if (isSkip) {
         // alert("로그수집기설치체크SKIP  (js)"+navigator.userAgent);

		}else {
			if(npEfdsWCtrlInstall == false) {
				/*
				 *  Non-ActiveX as-is 설치유도제거(2016.03.02)
				 */
				/*if(_SITE_SystemLang == "ENG"){
					alert(_seculogMsg);
				}else if(_SITE_SystemLang == "CHN"){
					alert(_seculogMsg);
				}else if(_SITE_SystemLang == "JPN"){
					alert(_seculogMsg);
				}else{//KOR
	                    //alert(navigator.userAgent);
					alert('안전한 인터넷뱅킹을 위하여 보안프로그램 설치가 필요합니다. \n[확인]을 클릭하시면 설치화면으로 이동합니다.');
				}
			
				location.replace(npEfds.policy.installpage);*/
			}
		}
	} else if(npEfds.define.lnx) {		// Linux
		if (npEfds.define.op) {
			return;
		}
		npEfds.policy.isPrUse = "Y";
		if(typeof(document.npEfdsPlugin) == "undefined" || document.npEfdsPlugin == null) {
			var body = document.getElementsByTagName("body")[0];
			var obj = document.createElement("embed");
			obj.setAttribute("type", npEfds.package.lnxpack.objecttype);
			obj.setAttribute("id", npEfds.package.lnxpack.objectid);
			obj.setAttribute("name", npEfds.package.lnxpack.objectid);
			obj.setAttribute("width",  npEfds.package.lnxpack.width+"px");
			obj.setAttribute("height",  npEfds.package.lnxpack.height+"px");
			obj.setAttribute("UpdateFiles", npEfds.package.lnxpack.UpdateFiles);
			obj.setAttribute("UpdateURL", npEfds.package.lnxpack.UpdateURL);
			obj.setAttribute("HashCharSet", npEfds.package.lnxpack.HashCharSet);
			obj.setAttribute("UpdateVersion", npEfds.package.lnxpack.UpdateVersion);
			

			obj.setAttribute("RltvUrlRealIP", npEfds.policy.RltvUrlRealIP);
			obj.setAttribute("TimeOut", npEfds.policy.TimeOut);
			obj.setAttribute("SetSecuPatch", npEfds.policy.SecuPatch);
			obj.setAttribute("ExceptDnsIP", npEfds.policy.ExceptDnsIP);
			obj.setAttribute("LanInfoMaxCount", npEfds.policy.LanInfoMaxCount);
			obj.setAttribute("UsbInfoMaxCount", npEfds.policy.UsbInfoMaxCount);
			obj.setAttribute("Borun", npEfds.policy.Borun);
			obj.setAttribute("ForceNatIP", npEfds.policy.ForceNatIP);
			body.appendChild(obj);
		}
		var pluginCount = navigator.mimeTypes.length;
		var pluginName;
		npEfdsWCtrlInstall = false;

		for(var i=0; i < pluginCount; i++) {
			pluginName = navigator.mimeTypes[i].type;
			if(pluginName.toLowerCase() == "application/x-npefdsplugin".toLowerCase()) {
				npEfdsObject = document.npEfdsPlugin;
				npEfdsWCtrlInstall = true;
				
				break;
			}
		}


   var isSkip = false;
    if (navigator.userAgent.match(/Edge/i)){
      isSkip = true;
    } else if (navigator.userAgent.indexOf('Chrome') >=0) {
        var index = navigator.userAgent.lastIndexOf("Chrome")+"Chrome".length+1;
        var tmp = navigator.userAgent.substring(index);
        var version = tmp;
        index = tmp.indexOf(" ");
        if (index > 0) version = tmp.substring(0, index);
        //alert(version);
        
	      var versionInt = parseInt(DC_browserInfo.version);
	      if (versionInt >= 44) {
	        //alert(versionInt);
         isSkip = true;
	      } 
	    }
	    
    if (isSkip) {
         // alert("로그수집기설치체크SKIP  (js)"+navigator.userAgent);
		}else if(npEfdsWCtrlInstall == false) {
			/*
			 *  Non-ActiveX as-is 설치유도제거(2016.03.02)
			 */
			/*if(_SITE_SystemLang == "ENG"){
				alert(_seculogMsg);
			}else if(_SITE_SystemLang == "CHN"){
				alert(_seculogMsg);
			}else if(_SITE_SystemLang == "JPN"){
				alert(_seculogMsg);
			}else{//KOR
				alert('안전한 인터넷뱅킹을 위하여 보안프로그램(seculog) 설치가 필요합니다. \n[확인]을 클릭하시면 설치화면으로 이동합니다.');
			}
			location.replace(npEfds.policy.installpage);*/
		}

	} else if(npEfds.define.mac){		// Mac
		npEfds.policy.isPrUse = "Y";
		if(npEfds.define.ff || npEfds.define.cr || npEfds.define.sf){
			if(typeof(document.npEfdsPlugin) == "undefined" || document.npEfdsPlugin == null) {
				var body = document.getElementsByTagName("body")[0];
				var obj = document.createElement("embed");
				obj.setAttribute("type", npEfds.package.lnxpack.objecttype);
				obj.setAttribute("id", npEfds.package.macpack.objectid);
				obj.setAttribute("name", npEfds.package.macpack.objectid);
				obj.setAttribute("width", npEfds.package.macpack.width+"px");
				obj.setAttribute("height", npEfds.package.macpack.height+"px");

				obj.setAttribute("UpdateURL", npEfds.package.macpack.UpdateURL);
				obj.setAttribute("SetupURL", npEfds.package.macpack.SetupURL);
				obj.setAttribute("UpdateVersion", npEfds.package.macpack.UpdateVersion);
				obj.setAttribute("UpdateFiles", npEfds.package.macpack.UpdateFiles);
				obj.setAttribute("HashCharSet", npEfds.package.macpack.HashCharSet);

				obj.setAttribute("TimeOut", npEfds.policy.TimeOut);
				obj.setAttribute("RltvUrlRealIP", npEfds.policy.RltvUrlRealIP);
				obj.setAttribute("SetSecuPatch", npEfds.policy.SecuPatch);
				obj.setAttribute("Borun", npEfds.policy.Borun);
				obj.setAttribute("ExceptDnsIP", npEfds.policy.ExceptDnsIP);
				obj.setAttribute("LanInfoMaxCount", npEfds.policy.LanInfoMaxCount);
				obj.setAttribute("UsbInfoMaxCount", npEfds.policy.UsbInfoMaxCount);
				obj.setAttribute("ForceNatIP", npEfds.policy.ForceNatIP);
				body.appendChild(obj);
			}

			var pluginCount = navigator.mimeTypes.length;
			var pluginName;
			npEfdsWCtrlInstall = false;

		
			//MAC plugins 체크
			var pluginCount2 = navigator.plugins.length;
			var pluginFileName;
			var pluginDescription2;


			for(var i=0; i < pluginCount2; i++) {
				pluginFileName = navigator.plugins[i].filename;
				if(pluginFileName.toLowerCase() == "npefdsplugin.plugin".toLowerCase()) {
					pluginDescription2 = navigator.plugins[i].description;
					pluginDescription2 = pluginDescription2.substring(21, pluginDescription2.length);
					//alert(pluginDescription2  >= "2011.11.22");
					if(pluginDescription2  >= npEfds.policy.pluginsVersionMac){
						npEfdsWCtrlInstall = true;
						break;
					}
				}
			}

			if(npEfdsWCtrlInstall == true){
				for(var i=0; i < pluginCount; i++) {
					pluginName = navigator.mimeTypes[i].type;
					if(pluginName.toLowerCase() == "application/x-npefdsplugin".toLowerCase()) {
						npEfdsObject = document.npEfdsPlugin;
						//npEfdsWCtrlInstall = true;
						break;
					}
				}
			}


    var isSkip = false;
    if (navigator.userAgent.match(/Edge/i)){
      isSkip = true;
    } else if (navigator.userAgent.indexOf('Chrome') >=0) {
        var index = navigator.userAgent.lastIndexOf("Chrome")+"Chrome".length+1;
        var tmp = navigator.userAgent.substring(index);
        var version = tmp;
        index = tmp.indexOf(" ");
        if (index > 0) version = tmp.substring(0, index);
        //alert(version);
        
	      var versionInt = parseInt(DC_browserInfo.version);
	      if (versionInt >= 44) {
	        //alert(versionInt);
         isSkip = true;
	      } 
	    }
	    
    if (isSkip) {
         //alert("로그수집기설치체크SKIP  (js)"+navigator.userAgent);
		}else if(npEfdsWCtrlInstall == false ) {
			/*
			 *  Non-ActiveX as-is 설치유도제거(2016.03.02)
			 */	
			/*if(_SITE_SystemLang == "ENG"){
					alert(_seculogMsg);
				}else if(_SITE_SystemLang == "CHN"){
					alert(_seculogMsg);
				}else if(_SITE_SystemLang == "JPN"){
					alert(_seculogMsg);
				}else{//KOR
					alert('안전한 인터넷뱅킹을 위하여 보안프로그램 설치가 필요합니다. \n[확인]을 클릭하시면 설치화면으로 이동합니다.');
				}
				location.replace(npEfds.policy.installpage);*/
			}
		}else if (npEfds.define.op) {
		//	alert("오페라 브라우저는 지원하지 환경입니다.");
		//	location.replace(npEfds.policy.guidepage);
		}
	}
}		// end of init




/*
 ***************************************************************************
 * nProtect Efds Utilities
 ***************************************************************************
 */
var npEfdsUtil = {};

npEfdsUtil.findElement = function(elename, formname) {//		
	if(typeof(formname) != "undefined"){
		try{
			var ielement = eval("document."+formname+"."+elename);
			if(ielement!=null && typeof(ielement) == "object" && ielement.length>0){return ielement[0];}
			else if(ielement) return ielement;
		} catch(e){}
	}
	if(document.getElementById(elename)) return document.getElementById(elename); 
	if(document.getElementsByName(elename)[0]) return document.getElementsByName(elename)[0];
	return null;
}

// 그냥 n millis 동안 멈추기
npEfdsUtil.pause = function(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime) return; 
	}
}
npEfdsUtil.createParam = function(name, value){
	var paramObj = document.createElement("param");
	paramObj.setAttribute("name", name);
	paramObj.setAttribute("value", value);
	return paramObj;
}

npEfdsUtil.leftpad = function(val, len, ch){
	var ret = val;
	if(ret.length <len){
		for(var i=0 ; i < (len-val.length) ; i++){
			ret = ch + ret;
		}
	} else if(val.length > len) {
		ret = val.substring(0, len);
	}
	return ret;
}

npEfdsUtil.getBwVsn = function() {
	var version;
	var ua = navigator.userAgent;

	if( npEfds.define.ff ) {
		var version = ua.substring(ua.toLowerCase().lastIndexOf("firefox"));
		if(version.indexOf(" ")> -1) {
			version = version.substring(0, version.indexOf(" "));
		}
		var temp = version.split("/");
		return temp[1];
	} else if( npEfds.define.op ) { 
		if(ua.lastIndexOf(" ") < ua.lastIndexOf("/")) {
			version = ua.substring(ua.lastIndexOf(" "));
			var temp = version.split("/");
			return temp[1];
		}
	} else if( npEfds.define.cr ) { 
		if(ua.lastIndexOf(" ") < ua.lastIndexOf("/")) {
			version = ua.substring(ua.toLowerCase().lastIndexOf("chrome"));
			var temp = version.split(" ");
			temp = temp[0].split("/");
			return temp[1];
		}
	} else if( npEfds.define.sf ) { 
		var reSF = new RegExp(/Version[\/\s](\d+\.\d+)/.test(navigator.userAgent));
		var bwVer = RegExp["$1"];
		return bwVer
	} else if( npEfds.define.ie ) { 
		if(ua.indexOf("MSIE") > -1){
			tua = ua.substring(ua.indexOf("MSIE") + 4, ua.length);
			tua = tua.replace(/(^\s*)|(\s*$)/gi, "");
			var temp = tua.split(";");
			temp = temp[0].split(" ");
			//alert("[" +tua+ "][" + temp[0] + "]");
			return temp[0];
		} else {//IE11
			return ua.substring(ua.indexOf("rv:") + 3,ua.indexOf("rv:") + 7);
		}
    }
}

npEfdsUtil.getBwVsnCd = function(){
	var major = "";
	var minor = "";

	var version = npEfdsUtil.getBwVsn();
	if(version.indexOf(".")!=-1){
		var temp = version.split(".");
		major = npEfdsUtil.leftpad(temp[0], 3, "0");
		minor = npEfdsUtil.leftpad(temp[1], 3, "0");
	} else {
		major = npEfdsUtil.leftpad(version, 3, "0");
		minor = npEfdsUtil.leftpad("000", 3, "0");
	}

	var result =  major+"-"+minor;
	if( npEfds.define.ie ) { 
		result = "10-"+result;
	} else if( npEfds.define.ff ) { 
		result = "20-"+result;
	} else if( npEfds.define.cr ) { 
		result = "30-"+result;
	} else if( npEfds.define.sf ) { 
		result = "40-"+result;
	} else if( npEfds.define.op ) { 
		result = "50-"+result;
	} else {
		result = "99-000-000";
	}
	return result;
}

npEfdsUtil.setValue = function(obj, value)
{
	obj.value = value;
}

npEfdsUtil.getValue = function(func, p1, p2, p3, p4, p5)
{
	//alert("["+func+"]["+(p1)+"]["+(p2)+"]["+(p3)+"]["+(p4)+"]["+(p5)+"]");
	//alert("["+func+"]["+typeof(p1)+"]["+typeof(p2)+"]["+typeof(p3)+"]["+typeof(p4)+"]["+typeof(p5)+"]");

	var ret = "";
	try{
		var obj = npEfdsObject;
		if(obj!= null && !npEfds.define.ie9x){
			if(npEfds.define.ie){
				if(typeof(p1) == "undefined"){
					ret = obj.invoker(func);
				} else if(typeof(p2) == "undefined"){
					ret = obj.invoker1(func, p1);
				} else if(typeof(p3) == "undefined"){
					ret = obj.invoker2(func, p1, p2);
				} else if(typeof(p4) == "undefined"){
					ret = obj.invoker3(func, p1, p2, p3);
				} else if(typeof(p5) == "undefined"){
					ret = obj.invoker4(func, p1, p2, p3, p4);
				} else {
					ret = obj.invoker5(func, p1, p2, p3, p4, p5);
				}
			} else {
				if(typeof(p1) == "undefined"){
					ret = obj.invoker(func);
				} else if(typeof(p2) == "undefined"){
					ret = obj.invoker(func, p1);
				} else if(typeof(p3) == "undefined"){
					ret = obj.invoker(func, p1, p2);
				} else if(typeof(p4) == "undefined"){
					ret = obj.invoker(func, p1, p2, p3);
				} else if(typeof(p5) == "undefined"){
					ret = obj.invoker(func, p1, p2, p3, p4);
				} else {
					ret = obj.invoker(func, p1, p2, p3, p4, p5);
				}
			}
			if(typeof(ret) == "undefined") ret = "";
		}
	} catch(e){
	//	alert(e);
	}
	return ret;
}

npEfdsUtil.getElapsedTime = function(startTime) {
	var ret = -1;
	try {
		var endTime = new Date();
		ret = endTime - startTime;
		if(ret > 100000) ret = 99999;
	} catch (e) { }
	return ret;
}


/*
 ***************************************************************************
 * nProtect Efds Utilities - Security Module Detection
 ***************************************************************************
 */
npEfdsUtil.security = {};
npEfdsUtil.security.secukey = {};
npEfdsUtil.security.dhack = {};

// 해킹차단기 : 잉카
npEfdsUtil.security.dhack.Inca = function() {
	return npEfdsUtil.getValue("isRunNetizen", "0");
}

// 해킹차단기 : 안랩
npEfdsUtil.security.dhack.AhnLab = function() {
	return npEfdsUtil.getValue("isRunAOS");
}

// 해킹차단기 : 킹스(i-Defence)
npEfdsUtil.security.dhack.Kings = function() {
	var isInsKey = '01';
	try {
		var objIDefense = null;
		if(document.getElementById){
			objIDefense = document.getElementById("idefense");
		}else{
			objIDefense = document.idefense;
		}

		try{
			if(objIDefense.GetOCXVersion() == ""){
				objIDefense = null;
			}
		}catch(e){
		}

		isInsKey = npEfdsUtil.getValue("isInstallKSID");
		if(isInsKey == '02') {
			try {
				if(objIDefense == null) isInsKey = '02';
				else isInsKey = '03';
			} catch(e) {
				isInsKey = '02';
			}
		}
		return isInsKey;
	} catch (e) {
		return isInsKey;
	}
}


// 키보드보안 : 잉카
npEfdsUtil.security.secukey.Inca = function() {
	return npEfdsUtil.getValue("isInstallIncaKrypt");
}

// 키보드보안 : 킹스(k-Defence)
npEfdsUtil.security.secukey.Kings = function() {
	var isInsKey = '01';
	try {
		var objKDefense = null;
		if(document.getElementById){
			objKDefense = document.getElementById("kdefense");
		}else{
			objKDefense = document.kdefense;
		}

		try{
			if(objKDefense.GetOCXVersion() == ""){
				objKDefense = null;
			}
		}catch(e){
		}

		isInsKey = npEfdsUtil.getValue("isInstallKD");
		if(isInsKey == '02') {
			try {
				if(objKDefense == null)
					isInsKey = '02';
				else
					isInsKey = '03';
			} catch(e) {
				isInsKey = '02';
			}
		}
		return isInsKey;
	} catch (e) {
		return isInsKey;
	}
}


// 키보드보안 : 소캠
npEfdsUtil.security.secukey.SoftCamp = function() {
	var isInsKey = '01';
	try {
		isInsKey = npEfdsUtil.getValue("isInstallSCSK");
		if(isInsKey == '02') {
			try {
				if(secukey.STATE() == 1)
					isInsKey = '03';
			} catch(e) {
			}
		}
		return isInsKey;
	} catch (e) {
		return isInsKey;
	}
}


// 키보드보안 : 소포
npEfdsUtil.security.secukey.SoftForum = function() {
	var isInsKey = '01';
	try {
		isInsKey = npEfdsUtil.getValue("isInstallCKKP");
		if(isInsKey == '02') {
			try {
				if(document.CKKeyPro==null || typeof(document.CKKeyPro) == "undefined" || document.CKKeyPro.object==null) {
				} else {
					isInsKey = '03';
				}
			} catch (e) {}
		}
		return isInsKey;
	} catch (e) {
		return isInsKey;
	}
}

npEfdsUtil.security.getDhack = function() {
	if(npEfds.config.dhack == npEfds.types.DH_INCA){
		return npEfdsUtil.security.dhack.Inca();
	} else if(npEfds.config.dhack == npEfds.types.DH_AHNLAB){
		return npEfdsUtil.security.dhack.AhnLab();
	} else if(npEfds.config.dhack == npEfds.types.DH_KINGS){
		return npEfdsUtil.security.dhack.Kings();
	}
}

npEfdsUtil.security.getSecuKey = function() {
	if(npEfds.config.secukey == npEfds.types.SK_INCA){
		return npEfdsUtil.security.secukey.Inca();
	} else if(npEfds.config.secukey == npEfds.types.SK_KINGS){
		return npEfdsUtil.security.secukey.Kings();
	} else if(npEfds.config.secukey == npEfds.types.SK_SOFTCAMP){
		return npEfdsUtil.security.secukey.SoftCamp();
	} else if(npEfds.config.secukey == npEfds.types.SK_SOFTFORUM){
		return npEfdsUtil.security.secukey.SoftForum();
	}
}

function SLMDownload(){
	if( getOsVersionCheck() == false || getBrowserVersion() == false ){
		alert("지원하지 않는 환경입니다.");
		return false;
	}
	var os_dis = null;
	var downloadUrl = null;
	if( npEfds.define.win ){
		if( npEfds.define.ie )	{
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/npEfdsWCtrlSetup.exe";
		}
		else{
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/npEfdsWCtrlSetup.exe";
		}
	}
	if( npEfds.define.lnx ){
		if( os_dis == null || typeof os_dis == "undefined" )
			os_dis = getOSType();
			
		var commonUrl = nProtectNP_downloadPkgUrl + "/";
		if((os_dis == "ubuntu")	&& (nProtectNP_Def.lnx32)){
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/linux-slm-1.0.0.deb";
		}	else if((os_dis	== "ubuntu") &&	(nProtectNP_Def.lnx64)){ 	
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/linux-slm-1.0.0-x86_64.deb";
		}	else if((os_dis	== "fedora") &&	(nProtectNP_Def.lnx32)){	
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/linux-slm-1.0.0.rpm";
		}	else if((os_dis	== "fedora") &&	(nProtectNP_Def.lnx64)){	
			location.href =	"https://download.kbstar.com/security/nprotect/op_seculog/linux-slm-1.0.0-x86_64.rpm";
		}	
	}
	else if( npEfds.define.mac ){
		location.href = "https://download.kbstar.com/security/nprotect/op_seculog/npLogCollector.dmg";
	}
}

function SLMDownloadWin(){
	if( getOsVersionCheck() == false || getBrowserVersion() == false ){
//		alert("지원하지 않는 환경입니다.");
		return false;
	}
	if( npEfds.define.win ){
		if( npEfds.define.ie )	{
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/npEfdsWCtrlSetup.exe";
		}
		else{
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/npEfdsWCtrlSetup.exe";
		}
	}

}

function SLMDownloadLnxF(){
	if( getOsVersionCheck() == false || getBrowserVersion() == false ){
//		alert("지원하지 않는 환경입니다.");
		return false;
	}
	if( npEfds.define.lnx ){
		var commonUrl = nProtectNP_downloadPkgUrl + "/";
		if(nProtectNP_Def.lnx32){	
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/linux-slm-1.0.0.rpm";
		}else{// if(nProtectNP_Def.lnx64){	
			location.href =	"https://download.kbstar.com/security/nprotect/op_seculog/linux-slm-1.0.0-x86_64.rpm";
		}	
	}
}

function SLMDownloadLnxU(){
	if( getOsVersionCheck() == false || getBrowserVersion() == false ){
//		alert("지원하지 않는 환경입니다.");
		return false;
	}
	if( npEfds.define.lnx ){
		var commonUrl = nProtectNP_downloadPkgUrl + "/";
		if(nProtectNP_Def.lnx32){
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/linux-slm-1.0.0.deb";
		}else{// if(nProtectNP_Def.lnx64){ 	
			location.href = "https://download.kbstar.com/security/nprotect/op_seculog/linux-slm-1.0.0-x86_64.deb";
		}	
	}
}

function SLMDownloadMac(){
	if( getOsVersionCheck() == false || getBrowserVersion() == false ){
//		alert("지원하지 않는 환경입니다.");
		return false;
	}
	if( npEfds.define.mac ){
		location.href = "https://download.kbstar.com/security/nprotect/op_seculog/npLogCollector.dmg";
	}
}