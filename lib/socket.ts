// realtime imports
import { io } from "socket.io-client";

export const socket = io("https://api.diagnos.uz", {
  autoConnect: false,
  transports: ["websocket"],
});
