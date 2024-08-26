const app = require('./app');
const createWebSocketServer = require('./websocket'); 
const http = require('http'); 
require('dotenv').config();

const PORT = process.env.PORT || 3001;


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server has started on port', PORT);
});


createWebSocketServer(server);
