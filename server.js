const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
var clientObjs = {};
io.on("connection",function(socket){
  console.log(socket.id,"has connected");
  io.emit("spawn",clientObjs);
  socket.on("spawn",function(data){
    clientObjs[socket.id]=data;
    io.emit("spawn",clientObjs);

  });
  socket.on("disconnect",function(){
    console.log(socket.id,"disconnected");
    delete clientObjs[socket.id];
    io.emit("spawn",clientObjs);
  });
});

app.use(serveStatic(path.join(__dirname,'public')));
const port = process.env.PORT || 5000;
server.listen(port);
console.log('server started '+ port);
