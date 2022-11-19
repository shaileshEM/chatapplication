const socket=io()
var name;

let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message_area')

do{
    name=prompt('Please enter your name')
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }

    //append message
    appendMessage(msg,'incoming')
    textarea.value=""
    scrollToBottom()
    
    // send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')
    let markup=`
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>

    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}

//Recieve message
socket.on('message',(msg)=>{
    appendMessage(msg,'outgoing')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}