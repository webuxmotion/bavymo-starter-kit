// socket/useSocket.ts
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useUserStore } from "../store/useUserStore";
import { useRoomStore } from "../store/useRoomStore";
import { useSocketStore } from "../store/useSocketStore";
import type { Room, OnlineUser } from "../../../backend/src/types/shared/types";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export function useSocket() {
    const setUsers = useUserStore((state) => state.setUsers);
    const setRoom = useRoomStore((state) => state.setRoom);
    const setSocketStore = useSocketStore((state) => state.setSocket);

    useEffect(() => {
        const socket = io(SOCKET_URL);

        socket.on("connect", () => {
            console.log("✅ Connected:", socket.id);
            setSocketStore(socket); // store it globally
        });

        socket.on("online-users", (users: OnlineUser[]) => {
            setUsers(users);
        });

        socket.on("room-create", (room: Room) => {
            setRoom(room);
        });

        socket.on("room-update", (room: Room) => {
            setRoom(room);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return null; // you don’t need to return socket here anymore
}