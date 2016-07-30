angular.module('app.controllers', [])

.controller('cartTabDefaultPageCtrl', function($scope) {

})

.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('postDetailsCtrl', function($scope) {

})

.controller('transferCoinsController', function($rootScope, $scope, $ionicModal, $ionicLoading, mainService) {
	$scope.request = {};
	var transferRequest = {};

	$scope.request.selectedBank = "dbs";

	$scope.transfer = function() {
		console.log(transferRequest);
		 
		 try {
			 var DecryptionResult_sam = cryptico.decrypt($scope.currentCoin.coin.coin_hash, UserRSAkey);
			 console.log("----- decrypt --- ");
			 console.log(DecryptionResult_sam);
		 } catch(e) {
		 	console.log(e);
		 }

		$scope.main.spinner = true;
		mainService.initiatePostService("http://smartaid-nodejstechdemo.rhcloud.com/fund_transfers", transferRequest).then(function(success) {
			$scope.main.spinner = false;
			$ionicLoading.show({ template: 'Coins Transferred', noBackdrop: true, duration: 3000 });

	 	}, function(error) {
	 		console.log(error);
	 		$scope.main.spinner = false;
	 	});
	};

	$scope.transferOffline = function() {
		$scope.qrcodeData = transferRequest;
		$scope.qrcodeData = "Offline transaction successful.";
		//alert($scope.qrcodeData);
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

	 $scope.postChanged = function(givenPost) {
	 	for(var i=0; i < $scope.myPosts.length; i++) {
	 		if(givenPost == $scope.myPosts[i].post.id) {
	 			$scope.currentPost = $scope.myPosts[i];
	 			transferRequest.post_id = $scope.currentPost.post.id;
	 		}
	 	}	 	
	 };

	 $scope.coinChanged = function(givenCoin) {
	 	for(var i=0; i < $scope.currentPost.coins.length; i++) {
	 		console.log($scope.currentPost.coins[i]);
	 		if(givenCoin == $scope.currentPost.coins[i].coin.id) {
	 			$scope.currentCoin = $scope.currentPost.coins[i];
	 			$scope.qrcodeData = $scope.currentPost.post.description + " " + $scope.currentCoin.coin.amount;
	 			transferRequest.coin_id = $scope.currentCoin.coin.id;	 			
	 			transferRequest.amount = $scope.currentCoin.coin.amount;
	 		}
	 	}	 	
	 };

	 $scope.getMyposts = function() {
		var requestUrl = "http://smartaid-nodejstechdemo.rhcloud.com/my_posts?token=" + $rootScope.user.token;
		$scope.main.spinner = true;
	    mainService.initiateGetService(requestUrl).then(function(success) {
	    	$scope.main.spinner = false;
	      $scope.myPosts = success.data;
	      console.log(success);
	    }, function(error) {
	    	$scope.main.spinner = false;
	    	console.log(error);
	    });		
	};

	$scope.$on('$ionicView.enter', function() {
		$scope.getMyposts();
	});
})



.controller('addcoinController', function($rootScope, $scope, $state, $ionicLoading, $filter, mainService) {
	 $scope.request = {};

	 $scope.transfer = function() {	 			
		$scope.request.token = $rootScope.user.token;
		var requestUrl = "http://smartaid-nodejstechdemo.rhcloud.com/cards";
		console.log($scope.request);
	 	mainService.initiatePostService(requestUrl, $scope.request).then(function(success) {
			$ionicLoading.show({ template: 'Coins added', noBackdrop: true, duration: 3000 });
			$state.go("posts");
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




.controller('signupController', function($scope, $ionicLoading, $state, mainService) {
	 $scope.request = {};

	 $scope.register = function() {
	 	console.log($scope.request);
	 	var requestUrl = "http://smartaid-nodejstechdemo.rhcloud.com/users";
	 	$scope.main.spinner = true;
	 	mainService.initiatePostService(requestUrl, $scope.request).then(function() {
	 		console.log("registered successfully");
	 		$state.go("login");
	 		$scope.main.spinner = false;

	 	}, function(error) {	 		
	 		$scope.main.spinner = false;
	 	});
	 };
})


.controller('mypostsCtrl', function($rootScope,$ionicPopup,$scope, mainService) {
	$scope.main.isLogin = false;
	//$scope.main.newPostButton = true;

	$scope.refreshPosts = function() {
		var requestUrl = "http://smartaid-nodejstechdemo.rhcloud.com/my_posts?token=" + $rootScope.user.token;
	    mainService.initiateGetService(requestUrl).then(function(success) {
	      $scope.posts = success.data;
	      $scope.$broadcast('scroll.refreshComplete');
	      console.log(success);
	    }, function(error) {
	       $scope.$broadcast('scroll.refreshComplete');
	    });		
	}

	$scope.$on('$ionicView.enter', function() {
		$scope.main.isLogin = false;
		//$scope.main.newPostButton = true;
		$scope.refreshPosts();
	});

	$scope.$on('$ionicView.leave', function() {
		//$scope.main.newPostButton = false;
	});

	$scope.$on('NewPostAdded', function() {
		$scope.refreshPosts();
	});

	$scope.showPopup = function() {
   $scope.data = {}
  
   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="number" ng-model="data.wifi">',
     title: 'Fund Coins',
     subTitle: 'Thankyou for funding...',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Add</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   // $timeout(function() {
   //    myPopup.close(); //close the popup after 3 seconds for some reason
   // }, 3000);
  };

  function init() {
  	$scope.refreshPosts();  	
  }
  init();

})