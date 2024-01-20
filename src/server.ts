import express from "express"
import http from 'http'
import { Server } from "socket.io"
import cors from "cors"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.use(cors())

app.get('/', (req, res) => {
  res.send("olá");
});

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);

  socket.on("disconnect", () => {
    console.log("Usuario desconectado")
  })

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message)
  })
});

server.listen(3333, () => {
  console.log('Server is running on port: 3333');
});