// store/useSocketStore.ts
import { create } from "zustand";
import type { Socket } from "socket.io-client";

type SocketStore = {
    socket: Socket | null;
    setSocket: (socket: Socket) => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
    socket: null,
    setSocket: (socket) => set({ socket }),
}));