import { create } from "zustand";
import { API_URL } from "../config";

type User = {
    id?: number;
    name?: string;
    personalCode: string;
};

type UserStore = {
    user: User | null;
    users: User[];
    addUser: (user: User) => void;
    removeUser: (id: number) => void;
    fetchPersonalCode: (id: number, name: string) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    removeUser: (id) =>
        set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
    fetchPersonalCode: async (id, name) => {
        try {
            const res = await fetch(`${API_URL}/generate-personal-code`);
            const data = await res.json();

            const newUser: User = {
                id,
                name,
                personalCode: data.personalCode,
            };

            set((state) => ({
                user: newUser,
                users: [...state.users, newUser],
            }));
        } catch (err) {
            console.error("Failed to fetch personal code:", err);
        }
    },
}));