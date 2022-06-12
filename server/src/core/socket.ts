// db connect
const createSocket = (http) => {
  const io = require("socket.io")(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket: any) => {
    socket.on("DYALOGS:TYPING", (obj: any) => {
      io.emit("DYALOGS:TYPING", obj);
    });
  });

  return io;
};

export default createSocket;
