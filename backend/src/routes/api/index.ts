import { Router } from "express";
import personalCodeRouter from "./personalCode";
import postAddUser from "./postAddUser";
import type { Server as SocketIOServer } from "socket.io";

export default (io: SocketIOServer) => {
    const router = Router();

    router.use("/generate-personal-code", personalCodeRouter);
    router.use("/add-user", postAddUser(io));

    return router;
}
