angular.module('app').service('mainService', function($q, $http) {

  this.initiateGetService = function(url) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
        deferred.resolve(response.data);
      }, function errorCallback(response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    this.initiatePostService = function(requestUrl, inputData) {

      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: requestUrl,
        data: inputData,
        headers: {'Content-Type': 'application/json'}
      }).then(function successCallback(response) {
          deferred.resolve(response.data);
        }, function errorCallback(response) {
          console.log(response);
          deferred.reject(response);
      });
      return deferred.promise;
    };

    this.errorCall = function(errorData) {
      console.log(errorData);
    };

});
