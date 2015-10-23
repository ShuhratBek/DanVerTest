'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('MainCtrl', function ($scope, $http) {
    var vm = this;
    vm.captchaImg = '';
    vm.alert = false;
    vm.captcha = function(){
	    $http.post('http://mir-ndv.ru/Profile/captcha', {request_type:1}).success(function(response) {
	      if(response.error){
			vm.alert = response.error;
	      }
	      if(response.answer){
	      	vm.captchaImg = 'data:image/jpeg;charset=utf-8;base64,'+response.answer;
	      }
	    }).error(function() {
	      vm.alert = 'Fail...';
	    });
	};
	vm.captcha();
	vm.reg = {
		request_type: 1,
		submit: 1,
		login: '',
		pwd: '',
		pwd2: '',
		captcha: ''
	};
    vm.register = function(){
	    $http.post('http://mir-ndv.ru/Profile/reg', vm.reg).success(function(response) {
	      if(response.error){
			vm.alert = response.error;
	      }
	      if(response.answer){
		      if(response.answer.success.fields.indexOf('submit') !== -1){
				vm.alert ='регистрация прошла успешно';
		      }
		      if(response.answer.error){
				vm.alert = response.answer.error.msg;
		      }
	      }
	    }).error(function() {
	      vm.alert = 'Fail...';
	    });
	};
  });
