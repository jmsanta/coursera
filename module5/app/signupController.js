(function () {
'use strict';

angular.module('validationApp')
.controller('SignupController', SignupController);

// 'item' is injected through state's resolve
SignupController.$inject = ['form', 'Myservice']

function SignupController(form, Myservice) {

if(form.$valid) {
   // Code here if valid
   // call Myservice
  }
  
}

})();