const mongocl = require('mongodb').MongoClient;
const io = require('socket.io').listen(4000).sockets;
const assert = require('assert');

mongocl.connect('mongodb://127.0.0.1/test', function(er, db) {
    if (er) {
        throw er;
    }

    console.log('mongo db connected..');

    io.on('connection', function() {

        let chat = db.collection('chats');

        // create fucntion to send status
        sendStatus = function(stat) {
            socket.emit('status', stat);
        }

        // get chats from mongo collection
        chat.find().limit(50).sort({
            _id: 1
        }).toArray(function(error, res) {

            if (error) {
                throw error;
            }

            // emit the messages
            socket.emit('output', res);

            socket.on('input', function(data) {
                let name = data.name;
                let message = data.message;

                if (name == '' || message == '') {
                    sendStatus('please enter name and message');
                } else {
                    chat.insert({
                        name: name,
                        message: message
                    }, function() {
                        client.emit('output', [data]);

                        sendStatus({
                            message: 'message sent',
                            clear: true
                        });

                    });
                }

            });

            // handle clear
            socket.on('clear', function() {
                // remove all chats from collection
                chat.remove({}, function() {
                    socket.emit('cleared');
                });
            });

        });

    });
});
