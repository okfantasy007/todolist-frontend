        var keycloak = new Keycloak({
            url: 'http://10.10.17.41:8080/auth',
            realm: 'demo',
            clientId: 'app1'
        });
		
		keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        }).success(function (auth) {
			if (auth) {
                console.info('Authenticated');
			else {
				console.info('Not Authenticated');
			}
		})