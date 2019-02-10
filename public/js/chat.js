const socket = io();

socket.on('connect', function(){
    const params = jQuery.deparam(window.location.search)

    socket.emit('join', params, function(err){
        if (err){
            alert(err)
            window.location.href = '/'
        }else{
            console.log('no error')
        }
    })
    
})

socket.on('disconnect', function(){
    console.log('Disconnected')
})

socket.on('updateUserList', function(users){
    const ol = jQuery('<ol></ol>')
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user))
    })
    jQuery('#users').html(ol)
    console.log('Users list ',users)
})

function scrollToBottom () {
    const messages = jQuery('#messages')
    const newMessage = messages.children('li:last-child')

    const clientHeight = messages.prop('clientHeight')
    const scrollTop = messages.prop('scrollTop')
    const scrollHeight = messages.prop('scrollHeight')
    const newMessageHeight = newMessage.innerHeight()
    const lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }

}


socket.on('newMessage', function(data){

    const template = jQuery('#message-template').html()
    const html = Mustache.render(template, {
        from: data.from,
        text: data.text,
        formatedTime: moment(data.createdAt).format('H:mm')
    })

    jQuery('#messages').append(html)
    scrollToBottom()
})

socket.on('newLocationMessage', function(data){

    const template = jQuery('#location-template').html()
    const html = Mustache.render(template, {
        from: data.from,
        url: data.url,
        formatedTime: moment(data.createdAt).format('H:mm')
    })

    jQuery('#messages').append(html)
    scrollToBottom()
})


jQuery('#message-form').on('submit', function(e){
    e.preventDefault()
    const messageTextBox = jQuery('[name=message]')
    socket.emit('sendMessage', {
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