import { type Socket } from "socket.io";
import { store } from "../store/store";
import { CallStatus, Room } from "../types/shared/types";
import { io } from "..";

// This will be used directly in socket.on("message", ...)
export function callAccept(this: Socket, { roomId }: { roomId: string }) {
    const room = store.getRoom(roomId);

    if (room) {
        store.updateRoomStatus(roomId, CallStatus.Connecting);
        const newRoom = store.getRoom(roomId);

        io.to([room.callee.socketId, room.caller.socketId]).emit('room-update', newRoom);
    }
}