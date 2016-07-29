angular.module('app').controller('mainController', function($scope, $ionicModal, Upload, mainService) {
  $scope.main = {};
  $scope.main.showNavButton = true;
  $scope.main.postRequest = {};
  

$ionicModal.fromTemplateUrl('app/posts/create/create.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.fileTest = function() {
  	//alert($scope.main.postRequest.file);
  };
  $scope.createPost = function() {
	var request = {
		"image": "",
		"description": $scope.main.postRequest.description,
		"amount_expected": $scope.main.postRequest.amount_expected
	};

  	Upload.base64DataUrl($scope.main.postRequest.file).then(function(urls){
  		request.image = urls;
		mainService.initiatePostService("http://myapp-nodejstechdemo.rhcloud.com/posts", request).then(function(success) {
			console.log("posted");
		}, mainService.errorCall);
  	});


  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
});

  $scope.main.createNewPost = function() {
	$scope.modal.show();
  };

});
