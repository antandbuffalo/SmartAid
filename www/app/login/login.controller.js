angular.module('app').controller('loginCtrl', function($scope, mainService) {
  $scope.main.showNavButton = false;
  $scope.login = function() {
    alert("Login raijni");
  };
//some comments added
  $scope.$on("$destroy", function() {
    $scope.main.showNavButton = true;
  });
});
