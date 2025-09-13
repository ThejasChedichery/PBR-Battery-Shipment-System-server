
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const UserRouter= require('./App/Router/UserRouter')
const ContractRouter = require('./App/Router/ContractRouter')
const ShipmentRouter = require('./App/Router/ShipmentRouter')
const {Server} = require('socket.io')
const http = require('http');

require('dotenv').config()

const app = express();
app.use(cors())
app.use(express.json())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
      origin: '*',
      credentials: true,
    }
  });

//user router
app.use('',UserRouter)
//contract router
app.use('/contract',ContractRouter)

//shipment router
app.use('/shipment',ShipmentRouter)

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('Client connected');
  });

app.set('io', io)

// connecting mongoDB
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("MongoDB connected sucessfully")})
.catch(err=>console.log("Error while connect MongoDB",err))

const PORT = process.env.PORT || 3002
server.listen(PORT,()=>console.log(`server running on ${PORT}`))