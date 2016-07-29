angular.module('app').controller('createController', function($scope, mainService) {


  function init() {
    mainService.initiateGetService("http://myapp-nodejstechdemo.rhcloud.com/posts").then(function(success) {
      $scope.posts = success;
      console.log(success);
    }, mainService.errorCall);
  }
  init();
});
