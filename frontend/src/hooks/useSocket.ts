import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export function useSocket() {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Connect to backend
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on("connect", () => {
            console.log("✅ Connected to WebSocket server", socketRef.current?.id);
        });

        socketRef.current.on("reply", (msg) => {
            console.log("📩 Reply from server:", msg);
        });

        // Cleanup on unmount
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const sendMessage = (msg: string) => {
        socketRef.current?.emit("message", msg);
    };

    return { sendMessage };
}