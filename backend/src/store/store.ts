import { OnlineUser, Room, CallStatus } from "../types/shared/types";

export class Store {
    private onlineUsers: Map<string, OnlineUser>; // key = socketId
    private rooms: Map<string, Room>; // key = roomId or caller socketId

    constructor() {
        this.onlineUsers = new Map();
        this.rooms = new Map();
    }



    // --- Users ---
    addUser({ socketId, personalCode }: OnlineUser) {
        this.onlineUsers.set(socketId, { socketId, personalCode });
    }

    removeUser(socketId: string) {
        this.onlineUsers.delete(socketId);

        // Remove any room where this user is caller or callee
        // for (const [roomId, room] of this.rooms.entries()) {
        //   if (room.caller.socketId === socketId || room.callee.socketId === socketId) {
        //     this.rooms.delete(roomId);
        //   }
        // }
    }

    getUser(socketId: string): OnlineUser | undefined {
        return this.onlineUsers.get(socketId);
    }

    getAllUsers(): OnlineUser[] {
        return Array.from(this.onlineUsers.values());
    }

    findByPersonalCode(code: string): OnlineUser | undefined {
        return Array.from(this.onlineUsers.values()).find(
            (user) => user.personalCode.toUpperCase() === code.toUpperCase()
        );
    }

    // --- Rooms ---
    addRoom(room: Room) {
        // use provided roomId or caller's socketId as key
        this.rooms.set(room.roomId || room.caller.socketId, room);
    }

    updateRoomStatus(roomId: string, status: CallStatus) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.callStatus = status;
            this.rooms.set(roomId, room);
        }
    }

    getRoom(roomId: string): Room | undefined {
        return this.rooms.get(roomId);
    }

    getAllRooms(): Room[] {
        return Array.from(this.rooms.values());
    }

    removeRoom(roomId: string) {
        this.rooms.delete(roomId);
    }
}

// singleton instance
export const store = new Store();