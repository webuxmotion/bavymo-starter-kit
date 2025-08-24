import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useUserStore } from "../store/useUserStore";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export function useSocket() {
    const [socket, setSocket] = useState<Socket | null>(null);

    const setUsers = useUserStore((state) => state.setUsers);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);

        newSocket.on("connect", () => {
            setSocket(newSocket);

            console.log("✅ Connected:", newSocket.id);
        });

        newSocket.on("reply", (msg) => {
            console.log("📩 Reply from server:", msg);
        });

        newSocket.on("online-users", (users) => {
            setUsers(users);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = (msg: string) => {
        socket?.emit("message", msg);
    };

    return { sendMessage, socket };
}