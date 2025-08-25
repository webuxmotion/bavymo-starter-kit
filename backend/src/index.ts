import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

import apiRouter from "./routes/api";
import { getSocketCors, useCors } from "./utils/cors";
import { useStaticFrontend } from "./utils/useStaticFrontend";
import indexRouter from "./routes";
import { useSocket } from "./socket/useSocket";

const PORT = 3000;

const app = express();
app.use(express.json());
const httpServer = createServer(app);

export const io = new SocketIOServer(httpServer, {
    cors: getSocketCors(),
});

useCors(app);
useStaticFrontend(app);

app.use("/", indexRouter);
app.use("/api", apiRouter(io));

useSocket(io);

httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});