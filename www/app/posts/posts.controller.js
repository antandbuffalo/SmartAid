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

  function init() {
    mainService.initiateGetService("http://myapp-nodejstechdemo.rhcloud.com/posts").then(function(success) {
      $scope.posts = success;
      console.log(success);
    }, mainService.errorCall);
  }
  init();
});
