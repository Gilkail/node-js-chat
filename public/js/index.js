const socket = io();
socket.on('connect', function(){
    console.log('connected')
})

// socket.on('disconnect', function(){
//     console.log('Disconnected')
// })

socket.on('newMessage', function(data){
    const li = jQuery('<li></li>')
    li.text(`From ${data.from}: ${data.text}`)
    jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault()
    socket.emit('sendMessage', {
        from: 'Gil',
        text: jQuery('[name=message]').val()
    }, function(data){
        jQuery('[name=message]').val("")
        console.log(data)
    })  
})