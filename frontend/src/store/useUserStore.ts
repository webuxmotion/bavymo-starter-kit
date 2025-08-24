import { create } from "zustand";
import type { OnlineUser } from "../../../backend/src/types/shared/types"
import { API_URL } from "../config";

type UserStore = {
    user: OnlineUser | null;
    users: OnlineUser[];
    addUser: (user: OnlineUser) => void;
    removeUser: (personalCode: string) => void;
    postAddUser: (user: OnlineUser) => void;
    setUsers: (users: OnlineUser[]) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    removeUser: (personalCode) =>
        set((state) => ({ users: state.users.filter((u) => u.personalCode !== personalCode) })),
    postAddUser: async (user: OnlineUser) => {
        try {
            const res = await fetch(`${API_URL}/add-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data: OnlineUser = await res.json();

            set(() => ({
                user: data,
            }));
        } catch (err) {
            console.error("❌ Failed to add user:", err);
        }
    },
    setUsers: (users) => set({ users }),
}));