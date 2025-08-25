import { create } from "zustand";
import type { Room } from "../../../backend/src/types/shared/types";

type RoomStore = {
    room: Room | null;
    setRoom: (room: Room | null) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
    room: null,
    setRoom: (room) => set({ room }),
}));