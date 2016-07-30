angular.module('app').controller('postsCtrl', function($rootScope,$ionicPopup,$scope, $ionicLoading, mainService) {
	$scope.main.isLogin = false;
	$scope.main.newPostButton = true;
  $scope.currentPost = null;

	$scope.refreshPosts = function() {
		var requestUrl = "http://smartaid-nodejstechdemo.rhcloud.com/posts";
	    mainService.initiateGetService(requestUrl).then(function(success) {
	      $scope.posts = success.data;
        for(var i = 0; i < $scope.posts.length; i++) {
          $scope.posts[i].totalCoin = 0;
          for(var j=0; j < $scope.posts[i].coin.length; j++) {
            $scope.posts[i].totalCoin = $scope.posts[i].totalCoin + parseInt($scope.posts[i].coin[j].amount);
          }
        }
	      $scope.$broadcast('scroll.refreshComplete');
	      console.log(success);
	    }, function(error) {
	       $scope.$broadcast('scroll.refreshComplete');
	    });		
	}

	$scope.$on('$ionicView.enter', function() {
		$scope.main.isLogin = false;
		$scope.main.newPostButton = true;
		$scope.refreshPosts();
	});

	$scope.$on('$ionicView.leave', function() {
		//$scope.main.newPostButton = false;
	});

	$scope.$on('NewPostAdded', function() {
		$scope.refreshPosts();
	});

	$scope.showPopup = function(currentPost) {
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
          console.log(e);

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
    if(res) {
      //token, post_id
      var plainText = res + $rootScope.user.name;
      var EncryptionResult = cryptico.encrypt(plainText, currentPost.public_key, UserRSAkey);
      var request = {
        token: $rootScope.user.token,
        post_id: currentPost.id,
        amount: res,
        coin_hash: EncryptionResult
      }
        var requestUrl = "http://smartaid-nodejstechdemo.rhcloud.com/post_coins";
          $scope.main.spinner = true;
          mainService.initiatePostService(requestUrl, request).then(function() {
            console.log("coins added successfully");
            $scope.main.spinner = false;
            $ionicLoading.show({ template: 'Coins Added', noBackdrop: true, duration: 3000 });
            $scope.refreshPosts();

          }, function(error) {      
            $scope.main.spinner = false;
        });
    }
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
});
