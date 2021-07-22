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

io.on('connection',function (socket){
    console.log("new user conected");
    socket.on('chat',function (msg){
   io.emit('chat_transfer',msg);

    })

})
// port listenig
expressserver.listen(5000,function (){
    console.log("Surver Run at 5000 port")
})