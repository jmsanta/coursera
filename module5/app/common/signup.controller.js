(function () {

angular.module('common')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['MenuService','$scope']
function RegistrationController(MenuService, $scope) {
  var reg = this;


  reg.submit = function () {
    console.log(reg);
    console.log(MenuService);
    console.log(reg.user.dish);

    MenuService.dishExists(reg.user.dish)
    .then(function (response) {
      reg.noDishMessage = "";
      MenuService.registered = true;
      MenuService.user = reg.user;
      MenuService.dish = response;
      reg.completed = true;
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
      reg.noDishMessage = "No such menu number exists";
    });
  };

  reg.checkExistance = function () {
    MenuService.dishExists(reg.user.dish)
    .then(function (response) {
      reg.noDishMessage = "";
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
      reg.noDishMessage = "No such menu number exists";
    });
  }

  reg.registered = function () {
    return MenuService.registered;
  }

  reg.getRegisteredUser = function ()
  {
    return MenuService.user;
  }

  reg.getDish = function ()
  {
    return MenuService.dish;
  }
}
})()
