(function () {

angular.module('common').controller('SignupController', SignupController);

SignupController.$inject = ['MenuService','$scope']
function SignupController(MenuService, $scope) {
  var signctrl = this;

  signctrl.submit = function () {
  
  MenuService.existDish(signctrl.user.dish)
    .then(function (response) {
		
	  if(response){
    		signctrl.DishMessage = "";
    		MenuService.registered = true;
    		MenuService.user = signctrl.user;
    		MenuService.dish = response;
	  }	else {
		  signctrl.DishMessage = "No such menu number exists";
	  }
    })
    .catch(function (error) {
		throw error;
    });
  };

  signctrl.isRegistered = function () {
    return MenuService.registered;
  }

  signctrl.getUser = function ()
  {
    return MenuService.user;
  }

  signctrl.getFavoriteDish = function ()
  {
    return MenuService.dish;
  }
}
})()
