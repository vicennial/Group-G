'use strict';

const app = angular.module('app',['ui.bootstrap']);

app.factory('socket', function ($rootScope) {
    let socket = null;
	return {
		connect: function(userId){
			socket = io.connect({query: `userId=${userId}`});
		},
		on: function (eventName, callback) {
			socket.on(eventName, function () {  
				var args = arguments;
				$rootScope.$apply(function () {
			  		callback.apply(socket, args);
				});
		  	});
		},
		emit: function (eventName, data, callback) {
		  	socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
			  		if (callback) {
						callback.apply(socket, args);
			  		}
				});
		  	})
		}
  	};
});


app.service('appService',  function (socket,$http) {
	return new AppService($http);
});

app.controller('app',  function ($scope,$timeout,socket,appService) {
	
	$scope.UI = {
		isUsernameAvailable : true,
		typingTimer : null
	};

	$scope.form = {
		username : null,
		password : null,
		isUsernameSuggest : null,
		registerPassword:null
	};

	var typingTimer =  null;

	$scope.usernameCheck = function(){
		$timeout.cancel($scope.UI.typingTimer);
		$scope.UI.typingTimer = $timeout(()=>{
			if ($scope.form.isUsernameSuggest !== undefined || $scope.form.isUsernameSuggest !=='') {
				appService.usernameCheck( {
					username:$scope.form.isUsernameSuggest,
				}, (response)=>{
					if(!response.error) {
	                    $scope.UI.isUsernameAvailable = true;
	                }else{
	                    $scope.UI.isUsernameAvailable = false;
	                }
				});
			}
		},800);
	}

	$scope.login = function (){
		if ($scope.form.username === undefined || $scope.form.username ==='') {
			alert('Invalid username.');
		}else if($scope.form.password === undefined || $scope.form.password ==='') {
			alert('Invalid password.');
		}else{
			appService.login({
					username:$scope.form.username,
					password:$scope.form.password
				}, (response)=>{
					if (response.error) {
						alert(response.message);
					}else{
						window.location.href = '/home/'+response.userId;
					}
			});
		}
	}

	$scope.register = function (){
		if ($scope.form.isUsernameSuggest === undefined || $scope.form.isUsernameSuggest ==='') {
			alert('Invalid username.');
		}else if($scope.form.registerPassword === undefined || $scope.form.registerPassword ==='') {
			alert('Invalid password.');
		}else{
			appService.register({
					username:$scope.form.isUsernameSuggest,
					password:$scope.form.registerPassword
				}, (response)=>{
					if (response.error) {
						alert(response.message);
					}else{
						window.location.href = '/home/'+response.userId;
					}
			});
		}
	}
});

app.controller('home',  function ($scope,$timeout,socket,appService) {
	
	$scope.UI = {
		username : null,
		typingTimer : null,
		results : null
	};

	appService.userSessionCheck((response)=>{
		if (response.error) {
			window.location.href='/';
		}else{
			$scope.UI.username = response.username;
			let userId = appService.getUserid();
			socket.connect(userId);
			socket.emit('chat-list',{userId:userId});
			socket.on('chat-list-response',(response)=>{
				if (response.singleUser) {					
					let chatListUsers = $scope.UI.results.filter( ( obj ) =>{
						if(obj._id === response.chatList['_id']){
							return false;
						}else{
							return true;
						}
					});
					$scope.UI.results = chatListUsers;
					$scope.UI.results.push(response.chatList);
				}else if(response.userDisconnected){
					if ($scope.UI.results.length > 1) {
						let chatListUsers = $scope.UI.results.filter( ( obj ) =>{
							if(obj.socketId === response.socketId){
								obj.online = 'N';
							}
							return true;
						});
						$scope.UI.results =chatListUsers;
					}
				}else{
					$scope.UI.results = response.chatList;
				}
			});
		}
	});

	$scope.logout = function(){
		socket.emit('logout',{userId:appService.getUserid()});
		socket.on('logout-response',(response)=>{
			if (!response.error) {
				window.location.href='/';
			}
		});		
	}

	$scope.getClassName = function(isOnline){
		if (isOnline==='N') {
			return 'user-offline';
		}else{
			return 'user-online';
		}
	}

	$scope.getOnlineStatus = function(isOnline){
		if (isOnline==='N') {
			return 'Offline';
		}else{
			return 'Online';
		}
	}
});