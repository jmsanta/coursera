(function () {
'use strict';

angular.module('ValidationApp')
.controller('SignupController', SignupController);

// 'item' is injected through state's resolve
SignupController.$inject = ['item']

function SignupController(form) {

if(form.$valid) {
   // Code here if valid
  }
  
}

})();