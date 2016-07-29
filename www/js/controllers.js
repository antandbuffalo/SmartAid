angular.module('app.controllers', [])

.controller('cartTabDefaultPageCtrl', function($scope) {

})

.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('postDetailsCtrl', function($scope) {

})

.controller('transferCoinsController', function($scope, $ionicModal, mainService) {
	$scope.request = {};

	$scope.request.selectedBank = "dbs";

	$scope.transfer = function() {
		console.log($scope.request);
		mainService.initiatePostService("http://myapp-nodejstechdemo.rhcloud.com/posts", $scope.request).then(function(success) {
			$ionicLoading.show({ template: 'Coins Transferred', noBackdrop: true, duration: 3000 });

	 	}, mainService.errorCall);
	};

	$scope.transferOffline = function() {
		$scope.qrcodeData = $scope.request.coinsToTransfer * 10;
		$scope.modal.show();
	};

	$ionicModal.fromTemplateUrl('app/qrcode/qrcode.modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	  $scope.closeModal = function() {
	    $scope.modal.hide();
	 };

})



.controller('addcoinController', function($scope, $ionicLoading, $filter, mainService) {
	 $scope.request = {};

	 $scope.transfer = function() {	 	
		console.log($scope.request);
	 	mainService.initiatePostService("http://myapp-nodejstechdemo.rhcloud.com/posts", $scope.request).then(function(success) {
			$ionicLoading.show({ template: 'Coins added', noBackdrop: true, duration: 3000 });

	 	}, mainService.errorCall);
	 };

	 $scope.$watch('request.amount', function(newValue, oldValue) {
	 	if(newValue) {
	 		var coins = (newValue / 10) + "";
	 		$scope.coins = coins.split(".")[0];
	 		$scope.actualAmount = $scope.coins * 10;
	 	}
	 });
})
