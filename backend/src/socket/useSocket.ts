import { type Server, type Socket } from "socket.io";
import { store } from "../store/store";
import { callAccept } from "../socketHandlers/callAccept";
import { roomCreate } from "../socketHandlers/roomCreate";

export function useSocket(io: Server) {
    io.on("connection", (socket: Socket) => {
        console.log("🟢 WS Client connected:", socket.id);

        const onlineUsers = store.getAllUsers();
        io.emit("online-users", onlineUsers);

        socket.on("room-create", roomCreate);

        socket.on("call-accept", callAccept);

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