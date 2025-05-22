var wizinhips_config = {
	startOnLoad: false, // false인경우, 적절한 시점에 Tracer.start()를 호출할것.
	//2019.12.24 루트안맞아서 주석처리tracerRoot: '/wizvera/wizinhips',
      //tracerServerRoot: '/ocom/html5/wizinhips/agent/wizinhips-agent.jsp?/Tracer',
      //tracerServerRoot: 'https://dobank.kbstar.com/Tracer',
      tracerServerRoot: '/Tracer',
      tracerRoot: '/ocom/html5/wizinhips',
	//bouncerServerRoot: '/ocom/html5/wizinhips/agent/wizinhips-agent.jsp?/Bouncer',
	//bouncerServerRoot: 'https://dobank.kbstar.com/Bouncer',
	bouncerServerRoot: '/Bouncer',
    bouncerRoot: '/ocom/html5/wizinhips',

      //2019.12.24 루트안맞아서 주석처리observerRoot: '/wizvera/wizinhips',
     //observerServerRoot: '/ocom/html5/wizinhips/agent/wizinhips-agent.jsp?/Observer',
     //observerServerRoot: 'https://dobank.kbstar.com/Observer',
     observerServerRoot: '/Observer',
     observerRoot: '/ocom/html5/wizinhips',

	tracer: {
	    //serverPublicKey: '{"kty":"RSA","n":"qvC39N8uBoRWW8yGqPzAghVhNxWMzFuUgjZSTvBUMVeQdMquFGQHoXQ_wZAloYos5JiNXoUi4jdiu1buZkdwVRMpDexf7__0K_aBFjd-vKUOfTYP20Hhqx1sagK0K4Aayv2ljoc0D2auzBvnvaG9Gtr80eEkIfQOr4k29WYLOAHp_N_8Ov8BNd7-CqpoG19AzAp-C6BypElgt_6CAA4k8GNkSiqUuTNaw551g5jeU9TJElaN2K5PkKknD-geYdAGXbbAC7r4_SrFVzoFxhiOWMsjDBpmSKK-SU-121oriNPKlRcN36MUch5Q8vmkIYfqqnnlvkSojwin1i36UawH8Q","e":"AQAB"}',
          serverPublicKey: '{"kty": "RSA","n": "yGrXhjXvtK2l8jGperuxIwFJmJuUUUmtvy5q_SVlHAP88yzGvyRlGGSfBBP2hJhVH5CBo8etgL51GY7ZuIncTSfNtTrk4QJewBx1KqC2sV5edy9yx2rt8ZmyMqNW4BtHZGT-vFxlaAhwAMRD8BC75pYDHsbQR8Gs4ul7r6KQDf0N-EHThuk7-iYKjD-YtPvEFJflHUuvz9ouG61QV-wLmODngxyUrpeDH1TtGFMoY_7y9XBgvxpN67burl6UoR2xNQC-dd8uUzeRAm5WRE3X0_ZlvF6Wnd535RHhCbY1jhVXVwRdHRqeb03u3RtNc3x48Xfkd1LV5cJEP4EIe5rR7Q","e": "AQAB"}',
	    //serviceUrl: '/Tracer/tracer.jsp',
	    //checkCacheUrl: '/wizvera/wizinhips/tracerAgent/check_cache.jsp',
	  //2019.12.24 루트안맞아서 주석처리  tracerAgentUrl: '/wizvera/wizinhips/tracerAgent/tracerAgent.jsp'
           tracerAgentUrl: '/ocom/html5/wizinhips/tracerAgent/tracerAgent.jsp',
        disableMacAddress: true //default: false
	},
	bouncer: {
	    //timeout: 5000,
	},
	observer: {
	    //serverPublicKey: '{"kty":"RSA","n":"qvC39N8uBoRWW8yGqPzAghVhNxWMzFuUgjZSTvBUMVeQdMquFGQHoXQ_wZAloYos5JiNXoUi4jdiu1buZkdwVRMpDexf7__0K_aBFjd-vKUOfTYP20Hhqx1sagK0K4Aayv2ljoc0D2auzBvnvaG9Gtr80eEkIfQOr4k29WYLOAHp_N_8Ov8BNd7-CqpoG19AzAp-C6BypElgt_6CAA4k8GNkSiqUuTNaw551g5jeU9TJElaN2K5PkKknD-geYdAGXbbAC7r4_SrFVzoFxhiOWMsjDBpmSKK-SU-121oriNPKlRcN36MUch5Q8vmkIYfqqnnlvkSojwin1i36UawH8Q","e":"AQAB"}',
          serverPublicKey: '{"kty": "RSA","n": "yGrXhjXvtK2l8jGperuxIwFJmJuUUUmtvy5q_SVlHAP88yzGvyRlGGSfBBP2hJhVH5CBo8etgL51GY7ZuIncTSfNtTrk4QJewBx1KqC2sV5edy9yx2rt8ZmyMqNW4BtHZGT-vFxlaAhwAMRD8BC75pYDHsbQR8Gs4ul7r6KQDf0N-EHThuk7-iYKjD-YtPvEFJflHUuvz9ouG61QV-wLmODngxyUrpeDH1TtGFMoY_7y9XBgvxpN67burl6UoR2xNQC-dd8uUzeRAm5WRE3X0_ZlvF6Wnd535RHhCbY1jhVXVwRdHRqeb03u3RtNc3x48Xfkd1LV5cJEP4EIe5rR7Q","e": "AQAB"}',
	    //serviceUrl: '/Observer/observer.jsp',
	    //audioCaptchaUrl: '/Observer/audio.jsp',
	  //2019.12.24 루트안맞아서 주석처리  observerAgentUrl: '/wizvera/wizinhips/observerAgent/observerAgent.jsp',
            observerAgentUrl: '/ocom/html5/wizinhips/observerAgent/observerAgent.jsp',
		lang: 'kr',
	
	//2019.12.24 ID안맞아서 주석처리 inputElementId: 'userpw',
          inputElementId: 'LoginPassword',
	    //captchaContainerId: 'captchaContainer',
	    maxRetryCount: 5,
	  onHelp: onHelp,
	    onResult: onResult,
	    onError: onError
	},
	onInit: onInit
};