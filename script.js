const socket = io("http://localhost:8000");

const form = document.getElementById('send-container');

const messageInput = document.getElementById("messageinp");
const messageContainer = document.querySelector(".container"); 
//console.log("mskd");
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append (`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = ""
})


//const prompt=require("prompt-sync")({sigint:true}); 
const name = prompt("enter your name to join");
socket.emit('new-user-joined',name);
socket.on('user-joined',name=>{
append(`${name} joined the chat`,right);
})
socket.on('recieve',data=>{
append(`${data.name}: ${data.message} `,'left');
})

//export default name;
