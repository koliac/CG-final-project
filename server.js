const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
var allClients = {};
io.on("connection",function(socket){
  console.log(socket.id,"has connected");
  io.emit("spawn");
  socket.on("spawn",function(socket){
    let randomX = Math.random()*2-1,
        randomY = Math.random()*2-1,
        randomZ = Math.random()*2-1;
    allClients[socket.id]=[randomX,randomY,randomZ];
    socket.emit("spawn",allClients);
  });
  socket.on("disconnect",function(){
    console.log(socket.id,"disconnected");
    allClients.splice(allClients.indexOf(socket),1);
  });
});

app.use(serveStatic(path.join(__dirname,'public')));
const port = process.env.PORT || 5000;
server.listen(port);
console.log('server started '+ port);
