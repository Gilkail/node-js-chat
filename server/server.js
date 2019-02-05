const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const app = express()
app.use(express.static(publicPath))

const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = socketIO(server)

io.on('connection', (socket)=>{
    console.log('New user connected')
    socket.on('disconnect', ()=>{
        console.log('User dissconected')
    })
})



server.listen(port, ()=>{
    console.log(`Started on port ${port}`)
})