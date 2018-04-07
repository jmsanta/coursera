'use strict';

var app = angular.module('shopList', []);

app.controller('ToBuyController', ToBuyController);
app.controller('AlreadyBoughtController', AlreadyBoughtController);
app.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

// :::::::::: tobuyController ::::::::::
function ToBuyController(ShoppingListCheckOffService) {
    var buyList = this;
    buyList.everyBought = "";

    buyList.toBuyItems = ShoppingListCheckOffService.getBuyItems();
    // action calls the service to get the data.
    buyList.boughtAction = function(item) {
        buyList.toBuyItems = ShoppingListCheckOffService.boughtAction(item);
        if (buyList.toBuyItems.length == 0) {
            buyList.everyBought = "Everything is bought!";
        }
    }
}

// :::::::::: AlreadyBoughtController ::::::::::
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.boughtItems = ShoppingListCheckOffService.getBoughItems();

}

// You will obviously need to share data between these controllers, with a SERVICE
// SERVICE : ShoppingListCheckOffService

function ShoppingListCheckOffService() {
    //implement this data sharing using the singleton approach with the .service declaration
    var service = this;

    var toBuyItems = [{
            name: "cookies",
            quantity: 10
        },
        {
            name: "potatos",
            quantity: 5
        },
        {
            name: "bananas",
            quantity: 10
        },
        {
            name: "oranges",
            quantity: 10
        },
        {
            name: "lemons",
            quantity: 10
        }
    ]

    var boughtItems = [];

    service.boughtAction = function(item) {
        toBuyItems = toBuyItems.filter(elm => elm !== item)
        boughtItems.push(item);
        return toBuyItems;
    }

    service.getBuyItems = function() {
        return toBuyItems;
    }
    service.getBoughItems = function() {
        return boughtItems;
    }
}