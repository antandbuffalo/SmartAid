angular.module('app').controller('loginCtrl', function($scope) {
  $scope.main.showNavButton = false;

  $scope.login = function() {
    alert("Login raijni");
  };

  $scope.$on("$destroy", function() {
    $scope.main.showNavButton = true;
  });
});
