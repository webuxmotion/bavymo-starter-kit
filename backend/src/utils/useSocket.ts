import { type Server, type Socket } from "socket.io";
import { handleMessage } from "../socketHandlers/messages";
import { store } from "../store/store";

export function useSocket(io: Server) {
    io.on("connection", (socket: Socket) => {
        console.log("🟢 WS Client connected:", socket.id);

        const onlineUsers = store.getAllUsers();
        io.emit("online-users", onlineUsers);

        // Attach message listener
        socket.on("message", handleMessage);

        // Handle disconnect
        socket.on("disconnect", (reason) => {
            console.log(`🔴 WS Client disconnected: ${socket.id} (reason: ${reason})`);

            store.removeUser(socket.id);

            console.log(socket.id);
            const onlineUsers = store.getAllUsers();


            io.emit('online-users', onlineUsers);
        });
    });
}