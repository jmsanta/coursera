// parte cliente : version  (ANGULAR) SSL
// https://stackoverflow.com/questions/31156884/how-to-use-https-on-node-js-using-express-socket-io
//https://jamielinux.com/docs/openssl-certificate-authority/sign-server-and-client-certificates.html
'use strict';

var app = angular.module('appSockets', []);
var port = '7736';
var host = 'localhost';
var URL = 'https://' + host + ':' + port;

//var io = require('socket.io-client');

app.controller('messageController', messageController);

// factory that wraps the socket.io to be used correctly in angular
app.factory('socket', function($rootScope) {
    var socket = io.connect(URL, {
        'forceNew': true,
         secure: true,
         reconnect:true,
         rejectUnauthorized : false
    });
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});
// injection of scope and socket factory in the controller
messageController.$inject = ['$scope', 'socket'];

function messageController($scope, socket) {

    var msgControl = this;

    socket.on('messages', function(data) {
        console.log(data);
        msgControl.msgList = data;
    });

    $scope.$on('$destroy', function() {
        //socket.removeAllListeners();
        // or something likeapp.factory('socket', function ($rootScope) {
        socket.removeListener();
    });

    msgControl.addMessage = function() {
        var mensaje = {
            author: $scope.username,
            text: $scope.text
        };
        // envia el mensaje al servidor emitiendo el evento.
        socket.emit('new-message', mensaje);
    }
}
