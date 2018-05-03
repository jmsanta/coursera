(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://aqueous-caverns-97231.herokuapp.com')
.config(config);
config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}
})();
