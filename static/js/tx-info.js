var app = angular.module("myApp",['pascalprecht.translate','ngSanitize']);

app.config(['$translateProvider',
	function($translateProvider) {
		$translateProvider.useStaticFilesLoader({
			prefix: '../i18n/',
			suffix: '.json'
		});

		var lang = window.localStorage.getItem("lang")||'cn';
		$translateProvider.preferredLanguage(lang);
		$translateProvider.useSanitizeValueStrategy('escapeParameters');
	}]);

app.controller("tx-info-Controller",function ($scope, $translate, $http) {

	$scope.langs = [{
		name: "English",
		lang: "cn"
	},
		{
			name: "中文",
			lang: "en"
		}];

	var lang = window.localStorage.getItem("lang");

	if( lang == "en"){
		$scope.langSelectIndex = 1;
	}else {
		$scope.langSelectIndex = 0;
	}

	$scope.changeLangSelectIndex = function() {
		if ($scope.langSelectIndex === 0) {
			$scope.langSelectIndex = 1;
		} else {
			$scope.langSelectIndex = 0;
		}
		$translate.use($scope.langs[$scope.langSelectIndex].lang);
		window.localStorage.setItem("lang",$scope.langs[$scope.langSelectIndex].lang);
		$("#top-navbar-1").removeClass("in");
	};

	var hash = getQueryString('hash')
	/**
	 * 交易详情
	 */
	$http({
		method: 'GET',
		url:   host + '/api/ifood/tx/' + hash,
	}).then(function successCallback(response) {
		if(response.data.code != "0000" || response.data.data==null) {
			console.log(response.data.msg)
			window.location.href= '/html/404.html'
		}
		var data = response.data.data;
		$scope.txInfo = data;

	}, function errorCallback(response) {
		console.log("tx info error");
	});

	/**
	 * tx info by hash
	 * @param txHash
	 */
	$scope.getBlockByHeight=function(height) {
		window.location.href= '/html/block-info.html?height=' + height
	}


})