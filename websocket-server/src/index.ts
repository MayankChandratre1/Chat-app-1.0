import express from "express";
import { WebSocket, WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8080);
let userCount = 0;
let users: {
  socket: WebSocket;
  roomId: string | undefined;
  name: string | undefined;
}[] = [];

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws, req) {
  ws.on("error", console.error);
  const roomId = req.url?.split("/")[1];
  let name = req.url?.split("/")[2];

  let userExists = false;

  users.forEach((user) => {
    if (user.roomId == roomId && user.name == name) {
      userExists = true;
    }
  });

  if (!userExists) {
    users.push({
      socket: ws,
      roomId,
      name,
    });
    console.log(`User ${++userCount} connected on room ${req.url}`);
  }

  ws.on("message", function message(data, isBinary) {
    users.forEach((user) => {
      if (user.socket.readyState === WebSocket.OPEN && user.roomId === roomId) {
        user.socket.send(`${data}`, { binary: isBinary });
      }
    });
  });

  ws.on("close", () => {
    const newUsers: {
      socket: WebSocket;
      roomId: string | undefined;
      name: string | undefined;
    }[] = [];
    users.forEach((user) => (user.socket === ws ? newUsers.push(user) : null));
    users = [...newUsers];
  });

  ws.send("Hello! Message From Server!!");
});
