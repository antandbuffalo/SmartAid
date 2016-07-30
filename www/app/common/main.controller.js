angular.module('app').controller('mainController', function($rootScope, $scope, $ionicModal, Upload, mainService) {
  $scope.main = {};
  $scope.main.spinner = false;
  $scope.main.isLogin = false;  
  $scope.main.newPostButton = false;
  $scope.main.postRequest = {};

  $scope.main.constants = {
    "MY_KEY": "",
     Bits: 512
  }


$ionicModal.fromTemplateUrl('app/posts/create/create.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.main.fileTest = function() {
  	//alert($scope.main.postRequest.file);
  };
  $scope.main.createPost = function() {
  	var request = {
  		"image": "",
  		"description": $scope.main.postRequest.description,
  		"amount": $scope.main.amountCalculated,
      "public_key": localStorage.getItem("UserPublicKey")
  	};
    $scope.main.spinner = true;
  	Upload.base64DataUrl($scope.main.postRequest.image).then(function(urls){
  	 request.image = urls;
      var requestUrl = "http://smartaid-nodejstechdemo.rhcloud.com/posts";      

      request.token = $rootScope.user.token;
      console.log(request);
      mainService.initiatePostService(requestUrl, request).then(function(data) {
        $scope.closeModal();
        console.log(data);      
        $scope.main.spinner = false;
        $rootScope.$broadcast("NewPostAdded");

      }, function(error) {      
        $scope.main.spinner = false;
      });
    });
  };
  $scope.$watch('main.postRequest.amount', function(newValue, oldValue) {
    if(newValue) {
      var coins = (newValue / 10) + "";
      $scope.main.coinsCalculated = coins.split(".")[0];
      $scope.main.amountCalculated = $scope.main.coinsCalculated * 10;
    }
   });
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

  $scope.main.selectMenu = function(type) {
    if(type == "posts" || type == "myposts") {
      $scope.main.newPostButton = true;
    }
    else {
      $scope.main.newPostButton = false;
    }
  }

});
