const socket = io();
socket.on('connect', function(){
    console.log('connected')
})

// socket.on('disconnect', function(){
//     console.log('Disconnected')
// })

socket.on('newMessage', function(data){
    const li = jQuery('<li></li>')
    li.text('From '+data.from+': '+data.text)
    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function(data){
    const li = jQuery('<li></li>')
    const a = jQuery('<a target="_blank">Location</a>')

    li.html('From '+data.from+': ')
    a.attr('href', data.url)
    li.append(a)

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

const locationButton = jQuery('#send-location')

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser')
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        alert('Unable to fetch location')
    })
})