require('dotenv').config() //used for sensitive info
const express = require('express')
const app = express()
const https = require('https')
const server = https.createServer(app)
const io = require('socket.io')(server, {
    origin: 'https://master.d1cwd691lheo6s.amplifyapp.com/',
    methods: ['GET'],
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})
const cors = require('cors')

//app.use(express.static('build')) // Use Build
app.use(cors())

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data)
        console.log(data)
    })
})

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


