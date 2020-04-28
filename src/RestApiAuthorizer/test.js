var grip = require('grip');
var faasGrip = require('faas-grip');

const channel = '5bf08fa2636dd1010091f6a8.5bd1f667ad29c00100cabe9c' // the typing channels is a combo of chat id and typing user id


faasGrip.publish(channel, new grip.HttpStreamFormat(
    'event: message\ndata: {"text": "hello "}\n\n'));

///realm/{realm-id}/subscriptions/items/



