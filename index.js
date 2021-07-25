// creating express server

const express = require("express");
const app=express();
const http = require("http");
const expressserver = http.createServer(app);


// creating socket server
const {Server}=require('socket.io');
const io=new Server(expressserver);

// server routing
app.get('/',function (req,res){
    res.sendFile(__dirname+"/index.html");

})

// sokcet connecction
const users = {};

io.on('connection',function (socket){
    console.log("new user conected");
    socket.on('chat',function (msg){

        socket.broadcast.emit('receive', {message: msg, name: users[socket.id]})
   // io.emit('chat_transfer',msg);



    })
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    });


    // If someone leaves the chat, let others know
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})
// port listenig
expressserver.listen(5000,function (){
    console.log("Surver Run at 5000 port")
})