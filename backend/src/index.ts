import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

import apiRouter from "./routes/api";
import { getSocketCors, useCors } from "./utils/cors";
import { useStaticFrontend } from "./utils/useStaticFrontend";
import indexRouter from "./routes";
import { useSocket } from "./utils/useSocket";

const PORT = 3000;

const app = express();
const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
    cors: getSocketCors(),
});

useCors(app);
useStaticFrontend(app);

app.use("/", indexRouter);
app.use("/api", apiRouter);

useSocket(io);

httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});