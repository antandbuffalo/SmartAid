angular.module('app').controller('loginCtrl', function($scope, mainService) {
  $scope.main.showNavButton = false;
  $scope.login = function() {
    
  };
//some comments added
  $scope.$on("$destroy", function() {
    $scope.main.showNavButton = true;
  });
});
