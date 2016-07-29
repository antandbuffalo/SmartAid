angular.module('app').controller('postsCtrl', function($scope, mainService) {

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

  function init() {
  	$scope.refreshPosts();
  }
  init();
});
