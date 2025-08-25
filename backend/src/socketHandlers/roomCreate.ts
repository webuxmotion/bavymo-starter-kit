import { type Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { CallStatus, ClientRoomCreate, Room } from "../types/shared/types";
import { store } from "../store/store";
import { io } from "..";


// This will be used directly in socket.on("message", ...)
export function roomCreate(this: Socket, data: ClientRoomCreate) {
    const { callerPersonalCode, calleePersonalCode } = data;

    const caller = store.findByPersonalCode(callerPersonalCode);
    const callee = store.findByPersonalCode(calleePersonalCode);

    if (caller && callee) {
        const room: Room = {
            roomId: uuidv4(),
            caller,
            callee,
            callStatus: CallStatus.Calling
        };

        store.addRoom(room);

        io.to([callee.socketId, caller.socketId]).emit("room-create", room);
    }
}