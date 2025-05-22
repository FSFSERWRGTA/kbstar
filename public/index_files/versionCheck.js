function send() {
	var request = document.getElementById('hsmiframe').contentWindow;
	var text = {
		'messageNumber' : 0,
		'sessionID' : '' + Math.random(),
		'operation' : 'GetVersion'
	};
	request.postMessage(JSON.stringify(text), 'https://127.0.0.1:14461');
}
function receivedData(event) {
	if (event.origin == 'https://127.0.0.1:14461') {
		if (typeof window.addEventListener === 'function') {
			window.removeEventListener('message', receivedData, false);
		} else if (typeof window.attachEvent === 'function') {
			window.detachEvent('onmessage', receivedData);
		} else {
			window.detachEvent('onmessage', receivedData);
		}

		var obj = JSON.parse(event.data);
		if (!obj || !obj.list || !obj.list[0]) {
			return;
		}

		var currentVersion = obj.list[0].version;
		var cv = currentVersion.split('.');
		currentVersion = cv[0] + '.' + cv[1] + '.' + cv[2] + '.0';

	} else

		return;
}

function isUpdate(ver, lst) {
	var l = lst.split('.'), c = ver.split('.'), len = Math.max(l.length, c.length);

	for ( var i = 0; i < len; i++) {
		if ((l[i] && !c[i] && parseInt(l[i]) > 0) || (parseInt(l[i]) > parseInt(c[i]))) {
			return true;
		} else if ((c[i] && !l[i] && parseInt(c[i]) > 0) || (parseInt(l[i]) < parseInt(c[i]))) {
			return false;
		}
	}
	return false;
}
function fnChecker(r) {
	if (r) {
		setTimeout(send, 200);
	}
}
function fnInstallCheck(rv) {
	var fnResult = function(r) {
		rv(r);
	};
	var iframesrc = 'https://127.0.0.1:14461';
	var chkImg;
	if (navigator.userAgent.indexOf("MSIE 7.0") != -1) {
		chkImg = document.createElement("<img id='hsmImg' src='" + iframesrc + "/TIC?cd=" + Math.random() + "' onload='' onerror='' />");
		chkImg.onerror = function() {
			fnResult(false);
		};
		chkImg.onload = function() {
			fnResult(true);
		};
		chkImg.style.display = 'none';
	} else {
		chkImg = document.createElement('img');
		chkImg.setAttribute('id', "hsmImg");
		chkImg.setAttribute('src', iframesrc + '/TIC?cd=' + Math.random());
		chkImg.onerror = function() {
			fnResult(false);
		};
		chkImg.onload = function() {
			fnResult(true);
		};
		chkImg.style.display = 'none';
	}
};

function StartCheck() {
	
	if (typeof window.addEventListener === 'function') {
		window.addEventListener('message', receivedData, false);
		
	} else if (typeof window.attachEvent === 'function') {
		window.attachEvent('onmessage', receivedData);
	} else {
		window.attachEvent('onmessage', receivedData);
	}
	if (document.getElementById('hsmiframe') == null) {
		var ifEle = document.createElement('iframe');
		ifEle.name = 'hsmiframe';
		ifEle.id = 'hsmiframe';
		ifEle.src = 'https://127.0.0.1:14461';
		ifEle.style.visibility = 'hidden';
		ifEle.style.position = 'absolute';
		document.body.appendChild(ifEle);
	}
	fnInstallCheck(fnChecker);
}
