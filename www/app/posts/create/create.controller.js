angular.module('app').controller('createController', function($rootScope,$scope, mainService) {


  function init() {
    
 		var requestUrl = "http://smartaid-nodejstechdemo.rhcloud.com/posts";
	 	$scope.main.spinner = true;

	 	$scope.postRequest.token = $rootScope.token;
       mainService.initiatePostService(requestUrl, $scope.postRequest).then(function(data) {
	 		
	 		console.log(data);	 		
	 		$scope.main.spinner = false;

	 	}, function(error) {	 		
	 		$scope.main.spinner = false;
	 	});

  }
  init();
});
