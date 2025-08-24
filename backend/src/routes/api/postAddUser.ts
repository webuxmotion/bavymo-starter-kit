import { Router, type Request, type Response } from "express";
import type { Server as SocketIOServer } from "socket.io";
import { OnlineUser } from "../../types/shared/types";
import { store } from "../../store/store";

export default (io: SocketIOServer) => {
    const router = Router();

    // POST /api/add-user
    router.post("/", (req: Request, res: Response) => {
        const { personalCode, socketId } = req.body as Partial<OnlineUser>;

        if (!personalCode || !socketId) {
            return res.status(400).json({ error: "personalCode and socketId are required" });
        }

        const newUser: OnlineUser = { personalCode, socketId };

        store.addUser(newUser);

        const onlineUsers = store.getAllUsers();
        io.emit("online-users", onlineUsers);

        return res.status(201).json(newUser);
    });

    return router;
};