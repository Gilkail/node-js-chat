const socket = io();
socket.on('connect', function(){
    console.log('connected')
})

// socket.on('disconnect', function(){
//     console.log('Disconnected')
// })

socket.on('newMessage', function(data){
    console.log('New message: ', data)
})

socket.on('wellcome', function(message){
    console.log(message)
})

socket.on('newUserJoined', function(message){
    console.log(message)
})