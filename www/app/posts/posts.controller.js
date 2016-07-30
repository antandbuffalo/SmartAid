angular.module('app').controller('postsCtrl', function($scope, mainService) {
	$scope.main.isLogin = false;
	$scope.main.newPostButton = true;

	$scope.request = {
		"image": "",
		"description": "",
		"amount_expected": ""
	};

	function createPost() {
		mainService.initiatePostService("http://myapp-nodejstechdemo.rhcloud.com/posts", $scope.request).then(function(success) {

		}, mainService.errorCall);
	};

	$scope.refreshPosts = function() {
	    mainService.initiateGetService("http://myapp-nodejstechdemo.rhcloud.com/posts").then(function(success) {
	      $scope.posts = success;
	      $scope.$broadcast('scroll.refreshComplete');
	      console.log(success);
	    }, function(error) {
	       $scope.$broadcast('scroll.refreshComplete');
	    });		
	}

	$scope.$on('$ionicView.enter', function() {
		$scope.main.isLogin = false;
		$scope.main.newPostButton = true;
	});

	$scope.$on('$ionicView.leave', function() {
		$scope.main.newPostButton = false;
	});

  function init() {
  	$scope.refreshPosts();  	
  }
  init();
});
