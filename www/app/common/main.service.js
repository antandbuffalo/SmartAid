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

    this.initiatePostService = function(url, data) {
      var deferred = $q.defer();
      $http.post({
        method: 'GET',
        url: url,
        data: data || {}
      }).then(function successCallback(response) {
          deferred.resolve(response);
        }, function errorCallback(response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    this.errorCall = function(errorData) {
      console.log(errorData);
    };

});
