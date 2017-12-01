// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

let activeUsers = 0;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  
  console.log('Client connected');
  activeUsers++;
  wss.broadcast({"type": "userConnection", "activeUsers": activeUsers});
  
  // ws.on('open', function open() {
  //   ws.send('something');
  // });

  ws.on('message', function incoming(data) {
    const id = uuidv4();
    const outgoing_message = JSON.parse(data);
    outgoing_message['id'] = id;
    if(outgoing_message ['type']=== 'postMessage'){
      outgoing_message['type'] = 'incomingMessage';
    }
    if(outgoing_message ['type']=== 'postNotification'){
      outgoing_message['type'] = 'incomingNotification';
    }
    wss.broadcast(outgoing_message);

  });



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    activeUsers--;
    wss.broadcast({"type": "userDisConnection"});

  });
});




