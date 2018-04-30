(function () {

angular.module('common')
.controller('signupController', signupController);

signupController.$inject = ['MenuService','$scope']
function signupController(MenuService, $scope) {
  var reg = this;


  registeredServ.submit = function () {

    MenuService.dishExists(registeredServ.user.dish)
    .then(function (response) {
      registeredServ.noDishMessage = "";
      MenuService.registered = true;
      MenuService.user = registeredServ.user;
      MenuService.dish = response;
      registeredServ.completed = true;
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
      registeredServ.noDishMessage = "No such menu number exists";
    });
  };

  registeredServ.checkExistance = function () {
    MenuService.dishExists(registeredServ.user.dish)
    .then(function (response) {
      registeredServ.noDishMessage = "";
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
      registeredServ.noDishMessage = "No such menu number exists";
    });
  }

  registeredServ.registered = function () {
    return MenuService.registered;
  }

  registeredServ.getRegisteredUser = function ()
  {
    return MenuService.user;
  }

  registeredServ.getDish = function ()
  {
    return MenuService.dish;
  }
}
})()
