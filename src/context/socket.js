import { createContext } from "react";

import socketio from "socket.io-client";
import { SOCKET_URL } from "../services/config";
// import { SOCKET_URL } from "config";

export const socket = socketio.connect(SOCKET_URL, {
  transports: ["websocket"],
});
console.log("in context");
export const SocketContext = createContext();
