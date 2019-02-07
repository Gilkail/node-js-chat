const socket = io();
socket.on('connect', function(){
    console.log('connected')
})

// socket.on('disconnect', function(){
//     console.log('Disconnected')
// })

socket.on('newMessage', function(data){
    const li = jQuery('<li></li>')
    li.text(data.from+': '+data.text)
    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function(data){
    const li = jQuery('<li></li>')
    const a = jQuery('<a target="_blank">Location</a>')

    li.html(data.from+': ')
    a.attr('href', data.url)
    li.append(a)

    jQuery('#messages').append(li)
})


jQuery('#message-form').on('submit', function(e){
    e.preventDefault()
    const messageTextBox = jQuery('[name=message]')
    socket.emit('sendMessage', {
        from: 'Gil',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val("")
    })  
})

const locationButton = jQuery('#send-location')

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser')
    }

    locationButton.attr('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        locationButton.removeAttr('disabled')
        alert('Unable to fetch location')
    })
})