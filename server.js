import express from "express";
import { Server } from "socket.io";

const PORT = 3000;
const app = express();
const options = {
  cors: true,
  origin: ["http://localhost:3000"],
};

const server = app.listen(PORT, () => {
  console.log("server is started");
});

const io = new Server(server, options);

app.use(express.static("./dist"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

io.on("connection", socket => {
  socket.emit("welcome", socket.id)
  socket.join("room1")
  socket.on("message", message => {
    io.to("room1").emit("receiveMessage", {
      userId: socket.id,
      message: message,
    })
  })
})
