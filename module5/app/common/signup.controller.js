(function () {

angular.module('common')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService','$scope']
function SignupController(MenuService, $scope) {
  var signctrl = this;

  signctrl.submit = function () {

  signctrl.checkExistance = function () {
    MenuService.dishExists(signctrl.user.dish)
    .then(function (response) {
      signctrl.noDishMessage = "";
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
      signctrl.noDishMessage = "this menu does not exists";
    });
  }
  
  signctrl.registered = function () {
    return MenuService.registered;
  }

  signctrl.getRegisteredUser = function ()
  {
    return MenuService.user;
  }

  signctrl.getDish = function ()
  {
    return MenuService.dish;
  }
}
})()
