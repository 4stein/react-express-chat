// db connect
const createSocket = (http) => {
  const io = require("socket.io")(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    
  });

  return io;
};

export default createSocket;
