import { type Server, type Socket } from "socket.io";
import { handleMessage } from "../socketHandlers/messages";

export function useSocket(io: Server) {
    io.on("connection", (socket: Socket) => {
        console.log("🟢 WS Client connected:", socket.id);

        // Attach message listener
        socket.on("message", handleMessage);

        // Handle disconnect
        socket.on("disconnect", (reason) => {
            console.log(`🔴 WS Client disconnected: ${socket.id} (reason: ${reason})`);
        });
    });
}