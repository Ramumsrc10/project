const http = require('http');

const server = http.createServer((req, res) => {})

const  io =  require('socket.io')(server, {
    cors: {
      methods: ["GET", "POST"],
      credentials: true
    }
  });

const users ={};
console.log('running')
io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        console.log(name);
        users[socket.id] = name; 
        socket.broadcast.emit('user joined',name);  
    });
    socket.on('send', message=>{
        console.log(message)
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });
})

server.listen(8000, () => {console.log('server running at 8000')})