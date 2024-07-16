var express = require("express");
const app = express();

// Khởi tạo server http
const http = require("http");
const server = http.createServer(app);

// Thêm đoạn này để tránh bị lỗi cors hoặc exceptions
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// lắng nghe socket khi có connect từ client tới
socketIo.on("connection", (socket) => {
  console.log("New   client connected" + socket.id);
  socket.emit("getId", socket.id);
  // lắng nghe sự kiện sendFromClient từ client
  socket.on("sendFromClient", (data) => {
    console.log("Data from client: ", data);
    // phát sự kiện có tên là sendDataFromServer tới client
    socket.emit("sendDataFromServer", { data });
  });
  // lắng nghe sự kiện disconnect từ client
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
