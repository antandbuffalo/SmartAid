
angular.module('app').controller('loginCtrl', function($rootScope,$scope,$state,$ionicLoading, mainService) {
 
   $scope.main.isLogin = true;
   $scope.req = {};


  $scope.login = function() {


  		
  		
  		// if($scope.req.un == "" && $scope.req.pwd == ""){
  		// 	$ionicLoading.show({ template: 'Please enter Username and Password', noBackdrop: true, duration: 1000 });
  		// }else{
  		// 	$ionicLoading.show({ template: 'Login call', noBackdrop: true, duration: 1000 });
  		// }


  	    // var PassPhrase = "The Moon is a Harsh Mistress.";
       //  var Bits = 512;
        
       //  console.log("Matt's passphrase: " + PassPhrase);
       //  console.log("Bit length: " + Bits);
        
       //  var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
       //  var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);       
        
       //  console.log("Matt's public key string:");
       //  console.log(MattsPublicKeyString);


       //  var PlainText = "Matt, I need you to help me with my Starcraft strategy.";
        
       //  console.log("Sam's message: " + PlainText);
        
       //  var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString);
        
       //  console.log("The encrypted message:");
       //  console.log(EncryptionResult.cipher);   

        
       //  var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, MattsRSAkey);
        
       //  console.log("The decrypted message:");
       //  console.log(DecryptionResult.plaintext);        
       //  console.log("DecryptionResult.signature: " + DecryptionResult.signature);
       //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
       //  var PassPhrase = "There Ain't No Such Thing As A Free Lunch."; 
       //  var Bits = 512; 
       //  var SamsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
       //    var SamsPublicKeyString = cryptico.publicKeyString(SamsRSAkey);
       //    console.log("Sample Public key "+SamsPublicKeyString);
       //      console.log("Sample Public key "+SamsRSAkey);

       //  var PlainText = "Matt, I need you to help me with my Starcraft strategy.";
       //  var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString, SamsRSAkey);

       //  console.log("Sam's public key ID: " + cryptico.publicKeyID(cryptico.publicKeyString(SamsRSAkey)));
       //  console.log("The encrypted message:");
       //  console.log(EncryptionResult.cipher);        
        
       //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

       //  var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, MattsRSAkey);
       //  console.log("The decrypted message:");
       //  console.log(DecryptionResult.plaintext);        
       //  console.log("DecryptionResult.signature: " + DecryptionResult.signature);
       //  console.log("The signature public key string:");
       //  console.log(DecryptionResult.publicKeyString);        
       //  console.log("The signature public key ID:");
       //  console.log(cryptico.publicKeyID(DecryptionResult.publicKeyString));   


       //  console.log(">>>>>>>>reverse");  
       //  var PlainText = "Doing by rajinikanth"; 
       //  var EncryptionResult_sam = cryptico.encrypt(PlainText, DecryptionResult.publicKeyString, MattsRSAkey);

       //  console.log("Encrypted data :: "+EncryptionResult_sam.cipher);
       //  var DecryptionResult_sam = cryptico.decrypt(EncryptionResult_sam.cipher, SamsRSAkey);
       //   console.log("Decrypted data :: "+DecryptionResult_sam.plaintext);

       //  console.log("DecryptionResult.signature: " + DecryptionResult_sam.signature);
       //  console.log("The signature public key string:");
       //  console.log(DecryptionResult_sam.publicKeyString);        
       //  console.log("The signature public key ID:");
       //  console.log(cryptico.publicKeyID(DecryptionResult_sam.publicKeyString));  

        var requestUrl = "http://smartaid-nodejstechdemo.rhcloud.com/login";
	 	$scope.main.spinner = true;
	 	console.log($scope.req);
	 	var req = {
	 		"email": $scope.req.un || "rajini@gmail.com",
	 		"password": $scope.req.pwd || "rajini"
	 	}
	 	mainService.initiatePostService(requestUrl, req).then(function(data) {
	 
   		
        UserRSAkey = cryptico.generateRSAKey(req.email, 512);
        UserPublicKeyString = cryptico.publicKeyString(UserRSAkey);       
        
        localStorage.setItem("UserPublicKey", UserPublicKeyString);
        localStorage.setItem("UserPrivateKey", JSON.stringify(UserRSAkey));

        console.log(localStorage.getItem("UserPrivateKey"));

      
        console.log(UserRSAkey);

        console.log("PUb"+UserPublicKeyString);

	 		
	 		if(data.message != "Failed"){
	 			$rootScope.user = data.user;
        console.log($rootScope.user);
	 			$state.go("posts");
	 		}else{
	 			$ionicLoading.show({ template: 'Login Failed', noBackdrop: true, duration: 1000 });
	 		}
	 		
	 		$scope.main.spinner = false;

	 	}, function(error) {	 		
	 		$scope.main.spinner = false;

	 	});




        //$state.go("posts");
    
  };
    $scope.$on('$ionicView.enter', function() {
        $scope.main.isLogin = true;
    });

    $scope.$on('$ionicView.leave', function() {
        $scope.main.isLogin = false;
    });
//some comments added
  $scope.$on("$destroy", function() {
    $scope.main.showNavButton = true;
  });
});
