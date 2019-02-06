const path = require('path') 
const http = require('http') 
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public') // Setup relative path

const app = express() // Call express
app.use(express.static(publicPath)) // Set express server to serve the public path

const server = http.createServer(app) // Initiate express server
const port = process.env.PORT || 3000 // Check if there is enviroment port or setup port 3000
const io = socketIO(server) // Call socket io with the express server

io.on('connection', (socket)=>{ // Check if user connected
    console.log('New user connected') 
    
    socket.on('disconnect', ()=>{ // Check if user dissconected
        console.log('User dissconected')
    })

    socket.emit('Welcome', {
        from: 'Admin',
        text: 'Welcome to the chat room',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newUserJoined', {
        from: 'Admin',
        text: 'New user joined the room',
        createdAt: new Date().getTime()
    })

    socket.on('sendMessage', (message)=>{
        console.log('Create message: ', message)
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        })
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })
})

server.listen(port, ()=>{ // Connect server on the relevant port
    console.log(`Started on port ${port}`)
})