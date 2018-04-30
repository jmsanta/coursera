(function () {

angular.module('common')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService','$scope']
function SignupController(MenuService, $scope) {
  var signctrl = this;

  signctrl.submit = function () {
  
  MenuService.existDish(signctrl.user.dish)
    .then(function (response) {
		
	  if(response){
		signctrl.noDishMessage = "";
		MenuService.registered = true;
		MenuService.user = signctrl.user;
		MenuService.dish = response;
	  }	else {
		  signctrl.noDishMessage = "No such menu number exists";
	  }
    
    })
    .catch(function (error) {
		throw error;
      
    });
  };

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
