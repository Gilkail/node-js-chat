const socket = io();
socket.on('connect', function(){
    console.log('connected')
    socket.emit('createMessage', {
        from: 'Gil',
        text: 'Hello from client side'
    })

    socket.emit('createMessage', {
        from: 'Tal',
        text: 'Hello My name is tal'
    })
})

// socket.on('disconnect', function(){
//     console.log('Disconnected')
// })

socket.on('newMessage', function(data){
    console.log('New message: ', data)
})